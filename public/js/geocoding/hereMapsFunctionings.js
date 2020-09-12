    //on click event on the map 
    const ClickTOMark = ()=> {
        map.addEventListener('tap',(evt)=>{
            let pointer = evt.currentPointer
            let pointerPosition =  map.screenToGeo(pointer.viewportX,pointer.viewportY)
            console.log(pointerPosition)
            let pointerMarker = new H.map.Marker(pointerPosition)
            pointer.setData("im here")
            map.addObject(pointerMarker)
            
        })
    }
    ClickTOMark();

    //Ading a circle to a marker at its center
    // All inside an map event listner as above
    const circle = new H.map.Circle(ev.target.getGeometry(),10000);
    map.addObject(circle);
    behaviour.enable();

    //