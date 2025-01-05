"use client"

import { languages } from "@/lib/languages";
import { setActiveFile, setContent, setLanguage } from "@/lib/slices/editor";
import { setFiles } from "@/lib/slices/files";
import { socketOnNewMemberJoined, socketOnRecvFiles, socketSendCode, socketSendFiles } from "@/lib/socket.connect";
import { faJsSquare, faPhp, faPython } from "@fortawesome/free-brands-svg-icons";
import { faFileCode } from "@fortawesome/free-regular-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";




export default function Files(){
    const {data:session} = useSession();
    const dispatch = useDispatch();

    // const [files, setFiles] = useState([]);
    const files = useSelector(state=>state.files.value);
    const activeFile = useSelector(state=>state.editor.activeFile);
    // const [activeFile, setActiveFile] = useState(-1);

    const getContent = async (file)=>{
        if (!file) return;
        const text = await file.text();
        return text;
    }

    const handleFileSelect = async (event) =>{
        // console.log(event.target.files);
        let selectedFiles = event.target.files;
        let tmp = [...files];

        console.log(tmp);

        for (let i = 0; i < selectedFiles.length; i++){
            tmp.push({
                name : selectedFiles[i].name,
                content : await getContent(selectedFiles[i]) ?? '',
            });
        }
        
        dispatch(setFiles([...tmp]));
        socketSendFiles([...tmp]);
    }

    const openFile = async (i) =>{
        // dispatch(setActiveFile(-1));
        if (files.length < 1 || i > files.length || i < 0) return;

        dispatch(setActiveFile(i));
        let tmp = files[i].name.split('.');
        let ext = tmp[tmp.length - 1];
        
        dispatch(setLanguage(languages[ext]));

        dispatch(setContent(files[i].content));

        // socketSendCode({
        //     userId : session?.user.id,
        //     pos : {
        //         y : 1, 
        //         x : 1
        //     }, 
        //     code : files[i].content,
        // });
        
    }

    const closeFile = (i) =>{
        let tmp = [...files];
        tmp.splice(i, 1);
        if (tmp.length < 1){
            dispatch(setContent(''));
        }
        dispatch(setFiles([...tmp]));
        openFile(tmp.length - 1);
    }

    const fileIcon = (name) =>{
        let tmp = name.split('.');
        let ext = tmp[tmp.length - 1];
        if (ext === 'js') return faJsSquare;
        else if (ext === 'py') return faPython;
        else if (ext === 'php') return faPhp;
        else return faFileCode; 
    }


    useEffect(()=>{
        // socketOnNewMemberJoined((users)=>{
        //     socketSendFiles(files);
        // });



        socketOnRecvFiles((data)=>{
            console.log(files);
            dispatch(setFiles([...data]));
        });
    }, []);

    return (
        <div className="flex items-center gap-3">
            <div>
                <button></button>
            </div>
            <div className="flex text-sm items-center gap-3 overflow-x-auto">
                {
                files.map((item, i)=>(
                    <div className={`inline-flex gap-2 px-3 py-1.5 rounded-md text-sm text-gray-400 hover:text-gray-50 ${i == activeFile && 'bg-zinc-800'} cursor-pointer`} key={i} onClick={()=>openFile(i)}>
                        <span>
                            <FontAwesomeIcon icon={fileIcon(item.name)} className="me-1"/>{item.name}
                        </span>
                        <button onClick={()=>closeFile(i)} className="text-xs"><FontAwesomeIcon icon={faTimes}/></button>
                    </div>
                ))
                }
            </div>
            <div className="">
                <label className="button-sm button-blue">
                    <input type="file" className="hidden" onChange={handleFileSelect} multiple/>
                    +
                </label>
            </div>
        </div>

    )
}