import { Avatar } from "@material-ui/core";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import { useEffect, useState } from "react";

const Onlineuser = (users) => {
  const [user, setuser] = useState([]);
  useEffect(() => {
    const getuserdata = () => {
      fetch(
        `${process.env.REACT_APP_API}/user/finduser?userid=${users.users}`,
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
          setuser(res2.data);
          console.error("userdata", res2);
        });
    };
    getuserdata();
  }, []);

  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      backgroundColor: "#44b700",
      color: "#44b700",
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      bordeRadius: "50%",
      width: "10px",
      height: "10px"
    }
  }));

  return (
    <div className="onlineuser_page">
      <div className="onlineuser_pagel">
        <StyledBadge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          variant="dot"
        >
          <Avatar src={user?.profilePicture} />
        </StyledBadge>
      </div>
      <div className="onlineuser_pager">
        <div className="onlineuser_pagename">
          {user?.firstname + " " + user?.surname}
        </div>
        <div className="onlineuser_pageuname">{user?._id}</div>
      </div>
    </div>
  );
};
export default Onlineuser;
