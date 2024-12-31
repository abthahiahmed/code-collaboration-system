"use client"
import { socketOnMemberUpdate, socketOnNewMemberJoined, socketOnRecvCode, socketOnRecvCursor, socketOnRecvScroll, socketRefreshMembers } from "@/lib/socket.connect";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Cursors(){
    const {data: session} = useSession();
    const members = useSelector(state=>state.members.value);
    const [cursor, setCursor] = useState({});
    const [otherActiveFile, setOtherActiveFile] = useState(-1);

    const scroll = useSelector((state)=>state.editor.scroll);

    const calculateCursorPos = (x) =>{
        // if (x == 1) return 0;
        // if (x == 2) return 7;
        // if (x % 2 != 0) return 8;
        // else return 9; 
        return 8.333333334;
    }

    useEffect(()=>{
        // socketOnNewMemberJoined((users)=>{
        //     setData(users);
        //     socketRefreshMembers();
        //     console.log(users);
        // });

        // socketOnMemberUpdate((users)=>{
        //     setData(users);
        // });
        let statusTimeout = null;
        socketOnRecvCursor((data)=>{
            console.log(data);
            if (session?.user.id != data.userId){
                if (statusTimeout) clearTimeout(statusTimeout);
                setCursor({userId : data.userId, x : data.x, y : data.y, lines : data.totalLine, status : 'Moving...'});
                statusTimeout = setTimeout(() => {
                    setCursor({});
                }, 1000); 
            }
        });

        // socketOnRecvScroll((data)=>{
        //     // console.log(data);
        //     // setScroll({
        //     //     userId : data.userId,
        //     //     x : data.x,
        //     //     y : data.y,
        //     // });
        // });
        

    }, []);

    return members.map(item=>(
        <div className='inline-block w-[2px] h-[19px] bg-blue-500 absolute z-[2]' key={1} style={
            item.id === cursor.userId ? {
                top : `${((cursor.y - 1) * 19) - scroll.y}px`,
                left : `${62 + ((cursor.x) * calculateCursorPos(cursor.x - 1)) - scroll.x}px`
            } : {}
        }> 
        <div className="bg-gray-50 p-1 py-0.5 rounded-sm text-sm absolute top-[19px] w-auto">
            <div className="flex items-center gap-2 w-16">
                <Image src={item.profile} width={16} height={16} alt={item.name} className="rounded-full"/> 
                <span className="truncate">{item.name.split(' ')[0]}</span>
            </div>
        </div>
        </div>
    ));
}