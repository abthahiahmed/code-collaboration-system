"use client"
import { socketOnRecvCode, socketOnRecvCursor, socketSendCode, socketSendCursor, socketSendScroll } from '@/lib/socket.connect';
import Editor, { DiffEditor, useMonaco, loader } from '@monaco-editor/react';
import { useSession } from 'next-auth/react';
import { useEffect, useRef, useState } from 'react';
import Cursors from './cursors';
import { useDispatch, useSelector } from 'react-redux';
import { setContent, setScroll } from '@/lib/slices/editor';
import { setFileContent } from '@/lib/slices/files';


export default function CodeEditor(){
    const {data: session} = useSession();

    const editorRef = useRef(null);

    const dispatch = useDispatch();

    // const code = useSelector((state)=>state.editor.value);
    const language = useSelector(state=>state.editor.language);
    const activeFile = useSelector(state=>state.editor.activeFile);
    const files = useSelector(state=>state.files.value);

    const [otherActiveFile, setOtherActiveFile] = useState(-1);


    const [line, setLine] = useState(1);

    const monaco = useMonaco();

    const onCodeChange = (value, event) =>{
        
        // dispatch(setContent(value));

        dispatch(setFileContent({index : activeFile, code : value}));

        const pos = event.changes[0].range;
        // console.log(pos.startLineNumber, pos.startColumn);
        socketSendCode({
            userId : session?.user.id,
            code : value,
            activeFile : activeFile, 
        });
    }

    useEffect(()=>{
        
        socketOnRecvCode((data)=>{
            // if (data.activeFile === activeFile){
                // dispatch(setContent(data.code));
            
            dispatch(setFileContent({index : data.activeFile, code : data.code}));
            setOtherActiveFile(data.activeFile);
            console.log(data.activeFile);
            console.log(activeFile);
        });

        socketOnRecvCursor((data)=>{
            if (editorRef.current != null){
                editorRef.current.revealLine(data.y);
                // editorRef.current.setPosition({
                //     column : data.x,
                // });
            }
        })




    }, []);

    if (activeFile == -1) return (
    <div className='w-full bg-zinc-950 h-full grid place-items-center'>
        <div>
            <p className='text-gray-600 text-2xl'>No file shared</p>
            <p className='text-gray-600 text-sm'>Please select file by clicking upper blue '+' button to share file.</p>
        </div>
    </div>
    ); 

    return <div className='w-full h-full relative overflow-hidden'>
        <Editor height="100%" width="100%" defaultLanguage={language} language={language} value={files[activeFile]?.content ?? ''} theme="vs-dark" options={{
            multiCursorLimit : 2,
            minimap : {
                enabled : false,
            }
        }} onChange={onCodeChange} line={line} 
        onMount={(editor, monaco)=>{
            editorRef.current = editor;
            console.log(editor)
            editor.onDidChangeCursorPosition((event)=>{
                if (event.source !== 'modelChange'){
                    socketSendCursor({
                        userId : session?.user.id,
                        x : event.position.column,
                        y : event.position.lineNumber, 
                        activeFile : activeFile,
                    });
                }
            });
            
            editor.onDidScrollChange((event)=>{
                
                // socketSendScroll({
                //     userId : session?.user.id,
                //     x : event.scrollLeft,
                //     y : event.scrollTop,
                // });

                dispatch(setScroll({
                    x : event.scrollLeft,
                    y : event.scrollTop,
                }));

            })

        }}  />
        {activeFile == otherActiveFile && <Cursors/>}
    </div>;
}