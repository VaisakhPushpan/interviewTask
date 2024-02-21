import React, { useState } from "react";
import "./Register.scss";
import { FaUser } from "react-icons/fa";
import { auth, db } from "../config";
import { useNavigate } from "react-router-dom";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [file,setFile] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(name + email + pass + file);
    try {
      let res = await createUserWithEmailAndPassword(auth, email, pass);

      const storage = getStorage();

      // Create the file metadata
      /** @type {any} */
      const metadata = {
        contentType: "image/jpeg",
      };

      const storageRef = ref(storage, "images/" + name);
      const uploadTask = uploadBytesResumable(storageRef, file, metadata);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
            case "storage/unauthorized":
              break;
            case "storage/canceled":
              break;

            // ...

            case "storage/unknown":
              break;
          }
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(res.user, {
              displayName : name,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "user", res.user.uid), {
              uid: res.user.uid,
              displayName : name,
              email,
              photoURL: downloadURL,
            });
          });
          navigate('/login')
        }
      );
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="register">
      <div></div>
      <div className="main">
        <h3>Register</h3>
        <form action="">
          <input
            type="text"
            placeholder="Display Name..."
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="email..."
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password..."
            onChange={(e) => setPass(e.target.value)}
          />
          <input type="file" hidden id="dp" onChange={(e)=> setFile(e.target.files[0])} />
          <div className="w-100 d-flex align-items-center justify-content-start">
            <label htmlFor="dp" className="d-flex gap-3  align-items-center">
              <FaUser
                style={{
                  outline: "1px solid blue",
                  borderRadius: "50%",
                  outlineOffset: ".3rem",
                }}
              />
              Select Your Avatar
            </label>
          </div>
          <button
            onClick={handleSubmit}
            type="Submit"
            className="btn btn-primary"
          >
            Register
          </button>
        </form>
        <p>
          Already Registered? click to
          <a onClick={() => navigate("/login")}> Login</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
