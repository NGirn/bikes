$(function () {
    $('[data-toggle="popover"]').popover()
});

function renderWeather(data) {
    console.log(data);
    var percentage = (data.current.temp_c/40)*100;
    
    var colorClass = "progress-bar-warning";
    if (percentage < 15) {
        colorClass = "progress-bar-info";
    }
    else if (percentage > 60) {
        colorClass = "progress-bar-danger";
    }
    
    $("#temperature").css('width', `${percentage}%`).html(`Temp is: ${data.current.temp_c} &deg;`).addClass(colorClass);
}

function navsFunction(bikeClassName) {
    jQuery.getJSON("/bikes.json", function (data) {
        var dataToRender = [];
        // build up only the bikes we want rendered
        for (var row in data.items) {
            if (bikeClassName === 'all') {
                dataToRender.push(data.items[row]);
            }
            else { // only render the specific class
                if (data.items[row].class.includes(bikeClassName)) {
                    dataToRender.push(data.items[row]);
                }
            }
        }
        // now render our data
        renderBikes(dataToRender, bikeClassName);
    });
}

/**
 * Render our bikes
 */
function renderBikes(rawData, bikeClassName) {
    // blank out the div element
    $("#BikeContainer").html('<p></p>');
    $("#BikeContainerName").html('<p></p>');
    $("#BikeContainerImage").html('<p></p>');
    $("#BikeContainerDescription").html('<p></p>');
    $("#BikeContainerClass").html('<p></p>');


    for (var row in rawData) {
        jQuery("#BikeContainer").append(`<div>${rawData[row].name}</div>`);
        jQuery("#BikeContainer").append(`<img src='${rawData[row].image.thumb}'/>`);
        jQuery("#BikeContainer").append(`<div>${rawData[row].description}</div>`);
        jQuery("#BikeContainer").append(`<div>Class: ${bikeClassName}</div>`);
        jQuery("#BikeContainer").append(`<p>---------------------------------------------------------------------------------------------------------------------------------------</p>`);
        jQuery("#BikeContainer").append(`<br>`);
    }

}

// this will run automatically when the page is ready
$(window).ready(function () {
    jQuery.getJSON("http://api.apixu.com/v1/current.json?key=a98f4c2b75324c05b1f141842191804&q=Anchorage", function (data) {
        renderWeather(data);
    });
});