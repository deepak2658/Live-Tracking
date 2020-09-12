
// const { default: Axios } = require("axios")


// Here maps credientials
const platform = new H.service.Platform({
    'apikey': hereCredits.JSKEY
})

const defaultLayers = platform.createDefaultLayers()

    //Config. Maps
      

//Maps code
navigator.geolocation.getCurrentPosition(pos=>{

    let myPosition = {lat: pos.coords.latitude ,lng: pos.coords.longitude }    
    
    const map = new H.Map(
      document.getElementById('mapContainer'),
      defaultLayers.vector.normal.map,
      {
      zoom: 13,
      center: myPosition
      }
  )

 
    //Adding Behaviours to Maps
    const ui = H.ui.UI.createDefault(map, defaultLayers)
    const mapEvents = new H.mapevents.MapEvents(map)
    const behavior = new H.mapevents.Behavior(mapEvents)  
   
    
    //defining geofencing
    document.getElementById('sendFence').addEventListener('click',()=>{
      const circleMade = new H.map.Circle(
          // The central point of the circle
          {lat:myPosition.lat, lng:myPosition.lng},
          // The radius of the circle in meters
          1000,
          {
            style: {
              strokeColor: 'rgba(55, 85, 170, 0.6)', // Color of the perimeter
              lineWidth: 2,
              fillColor: 'rgba(0, 128, 0, 0.7)'  // Color of the circle
            }
          }
        );
      
      //Adding Geofence to map  
      map.addObject(circleMade)
      const geometry = circleMade.getGeometry()
      const wkt = geometry.toString()
      console.log(wkt)

      //some socket emits for geofence and checking availability
      // socket.emit('geofenceSent',wkt)
      socket.emit('checkavailability')

      //sending my geofence
      const zip = new JSZip();
      zip.file("UserId.wkt","NAME\tWKT\n"+"FenceUserId"+"\t"+wkt);
      zip.generateAsync({type: "blob"}).then(content=>{
        var formData = new FormData();
        
        formData.append("zipfile",content)
        axios.post("https://fleet.ls.hereapi.com/2/layers/upload.json",formData,{
          headers : {
            "content-type":"multipart/form-data"
          },
          params:{
            "apiKey":"HpRr_ULw6rTc1ebsmyUSHxy7oEQApEQTMeK1tN6OiW8",
            "layer_id":"User_id_112"   //User id the user id from the cookie
          }
        })
      }).then(res=>console.log(res),err=>{console.log(err)})
    },err=>{console.log(err)})

    
    geofencing = platform.getGeofencingService();


    map.getViewModel().setLookAtData({
        tilt : 20,
        heading : 180
    })

    socket.on('location',position=>{              //for marker
      console.log(position);
      position.forEach(([id,position]) => {
        let marker = new H.map.Marker(myPosition)
        marker.setData("User location")
        map.addObject(marker)                 
      });  
      var router = platform.getRoutingService(null,8);

      var routingParameters = {
          transportMode : "car",
          routingMode: 'fast',
          origin:""+position.lat+","+position.log,
          destination :myPosition.lat+","+myPosition.lng,
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
  });
    //Adding marker to the page
    

    //this is the routing code
   

})


