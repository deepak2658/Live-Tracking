const express = require('express')
const bodyparser = require('body-parser')
const socket = require('socket.io')
const http = require('http')
const jszip = require('jszip')
const path = require('path')

const app = express()
const server = http.createServer(app)
const io = socket(server)

const routes = require('./routes/routes')
app.use(routes);

app.set('views engine','pug');
app.set('views','views');
app.use(express.static(path.join(__dirname,'public')))

const drivernsp = io.of('/driver')
const usernsp = io.of('/user')

//map to store user locations
const activeUsers = new Map()

//map to store driver locations
const activeDrivers = new Map()

//driver websockets under driver namespace
usernsp.on('connect', socket=>{
    console.log(socket.id)
    
    // registering to map
    socket.on('registeruser',pos=>{
        // console.log(pos)      // testing websocket
        activeUsers.set(123,{lat:null,lng:null})
        if(activeUsers.has(123)){
            activeUsers.set(123,pos)
        }   
    })

    socket.on('checkavailability',()=>{
        socket.join('username');
        socket.to('username').emit('test')
        io.of('/driver').emit('ee',{room : 'username'});
        console.log('test2 initiated')
        
    })

    socket.on('disconnect',()=>{
        activeUsers.delete(socket.id);
    })

   
})

//user websockets under user namespace
drivernsp.on('connect',socket=>{
    socket.on('registerdriver',pos=>{
        console.log(pos)
        activeDrivers.set(socket.id,{lat:null,lng:null})
        if(activeDrivers.has(socket.id)){
            activeDrivers.set(socket.id,pos)
        }   
    })

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
        pos.set(12,activeUsers.get(123))
        //console.log(Array.from(pos))
        io.of('/user').to(''+room.room).emit('location',Array.from(pos))
    })
    // socket.on('testdriver',()=>{
    //     console.log('test succesful')
    // })

    // socket.on('disconnect',()=>{
    //     activeDrivers.delete(socket.id);
    // })

})

server.listen(3000,err=>{
    if(err){
        throw err
    }
    console.log("Server started at port 3000")
})