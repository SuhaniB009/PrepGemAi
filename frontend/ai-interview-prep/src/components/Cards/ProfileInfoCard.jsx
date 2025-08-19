import React, { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";

const ProfileInfoCard = () => {
    const { user, clearUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogOut = () => {
        localStorage.clear();
        clearUser();
        navigate("/");
    };

    return (
        <div className="flex items-center ">
            {/* Display the profile image */}
            {user?.profileImageUrl && (
                <img
                    src={`${import.meta.env.VITE_API_BASE_URL}/${user.profileImageUrl}`} 
                    alt="Profile"
                    className="w-11 h-11 bg-gray-300 rounded-full mr-3"
                />
            )}
            <div>
                <div
                    className=""
                >
                    {user?.name || ""}
                </div>
                <button
                    className="text-amber-600 text-sm font-semibold cursor-pointer hover:underline"
                    onClick={handleLogOut}
                >
                    Log Out
                </button>
            </div>
        </div>
    );
};

export default ProfileInfoCard;