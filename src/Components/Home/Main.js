import { Avatar } from "@material-ui/core";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import Postcard from "./Subcomp/Postcard";
import Postskel from "./Subcomp/Postskel";
import "./Main.css";
import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../Features/Userslice";
import Story from "./Subcomp/Story";
import { storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const Main = () => {
  const userdata = useSelector(selectUser);
  const [createpost, opencreatepost] = useState(false);
  const [post, setpost] = useState([]);
  const [postdesc, setpostdesc] = useState();
  const [postimg, setpostimg] = useState("");
  const [page, setpage] = useState(1);
  const fileRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      refresh();
    }, 1000);
    // window.addEventListener("scroll", handleScroll);
  }, []);

  // const handleScroll = (e) => {
  //   const scrollHeight = e.target.documentElement.scrollHeight;
  //   const currentHeight = Math.ceil(
  //     e.target.documentElement.scrollTop + window.innerHeight
  //   );
  //   if (currentHeight + 1 >= scrollHeight) {
  //     console.log(page);
  //     refresh();
  //     setpage(page + 1);
  //   }
  // };

  const refresh = () => {
    fetch(`${process.env.REACT_APP_API}/post/?page=${page}&size=5`, {
      method: "GET",
      header: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then((res) => res.json())
      .then((res2) => {
        setpost([...post, ...res2.data]);
        console.error("page", res2);
      });
    setpage(page + 1);
  };

  const submitpost = async () => {
    const api = ref(
      storage,
      `${userdata.user.username}/Posts/${postimg.name}${new Date()}`
    );
    uploadBytes(api, postimg).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        fetch(`${process.env.REACT_APP_API}/post/`, {
          method: "post",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            userId: userdata.user._id,
            name: userdata.user.firstname + " " + userdata.user.surname,
            username: userdata.user.username,
            desc: postdesc,
            img: url
          })
        })
          .then((res) => res.json())
          .then((res) => {
            // console.log(res.data);
            res.message && setpost([res.data, ...post]);
            opencreatepost(false);
            setpostdesc("");
            setpostimg("");
          });
      });
    });
  };

  function childtoparent(a) {
    const aa = post.filter((item) => item._id != a);
    setpost(aa);
  }

  return (
    <>
      <Story />
      {/* post box */}
      {createpost && (
        <div className="createpostboxback">
          <div className="createpostbox">
            <IconButton
              className="createpostcls"
              onClick={() => opencreatepost(false)}
            >
              <CloseIcon />
            </IconButton>

            <div className="cpbheading">
              <h2>Create post</h2>
            </div>

            <div className="cpbuserp">
              <Avatar src={userdata.user.profilePicture} alt="" />
              {userdata.user.firstname + " " + userdata.user.surname}
            </div>
            <div className="cpbusermsg">
              <textarea
                className="cpbtxta"
                placeholder={
                  "What's on your mind, " + userdata.user.firstname + " ?"
                }
                resize="false"
                value={postdesc}
                onChange={(e) => setpostdesc(e.target.value)}
              ></textarea>
            </div>
            <img
              alt="not available"
              src="https://www.facebook.com/images/composer/SATP_Aa_square-2x.png"
            />
            <Button
              className="cpbbtbsub"
              variant="contained"
              onClick={submitpost}
            >
              Post
            </Button>
          </div>
        </div>
      )}

      <div className="postbox">
        <div className="uppost">
          <Avatar src={userdata.user.profilePicture} alt="" />
          <input
            type="text"
            className="uptex"
            placeholder={
              "What's on your mind, " + userdata.user.firstname + " ?"
            }
            value={postdesc}
            onClick={() => opencreatepost(true)}
          />
        </div>
        <hr className="uphr" />
        {postimg ? (
          <div className="postimg_img">
            <img
              alt=""
              className="postimg_img"
              src={URL.createObjectURL(postimg)}
            />
            <IconButton className="postimg_clg" onClick={() => setpostimg("")}>
              <CloseIcon />
            </IconButton>
          </div>
        ) : (
          <div className="downpost">
            <Button className="downbt">
              <svg
                fill="#f3425f"
                viewBox="0 0 24 24"
                width="24px"
                height="24px"
                className="svgdown"
              >
                <g fillRule="evenodd" transform="translate(-444 -156)">
                  <g>
                    <path
                      d="M113.029 2.514c-.363-.088-.746.014-1.048.234l-2.57 1.88a.999.999 0 0 0-.411.807v8.13a1 1 0 0 0 .41.808l2.602 1.901c.219.16.477.242.737.242.253 0 .508-.077.732-.235.34-.239.519-.65.519-1.065V3.735a1.25 1.25 0 0 0-.971-1.22m-20.15 6.563c.1-.146 2.475-3.578 5.87-3.578 3.396 0 5.771 3.432 5.87 3.578a.749.749 0 0 1 0 .844c-.099.146-2.474 3.578-5.87 3.578-3.395 0-5.77-3.432-5.87-3.578a.749.749 0 0 1 0-.844zM103.75 19a3.754 3.754 0 0 0 3.75-3.75V3.75A3.754 3.754 0 0 0 103.75 0h-10A3.754 3.754 0 0 0 90 3.75v11.5A3.754 3.754 0 0 0 93.75 19h10z"
                      transform="translate(354 158.5)"
                    ></path>
                    <path
                      d="M98.75 12c1.379 0 2.5-1.121 2.5-2.5S100.129 7 98.75 7a2.503 2.503 0 0 0-2.5 2.5c0 1.379 1.121 2.5 2.5 2.5"
                      transform="translate(354 158.5)"
                    ></path>
                  </g>
                </g>
              </svg>
              Live video
            </Button>

            <Button className="downbt" onClick={() => fileRef.current.click()}>
              <svg
                fill="#45bd62"
                viewBox="0 0 24 24"
                width="24px"
                height="24px"
                className="svgdown"
              >
                <g fillRule="evenodd" transform="translate(-444 -156)">
                  <g>
                    <path
                      d="m96.968 22.425-.648.057a2.692 2.692 0 0 1-1.978-.625 2.69 2.69 0 0 1-.96-1.84L92.01 4.32a2.702 2.702 0 0 1 .79-2.156c.47-.472 1.111-.731 1.774-.79l2.58-.225a.498.498 0 0 1 .507.675 4.189 4.189 0 0 0-.251 1.11L96.017 18.85a4.206 4.206 0 0 0 .977 3.091s.459.364-.026.485m8.524-16.327a1.75 1.75 0 1 1-3.485.305 1.75 1.75 0 0 1 3.485-.305m5.85 3.011a.797.797 0 0 0-1.129-.093l-3.733 3.195a.545.545 0 0 0-.062.765l.837.993a.75.75 0 1 1-1.147.966l-2.502-2.981a.797.797 0 0 0-1.096-.12L99 14.5l-.5 4.25c-.06.674.326 2.19 1 2.25l11.916 1.166c.325.026 1-.039 1.25-.25.252-.21.89-.842.917-1.166l.833-8.084-3.073-3.557z"
                      transform="translate(352 156.5)"
                    ></path>
                    <path
                      fillRule="nonzero"
                      d="m111.61 22.963-11.604-1.015a2.77 2.77 0 0 1-2.512-2.995L98.88 3.09A2.77 2.77 0 0 1 101.876.58l11.603 1.015a2.77 2.77 0 0 1 2.513 2.994l-1.388 15.862a2.77 2.77 0 0 1-2.994 2.513zm.13-1.494.082.004a1.27 1.27 0 0 0 1.287-1.154l1.388-15.862a1.27 1.27 0 0 0-1.148-1.37l-11.604-1.014a1.27 1.27 0 0 0-1.37 1.15l-1.387 15.86a1.27 1.27 0 0 0 1.149 1.37l11.603 1.016z"
                      transform="translate(352 156.5)"
                    ></path>
                  </g>
                </g>
              </svg>
              Photo/video
            </Button>
            <input
              ref={fileRef}
              name="img"
              onChange={(e) => {
                setpostimg(e.target.files[0]);
              }}
              type="file"
              accept=".jpg,.jpeg,.png"
              style={{ display: "none" }}
            />

            <Button className="downbt">
              <svg
                fill="#f7b928"
                viewBox="0 0 24 24"
                width="24px"
                height="24px"
                className="svgdown"
              >
                <g fillRule="evenodd" transform="translate(-444 -156)">
                  <g>
                    <path
                      d="M107.285 13c.49 0 .841.476.712.957-.623 2.324-2.837 4.043-5.473 4.043-2.636 0-4.85-1.719-5.473-4.043-.13-.48.222-.957.712-.957h9.522z"
                      transform="translate(353.5 156.5)"
                    ></path>
                    <path
                      fillRule="nonzero"
                      d="M114.024 11.5c0 6.351-5.149 11.5-11.5 11.5s-11.5-5.149-11.5-11.5S96.173 0 102.524 0s11.5 5.149 11.5 11.5zm-2 0a9.5 9.5 0 1 0-19 0 9.5 9.5 0 0 0 19 0z"
                      transform="translate(353.5 156.5)"
                    ></path>
                    <path
                      d="M99.524 8.5c0 .829-.56 1.5-1.25 1.5s-1.25-.671-1.25-1.5.56-1.5 1.25-1.5 1.25.671 1.25 1.5m8.5 0c0 .829-.56 1.5-1.25 1.5s-1.25-.671-1.25-1.5.56-1.5 1.25-1.5 1.25.671 1.25 1.5m-.739 4.5h-9.522c-.49 0-.841.476-.712.957.623 2.324 2.837 4.043 5.473 4.043 2.636 0 4.85-1.719 5.473-4.043.13-.48-.222-.957-.712-.957m-2.165 2c-.667.624-1.592 1-2.596 1a3.799 3.799 0 0 1-2.596-1h5.192"
                      transform="translate(353.5 156.5)"
                    ></path>
                  </g>
                </g>
              </svg>
              Feeling/Activity
            </Button>
          </div>
        )}
      </div>

      {post.length === 0 ? (
        <>
          <Postskel />
          <Postskel /> <Postskel />
          <Postskel />
        </>
      ) : (
        post.map((a, i) => <Postcard key={i} data={a} ctp={childtoparent} />)
      )}
      <button
        style={{ margin: "auto", padding: "10px", display: "flex" }}
        onClick={() => {
          refresh();
        }}
      >
        next {page}
      </button>
      {console.log(page)}
    </>
  );
};

export default Main;
