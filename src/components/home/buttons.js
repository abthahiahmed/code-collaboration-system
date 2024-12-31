"use client"

import { useSession } from "next-auth/react"
import ContinueButton from "./continue-button"
import JoinButton from "./join-button";

export default function Buttons(){
    const {data: session, status} = useSession();
    return (
        <div className="text-center mb-6">
            {status === "unauthenticated" && <ContinueButton/>}
            {status === "authenticated" && <JoinButton/>}
        </div>
    )
}