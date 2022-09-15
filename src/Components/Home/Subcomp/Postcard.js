import { Avatar } from "@material-ui/core";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import CircularProgress from "@mui/material/CircularProgress";
import MenuItem from "@mui/material/MenuItem";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../../Features/Userslice";
import SendIcon from "@mui/icons-material/Send";
import { Link } from "react-router-dom";
import { format } from "timeago.js";

const Postcard = (post) => {
  const userdata = useSelector(selectUser);
  const [post_menubtn, openpost_menubtn] = useState(false);
  const [loading, setloading] = useState({
    delete: false,
    comment: false
  });
  const [commbox, opencommbox] = useState(false);
  const [postcmt, setpostcmt] = useState();
  const [comment, setcomment] = useState(post.data.comments);
  const [like, setlike] = useState(post.data.likes.length);
  const [isliked, setisliked] = useState(false);
  const [userimg, setuserimg] = useState();

  useEffect(() => {
    setisliked(post.data.likes.includes(userdata.user._id));
    const getuserimg = () => {
      fetch(
        `${process.env.REACT_APP_API}/user/finduser?userid=${post?.data.userId}`,
        {
          method: "GET",
          header: {
            Accept: "application/json",
            "Content-Type": "application/json"
          }
        }
      )
        .then((res) => res.json())
        .then((res2) => {
          // console.error("userdata", res2.data.profilePicture);
          setuserimg(res2.data.profilePicture);
        });
    };
    getuserimg();
  }, []);

  const editpost = () => {};

  const deletepost = async () => {
    setloading({ delete: true });
    await fetch(`${process.env.REACT_APP_API}/post/${post.data._id}`, {
      method: "delete",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userId: userdata.user._id
      })
    })
      .then((res) => res.json())
      .then((res) => {
        // console.log(res);
        post.ctp(post.data._id);
        openpost_menubtn(false);
      });
    setloading({ delete: false });
  };
  const likepost = async () => {
    setlike(isliked ? like - 1 : like + 1);
    setisliked(!isliked);
    await fetch(`${process.env.REACT_APP_API}/post/${post.data._id}/like`, {
      method: "put",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userId: userdata.user._id
      })
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
      });
  };
  const commentpost = async () => {
    setloading({
      comment: true
    });
    await fetch(`${process.env.REACT_APP_API}/post/${post.data._id}/comment`, {
      method: "put",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userId: userdata.user._id,
        username: userdata.user.username,
        name: userdata.user.firstname + " " + userdata.user.surname,
        comment: postcmt
      })
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);

        res.success &&
          setcomment([
            ...comment,
            {
              userId: userdata.user._id,
              username: userdata.user.username,
              name: userdata.user.firstname + " " + userdata.user.surname,
              comment: postcmt
            }
          ]);
      });
    setpostcmt("");
    setloading({
      comment: false
    });
  };

  const deleteco = async (a) => {
    await fetch(
      `${process.env.REACT_APP_API}/post/${post.data._id}/de-comment`,
      {
        method: "put",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          cmtid: a
          // userId: userdata.user._id,
          // username: userdata.user.username,
          // name: userdata.user.firstname + " " + userdata.user.surname,
          // comment: postcmt
        })
      }
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
      });
  };

  return (
    <>
      <div className="post_area">
        <div className="post_card">
          <div className="post_card_userinfo">
            <div className="post_cinfo_f">
              <div>
                <Avatar src={userimg} />
              </div>
              <div className="pos_uname">
                {/* <div className="post_namu"> */}
                <Link
                  className="post_namu"
                  to={`/profile/${post.data.username}`}
                >
                  {post.data.name} ({post.data.username})
                </Link>
                {/* </div> */}
                <div className="post_namd">{format(post.data.createdAt)}</div>
              </div>
            </div>

            <IconButton onClick={() => openpost_menubtn(true)}>
              <MoreHorizIcon />
            </IconButton>

            {post_menubtn && (
              <div
                className="postmenu_main"
                onClick={() => openpost_menubtn(false)}
              >
                <div
                  className="postmenubtn"
                  onClick={(e) => e.stopPropagation()}
                >
                  {post.data.userId === userdata.user._id && (
                    <>
                      <MenuItem className="menutab" onClick={editpost}>
                        Edit
                      </MenuItem>
                      <MenuItem className="menutab" onClick={deletepost}>
                        {loading.delete ? (
                          <CircularProgress className="likespnr" />
                        ) : (
                          <> Delete </>
                        )}
                      </MenuItem>
                    </>
                  )}
                  <MenuItem className="menutab">Save</MenuItem>
                </div>
              </div>
            )}
          </div>

          <div className="post_card_userheader">{post.data.desc}</div>
          <div className="post_card_userimage">
            {post.data.img && <img alt="not available" src={post.data.img} />}
          </div>
          <div className="post_card_userlike">{like} Likes</div>
          <hr className="hrpost" />
          <div className="post_card_userbtn">
            <Button className="post_serbtn" onClick={likepost}>
              {isliked ? (
                <>
                  <i className="post_iact" />
                  <span style={{ color: "#0571ed" }}>Likes</span>
                </>
              ) : (
                <>
                  <i className="post_i" /> Likes
                </>
              )}
            </Button>
            <Button
              className="post_serbtn"
              onClick={() => opencommbox(!commbox)}
            >
              <i className="post_ia" />
              Comment
            </Button>
            <Button className="post_serbtn">
              <i className="post_ib" />
              Share
            </Button>
          </div>
          {commbox && (
            <>
              <div className="post_card_usermsg">
                <Avatar style={{ width: 32, height: 32, marginRight: 7 }} />
                <div className="postmsgsetbtn">
                  <input
                    className="txtmsgpost"
                    type="text"
                    placeholder="Type a message"
                    value={postcmt}
                    onChange={(e) => setpostcmt(e.target.value)}
                  />
                  {postcmt?.length > 1 &&
                    (loading.comment ? (
                      <CircularProgress
                        className="likespnr"
                        style={{ margin: "5px" }}
                      />
                    ) : (
                      <IconButton onClick={commentpost}>
                        <SendIcon style={{ color: "#0571ed", width: 20 }} />
                      </IconButton>
                    ))}
                </div>
              </div>

              <div className="post_allcomments">
                {comment.map((a) => (
                  <div className="indvconts">
                    <Avatar style={{ width: 32, height: 32, marginRight: 7 }} />
                    <div className="indvcontsmsg">
                      <div className="indvmsgna">
                        {a.name} ({a.username})
                      </div>
                      <div className="indvsfgcam">{a.comment}</div>
                      {/* {a._id} */}
                      <button onClick={() => deleteco(a._id)}>delete</button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Postcard;
