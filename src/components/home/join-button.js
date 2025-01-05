"use client"

import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios"
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function JoinButton(){
    const {data : session} = useSession();
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const newCollab = async() =>{
        setLoading(true);
        axios.post(`${process.env.BASE}/api/collab`,{
            user : session?.user
        }).then((res)=>{
            setLoading(false);
            if (res.data.url){
                localStorage.setItem('host', session?.user.id);
                router.push(res.data.url);
            }
        }).catch(err=>{
            console.log(err);
        })
    }


    return (
        <div>
        <button className="button button-white disabled:opacity-75" onClick={newCollab} disabled={loading}>{loading && <FontAwesomeIcon icon={faCircleNotch} spin className="me-2"/>}New Collab</button>
        <button onClick={async()=>signOut({redirect : false})}>Logout</button>
        </div>
    )
}