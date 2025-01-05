import { faMicrophone, faMicrophoneSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import Peer from "peerjs";
import { peer } from "@/lib/peer.connect";
import { socketOnRecvPeerId } from "@/lib/socket.connect";
export default function (){

    const [voiceOpen, setVoiceOpen] = useState(true);
    const [peerId, setPeerId] = useState("");
    const voiceRef = useRef(null);
    
    const mute = () =>{
        if (window.localStream){
            window.localStream.getAudioTracks().forEach(track => {
                track.enabled = false;
            });
        }
    }
    const unmute = () =>{
        if (window.localStream){
            window.localStream.getAudioTracks().forEach(track => {
                track.enabled = true;
            });
        }
    }

    const voiceToggle = () =>{
        if (voiceOpen){
            setVoiceOpen(false);
            mute();
        }else{
            setVoiceOpen(true);
            unmute();
        }
    }

    const recv = () =>{
        peer.on('call', (call)=>{
            
            var getUserMedia = navigator.getUserMedia 
            || navigator.webkitGetUserMedia 
            || navigator.mozGetUserMedia;
            
            getUserMedia({video : false, audio : true}, (mediaStream) =>{
                window.localStream = mediaStream;

                call.answer(voiceOpen ? mediaStream : null);
                call.on('stream', (remoteStream)=>{
                    voiceRef.current.srcObject = remoteStream;
                    voiceRef.current.play();
                    console.log("hello world");
                });
            });

            
        });

    }

    const call = (id) =>{
        var getUserMedia = navigator.getUserMedia 
        || navigator.webkitGetUserMedia 
        || navigator.mozGetUserMedia;

        getUserMedia({ video: false, audio: true }, (mediaStream) => {
            window.localStream = mediaStream;
            const call = peer.call(id, mediaStream)
            

            call.on('stream', (remoteStream) => {
                voiceRef.current.srcObject = remoteStream;
                voiceRef.current.play();
                console.log("hello world");
            });
        });
    }

    useEffect(()=>{
        

        peer.on('open', (id)=>{
            setPeerId(id);
            recv();
            socketOnRecvPeerId((id)=>{
                if (localStorage.getItem('host')){
                    
                }else{
                    console.log(id);
                    call(id);
                }

                
            });
        });
        


    }, [])

    return (
        <>
        <audio ref={voiceRef} ></audio>
        <button className="button button-blue absolute bottom-3 right-3" onClick={voiceToggle}>
            {voiceOpen ? <FontAwesomeIcon icon={faMicrophone}/> : <FontAwesomeIcon icon={faMicrophoneSlash}/>}
        </button>
        </>

    );
}