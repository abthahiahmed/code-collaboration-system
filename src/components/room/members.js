"use client"
import { setMembers } from "@/lib/slices/members";
import { disconnectSocket, socket, socketOnMemberUpdate, socketOnNewMemberJoined, socketOnRecvCode, socketRefreshMembers, socketSendFiles } from "@/lib/socket.connect";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";

export default function Members(){
    const router = useRouter();
    
    const [typer, setTyper] = useState({});
    const dispatch = useDispatch();
    const files = useSelector(state=>state.files.value);
    const members = useSelector((state)=>state.members.value);

    const leaveCollab = () =>{
        disconnectSocket();
        socketRefreshMembers();
        router.replace('/');
    }

    useEffect(()=>{
        socketOnNewMemberJoined((users)=>{
            dispatch(setMembers(users));
            socketRefreshMembers();
        });

        socketOnMemberUpdate((users)=>{
            dispatch(setMembers(users));
            
        });
        let statusTimeout = null;
        socketOnRecvCode((data)=>{
            if (statusTimeout) clearTimeout(statusTimeout);
            setTyper({userId : data.userId, status : 'Editing...'});
            statusTimeout = setTimeout(() => {
                setTyper({});
            }, 1000); 
        });


        

    }, []);
    
    return (
        <div className="bg-zinc-900 rounded-md w-full p-3 h-full">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-white">Members</h2>
                <button className="button-sm button-red" onClick={leaveCollab}><FontAwesomeIcon icon={faPowerOff}/></button>
            </div>
            
            <div className="flex flex-col text-white gap-2">
                {
                members.map((item, i)=>(
                    <div key={i} className="p-3 bg-zinc-700 rounded-md flex justify-between items-center text-sm gap-3">
                        <div>
                            <Image src={item.profile} alt={item.name} width={32} height={32} className="rounded-full"/>
                        </div>
                        <div className="grow">
                            <p className="mb-0">{item?.name || "Unknown"}</p>
                            
                        </div>
                        <div>
                        {item.id == typer?.userId &&<p className="text-xs bg-gray-800 px-1 py-0.5 rounded-md">{typer?.status}</p>}
                        </div>
                    </div>
                ))
                }
                {
                members.length == 0 && <p className="text-center text-sm text-gray-500">No Members!</p>
                }
            </div>
        </div>
    )
}