import Peer from "peerjs";

export const peer = new Peer({
    host : 'localhost',
    port : "3001",
    path : '/',
});


export const peerOnOpen = (callback) =>{
    peer.on("open", (id)=>{
        callback(id);
    })
}