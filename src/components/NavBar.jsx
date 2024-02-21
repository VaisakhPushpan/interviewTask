import React from "react";
import "./NavBar.scss";
import { FaSearch } from "react-icons/fa";
import { signOut } from "firebase/auth";
import { auth } from "../config";
import { useSelector } from "react-redux";
const NavBar = () => {
  const user = useSelector((data) => data.auth.auth);
  return (
    <div className="nav-bar">
      <div className="logo">
        <img
          src="https://s3-alpha-sig.figma.com/img/eab8/ce80/65416c7f90b1839c7c682a3affa27fc9?Expires=1709510400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=WAri7Pgaf2VxLSwC6LSPYQeIGarGsViSdXczNiXvv9bzI41UnpgIi56T-9~Cg6C3HKlhuq8dvoSWb7xN4NgTsgD7uLsz2VVVP5m2bS32BNiMxhqD0tMTMBAqazWblg5ks66JQ~235I740K5hm3PwAzrWUhp0~m2tJwWV-mpxbs5Mwnpl1ykBFAPbAVR3qvao72Vx3cMz1xXsSF4lQ3Vg8JznCQuD8zgABZqN25LZabUjFRrvIzFTX0N-mYWbBJnDOxhLqgqm~KHMZDjNPKiwHxkioXEF5bYT5rrclkSk4L1wUZPJCvynbiLlhPK3PVgursjSE7Zk5K9fBUr2ono5vg__"
          alt=""
        />
      </div>
      <div className="nav-links">
        <div>
          <input type="text" className="SearchBox" placeholder="Search..." />
          <FaSearch className="search-icon" />
        </div>
        <div className="user">
          <img src={user.photoURL} alt="" />
          <div className="displayname p-2 text-white">{user.displayName}</div>
        </div>
          <button className="logout" onClick={() => signOut(auth)}>
            Logout
          </button>
      </div>
    </div>
  );
};

export default NavBar;
