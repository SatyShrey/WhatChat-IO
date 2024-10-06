

import { Server } from "socket.io";
import { createServer } from "http";
import dotevn from "dotenv"
dotevn.config()
const httpServer=createServer();
const io=new Server(httpServer,{ cors:{origin:"*"}});

let onlineusers=[];
const port=process.env.port

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

httpServer.listen(port,()=>{console.log(`server started:${port}`)})
