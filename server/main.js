// Init frameworks
require("dotenv").config();

const http = require("http"),
    url_module = require("url"),
    { v4: uuidv4 } = require("uuid");

const { host, port } = process.env;

const data = require("./data.json");

const { writeFile, findIndex } = require("./utils/index.js");

const authServer = http.createServer((req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "OPTIONS, GET, POST, PATCH, DELETE, PUT"
    );
    res.setHeader("Access-Control-Max-Age", 2592000);
    res.setHeader("Access-Control-Allow-Headers", "content-type");

    if (req.method === "OPTIONS") {
        res.writeHead(204);
        res.end();
    }

    const { method, url } = req,
        { pathname, query } = url_module.parse(url, true);

    if (method === "GET" && pathname === "/api/users") {
        const { reg, filter } = query;

        try {
            if (reg === "true") {
                res.writeHead(200);
                res.end(
                    JSON.stringify(data.filter((user) => user.isLogin === true))
                );
            } else {
                switch (filter) {
                    case "name":
                        res.writeHead(200);
                        res.end(
                            JSON.stringify(
                                data.sort((a, b) =>
                                    a.name.localeCompare(b.name)
                                )
                            )
                        );
                        break;
                    case "reg":
                        res.writeHead(200);
                        res.end(
                            JSON.stringify(
                                data.sort((a, b) => b.isLogin - a.isLogin)
                            )
                        );
                        break;
                    case "email":
                        res.writeHead(200);
                        res.end(
                            JSON.stringify(
                                data.sort((a, b) =>
                                    a.email.localeCompare(b.email)
                                )
                            )
                        );
                        break;
                    default:
                        res.writeHead(200);
                        res.end(JSON.stringify(data));
                }
            }
        } catch (error) {
            console.error("Error:", error);
            res.writeHead(500);
            res.end(JSON.stringify({ error: "Internal Server Error" }));
        }
    } else if (method === "POST" && pathname === "/api/user/signup") {
        let body = [];

        req.on("data", (chunk) => {
            body.push(chunk);
        }).on("end", () => {
            body = Buffer.concat(body).toString();
            try {
                const { name, surname, email, password } = JSON.parse(body);

                if (!name || !surname || !email || !password) {
                    res.writeHead(400);
                    res.end("Invalid data");
                    return;
                }

                data.push({
                    id: uuidv4(),
                    name,
                    surname,
                    email,
                    password,
                });

                writeFile(
                    JSON.stringify(data, null, 2),
                    res,
                    "Data file changed successfully",
                    "Error writing to data file"
                );
            } catch (error) {
                res.writeHead(400);
                res.end("Invalid JSON data");
            }
        });
    } else if (method === "POST" && pathname === "/api/user/login") {
        let body = [];

        req.on("data", (chunk) => {
            body.push(chunk);
        }).on("end", () => {
            body = Buffer.concat(body).toString();
            try {
                const { email, password, isLogin } = JSON.parse(body);

                if (!email || !password) {
                    res.writeHead(400);
                    res.end("Invalid data");
                    return;
                }

                let userFound = false;
                for (const user of data) {
                    if (user.email === email) {
                        if (user.password === password) {
                            if (user.isLogin) {
                                res.writeHead(403);
                                res.end("User already logged in");
                                return;
                            }

                            user.isLogin = isLogin;
                            userFound = true;

                            writeFile(
                                JSON.stringify(data, null, 2),
                                res,
                                "Login process completed",
                                "Error writing to data file:"
                            );
                            return;
                        } else {
                            res.writeHead(406);
                            res.end("Wrong password");
                            return;
                        }
                    }
                }
                if (!userFound) {
                    res.writeHead(401);
                    res.end("User is not registered");
                }
            } catch (error) {
                res.writeHead(400);
                res.end("Invalid JSON data");
            }
        });
    } else if (method === "POST" && pathname === "/api/user/logout") {
        let body = [];

        req.on("data", (chunk) => {
            body.push(chunk);
        }).on("end", () => {
            body = Buffer.concat(body).toString();
            try {
                const { email } = JSON.parse(body);

                if (!email) {
                    res.writeHead(400);
                    res.end("Invalid data");
                    return;
                }

                let userFound = false;
                for (const user of data) {
                    if (user.email === email) {
                        if (user.isLogin === false) {
                            res.writeHead(403);
                            res.end("User already logged out in");
                            return;
                        }

                        user.isLogin = false;
                        userFound = true;

                        writeFile(
                            JSON.stringify(data, null, 2),
                            res,
                            "Logout process completed",
                            "Error writing to data file:"
                        );
                        return;
                    }
                }
                if (userFound) {
                    res.writeHead(401);
                    res.end("User is not registered");
                }
            } catch (error) {
                res.writeHead(400);
                res.end("Invalid JSON data");
            }
        });
    } else if (method === "PATCH" && pathname === "/api/users") {
        const { id } = query;

        if (id) {
            let body = [];

            req.on("data", (chunk) => {
                body.push(chunk);
            }).on("end", () => {
                body = Buffer.concat(body).toString();

                console.log(body);

                try {
                    const { isLogin } = JSON.parse(body);

                    const itemIndex = data.findIndex((el) => el.id === id);

                    if (itemIndex !== -1) {
                        if (isLogin !== undefined) {
                            data[itemIndex].isLogin = isLogin;
                        }

                        writeFile(
                            JSON.stringify(data, null, 2),
                            res,
                            JSON.stringify(data[itemIndex]),
                            "Error writing to data file:"
                        );

                        return;
                    }
                } catch (error) {
                    res.writeHead(400);
                    res.end("Invalid JSON data");
                }
            });
        } else {
            res.writeHead(329);
            res.end("No id param");
        }
    } else if (method === "DELETE" && pathname === "/api/users") {
        const { id } = query;

        if (id) {
            try {
                if (findIndex(data, id)) {
                    writeFile(
                        JSON.stringify(data, null, 2),
                        res,
                        "Data written to file successfully",
                        "Data file cleared successfully"
                    );

                    return;
                }
            } catch (error) {
                res.writeHead(404);
                res.end("Item not found");
            }
        } else {
            res.writeHead(329);
            res.end("No id param");
        }
    }
});

authServer.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});
