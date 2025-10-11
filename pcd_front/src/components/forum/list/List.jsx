import { useEffect } from "react";
import ChatList from "../chatList/ChatList";
import UserInfo from "../userInfo/UserInfo";
import "./list.css";



const List=({lastChat})=>{

    return <div className="list">
        <UserInfo/> 
        
        <ChatList lastChat={lastChat} />
        </div>

}
export default List;