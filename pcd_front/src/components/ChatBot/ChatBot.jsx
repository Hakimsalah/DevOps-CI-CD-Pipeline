import ChatbotIcon from "./ChatbotIcon";
import "./ChatBot.css"
import ChatForm from "./ChatForm";
import { useState,useEffect,useRef } from "react";
import ChatMessage from "./ChatMessage";
import { companyInfo } from "./companyInfo";





const ChatBot = ()=>{

    const [chatHistory,setChatHistory]= useState([{
        hideInChat:true,
        role:"model",
        text: companyInfo
    }

    ]);
    const chatBodyRef = useRef();
    const [showChatBot, setShowChatBot]= useState(false )



      const generateBotResponse = async (history)=>{

        //Helper function to update chatHistory 
        const updateHistory = (text ,isError = false )=>{
            setChatHistory(prevChatHistory => [
                ...prevChatHistory.filter(msg => msg.text !== "Thinking..."), 
                { role: "model", text ,isError}
            ]);
            
        }



        //format chat history for api request 
        history = history.map(({role,text})=>({role,parts:[{text}]}));

        const requestOptions={
            method:"POST",
            Headers:{"Content-Type":"application/json"},
            body: JSON.stringify({contents:history})
        }
        try{
            //make the api call to get the bot's response 
            const response = await fetch (process.env.REACT_APP_API_URL, requestOptions);
            const data = await response.json(); 
            if (!response.ok)throw new Error (data.error.message || "Something went wrong");
            //console.log(data)
            const apiResponseText = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g,"$1").trim();
            //Clean and Update the chat history with the bot's response
            updateHistory(apiResponseText);

        }catch(error){
            console.log("error");
            updateHistory(error.message , true );

        }

    }

    useEffect(()=>{
        //auto scroll whenever the chat history changes
        chatBodyRef.current.scrollTo({top: chatBodyRef.current.scrollHeight,behavior:"smooth"});
    },[chatHistory]);// Runs whenever chatHistory changes




    // ✅ Log chat history whenever it updates
   // useEffect(() => {
     //   console.log("Updated chat history:", chatHistory);
   // }, [chatHistory]); // Runs whenever chatHistory changes



    return (
        <div className= {`Chatbotcontainer ${ showChatBot ?"show-chatbot":"" }`}>

            <button id="chatbot-toggler" onClick={()=>setShowChatBot(prev =>!prev)}>
                <span className="material-symbols-rounded">
                    mode_comment
                </span>
                <span className="material-symbols-rounded">
                    close
                </span>

            </button>


            <div className="chatbot-popup">

                {/*Chatbot Header */}
                <div className="chat-header">
                    <div className="header-info">
                        <ChatbotIcon></ChatbotIcon>
                        <h2 className="logo-text">chatbot</h2>
                    </div>
                        <button class="material-symbols-rounded" onClick={()=>setShowChatBot(prev =>!prev)}>
                            keyboard_arrow_down
                        </button>
                    

                </div>


                {/*Chatbot Body */}
                <div className="chat-body" ref={chatBodyRef}>
                    <div className="message bot-message">
                        <ChatbotIcon></ChatbotIcon>
                        <p className="message-text">
                            hey there ! <br />How can I help you today ?
                        </p>
                    </div>
                    {/*Render the chat history dynamically */}
                    {chatHistory.map((chat,index)=>(
                          <ChatMessage chat={chat} key={index} />
                       
                    ))}
                </div>


                {/*Chatbot Footer */}
                <div className="chat-footer">
                
                    <ChatForm setChatHistory={setChatHistory} generateBotResponse={generateBotResponse} chatHistory={chatHistory}   />
                </div>


            </div>


        </div>



    )
}
export default ChatBot;