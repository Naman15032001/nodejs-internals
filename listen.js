const http = require("http");

const httpServer = http.createServer();

httpServer.on("listening", () => {
    console.log(`Listening on`, httpServer.address());
})

httpServer.on("request", (req, res) => {
    res.end("nam");
})

httpServer.listen();