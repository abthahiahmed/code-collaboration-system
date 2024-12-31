import Buttons from "@/components/home/buttons";
import Image from "next/image";


export default function Home() {



  return (
    <div className="w-full">
      <div className="h-lvh flex flex-col">

        <div className="w-full grow">
          <div className="max-w-screen-xl mx-auto border-x h-full border-gray-700 border-dashed">

          </div>
        </div>

        <div className="border-y border-gray-700 w-full border-dashed">

          <div className="max-w-screen-xl mx-auto border-x border-gray-700 min-h-[800px] border-dashed flex items-center px-6">
            <div className="w-full p-6">
              <h1 className="text-7xl text-center mb-6 text-zinc-200 font-bold">Welcome to Next-Gen Code Collaboration System</h1>
              <p className="text-3xl text-gray-400 text-center mb-8">An application to collabrate in coding with your friends.</p>
              <Buttons/>


            </div>
          </div>

        </div>

        <div className="w-full grow">
          <div className="max-w-screen-xl mx-auto border-x border-gray-700 h-full border-dashed">

          </div>
        </div>


      </div>
    </div>
    
  );
}
