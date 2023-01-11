const {
    log
} = require("node:console");
const fs = require("node:fs/promises");

(async () => {

    const fileHandleRead = await fs.open("test.txt", "r");

    const fileHandleWrite = await fs.open("dest.txt", "w");

    const streamRead = fileHandleRead.createReadStream({
        highWaterMark: 64 * 1024
    });

    const streamWrite = fileHandleWrite.createWriteStream();
    streamRead.on("data", (chunk) => {

        const numbers =chunk.toString("utf-8").split("  ");

        if(Number(numbers[numbers.length-2]+1)!==Number(numbers[numbers.length-1])){

        }
        //streamWrite.write(chunk);
        if (!streamWrite.write(chunk)) {
            streamRead.pause();
        }
        // console.log(chunk);
    })

    streamWrite.on("drain", () => {
        streamRead.resume();
    })

    //high read speed than write high backpressure


})();