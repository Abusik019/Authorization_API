// Init frameworks
require("dotenv").config();

const http = require("http"),
    url_module = require("url"),
    { v4: uuidv4 } = require("uuid");

const { host, port } = process.env;

const data = require("./data.json");

const { writeFile } = require("./utils/index.js");

const authServer = http.createServer((req, res) => {
    const { method, url } = req,
        { pathname, query } = url_module.parse(url, true);

    if (method === "POST" && pathname === "/authorization") {
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
                    "Data file changed successfully"
                );
            } catch (error) {
                res.writeHead(400);
                res.end("Invalid JSON data");
            }
        });
    } else if (method === "PATCH" && pathname === "/login") {
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
                data.forEach((user) => {
                    if (user.email === email) {
                        if (user.password === password) {
                            user.isLogin = isLogin; 
                            userFound = true;
                            res.writeHead(200);
                            res.end("Login process completed");

                            writeFile(
                                JSON.stringify(data, null, 2),
                                res,
                                "Data file changed successfully",
                                "Data file changed successfully"
                            );
                            return; 
                        } else {
                            res.writeHead(406);
                            res.end("Wrong password");
                            return; 
                        }
                    } else{
                        res.writeHead(401)
                        res.end('User is not registered')
                    }
                });
            } catch (error) {
                res.writeHead(400);
                res.end("Invalid JSON data");
            }
        });
    }
});

authServer.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});
