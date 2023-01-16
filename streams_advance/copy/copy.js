const {
    time
} = require('node:console');
const fs = require('node:fs/promises');

// (async () => {

//     const destFile = await fs.open("test-copy.txt", "w");

//     const result = await fs.readFile("test.txt");

//     console.log(result);

//     await destFile.write(result)



// })();

(async () => {


    console.time("copy");

    const destFile = await fs.open("test-copy.txt", "w");
    const srcFile = await fs.open("test.txt", "r");

    //console.log(await srcFile.read());

    //const readResult = await srcFile.read();

    let bytesRead = -1;

    while (bytesRead !== 0) {
        const readResult = await srcFile.read();
        bytesRead = readResult.bytesRead;

        if (bytesRead != 16384) {
            const indexOfNotFilled = readResult.buffer.indexOf(0);
            const newBuffer = Buffer.alloc(indexOfNotFilled);
            readResult.buffer.copy(newBuffer, 0, 0, indexOfNotFilled);
            destFile.write(newBuffer);
        }else{
            destFile.write(readResult.buffer)
        }
 
    }

    console.timeEnd("copy");

    //await destFile.write(result)

})();