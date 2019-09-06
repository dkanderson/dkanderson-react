const timeStamp = function() {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        d = new Date();

        return months[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear() + ' ' + d.toLocaleTimeString();

}

export default timeStamp;