import { auth } from "../firebase";
import "./detail.css";
import cartoon from "../images/cartoonImg.png";


const Detail=()=>{
    return (
    <div className="detail">
        <img src={cartoon} alt="photo_centre" />
        <button className="logout" onClick={()=>{
            auth.signOut()
        }}> Logout</button>
    </div>
    )

}
export default Detail;