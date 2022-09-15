import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../../Features/Userslice";
import { useParams } from "react-router";
import Postcard from "../Subcomp/Postcard";
import Postskel from "../Subcomp/Postskel";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { Link, useNavigate } from "react-router-dom";
import "./Profile.css";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import Skeleton from "@mui/material/Skeleton";
import { useDispatch } from "react-redux";
import { login } from "../../../Features/Userslice";
import CircularProgress from "@mui/material/CircularProgress";
import { Avatar } from "@material-ui/core";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import ChatIcon from "@mui/icons-material/Chat";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { storage } from "../../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const Profile = () => {
  const username = useParams().name;
  const userdata = useSelector(selectUser);
  const [paramsdata, setparamsdata] = useState();
  const [userpost, setuserpost] = useState();
  const [alluser, setalluser] = useState();
  const [followed, setfollowed] = useState();
  const [loading, setloading] = useState(false);
  const [loadinga, setloadinga] = useState({
    propic: false,
    coverpic: false
  });

  const [fbox, openfbox] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const profilepicRef = useRef();
  const coverpicRef = useRef();

  useEffect(() => {
    getuserdata();
    getuserpost();
    fetchalluser();
  }, [username]);

  const fetchalluser = () => {
    fetch(`${process.env.REACT_APP_API}/user/`, {
      method: "GET",
      header: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then((res) => res.json())
      .then((res2) => {
        setalluser(res2.data);
        // console.error("alluser", res2);
      });
  };

  // get user personal data with use params
  const getuserdata = () => {
    fetch(`${process.env.REACT_APP_API}/user/finduser?username=${username}`, {
      method: "GET",
      header: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then((res) => res.json())
      .then((res2) => {
        if (res2.data) {
          setparamsdata(res2);
          setfollowed(res2.data._id);
        } else {
          setparamsdata(null);
        }
        // console.error("userdata", res2);
      });
  };

  const getuserpost = () => {
    fetch(`${process.env.REACT_APP_API}/post/${username}`, {
      method: "GET",
      header: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then((res) => res.json())
      .then((res2) => {
        setuserpost(res2.data);
        // console.error("userpost", res2.data);
      });
  };

  const addfriend = async () => {
    setloading(true);
    await fetch(
      `${process.env.REACT_APP_API}/user/${paramsdata.data._id}/follow`,
      {
        method: "put",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userId: userdata.user._id
        })
      }
    )
      .then((res) => res.json())
      .then((res) => {
        // console.log(res);
        dispatch(
          login({
            user: res.data
          })
        );
        // localStorage.setItem("user", JSON.stringify({ user: res.data }));
      });
    setloading(false);
  };

  const removefriend = async () => {
    setloading(true);
    await fetch(
      `${process.env.REACT_APP_API}/user/${paramsdata.data._id}/unfollow`,
      {
        method: "put",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userId: userdata.user._id
        })
      }
    )
      .then((res) => res.json())
      .then((res) => {
        // console.log(res);
        dispatch(
          login({
            user: res.data
          })
        );
        // localStorage.setItem("user", JSON.stringify({ user: res.data }));
      });
    setloading(false);
  };

  const makeconversation = async () => {
    await fetch(`${process.env.REACT_APP_API}/conversation/`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        senderId: userdata.user._id,
        receiverId: followed
      })
    })
      .then((res) => res.json())
      .then((res) => {
        res.data && navigate("/messenger", { state: { send_msgid: res.data } });
        // console.log(res);
      });
  };

  function childtoparent(a) {
    const aa = userpost.filter((item) => item._id != a);
    setuserpost(aa);
  }

  const setprofilepic = async (pic) => {
    if (pic) {
      setloadinga({ propic: true });
      const api = ref(
        storage,
        `${userdata.user.username}/Profile Picture/${pic.name}${new Date()}`
      );
      await uploadBytes(api, pic).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          fetch(`${process.env.REACT_APP_API}/user/${userdata.user._id}`, {
            method: "PUT",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              userId: userdata.user._id,
              profilePicture: url
            })
          })
            .then((res) => res.json())
            .then((res) => {
              getuserdata();
              // console.error(res);
              dispatch(
                login({
                  user: res.user
                })
              );
              // localStorage.setItem("user", JSON.stringify({ user: res.data }));
              setloadinga({ propic: false });
            });
        });
      });
    }
  };
  const setcoverpic = (pic) => {
    setloading(true);
    if (pic) {
      setloadinga({ coverpic: true });
      const api = ref(
        storage,
        `${userdata.user.username}/Cover Picture/${pic.name}${new Date()}`
      );
      uploadBytes(api, pic).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          fetch(`${process.env.REACT_APP_API}/user/${userdata.user._id}`, {
            method: "PUT",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              userId: userdata.user._id,
              coverPicture: url
            })
          })
            .then((res) => res.json())
            .then((res) => {
              getuserdata();
              // console.error(res);
              // localStorage.setItem("user", JSON.stringify({ user: res.data }));
              setloadinga({ coverpic: false });
            });
        });
      });
    }
    setloading(false);
  };

  return (
    <>
      {paramsdata !== null ? (
        <>
          <div className="profile_sectionhead">
            <div className="profile_coverimg">
              {paramsdata ? (
                <>
                  <img
                    className="profile_coverimg"
                    src={paramsdata.data.coverPicture}
                    alt=""
                  />
                  {userdata.user.username === username &&
                    (loadinga.coverpic ? (
                      <Button variant="contained" className="profile_coverchbp">
                        <CircularProgress
                          style={{ width: "24px", height: "24px" }}
                        />
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        className="profile_coverchbp"
                        startIcon={
                          <CameraAltIcon style={{ fill: "#000000bd" }} />
                        }
                        onClick={() => coverpicRef.current.click()}
                      >
                        Edit Cover Photo
                      </Button>
                    ))}
                  <input
                    ref={coverpicRef}
                    name="cover"
                    onChange={(e) => {
                      setcoverpic(e.target.files[0]);
                    }}
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    style={{ display: "none" }}
                  />
                </>
              ) : (
                <Skeleton
                  animation="wave"
                  className="profile_coverimg"
                  variant="rounded"
                />
              )}
              {paramsdata ? (
                <>
                  <img
                    className="profile_profileimg"
                    src={paramsdata.data.profilePicture}
                    alt=""
                  />
                  {userdata.user.username === username &&
                    (loadinga.propic ? (
                      <IconButton className="proiccemr">
                        <CircularProgress
                          style={{ width: "24px", height: "24px" }}
                        />
                      </IconButton>
                    ) : (
                      <IconButton
                        className="proiccemr"
                        onClick={() => profilepicRef.current.click()}
                      >
                        <CameraAltIcon style={{ fill: "#000000bd" }} />
                      </IconButton>
                    ))}
                  <input
                    ref={profilepicRef}
                    name="profile"
                    onChange={(e) => {
                      setprofilepic(e.target.files[0]);
                    }}
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    style={{ display: "none" }}
                  />
                </>
              ) : (
                <Skeleton
                  className="profile_profileimg"
                  animation="wave"
                  variant="circular"
                />
              )}

              <div className="profile_ucat">
                <div className="profile_uname">
                  {paramsdata ? (
                    paramsdata.data.firstname + " " + paramsdata.data.surname
                  ) : (
                    <Skeleton animation="wave" height={70} width={300} />
                  )}
                </div>
                <div className="profile_uname_frnds">
                  {paramsdata ? (
                    <>{paramsdata.friends.length} Friends</>
                  ) : (
                    <Skeleton
                      animation="wave"
                      height={40}
                      width={200}
                      style={{ marginBottom: -20, marginTop: -14 }}
                    />
                  )}
                </div>
              </div>
              <div className="fboxinfop" onMouseLeave={() => openfbox(false)}>
                {fbox && (
                  <div className="fboxopen">
                    {fbox.firstname} {fbox.surname} <br />
                    {fbox.username}
                  </div>
                )}
                <div className="frndsavt">
                  {paramsdata?.friends.map((f) => (
                    <Avatar
                      className="frndsavtz"
                      onMouseEnter={() => openfbox(f)}
                    />
                  ))}
                </div>
              </div>
              <div className="profile_ucatbt">
                {userdata.user.username === username ? (
                  paramsdata && (
                    <>
                      <Button
                        variant="contained"
                        startIcon={<AddCircleIcon />}
                        style={{ marginRight: "10px" }}
                      >
                        Add Story
                      </Button>
                      <Button variant="outlined" startIcon={<EditIcon />}>
                        Edit Profile
                      </Button>
                    </>
                  )
                ) : (
                  <>
                    {userdata.user.followings.includes(followed) ? (
                      loading ? (
                        <Button variant="contained" className="addfbtn">
                          <CircularProgress className="addfloading" />
                        </Button>
                      ) : (
                        paramsdata && (
                          <Button
                            variant="contained"
                            className="addfbtn"
                            onClick={removefriend}
                            startIcon={<PersonRemoveIcon />}
                          >
                            Unfriend
                          </Button>
                        )
                      )
                    ) : loading ? (
                      <Button variant="contained" className="addfbtn">
                        <CircularProgress className="addfloading" />
                      </Button>
                    ) : (
                      paramsdata && (
                        <Button
                          variant="contained"
                          className="addfbtn"
                          onClick={addfriend}
                          startIcon={<PersonAddAlt1Icon />}
                        >
                          Add Friend
                        </Button>
                      )
                    )}
                    {paramsdata && (
                      <Button
                        variant="outlined"
                        onClick={makeconversation}
                        startIcon={<ChatIcon />}
                      >
                        Message
                      </Button>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="profile_sectiontail">
            <div className="profile_sectiontail_left">
              {!userpost ? (
                <Postskel />
              ) : (
                userpost.map((a) => <Postcard data={a} ctp={childtoparent} />)
              )}
            </div>

            <div className="profile_sectiontail_right">
              {paramsdata &&
                paramsdata.friends.map((a) => <div>{a.username}</div>)}

              {alluser &&
                alluser.map((a) => (
                  <>
                    <Link
                      to={`/profile/${a.username}`}
                      onClick={() => setparamsdata()}
                    >
                      {a.username}
                    </Link>
                    <br />
                  </>
                ))}
            </div>
          </div>
        </>
      ) : (
        <div className="unfpsc">User not found</div>
      )}
    </>
  );
};

export default Profile;
