
    const socket = io('/user');
     
    const positionOptions = {
        enableHighAccuracy: true,
        maximumAge : 0
    }

    setInterval(()=>{
        navigator.geolocation.getCurrentPosition(pos=>{
            const {latitude:lat,longitude:lng} = pos.coords
            socket.emit('registeruser',{lat,lng})
        },
        err=>{
            console.error(err)
        },positionOptions)
    },10000)

    

 

