"use client"

import axios from "axios"
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function JoinButton(){
    const {data : session} = useSession();
    const router = useRouter();

    const newCollab = async() =>{
        axios.post(`${process.env.BASE}/api/collab`,{
            user : session?.user
        }).then((res)=>{
            if (res.data.url){
                router.push(res.data.url);
            }
        }).catch(err=>{
            console.log(err);
        })
    }


    return (
        <div>
        <button className="button button-white" onClick={newCollab}>New Collab</button>
        <button onClick={async()=>signOut({redirect : false})}>Logout</button>
        </div>
    )
}