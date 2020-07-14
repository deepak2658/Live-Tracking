let map;

var markers = new Map();

document.addEventListener('DOMContentLoaded',()=>{
    
    const socket = io('/driver') //conecting socket to root directory file
    
    const positionOptions = {
        enableHighAccuracy: true,
        maximumAge : 0
    }


    socket.on('ee',(room)=>{
        //console.log(map);
        // alert('some response')
        if (confirm("Incomming passenger wanna accept ride")) {
            socket.emit('update',room)
        } else {
        }
    })

    socket.on('start',(room)=>{
        console.log(room)
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
    
    socket.on('location',position=>{              //for marker
        console.log(position);
        position.forEach(([id,position]) => {
            const marker = new google.maps.Marker({                   //takes two argument  location( lat and lng) and map    
                position,
                map,
                title: id
            });
            if(markers.has(id)){
                const tempmarker = markers.get(id);
                tempmarker.setMap(null);
                markers.delete(id);
            }
            
            markers.set(id,marker);                  
        });            //google map syntax
    });
});

const positionOptions = {
    enableHighAccuracy: true,
    maximumAge : 0
};

function initMap() {
    navigator.geolocation.getCurrentPosition(pos=>{
        const  {latitude : lat , longitude : lng} = pos.coords;
        console.log(lat,lng);
            map = new google.maps.Map(document.getElementById('map'), {
            center: {lat, lng},
            zoom: 15
          });
           
    },err=>{
        console.error(err);
    },positionOptions);
    
  };

