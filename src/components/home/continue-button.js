"use client"
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from "next/navigation";

export default function ContinueButton({refresh = false}){
    const router = useRouter();
    const GoogleSignin = async () => {
        const res = await signIn("google", {
            redirect : false,
        });
        if (refresh) router.refresh();
    }
    return (
        <>
        <button className="button button-white" onClick={GoogleSignin}><Image src={'/google.svg'} width={24} height={24} alt="Google Logo"/> Continue with Google</button>
        
        </>
    );
    
}