"use client"

import { useSession } from "next-auth/react"
import JoinButton from "../home/join-button";
import ContinueButton from "../home/continue-button";

export default function LoginCheck({children}){
    const {status} = useSession();

    if (status === 'unauthenticated') return (
        <div className="w-full">
            <div className="max-w-screen-xl mx-auto h-lvh grid place-content-center">
                <div className="bg-zinc-900 p-6 rounded-lg border border-gray-700">
                    <h1 className="text-2xl text-gray-200 mb-4">Login to continue</h1>
                    <p className="text-gray-400 mb-6">Please login to continue to the Collaboration room.</p>
                    <ContinueButton/>
                </div>
            </div>
        </div>
    );

    return children;
}