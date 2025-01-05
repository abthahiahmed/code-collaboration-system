"use client";

import { io } from "socket.io-client";


export const socket = io({
    // reconnection : false,
});

const connectSocket = () =>{
    if (!socket.connected)
        socket.connect();
}
const disconnectSocket = () =>{
    if (socket.connected)
        socket.disconnect();
}

const joinRoom = (user, roomId) =>{
    socket.emit('joinRoom', roomId, user);
}



const socketOnNewMemberJoined = (callback) =>{
    socket.on('newMemberJoined', callback);
}

const socketRefreshMembers = () =>{
    socket.emit('refreshMembers');
}
const socketOnMemberUpdate = (callback) =>{
    socket.on('membersUpdate', callback)
}

const socketLeave = (user) =>{
    socket.emit('leave', user);
}

const socketSendCode = (data) =>{
    socket.emit('code', data);
}
const socketOnRecvCode = (callback) =>{
    socket.on('code', callback);
}

const socketSendCursor = (data) =>{
    socket.emit('cursor', data);
}
const socketOnRecvCursor = (callback) =>{
    socket.on('cursor', callback);
}
const socketSendScroll = (data) =>{
    socket.emit('scroll', data);
}
const socketOnRecvScroll = (callback) =>{
    socket.on('scroll', callback);
}

const socketSendFiles = (files) => {
    socket.emit('file', files);
}
const socketOnRecvFiles = (callback) =>{
    socket.on('file', callback);
}

const socketSendPeerId = (id) =>{
    socket.emit('peerid', id);
}
const socketOnRecvPeerId = (callback) =>{
    socket.on('peerid', callback);
}

export {
    connectSocket,disconnectSocket,
    joinRoom, socketOnNewMemberJoined, 
    socketRefreshMembers, socketOnMemberUpdate, 
    socketSendCode, socketOnRecvCode, 
    socketSendFiles, socketOnRecvFiles,
    socketSendCursor, socketOnRecvCursor,
    socketSendScroll, socketOnRecvScroll,
    socketSendPeerId, socketOnRecvPeerId,
    socketLeave
};