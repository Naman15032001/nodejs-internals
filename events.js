class EvenEmitter {

    masterObj = {};

    // {eventName : [fn1 , fn2 ,fn2 ] , eventName2 : [fn1 , fn2 ]}

    on(eventName, cbfn) {

        this.masterObj[eventName] = this.masterObj[eventName] || [];

        this.masterObj[eventName].push(cbfn);

        //console.log(this.masterObj);
    }

    emit(eventName, ...args) {

        const functionsArray = this.masterObj[eventName] || [];

        //console.log(functionsArray);

        functionsArray.forEach(cbfn => cbfn(...args));
    }

    once(eventName, cbfn) {
        this.masterObj[eventName] = this.masterObj[eventName] || [];
        const onceWrapper = () => {
            cbfn();
            this.removeAllListeners(eventName, onceWrapper);
        }
        this.masterObj[eventName].push(onceWrapper);
        console.log(this.masterObj);
    }

    removeAllListeners(eventName, cbfn) {
        let list = this.masterObj[eventName];
        if (!list) return;
        for (let i = 0; i <= list.length; i++) {
            //console.log(list[i].toString(), cbfn.toString());
            if (list[i].toString() === cbfn.toString()) {
                list.splice(i, 1);
                break;
            }
        }
    }

}

module.exports = EvenEmitter;

