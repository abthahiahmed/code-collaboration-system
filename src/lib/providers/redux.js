"use client"
import collabStore from "@/lib/stores/collab";
import { Provider } from "react-redux";

export default function ReduxProvider({children}){
    return (
        <Provider store={collabStore}>{children}</Provider>
    )
}