/* eslint-disable no-undef */

const express= require("express")
const app =express()
const http=require("http")
const cors=require("cors")
const {Server}=require("socket.io")
const server=http.createServer(app)

const io=new Server(server,{ cors:{origin:"*"}});
app.use(cors())

let onlineusers=[];
const port=8080

io.on("connection",(socket)=>{

    socket.on('Emit',(data)=>{

        if(onlineusers.includes(data)===false){
            onlineusers.push(data)
        }

        
        socket.on("disconnect",()=>{
            onlineusers=onlineusers.filter(a=>a!==data)
            io.emit("Emit",onlineusers);
        })

        io.emit("Emit",onlineusers);
    })

    socket.on('logout',(data)=>{
        onlineusers=onlineusers.filter(a=>a!==data)
        io.emit('logout',onlineusers)
    })

    socket.on("chat",(data)=>{
        io.emit("chat",data)
    })

    socket.on("groupchat",(data)=>{
        io.emit("groupchat",data)
    })

})

server.listen(port,()=>{console.log(`server started:${port}`)})
