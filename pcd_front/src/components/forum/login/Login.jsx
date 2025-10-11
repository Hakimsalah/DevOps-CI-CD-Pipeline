import "./login.css";
import { useState } from "react";
import avatarImg from "../images/avatar.png"
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword ,signInWithEmailAndPassword} from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";


const Login =()=>{
    const [avatar,setAvatar]=useState(
        {file:null,
         url:"",
    })

    const [loading,setLoading]=useState(false);

    const handleAvatar=(e)=>{
            if (e.target.files[0]){
            setAvatar({
                file:e.target.files[0],
                url:URL.createObjectURL(e.target.files[0])
            })
            }

    }
    const handleLogin= async (e)=>{
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.target);
        const {email,password} = Object.fromEntries(formData);
        try{
            await signInWithEmailAndPassword(auth,email,password);
            toast.success("Login Successfull");

        }catch (error){
            console.log(error);
            toast.error(error.message);

        }finally{
            setLoading(false);
        }
       
    }
    const handleRegister= async (e)=>{
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.target);
        const {username,email,password}=Object.fromEntries(formData);
        try{
            const res = await createUserWithEmailAndPassword(auth,email,password);
            await setDoc(doc(db,"users",res.user.uid),{   //upgrade data base 
                username,
                email,
                id: res.user.uid,
                blocked:[],

            });
            await setDoc(doc(db,"userChats",res.user.uid),{
                chats:[],

            });
            toast.success("utilisateur crée avec succés");
        }catch(error){
            console.log(error);
            toast.error(error.message);

        }finally{
            setLoading(false);
        }

    }

    return (
        <div className="login">
            <div className="item">
                <h2>Welcome back,</h2>
                <form onSubmit={handleLogin}>
                    <input type="text" placeholder="Email" name="email" />
                    <input type="password" placeholder="Password" name="password" />
                    <button disabled={loading}>{loading ? "Loading":"Sign In"}</button>
                </form>
            </div>
            <div className="separator"></div>
            <div className="item">
                <h2>Create an Account</h2>
                <form onSubmit={handleRegister}>
                    <label htmlFor="file">
                        <img src={avatar.url || avatarImg} alt="" />
                        telecharger une photo
                    </label>
                    <input type="file" id="file" onChange={handleAvatar}  style={{display:"none"}}/>
                    <input type="text" placeholder="Username" name="username"/>
                    <input type="text" placeholder="Email" name="email" />
                    <input type="password" placeholder="Password" name="password" />
                    <button disabled={loading}>{loading ? "Loading":"Sign Up"}</button>
                </form>

            </div>
            
        </div>
    )
}
export default Login;