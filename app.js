const express = require('express')
const bodyparser = require('body-parser')
const socket = require('socket.io')
const http = require('http')
const path = require('path')

const app = express()
const server = http.createServer(app)
const io = socket(server) //creating socketIo and bind it to our server

const calc = require('./controllers/calc')

//static path join
app.use(express.static(path.join(__dirname,'public')))


//namespaces driver
const drivernsp = io.of('/driver')
const activeDrivers = new Map()
let usermap = new Map()

drivernsp.on('connect',socket=>{
    freedrivers = activeDrivers;
    //registering the drivers tracking into the map
    socket.on('registerdriver',pos=>{
        // console.log(pos)
        activeDrivers.set(socket.id,{lat:null,lng:null})
        if(activeDrivers.has(socket.id)){
            activeDrivers.set(socket.id,pos)
        }   
    })

    socket.on('userlocation',(pos)=>{
        //console.log(pos)
        usermap.set(123,{lat:null,lng:null})
        if(usermap.has(123)){
            usermap.set(123,pos)
        }
    })
    
    socket.on('testdriver',()=>{
        console.log('test succesful')
    })
    socket.on('checkavailability',()=>{
        socket.join('username');
        socket.to('username').emit('test')
        io.of('/driver').emit('ee',{room : 'username'});
        console.log('test2 initiated')
        
    })
    // socket.emit('ee',activeDrivers);
    socket.on('update',(room)=>{
        console.log('test 3 successfull')
        // console.log(''+room.room)
        socket.join(''+room.room);
        //socket.emit('start',room.room)
        io.of('/driver').to(''+room.room).emit('start',room.room)
    })

    
    socket.on('go',(room)=>{
        //console.log(activeDrivers.get(socket.id))
        //console.log(room)
        const pos = new Map()
        pos.set(socket.id,{lat:null,lng:null})
        if(pos.has(socket.id)){
            pos.set(socket.id,activeDrivers.get(socket.id))
        }
        pos.set(12,usermap.get(123))
        //console.log(Array.from(pos))
        io.of('/driver').to(''+room.room).emit('location',Array.from(pos))
    })

    socket.on('disconnect',()=>{
        activeDrivers.delete(socket.id);
    })
})

server.listen(3000,err=>{
    if(err){
        throw err;
    }
    console.log('Server started at port 3000')
})