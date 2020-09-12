document.addEventListener('DOMContentLoaded',()=>{
    
    const socket = io('/driver') //conecting socket to root directory file
    
    const positionOptions = {
        enableHighAccuracy: true,
        maximumAge : 0
    }


    socket.on('ee',(room)=>{
        console.log("test 2 successfull");
        // alert('some response')
        if (confirm("Incomming passenger wanna accept ride")) {
            console.log('test 3 initiated')
            socket.emit('update',room)
        } else {
        }
    })

    socket.on('start',(room)=>{
        console.log("testing 4 successfull")
        setInterval(()=>{
           socket.emit('go',{room : room})
        },10000)
    })
      
    setInterval(()=>{
        navigator.geolocation.getCurrentPosition(pos=>{
            const {latitude:lat,longitude:lng} = pos.coords
            socket.emit('registerdriver',{lat,lng})
        },
        err=>{
            console.error(err)
        },positionOptions)
    },10000)
    
    // socket.on('location',position=>{              //for marker
    //     console.log(position);
    //     position.forEach(([id,position]) => {
    //         const marker = new google.maps.Marker({                   //takes two argument  location( lat and lng) and map    
    //             position,
    //             map,
    //             title: id
    //         });
    //         if(markers.has(id)){
    //             const tempmarker = markers.get(id);
    //             tempmarker.setMap(null);
    //             markers.delete(id);
    //         }
            
    //         markers.set(id,marker);                  
    //     });            //google map syntax
    // });
});

const positionOptions = {
    enableHighAccuracy: true,
    maximumAge : 0
};