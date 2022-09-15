import { Avatar } from "@material-ui/core";
import { useEffect, useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import Skeleton from "@mui/material/Skeleton";

const Chatbox = (props) => {
  const [userd, setuserd] = useState("");

  useEffect(() => {
    const getuserdata = () => {
      fetch(
        `${process.env.REACT_APP_API}/user/finduser?userid=${props.conv.members[1]}`,
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
          // console.error("userdata", res2.data);
        });
    };

    getuserdata();
  }, []);
  return (
    <MenuItem className="chatbox_xc">
      <div>
        <Avatar
          style={{ width: 40, height: 40, marginRight: 7 }}
          src={userd?.profilePicture}
        />
      </div>

      <div className="chatbox_chatsa">
        <div className="chatbox_chatname">
          {!userd ? (
            <Skeleton animation="wave" height={46} width={170} />
          ) : (
            userd?.firstname + " " + userd?.surname
          )}
        </div>
        <div className="chatbox_chatlstms">{userd?.username}</div>
      </div>
    </MenuItem>
  );
};

export default Chatbox;
