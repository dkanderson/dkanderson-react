const formatDate = function(date) {
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        d = new Date(date);

        return {
            mm: months[d.getMonth()],
            dd: d.getDate().toString(),
            yy: d.getFullYear().toString()
        }

}

export default formatDate;