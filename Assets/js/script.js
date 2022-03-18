var timeBlockEl = $('.timeblock');
var buttonEl = $('.btn');

// Sets date at the the jumbotron
setInterval(function () {
    var timeDisplay = moment();
    $('#currentDay').text(timeDisplay.format("dddd, MMMM Do YYYY"));
    
}, 1000);

// sets background colour of the timeblocks depending on the current time
function checkTimeBlock() {
    var timeBlockChildren = timeBlockEl.children();
    var blockCount = timeBlockChildren.length;
    
    var currentHour = moment().format('MM-DD-YYYY h:mm A');
    var timeBlock = '';

    for (var i = 0; i < blockCount; i++) {
        //get first part if the textarea's id (e.g for id=9AM-time-slot, it will get 9AM)
        timeBlock = $(".timeblock div textarea").eq(i)[0];
        timeBlock = timeBlock.id.slice(0, timeBlock.id.indexOf('-'));
        timeBlock = moment().format('MM-DD-YYYY')+' '+moment(timeBlock,'hA').format('h:mm A');
        timeBlock = checkTimeDiff(currentHour,timeBlock)
        if (timeBlock < 0) {
            // add class bg-success for timeblocks greater than current time
            $(".timeblock div textarea").eq(i).addClass('bg-success');
        } else if (timeBlock > 0) {
            // add class bg-secondary for timeblocks less than current time
            $(".timeblock div textarea").eq(i).addClass('bg-secondary');
        } else {
            // add class bg-danger for timeblocks equal to current time
            $(".timeblock div textarea").eq(i).addClass('bg-danger');
        }
    }
}

function checkTimeDiff(currentHour, timeBlock) {
    var timeDiff = 0;
    // get difference of timeblock time to the current time in hours
    var timeDiff = moment(currentHour).diff(timeBlock, 'hours');
    return timeDiff;
}


$(checkTimeBlock());