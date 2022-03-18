

setInterval(function () {
    var timeDisplay = moment();
    $('#currentDay').text(timeDisplay.format("MMM Do YYYY"));
    
}, 1000);