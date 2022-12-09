const EventEmitter = require('./events');

const event = new EventEmitter();

event.on('play',(data)=>{
    console.log('I am playing',data);
})

event.on('play',()=>{
    console.log('I am playing 2');
})

event.on('singing',(data1 , data2)=>{
    console.log('I am singing 1' , data1 , data2);
})

event.once("addAuthorTitle", (author, title) => {
    console.log("Added Author and Title " + author + " - " + title);
});

event.emit('play', 'football');

event.emit('singing', 'english', 'hindi');

event.emit("addAuthorTitle", 'xx', 'yy');
event.emit("addAuthorTitle", 'zz', 'tt');