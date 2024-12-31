"use client"

import { connectSocket, disconnectSocket, joinRoom } from "@/lib/socket.connect";
import { useSession } from "next-auth/react"
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import Files from "./files";

export default function Header(){
    const {data: session, status} = useSession();
    const {room} = useParams();

    useEffect(()=>{
        connectSocket();
        joinRoom(session?.user, room);


        return ()=>{
            disconnectSocket();
        }

    }, [session]);

    return (
        <div className="w-full bg-zinc-900 p-3">
            <div className="flex">
                <Files/>
                <div className="ms-auto flex items-center gap-2">
                    <Image src={session?.user?.profile} width={24} height={24} alt={session?.user?.name} className="rounded-full object-cover"/>
                    <label className="text-gray-200 text-sm">{session?.user?.name}</label>
                </div>
            </div>
        </div>
    )
}