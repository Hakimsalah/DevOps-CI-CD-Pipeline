import "./chat.css";
import EmojiPicker from "emoji-picker-react";
import avatar from "../images/avatar.png";
import phone from "../images/phone.png";
import video from "../images/video.png";
import info from "../images/info.png";
import emoji from "../images/emoji.png";
import img from "../images/img.png";
import camera from "../images/camera.png";
import mic from "../images/mic.png";
import { useEffect, useState, useRef, use } from "react";
import { useUserStore } from "../../../lib/userStore";
import { query, collection, onSnapshot, addDoc, serverTimestamp, orderBy } from "firebase/firestore";
import { db } from "../firebase";
import { toast } from "react-toastify";

const Chat = ({setLastChat}) => {
    const [open, setOpen] = useState(false);
    const [text, setText] = useState("");
    const [messages, setMessages] = useState([]);
    const { currentUser } = useUserStore();
    const endRef = useRef(null);

    // Auto-scroll to bottom when messages update
    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);


      // Fonction pour calculer le temps écoulé
      const getTimeAgo = (timestamp) => {
        if (!timestamp) return "";

        const date = timestamp.toDate();
        const now = new Date();
        const diffInSeconds = Math.floor((now - date) / 1000);

        if (diffInSeconds < 60) {
            return `${diffInSeconds} sec ago`;
        } else if (diffInSeconds < 3600) {
            return `${Math.floor(diffInSeconds / 60)} min ago`;
        } else if (diffInSeconds < 86400) {
            return `${Math.floor(diffInSeconds / 3600)} h ago`;
        } else {
            return `${Math.floor(diffInSeconds / 86400)} days ago`;
        }
    };


    // Function to add emoji to text input
    const handleEmoji = (e) => {
        setText((prev) => prev + e.emoji);
        setOpen(false);
    };

    // Fetch messages from Firestore
    useEffect(() => {
        const q = query(
            collection(db, "messages"),
            orderBy("createdAt", "asc")
        );

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const fetchedMessages = [];
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                if (data.createdAt) { // Ensure message has a timestamp
                    fetchedMessages.push({ ...data, id: doc.id });
                }
            });
            setMessages(fetchedMessages);
            
            
            if (fetchedMessages.length > 0) {
                const lastMsg = fetchedMessages[fetchedMessages.length - 1];
                setLastChat({ sender: lastMsg.name, text: lastMsg.text });
            }
            console.log(fetchedMessages);

        });

        return () => unsubscribe();
    }, [setLastChat]);

    // Send message to Firestore
    const handleSendMsg = async (e) => {
        e.preventDefault();

        if (text.trim() === "") {
            toast.error("Message invalide");
            return;
        }

        try {
            await addDoc(collection(db, "messages"), {
                text,
                name: currentUser.username,
                createdAt: serverTimestamp(),
                userId: currentUser.id,
            });
            setText("");
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    return (
        <div className="chat">
            {/* Top Section */}
            <div className="top">
                <div className="user">
                    <img src={avatar} alt="User Avatar" />
                    <div className="texts">
                        <span>Centre de Greffe</span>
                        <p>toujours en force ✌️🙏</p>
                    </div>
                </div>
                <div className="icons flex">
                    <img src={phone} alt="Call" />
                    <img src={video} alt="Video Call" />
                    <img src={info} alt="Info" />
                </div>
            </div>

            {/* Center Section (Messages) */}
            <div className="center">
                {
                messages.map((message) => (
                    <div className={message.userId === currentUser?.id ? "message own" : "message"} key={message.id}>
                        <div className="flex flex-col items-center justify-center">
                            <img src={avatar} alt="User Avatar" />
                            <p className="text-xs font-thin">{message.name}</p>
                        </div>
                        <div className="texts">
                            <p>{message.text}</p>
                        </div>
                        {/* Affichage du temps écoulé */}
                        <span>{getTimeAgo(message.createdAt)}</span>
                    </div>
                ))
                }
                <div ref={endRef}></div>
            </div>

            {/* Bottom Section */}
            <div className="bottom">
                <div className="icons">
                    <img src={img} alt="Attach Image" />
                    <img src={camera} alt="Camera" />
                    <img src={mic} alt="Microphone" />
                </div>
                <input
                    type="text"
                    placeholder="Type a message..."
                    onChange={(e) => setText(e.target.value)}
                    value={text}
                />
                <div className="emoji">
                    <img src={emoji} alt="Emoji Picker" onClick={() => setOpen((prev) => !prev)} />
                    {open && (
                        <div className="picker">
                            <EmojiPicker onEmojiClick={handleEmoji} />
                        </div>
                    )}
                </div>
                <button className="sendButton" onClick={handleSendMsg}>Send</button>
            </div>
        </div>
    );
};

export default Chat;
