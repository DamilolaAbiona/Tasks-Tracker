const currentDate = document.querySelector('.current-date')
const currentTime = document.querySelector('.current-time')
const now = new Date();
// Display Date


const getDate = () =>{
     let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
   const days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
   const day = days[now.getDay()]
   const date =now.getDate();
   const month = months[now.getMonth()]
   const year = now.getFullYear();
   return `${day}, ${date}, ${month}, ${year},`

}
currentDate.innerHTML = getDate(now);
// displayTime
const Display = () =>{
    const now = new Date();
    currentTime.innerHTML = now.toLocaleTimeString();
}
// Display(now)
setInterval(Display, 1000)
