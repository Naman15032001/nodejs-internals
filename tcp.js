const net = require('net');


//fn called when tcp handshake success

const server = net.createServer(socket => {

    console.log(`tcp handshake success ${socket.remoteAddress}:${socket.remoteFamily}`);

    socket.write("Hello client");

    socket.on("data", data => {
        console.log(data.toString(), "recieved data");
    })
})

//ncat 127.0.0.1 8800

server.listen(8800, "127.0.0.1")