var currentMonth = document.getElementById('month');
var d = new Date();
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
currentMonth.innerHTML = `${months[d.getMonth()]}  ${d.getFullYear()}`;