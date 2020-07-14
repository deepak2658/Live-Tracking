let map;

var markers = new Map();
document.addEventListener('DOMContentLoaded',()=>{
    const socket = io('/driver'); //conecting socket to root directory file
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
        });

                 //google map syntax
         
    });
    
    // setInterval(() => {

    //     socket.emit('request-location');                 // it is event by socket.io named request-location
        
    // }, 5000);

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
            zoom: 8
          });
           
    },err=>{
        console.error(err);
    },positionOptions);
    
  };





// let map;

// var markers = new Map();
// // let current_pos;
// // setInterval(()=>{
// //     navigator.geolocation.getCurrentPosition(pos=>{
// //         current_pos = {lat : pos.coords.latitude,log : pos.coords.longitude}
// //     })
// // },10000)
// document.addEventListener('DOMContentLoaded',()=>{
//     const socket = io('/driver')
//     document.getElementById("checknow").addEventListener("click",()=>{
//         socket.emit('checkavailability')
//     } );

//     socket.on('location',position=>{              //for marker
                
//         position.forEach(([id,position]) => {
//             const marker = new google.maps.Marker({                   //takes two argument  location( lat and lng) and map    
//                 position,
//                 map,
//                 title: id
//             });
//             if(markers.has(id)){
//                 const tempmarker = markers.get(id);
//                 tempmarker.setMap(null);
//                 markers.delete(id);
//             }
            
//             markers.set(id,marker);                  
//         });
//     });

//         const positionOptions = {
//     enableHighAccuracy: true,
//     maximumAge : 0
//         };

//         function initMap() {
//     navigator.geolocation.getCurrentPosition(pos=>{
//         const  {latitude : lat , longitude : lng} = pos.coords;
//             map = new google.maps.Map(document.getElementById('map'), {
//             center: {lat, lng},
//             zoom: 14
//           });
           
//     },err=>{
//         console.error(err);
//     },positionOptions);
    
// };
// });
//     // socket.on('test',()=>{
//     //     console.log('is this ok')
//     // })
    
