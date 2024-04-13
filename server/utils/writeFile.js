const   fs = require("fs"),
        chalk = require("chalk");

function writeFile(data, res, consoleMessage, resEnd){
    fs.writeFile("./data.json", data, (err) => {
        if (err) {
            console.error(
                chalk.bgRedBright(resEnd),
                chalk.red(err)
            );

            res.writeHead(500);
            res.end("Internal Server Error");
        } else {
            console.log(
                chalk.bgGreenBright(consoleMessage)
            );

            res.writeHead(200);
            res.end(consoleMessage);
        }
    });
}

module.exports = writeFile;