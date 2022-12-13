const dgram = require('dgram');

const socket = dgram.createSocket("udp4");

socket.bind(5500, "127.0.0.1");

socket.on('message', (msg, info) => {
    console.log("my server got a datagram ", msg.toString(), " from ", info.address, " ", info.port)
})

//ncat -u 127.0.0.1 5500