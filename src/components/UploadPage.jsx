import React, { useEffect, useState } from "react";
import "./UploadPage.scss";
import { useDispatch, useSelector } from "react-redux";
import { uid } from "uid";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { collection, doc, onSnapshot, query, setDoc } from "firebase/firestore";
import { db } from "../config";
import { allUserImages } from "../redux/AuthSlice";
const UploadPage = () => {
  let ID = uid();
  const [image, setImage] = useState("");
  const [currentUser, setCurrentUser] = useState({});
  const [Description, setDescription] = useState("");
  const [task, setTask] = useState(false);
  const dispatch = useDispatch();
  let data = useSelector((data) => data.auth.auth);

  useEffect(() => {
    setCurrentUser(data);

    const q = query(collection(db, "userImages"));
    onSnapshot(q, (querySnapshot) => {
      let queryImages = [];
      querySnapshot.forEach((doc) => {
        queryImages.push(doc.data());
      });
      console.log(queryImages);
      dispatch(allUserImages(queryImages));
    });
  }, [data]);

  const uploadImage = async () => {
    if (Description && image) {
      setTask(true)
      const storage = getStorage();

      // Create the file metadata
      /** @type {any} */
      const metadata = {
        contentType: "image/jpeg",
      };

      const storageRef = ref(storage, "images/" + currentUser.uid + ID);
      const uploadTask = uploadBytesResumable(storageRef, image, metadata);

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
            await setDoc(doc(db, "userImages", ID), {
              photoURL: currentUser.photoURL,
              uploadedBy: currentUser.displayName,
              uid: currentUser.uid,
              imageURL: downloadURL,
              Description,
              photoId: ID,
              like: { total: 0, likedUser: [] },
              comments: [],
              likedUsersPhoto: [],
            });
          });
          setDescription("");
          setTask(false);
          alert("Upload Completed..")
        }
      );
    } else {
      alert("Select Image/Write description");
    }
  };

  return (
    <div className="upload-image">
      <div className="d-flex flex-column gap-2">
        <input
          type="file"
          id="image"
          hidden
          onChange={(e) => setImage(e.target.files[0])}
        />
        <label htmlFor="image">
          Select Image
          <svg
            className="wave-shape"
            width="43"
            height="45"
            viewBox="0 0 43 45"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2 8C13.6667 9.5 37 18.6 37 43"
              stroke="#CF796C"
              stroke-width="4"
              stroke-linecap="round"
            />
            <path
              d="M16 2C24.3333 3.07143 41 9.57143 41 27"
              stroke="#CF796C"
              stroke-width="4"
              stroke-linecap="round"
            />
          </svg>
        </label>
        <input
          value={Description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-100 "
          style={{
            border: "1px solid grey",
            outline: "none",
            height: "2rem",
            paddingLeft: "1rem",
          }}
          placeholder="Description..."
          type="text"
        />
        <button
          onClick={uploadImage}
          style={{
            backgroundColor: "#c08c5d",
            border: "none",
            color: "white",
            borderRadius: "5px",
            padding: ".5rem",
          }}
        >
          {task?"Uploading...":'Upload'}
        </button>
      </div>

      <div>
        <img
          src="https://s3-alpha-sig.figma.com/img/a016/53d0/a23201c061509ea94063b2ca46164905?Expires=1709510400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ojOA1UGD8IleQZoNxwKE~Q8tnk2uBP~UHxHbCo~s0qfq3AyQ0WuDmlbj7huE04SotrhtyODAtgfDiURCFYIDpo-9LIhweULk77ESHB0UD5RFoYTE6wbZXpaNaUedEG1mBlhjYCMAdS7L9iHqjSrEgz1oAtOj1zJee7do0K4es4MwV2FpoNgkX6a7H~ghv2P98Zom6xrnE1EwezDCa9WEaUd1PUNJkqxiVDprULahQxBhVGNuabxHXJ5ZcbwdmWgy8UX927BrNYP8~9sa~-yY8Ydc5UFxSwwEZ8k~WB04camoJFzn-AB6zOlyIjIySgUznN~Gu6kcJtu7JG4WHJfr~A__"
          alt=""
        />
      </div>
    </div>
  );
};
export default UploadPage;
