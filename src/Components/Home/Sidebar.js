import { useEffect } from "react";
import { Box, Typography, List, ListItem } from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { Link } from "react-router-dom";
import "./Sidebar.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../Features/Userslice";
import { useSelector } from "react-redux";
import { selectUser } from "../../Features/Userslice";
import { useCookies } from "react-cookie";

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userdata = useSelector(selectUser);
  const [cookies, , removeCookie] = useCookies(["token"]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/auth/user_auth`, {
      method: "GET",
      credentials: "include",
      header: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then((res) => res.json())
      .then((res2) => {
        console.warn("userdata", res2);

        if (res2.LogIn !== true) {
          dispatch(logout());
          localStorage.removeItem("user");
        }
      });
    if (!cookies.token) {
      dispatch(logout());
      localStorage.removeItem("user");
      removeCookie(["token"]);
    } else {
      if (cookies.token !== userdata.user._id) {
        dispatch(logout());
        localStorage.removeItem("user");
        removeCookie(["token"]);
      }
    }
  }, []);

  const Logout = () => {
    dispatch(logout());
    removeCookie(["token"]);
    localStorage.removeItem("user");

    fetch(`${process.env.REACT_APP_API}/auth/logout`, {
      method: "post",
      credentials: "include",
      header: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then((res) => res.json())
      .then((res2) => {
        console.warn(res2);
      });

    // navigate("/auth");
  };

  return (
    <Box className="Sidebar">
      <List component="nav" aria-label="main mailbox folder">
        <Link to="/profile">
          <ListItem button className="profilePic">
            {/* <img src={UserGState.info.profile_pic} width="28px" height="28px" /> */}
            <Typography variant="subtitle1">
              {/* {UserGState.info.username} */}
            </Typography>
          </ListItem>
        </Link>
        <Link to="/friends">
          <ListItem button>
            <img
              src="https://static.xx.fbcdn.net/rsrc.php/v3/yx/r/-XF4FQcre_i.png"
              alt="groups"
              width="28px"
              height="28px"
            />
          </ListItem>
        </Link>
        {/* <Link to="/groups"> */}
        <ListItem button>
          <img
            src="https://static.xx.fbcdn.net/rsrc.php/v3/yD/r/mk4dH3FK0jT.png"
            alt="groups"
            width="28px"
            height="28px"
          />
        </ListItem>
        {/* </Link> */}
        <ListItem button>
          <img
            src="https://static.xx.fbcdn.net/rsrc.php/v3/ys/r/9BDqQflVfXI.png"
            alt="groups"
            width="28px"
            height="28px"
          />
        </ListItem>
        <ListItem button>
          <img
            src="https://static.xx.fbcdn.net/rsrc.php/v3/yG/r/A1HlI2LVo58.png"
            alt="groups"
            width="28px"
            height="28px"
          />
        </ListItem>
        <ListItem button>
          <img
            src="https://static.xx.fbcdn.net/rsrc.php/v3/y7/r/AYj2837MmgX.png"
            alt="groups"
            width="28px"
            height="28px"
          />
        </ListItem>
        <ListItem button onClick={Logout}>
          <ExitToAppIcon />
        </ListItem>
      </List>
    </Box>
  );
};
export default Sidebar;
