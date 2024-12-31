import CodeEditor from "@/components/room/editor";
import Files from "@/components/room/files";
import Members from "@/components/room/members";

export default function(){

    

    return (
        <div className="flex h-[calc(100vh-56px)]">
            <div className="grow">
                <CodeEditor/>
            </div>
            <div className="">
                <div className="w-[400px] p-2 h-full">
                    <Members/>
                </div>
            </div>
        </div>
    )
}