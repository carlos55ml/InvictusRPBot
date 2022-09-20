function getDate() {
    let ts = Date.now();
    let date_ob = new Date(ts);
    let day = date_ob.getDate();
    let month = date_ob.getMonth()+1;
    let year = date_ob.getFullYear();
    let hour = date_ob.getHours();
    let minute = date_ob.getMinutes();
    let seconds = date_ob.getSeconds();
    let string = `[${year}/${month}/${day}|${hour}:${minute}:${seconds}]`
    return string
}

module.exports = {
    debug(message) {
        var date = getDate()
        console.log(`${date}[DEBUG]: ${message}`)
    },
    warn(message) {
        var date = getDate()
        console.log(`${date}[WARN]: ${message}`)
    },
    log(message) {
        var date = getDate()
        console.log(`${date}[LOG]: ${message}`)
    },
    error(message) {
        var date = getDate()
        console.log(`${date}[ERROR]: ${message}`)
    }
}