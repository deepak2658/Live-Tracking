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
    map.addObject(circleMade)
    const geometry = circleMade.getGeometry()
    const wkt = geometry.toString()
    console.log(wkt)
})