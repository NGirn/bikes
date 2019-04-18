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
        jQuery("#BikeContainer").append(`<div>${bikeClassName}</div>`);
    }

}