import Header from "@/components/room/header";
import LoginCheck from "@/components/room/login-check";
import ReduxProvider from "@/lib/providers/redux";


export default function Layout({children}){
    
    return (
        <LoginCheck>
            <ReduxProvider>
                <div>        
                    <Header/> 
                    <div>
                        {children}
                    </div>
                </div>
            </ReduxProvider>
        </LoginCheck>
    );
}