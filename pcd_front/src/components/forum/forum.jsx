import List from "./list/List";
import "./forum.css";
import Chat from "./chat/Chat";
import Detail from "./detail/Detail";
import Login from "./login/Login";
import Notification from "./notification/Notification";
import { useState, useEffect } from "react";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useUserStore } from "../../lib/userStore";
const Forum = () => {

    const {currentUser,isLoading,fetchUserInfo} = useUserStore();
    const [lastChat,setLastChat] = useState({sender:"centre de greffe",text:"welcome"});

   // const [user, setUser] = useState(null);  // Use state to hold the user object

    /*useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            setUser(user);  // Update the user state with the user object
            console.log(user);  // Log the user object to the console
        });

        return () => {
            unsub();  // Clean up the listener on component unmount
        };
    }, []);*/
        useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            fetchUserInfo(user?.uid); // Log the user object to the console
        });

        return () => {
            unsub();  // Clean up the listener on component unmount
        };
        }, [fetchUserInfo]);


    if(isLoading)return <div className="p-[50px]">Loading...</div>


       
    return (
        <div className="body1">
            <div className="container">
                {currentUser ? (
                    <>
                        <List lastChat={lastChat}/>
                        <Chat  setLastChat={setLastChat}/>
                        <Detail />
                    </>
                ) : (
                    <Login />
                )}
                <Notification />
            </div>
        </div>
    );
};

export default Forum;
