import { useState, useEffect, useRef } from "react";
import "./Messages.css";
import { useSelector } from "react-redux";
import { selectUser } from "../../../Features/Userslice";
import Chatbox from "../Subcomp/Chatbox";
import IconButton from "@mui/material/IconButton";
import CircularProgress from "@mui/material/CircularProgress";
import SendIcon from "@mui/icons-material/Send";
import { format } from "timeago.js";
import { io } from "socket.io-client";
import Onlineuser from "../Subcomp/Onlineuser";
import { Avatar } from "@material-ui/core";
import Skeleton from "@mui/material/Skeleton";
import { useNavigate, useLocation } from "react-router-dom";

const Message = () => {
  const userdata = useSelector(selectUser);
  const [conversation, setconversation] = useState();
  const [message, setmessage] = useState([]);
  const [currentchat, setcurrentchat] = useState(null);
  const [chat, setchat] = useState();
  const [arrivalmsg, setarrivalmsg] = useState(null);
  const [loading, setloading] = useState(false);
  const [onlineusers, setonlineusers] = useState([]);
  const [userd, setuserd] = useState();

  const socket = useRef();
  const scrollRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    conv();
  }, []);
  useEffect(() => {
    location.state && setcurrentchat(location.state.send_msgid);
  }, [location]);
  useEffect(() => {
    // socket.current = io(`${process.env.REACT_APP_SOCKIT}`);
    socket.current.on("getmessage", (data) => {
      setarrivalmsg({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now()
      });
    });
  }, []);

  useEffect(() => {
    arrivalmsg &&
      currentchat?.members.includes(arrivalmsg.sender) &&
      setmessage((p) => [...p, arrivalmsg]);
  }, [arrivalmsg, currentchat]);

  useEffect(() => {
    const lcs = sessionStorage.getItem("socket");
    if (!lcs) {
      socket.current.emit("adduser", userdata.user._id);
      sessionStorage.setItem("socket", "socket");
      console.log("no lcs");
    } else {
      console.log(" lcs");
    }

    socket.current.on("getusers", (users) => {
      // console.log("totalusers", users);
      setonlineusers(
        userdata.user.followings.filter((f) =>
          users.some((u) => u.userId === f)
        )
      );
    });
  }, [userdata.user]);

  const conv = () => {
    fetch(`${process.env.REACT_APP_API}/conversation/${userdata.user._id}`, {
      method: "GET",
      header: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then((res) => res.json())
      .then((res2) => {
        setconversation(res2.data);
        // console.error("alluser", res2);
      });
  };
  useEffect(() => {
    const getmessage = () => {
      fetch(`${process.env.REACT_APP_API}/message/${currentchat?._id}`, {
        method: "GET",
        header: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
        .then((res) => res.json())
        .then((res2) => {
          // console.error("msg", res2.data);
          setmessage(res2.data);
        });
    };
    const getuserinfo = () => {
      fetch(
        `${process.env.REACT_APP_API}/user/finduser?userid=${currentchat?.members[1]}`,
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
          setuserd(res2.data);
          // console.error("userdata", res2);
        });
    };
    getuserinfo();
    getmessage();
  }, [currentchat]);

  const sendchat = async () => {
    setloading(true);

    const receiverId = currentchat.members.find((m) => m !== userdata.user._id);
    socket.current.emit("sendmessage", {
      senderId: userdata.user._id,
      receiverId,
      text: chat
    });
    await fetch(`${process.env.REACT_APP_API}/message/`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        conversationId: currentchat._id,
        sender: userdata.user._id,
        text: chat
      })
    })
      .then((res) => res.json())
      .then((res) => {
        res.data && setmessage([...message, res.data]);
        // console.log(res);
      });
    setchat("");
    setloading(false);
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView();
  }, [message]);
  return (
    <div className="messages_sesc">
      {/* left */}
      <div className="messages_sesc1">
        <div className="messages_left1">Chats</div>
        <div className="messages_left2">
          {conversation?.map((data) => (
            <div onClick={() => setcurrentchat(data)}>
              <Chatbox conv={data} />
            </div>
          ))}
        </div>
      </div>
      {/* middle */}
      <div className="messages_sesc2">
        {!currentchat ? (
          "asd"
        ) : (
          <>
            <div className="messages_middle1">
              <div>
                <Avatar src={userd?.profilePicture} />
              </div>

              <div className="message_usernol">
                <div className="message_usernol1">
                  {!userd ? (
                    <Skeleton
                      animation="wave"
                      height={40}
                      width={200}
                      style={{ marginTop: "-11px" }}
                    />
                  ) : (
                    userd?.firstname + " " + userd?.surname
                  )}
                </div>
                <div className="message_usernol2">
                  {!userd ? (
                    <Skeleton
                      animation="wave"
                      height={20}
                      width={100}
                      style={{ marginTop: "-7px" }}
                    />
                  ) : (
                    userd?.username
                  )}
                </div>
              </div>
            </div>
            <div className="messages_middle2">
              {message.map((a) => (
                <div
                  ref={scrollRef}
                  className={`messages_pop ${
                    userdata.user._id === a.sender ? "message1" : "message2"
                  }`}
                >
                  <div>{a.text}</div>
                  <div className="smg_ttime">{format(a.createdAt)}</div>
                </div>
              ))}
            </div>

            <div className="messages_middle3">
              <div className="postmsgsetbtn">
                <input
                  className="txtmsgpost"
                  type="text"
                  placeholder="Type a message"
                  value={chat}
                  onChange={(e) => setchat(e.target.value)}
                />
                {chat?.length > 1 &&
                  (loading ? (
                    <CircularProgress
                      className="likespnr"
                      style={{ margin: "5px" }}
                    />
                  ) : (
                    <IconButton onClick={sendchat}>
                      <SendIcon style={{ color: "#0571ed", width: 20 }} />
                    </IconButton>
                  ))}
              </div>
            </div>
          </>
        )}
      </div>
      {/* right */}
      <div className="messages_sesc3">
        {onlineusers.length > 0 && <Onlineuser users={onlineusers} />}
      </div>
    </div>
  );
};
export default Message;
