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

const fs = require('node:fs/promises');

//dont do it this way

//cpu usuage 100%

//682.085ms  // memory -154 mb
(async () => {

    console.time("writeMany");

    const fileHandle = await fs.open("test.txt", "w");

    const stream = fileHandle.createWriteStream()

    for (let i = 0; i < 1000000; i++) {
        const buff = Buffer.from(` ${i} `, 'utf-8')
        stream.write(buff);
    }

    console.timeEnd("writeMany");

})()



