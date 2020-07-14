document.addEventListener('DOMContentLoaded',()=>{
    const socket = io('/'); //conecting socket to root directory file
    
    // const positionOptions = {
    //     enableHighAccuracy: true,
    //     maximumAge : 0
    // }
    setInterval(()=>{
        console.log("test")
        socket.emit('hello');
        socket.emit('test')
    },300)
    // socket.emit('ping',()=>{console.log("got pinged")})
})


