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
    }
});

authServer.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});
