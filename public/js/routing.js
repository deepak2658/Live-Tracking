var router = platform.getRoutingService(null,8);

var routingParameters = {
    transportMode : "car",
    origin:"52.4570007,13.3805351",
    destination :"52.5499468,13.3541977",
    return :"polyline"
};

router.calculateRoute(routingParameters,
    (result)=>{
        console.log(result)

        if (result.routes.length) {
            result.routes[0].sections.forEach((section) => {
                // Create a linestring to use as a point source for the route line
                let linestring = H.geo.LineString.fromFlexiblePolyline(section.polyline);
        
                // Create a polyline to display the route:
                let routeLine = new H.map.Polyline(linestring, {
                style: { strokeColor: 'blue', lineWidth: 3 }
                });
        
                // Create a marker for the start point:
                let startMarker = new H.map.Marker(section.departure.place.location);
        
                // Create a marker for the end point:
                let endMarker = new H.map.Marker(section.arrival.place.location);
        
                // Add the route polyline and the two markers to the map:
                map.addObjects([routeLine, startMarker, endMarker]);
        
                // Set the map's viewport to make the whole route visible:
                map.getViewModel().setLookAtData({bounds: routeLine.getBoundingBox()});
            });
        }
    },
    err=>console.error(err)
)