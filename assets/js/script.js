$(function() {
    // generate time blocks dynamically
    generateBlocks();
    // set current day to element
    $('#currentDay').html(moment().format('LLLL'))
});

// working hours in an array
var hours = ['9AM', '10AM', '11AM', '12PM', '1PM', '2PM', '3PM', '4PM', '5PM'];
// events object
var events = {}

// generate time blocks function
generateBlocks = function() {
    // get events stored in localstorage
    var getevents = localStorage.getItem('events')
    if (getevents != null) {
        // set localstorage events to events object
        events = JSON.parse(getevents)
    }
    // iterate over working hours
    for (let i = 0; i < hours.length; i++) {
        // get current hour
        var current_hour = moment().format('ha')

        // genearting dynamic html for time blocks
        // main row div
        let div = $('<div></div>').addClass('row s_row');

        //append time block div to main div
        div.append($('<div></div>').addClass('col bg-light s_column')
            .append($('<div></div>').addClass('time-block').text(hours[i])));

        // check if events from localstorage has key hours. And get the value if exist. eg. find hour key from object {5pm: "event discription"}
        var event_txt = events.hasOwnProperty(hours[i]) ? events[hours[i]] : '';

        // set value as event_txt in textarea if exist in localstorage
        var event_div = $('<div></div>').addClass('col-8 s_desc ')
            .append($('<textarea>' + event_txt + '</textarea>').attr({
                'id': i
            }));

        // hour from loop
        var hour = hours[i];
        // compare current hour with working hour and add class present
        if (current_hour == hour.toLowerCase()) {
            event_div.addClass('present')
        }
        // compare current hour using moment isAfter function to check past hour
        else if (moment().isAfter(moment(hour.toLowerCase(), 'ha'))) {
            event_div.addClass('past')
        }
        // else its future hour
        else {
            event_div.addClass('future')
        }
        // append event div to main row div
        div.append(event_div);
        div.append($('<div></div>').addClass('col saveBlock')
            .append($('<div></div>').addClass('saveBtn')
                .append($('<i></i>').addClass('fa fa-save').attr({
                    onclick: 'saveEvent(' + i + ')'
                }))));

        // append all rows div to container div
        $('.container').append(div);
    }
}

// function to save events to localstorage
saveEvent = function(i) {
    // extract event description from textarea using id
    var event_txt = $('#' + i).val();
    // get event hour from index
    hour = hours[i];
    // set event description to hour key
    events[hour] = event_txt;
    // save event object to localstorage
    localStorage.setItem('events', JSON.stringify(events));

}