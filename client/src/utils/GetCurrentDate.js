
function GetCurrentDate(separator='') {
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

    let newDate = new Date()
    let day = weekday[newDate.getDay()];
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();

    return `${day} - ${month}/${date}/${year}`
}

export default GetCurrentDate