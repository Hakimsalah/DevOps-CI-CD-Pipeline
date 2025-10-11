import avatar from "../images/avatar.png";
import more from "../images/more.png";
import video from "../images/video.png";
import edit from "../images/edit.png";
import "./userInfo.css"
import { useUserStore } from "../../../lib/userStore";

const UserInfo = () => {
    const {currentUser} = useUserStore();
    return (
        <div className="userInfo">
            <div className="user">
                <img src={avatar} alt="User Avatar" />
                <h2>{currentUser.username}</h2>
                
            </div>
            <div className="icons  ">
                <img src={more} alt="More Options" />
                <img src={video} alt="Video Call" />
                <img src={edit} alt="Edit" />
            </div>
        </div>
    );
};
export default UserInfo;
