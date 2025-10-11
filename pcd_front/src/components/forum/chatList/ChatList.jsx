import './chatList.css';
import serachBarImg from "../images/search.png";
import plus from "../images/plus.png";
import minus from "../images/minus.png";
import avatar from "../images/avatar.png";
import { useState,useEffect } from 'react';

const ChatList =({lastChat})=>{

    const [addMode,setAddMode] = useState(false);
    return (
        <div className="chatList">
            <div className="search">
                <div className="serachBar">
                    <img src= {serachBarImg} alt="serachloop" />
                    <input type="text" placeholder='serach'/>
                </div>
                
                <img src={addMode ? minus : plus} alt="toggle icon" className="add" onClick={() => setAddMode(prev => !prev)} />
            </div>


            <div class="meeting-container">
                <div class="left-section">
                
                <img src={avatar} alt="" className='meeting-code'/>
                </div>
                <div class="right-section">

                <span class="link-label">{lastChat.sender}:</span>
                <span class="link-url">{lastChat.text}</span>
                </div>
            </div>           
        </div>
    )

}
export default ChatList;