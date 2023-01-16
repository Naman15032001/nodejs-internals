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

    let split = '';
    streamRead.on("data", (chunk) => {

        const numbers = chunk.toString("utf-8").split("  ");

        if (Number(numbers[0]) !== Number(numbers[1]) - 1) {
            if (split) {
                numbers[0] = (split.trim()) + (numbers[0].trim());
            }
        }

        if (Number(numbers[numbers.length - 2] + 1) !== Number(numbers[numbers.length - 1])) {
            split = numbers.pop();
        }



        //console.log(numbers);

        numbers.forEach((number) => {
            let n = Number(number);

            if (n % 2 === 0) {
                if (!streamWrite.write(" " + n + " ")) {
                    streamRead.pause();
                }
            }
        })
        //streamWrite.write(chunk);
        // if (!streamWrite.write(chunk)) {
        //     streamRead.pause();
        // }
        // console.log(chunk);
    })

    streamWrite.on("drain", () => {
        streamRead.resume();
    })

    //high read speed than write high backpressure


})();