import React, { useEffect, useState } from "react";
import "./ListOfImages.scss";
import {
  FaPlusCircle,
  FaEllipsisV,
  FaTimes,
  FaPaperPlane,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import {
  arrayUnion,
  doc,
  onSnapshot,
  query,
  updateDoc,
} from "firebase/firestore";
import { db } from "../config";
import { useNavigate, useParams } from "react-router-dom";
const ListOfImages = () => {
  let data = useSelector((data) => data.auth.allImages);
  let user = useSelector((data) => data.auth.auth);
  const [like, setLike] = useState(false);
  const [totalLike, seTotalLike] = useState(null);
  const [comment, setComment] = useState(false);
  const [reply, setReply] = useState(false);
  const [sliderImage, setSliderImage] = useState({});
  const [acivateSlider, setAcivateSlider] = useState(false);
    let {id} = useParams();
  const navigate = useNavigate();
  const showComment = () => {
    setComment(!comment);
  };

  
 useEffect(() => {
  // Check if id exists before fetching data
  if (id) {
    const q = query(doc(db, 'userImages', id));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (snapshot.exists()) {
        setSliderImage(snapshot.data());
      } else {
        // Handle case where document doesn't exist
        console.log('Document does not exist');
      }
    });

    // Cleanup function
    return () => {
      unsubscribe(); // Unsubscribe from snapshot listener
    };
  }
}, [id]);

  const imageLiked = async (item) => {
    let allUsers = item.like.likedUser;
    seTotalLike(item.like.total);
    allUsers.map((item) => {
      if (item === user.uid) {
        setLike(true);
      }
    });
    if (like) {
      alert("already Liked");
    } else {
      await updateDoc(doc(db, "userImages", item.photoId), {
        "like.total": totalLike + 1,
        "like.likedUser": arrayUnion(user.uid),
        likedUsersPhoto: arrayUnion(user.photoURL),
      });
    }
  };

  const addComment = async (item) => {
    await updateDoc(doc(db, "userImages", item.photoId), {
      comments: arrayUnion({
        commentor: user.displayName,
        photo: user.photoURL,
        text: comment,
        photoId: item.photoId,
      }),
    });
  };

  const addCommentFocus = async () => {
    await updateDoc(doc(db, "userImages", id), {
      comments: arrayUnion({
        commentor: user.displayName,
        photo: user.photoURL,
        text: comment,
        photoId: id,
      }),
    });
  };

  return (
    <>
      {data?.map((items, index) => {
        return (
          <>
            <div
              className="imageList mt-5 p
          b-5 d-flex flex-column"
            >
              <div className="top-bar">
                <div className="left-side">
                  <img src={items.photoURL} alt="" />
                  <div className="displayName">
                    {items.uploadedBy}
                    <span>2 dyas ago</span>
                  </div>
                </div>
                <button>Report</button>
              </div>

              <div className="description">
                <p className="my-2">{items.Description}</p>
                <FaPlusCircle size={30} />
              </div>
              <div className="posted-image">
                <img
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    navigate(`/${items.photoId}`);
                    setAcivateSlider(true);
                  }}
                  src={items.imageURL}
                  alt=""
                />
                <div className="likes">
                  <div className="d-flex gap-1 align-items-center">
                    <div className="images">
                      {items.likedUsersPhoto[0] ? (
                        <img src={items.likedUsersPhoto[0]} alt="" />
                      ) : (
                        ""
                      )}
                      {items.likedUsersPhoto[1] ? (
                        <img src={items.likedUsersPhoto[1]} alt="" />
                      ) : (
                        ""
                      )}
                      {items.likedUsersPhoto[2] ? (
                        <img src={items.likedUsersPhoto[2]} alt="" />
                      ) : (
                        ""
                      )}
                    </div>
                    {items.like.likedUser.includes(user.uid) ? (
                      <p>
                        Liked By you and{" "}
                        {`${items.like.likedUser.length - 1} others`}
                      </p>
                    ) : (
                      `Liked By ${items.like.likedUser.length} people`
                    )}
                  </div>
                  <p>{items.comments.length} Comments</p>
                </div>
                <div className="d-flex align-items-center justify-content-around gap-2 my-2">
                  <button
                    onClick={() => imageLiked(items)}
                    className="w-100"
                    style={{
                      border: "1px solid #CF796C",
                      borderRadius: "45px",
                      height: "74px",
                      color: "#CF796C",
                    }}
                  >
                    Like
                  </button>
                  <button
                    onClick={showComment}
                    className="w-100"
                    style={{
                      border: "1px solid #CF796C",
                      borderRadius: "45px",
                      height: "74px",
                      backgroundColor: "#CF796C",
                      color: "white",
                    }}
                  >
                    Comment
                  </button>
                </div>
                {comment ? (
                  <form className="d-flex flex-column gap-2" action="">
                    <input
                      onChange={(e) => setComment(e.target.value)}
                      className="w-100 p-2"
                      style={{
                        height: "3rem",
                        outline: "none",
                        border: "1px solid #CF796C",
                        borderRadius: "5px",
                      }}
                      type="text"
                      placeholder="Add Comments.."
                    />
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        addComment(items);
                      }}
                      className="p-2"
                      style={{
                        color: "white",
                        order: "none",
                        backgroundColor: "#CF796C",
                        borderRadius: "5px",
                        border: "none",
                      }}
                    >
                      Submit
                    </button>
                  </form>
                ) : (
                  ""
                )}
              </div>
              {items?.comments?.map((item, index) => {
                return (
                  <div className="comment-section">
                    <div className="each-comment">
                      <div>
                        <img src={item.photo} alt="" />
                        <b>{item.commentor}</b>
                        <span>1 week ago</span>
                      </div>
                      <div className="d-flex align-items-center justify-content-center">
                        {reply && (
                          <ul
                            style={{
                              listStyle: "none",
                              padding: "0",
                              margin: "0",
                            }}
                          >
                            <li style={{ cursor: "pointer" }}>Reply</li>
                          </ul>
                        )}

                        <FaEllipsisV
                          onClick={() => setReply(!reply)}
                          className="option"
                        />
                      </div>
                    </div>
                    <div className="d-flex justify-content-end">
                      <div className="content">{item.text}</div>
                    </div>
                    {reply && (
                      <form className=" d-flex flex-column replyForm" action="">
                        <img
                          style={{
                            width: "45px",
                            height: "45px",
                            objectFit: "cover",
                            borderRadius: "50%",
                          }}
                          src={items.photoURL}
                          alt=""
                        />
                        <div className="w-100" style={{ position: "relative" }}>
                          <input
                            className="my-2 p-2"
                            type="text"
                            placeholder="Enter your Reply..."
                            style={{
                              width: "100%",
                              height: "86px",
                              borderRadius: "0px 30px 30px 30px",
                              border: "1px solid #CF796C",
                              outline: "none",
                            }}
                            onChange={(e) => setReplyContent(e.target.value)}
                          />
                          <button
                            style={{
                              position: "absolute",
                              right: "10px",
                              top: "35%",
                              border: "none",
                              backgroundColor: "#CF796C",
                              color: "white",
                              borderRadius: "10px",
                            }}
                            className="p-2"
                            onClick={(e) => {
                              e.preventDefault();
                              addReply(item, index);
                            }}
                          >
                            Add Reply
                          </button>
                        </div>
                      </form>
                    )}
                  </div>
                );
              })}
            </div>
            {acivateSlider && sliderImage && (
              <div className="sliderImage">
                <div className="sliderInner">
                  <FaTimes
                    onClick={() => setAcivateSlider(false)}
                    className="closeSlider"
                  />
                  <div className="leftSideSlider">
                    <img src={sliderImage.imageURL} alt="" />
                  </div>
                  <div className="rightSideSlider">
                    <div className="topBar">
                      <div>
                        <img src={sliderImage.photoURL} alt="" />
                        <div>
                          <b>{sliderImage.uploadedBy}</b>
                          <p style={{ color: "grey" }}>2 days ago</p>
                        </div>
                      </div>
                      <button>Report</button>
                    </div>
                    <div className="middleBar">
                      <button>Like</button>
                      <button>Comment</button>
                    </div>
                    <div className="bottombar">
                      <div className="slider-comment">
                        {sliderImage.comments.map((item, index) => {
                          return (
                            <div className="each-slider-comment">
                              <div className="d-flex gap-2">
                                <img src={item.photo} alt="" />
                                <b>{item.commentor}</b>
                              </div>
                              <div className="d-flex justify-content-end">
                                <div className="content">{item.text}</div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      <div className="addComment p-1">
                        <img src={user.photoURL} alt="" />
                        <input
                          onChange={(e) => setComment(e.target.value)}
                          type="text"
                          placeholder="Write a comment..."
                        />
                        <FaPaperPlane
                          onClick={(e) => {
                            e.preventDefault();
                            addCommentFocus();
                          }}
                          className="sentBtn"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        );
      })}
    </>
  );
};

export default ListOfImages;
