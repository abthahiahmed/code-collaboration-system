const { Server } = require("socket.io");

module.exports = CollabSocket = (httpServer) =>{
    const io = new Server(httpServer);

    io.on("connection", (socket) => {
        let users = [];
        socket.on('joinRoom', async (roomId, user) =>{
            
            socket.join(roomId);
            console.log(`${roomId} New user : `, user);
            users.push(user);
            socket.to(roomId).emitWithAck('newMemberJoined', users);
            socket.on('refreshMembers', ()=>{
                socket.to(roomId).emit('membersUpdate', users);
            })

            socket.on('code', (data)=>{
                socket.to(roomId).emit('code', data);
            });
            socket.on('cursor', (data)=>{
                socket.to(roomId).emit('cursor', data);
            });
            socket.on('scroll', (data)=>{
                socket.to(roomId).emit('scroll', data);
            });

            socket.on('file', (files)=>{
                socket.to(roomId).emit('file', files);
            });

            socket.on('disconnect', (user)=>{
                console.log(user);
            })

        });
    });
}