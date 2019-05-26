function random(item) {
    if (typeof (item) != 'string'){
        if (item.length) {
            return item[Math.floor(Math.random() * item.length)]
        }
        else {
            return Math.floor(Math.random() * item);
        }
    }
}

module.exports=random