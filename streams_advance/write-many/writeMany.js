//const fs = require('node:fs/promises');

//it takes 55 secs to run 100% cpu memory usage 50mb
// (async () => {

//     console.time("writeMany");

//     const fileHandle = await fs.open("test.txt", "w");

//     for (let i = 0; i < 1000000; i++) {
//         await fileHandle.write(` ${i} `);
//     }

//     console.timeEnd("writeMany");

// })()
//const fs = require('fs');

//3 secs 

//cpu 100%

//high memory usage 700 mb more cb

//30mb writeFileSync 
//50mb



// (async () => {

//     console.time("writeMany");

//     fs.open("test.txt", "w", (err, fd) => {


//         for (let i = 0; i < 1000000; i++) {
//             const buff = Buffer.from(` ${i} `, 'utf-8')
//             //fs.writeSync(fd, ` ${i} `);
//             //fs.write(fd, ` ${i} `,()=>{}) //not in order 
//             fs.writeSync(fd, buff); // slow 8 secs
//         }

//         console.timeEnd("writeMany");
//     });



// })()

// const fs = require('node:fs/promises');

//dont do it this way

//cpu usuage 100%

//682.085ms  // memory -154 mb 200mb
// (async () => {

//     console.time("writeMany");

//     const fileHandle = await fs.open("test.txt", "w");

//     const stream = fileHandle.createWriteStream()

//     for (let i = 0; i < 1000000; i++) {
//         const buff = Buffer.from(` ${i} `, 'utf-8')
//         stream.write(buff);
//     }

//     console.timeEnd("writeMany");

// })()

const fs = require('node:fs/promises');


(async () => {

    console.time("writeMany");

    const fileHandle = await fs.open("test.txt", "w");

    const stream = fileHandle.createWriteStream()

    // console.log(stream.writableHighWaterMark);

    /*console.log(stream.writableLength);

    const buff = Buffer.from("string");

    stream.write(buff);
    stream.write(buff);

    console.log(buff);

    console.log(stream.writableLength);*/

    //const buff = Buffer.alloc(16384,10); //number fill 10

    //console.log(buff);

    // const buff = Buffer.alloc(16383, "a")


    // console.log(stream.write(buff));
    // console.log(stream.write(Buffer.alloc(1, "a")));

    // stream.on("drain", () => {
    //     console.log('safe to write more');
    //     console.log(stream.write(Buffer.alloc(1, "a")));
    //     console.log(stream.writableLength);
    // })

    let i = 0;

    const numberofWrites = 10000000
    const writeMany = () => {
        while (i < numberofWrites) {
            const buff = Buffer.from(` ${i} `, 'utf-8');

            if(i===numberofWrites-1){
                return stream.end(buff)
            }

            if (!stream.write(buff)) {
                break;
            }

            i++;
        }
    }

    writeMany();

    stream.on("drain", () => {
        writeMany();
    })

    stream.on("finish",()=>{
        console.timeEnd("writeMany");
        fileHandle.close();
    })

    //backpressure

})()

//50 mbs 