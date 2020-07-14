document.addEventListener('DOMContentLoaded',()=>{
    const socket = io('/driver'); //conecting socket to root directory file
    
    const positionOptions = {
        enableHighAccuracy: true,
        maximumAge : 0
    };

    setInterval(() => {
        // console.log('location after 3 seconds');
        
        navigator.geolocation.getCurrentPosition(pos=>{
            const {latitude:lat,longitude:lng} = pos.coords;
            socket.emit('userlocation',{lat,lng});
        },
        
        err=>{
            console.error(err);
        },
        
        positionOptions);
    }, 1000);

    
});