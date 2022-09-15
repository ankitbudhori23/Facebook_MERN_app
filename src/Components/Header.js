import { Avatar } from "@material-ui/core";
import { Link, Outlet } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MessageIcon from "@material-ui/icons/Message";
import "./Header.css";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../Features/Userslice";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { logout } from "../Features/Userslice";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [userinfo, openuserinfo] = useState(false);
  const [headerstage, setheaderstage] = useState(0);
  const userdata = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cookies, , removeCookie] = useCookies(["token"]);

  const Logout = () => {
    dispatch(logout());
    removeCookie(["token"]);
    localStorage.removeItem("user");
  };
  return (
    <>
      <div className="Navbar">
        <div className="left">
          <Link to="/">
            <svg
              aria-label="Facebook logo"
              className="logo"
              viewBox="0 0 120 24"
              width="120"
            >
              <path d="m109.202 14.864 4.404-7.03h4.746l-4.622 7.278 4.808 7.463h-4.746l-4.59-7.215v7.215h-4.467V.433l4.467-.402v14.833ZM98.596 14.524c0-1.951-.807-3.5-2.885-3.5s-2.885 1.549-2.885 3.5v1.363c0 1.95.807 3.499 2.885 3.499s2.885-1.549 2.885-3.5v-1.362ZM88.36 15.577v-.743c0-4.243 2.42-7.309 7.351-7.309s7.351 3.066 7.351 7.309v.743c0 4.242-2.42 7.308-7.351 7.308-4.932 0-7.351-3.066-7.351-7.308ZM82.406 14.524c0-1.951-.807-3.5-2.884-3.5-2.079 0-2.885 1.549-2.885 3.5v1.363c0 1.95.806 3.499 2.885 3.499 2.077 0 2.884-1.549 2.884-3.5v-1.362Zm-10.235 1.053v-.743c0-4.243 2.419-7.309 7.35-7.309 4.932 0 7.352 3.066 7.352 7.309v.743c0 4.242-2.42 7.308-7.352 7.308-4.931 0-7.35-3.066-7.35-7.308ZM66.216 14.648c0-2.075-.806-3.623-2.946-3.623-1.83 0-2.823 1.3-2.823 3.406v1.548c0 2.106.993 3.407 2.823 3.407 2.14 0 2.946-1.549 2.946-3.623v-1.115Zm4.467 1.022c0 4.118-1.985 7.215-6.08 7.215-2.233 0-3.783-1.115-4.404-2.539v2.23h-4.218V.434L60.447.03v9.848c.651-1.3 2.078-2.354 4.157-2.354 4.094 0 6.079 3.097 6.079 7.216v.929ZM44.723 13.843h5.397v-.372c0-1.61-.651-2.88-2.606-2.88-2.016 0-2.791 1.27-2.791 3.252m-4.466 1.92v-1.301c0-4.18 2.388-6.937 7.257-6.937 4.59 0 6.607 2.787 6.607 6.875v2.353h-9.398c.093 2.014.992 2.912 3.474 2.912 1.675 0 3.443-.341 4.745-.898l.807 3.065c-1.179.62-3.598 1.084-5.738 1.084-5.645 0-7.754-2.818-7.754-7.153M35.388 7.525c1.737 0 3.38.372 4.28.991l-.992 3.159c-.683-.34-1.8-.682-2.978-.682-2.42 0-3.474 1.394-3.474 3.778v.868c0 2.384 1.055 3.778 3.474 3.778 1.179 0 2.295-.34 2.978-.682l.992 3.16c-.9.618-2.543.99-4.28.99-5.242 0-7.63-2.818-7.63-7.34v-.68c0-4.522 2.388-7.34 7.63-7.34M15.973 15.732c0 2.198.806 3.654 2.884 3.654 1.83 0 2.76-1.332 2.76-3.438v-1.486c0-2.106-.93-3.437-2.76-3.437-2.078 0-2.884 1.455-2.884 3.654v1.053Zm-4.467-.991c0-4.119 1.954-7.216 6.049-7.216 2.233 0 3.598 1.146 4.249 2.57v-2.26h4.28v14.74h-4.28v-2.23c-.62 1.425-2.016 2.54-4.25 2.54-4.094 0-6.048-3.097-6.048-7.215v-.93ZM9.274 3.592c-1.396 0-1.8.62-1.8 1.982v2.26h3.723l-.372 3.655h-3.35v11.086H3.009V11.49H0V7.835h3.009V5.636C3.009 1.951 4.497 0 8.654 0c.9 0 1.954.062 2.605.155v3.437H9.274Z"></path>
            </svg>
          </Link>
        </div>

        <div className="search">
          <span className="searchicon">
            <SearchIcon />
          </span>
          <input type="text" placeholder="Search Facebook" />
        </div>

        <div className="Right">
          <IconButton
            className="bell_iconhead"
            onClick={() => navigate("/messenger")}
          >
            <MessageIcon style={{ fill: "#000000bd" }} />
          </IconButton>
          <IconButton className="bell_iconhead">
            <NotificationsIcon style={{ fill: "#000000bd" }} />
          </IconButton>
          <IconButton>
            <Avatar
              alt=""
              src={userdata.user.profilePicture}
              onClick={() => {
                openuserinfo(!userinfo);
                setheaderstage(0);
              }}
            />
          </IconButton>
        </div>
      </div>
      {userinfo && (
        <div
          className="user_info_main"
          onClick={() => {
            openuserinfo(false);
          }}
        >
          <div className="user_info_box" onClick={(e) => e.stopPropagation()}>
            {headerstage === 0 && (
              <>
                <div className="top">
                  <MenuItem
                    className="prosmit"
                    onClick={() => {
                      navigate(`/profile/${userdata.user.username}`);
                      openuserinfo(false);
                    }}
                  >
                    <div className="user_icon">
                      <Avatar
                        className="icon"
                        alt=""
                        src={userdata.user.profilePicture}
                      />
                    </div>
                    <div className="user_name">
                      {userdata.user.firstname + " " + userdata.user.surname}
                    </div>
                  </MenuItem>
                  <hr className="hr" />
                  <div className="user_bsap">See all profiles </div>
                </div>

                <MenuItem className="submenu" onClick={() => setheaderstage(1)}>
                  <div>
                    <span className="icon_back">
                      <i data-visualcompletion="css-img" class="gneimcpua"></i>
                    </span>
                    <span className="icon_text">Setting & privacy</span>
                  </div>
                  <ArrowForwardIosIcon className="sub_mic" />
                </MenuItem>

                <MenuItem className="submenu" onClick={() => setheaderstage(2)}>
                  <div>
                    <span className="icon_back">
                      <i data-visualcompletion="css-img" class="gneimcpub"></i>
                    </span>
                    <span className="icon_text">Help & support</span>
                  </div>
                  <ArrowForwardIosIcon className="sub_mic" />
                </MenuItem>

                <MenuItem className="submenu" onClick={() => setheaderstage(3)}>
                  <div>
                    <span className="icon_back">
                      <i data-visualcompletion="css-img" class="gneimcpuc"></i>
                    </span>
                    <span className="icon_text">Diaplay & accessibility</span>
                  </div>
                  <ArrowForwardIosIcon className="sub_mic" />
                </MenuItem>

                <MenuItem className="submenu">
                  <div>
                    <span className="icon_back">
                      <i data-visualcompletion="css-img" class="gneimcpud"></i>
                    </span>
                    <span className="icon_text">Give feedback</span>
                  </div>
                </MenuItem>
                <MenuItem className="submenu" onClick={Logout}>
                  <div>
                    <span className="icon_back">
                      <i data-visualcompletion="css-img" class="gneimcpue"></i>
                    </span>
                    <span className="icon_text">Log Out</span>
                  </div>
                </MenuItem>
              </>
            )}

            {headerstage === 1 && (
              <>
                <IconButton onClick={() => setheaderstage(0)}>
                  <ArrowBackIcon className="sub_mic_back" />
                </IconButton>
                <span className="sub_mnu_head">Setting & privacy</span>

                <MenuItem
                  className="submenu"
                  onClick={() => {
                    navigate("/settings");
                    openuserinfo(false);
                  }}
                >
                  <div>
                    <span className="icon_back">
                      <i data-visualcompletion="css-img" class="gneimcpua"></i>
                    </span>
                    <span className="icon_text">Settings</span>
                  </div>
                </MenuItem>
                <MenuItem className="submenu">
                  <div>
                    <span className="icon_back">
                      <i data-visualcompletion="css-img" class="gneimcpuf"></i>
                    </span>
                    <span className="icon_text">Privacy Checkup</span>
                  </div>
                </MenuItem>
                <MenuItem className="submenu">
                  <div>
                    <span className="icon_back">
                      <i data-visualcompletion="css-img" class="gneimcpug"></i>
                    </span>
                    <span className="icon_text">Privacy Centre</span>
                  </div>
                </MenuItem>
                <MenuItem className="submenu">
                  <div>
                    <span className="icon_back">
                      <i data-visualcompletion="css-img" class="gneimcpuh"></i>
                    </span>
                    <span className="icon_text">Activity log</span>
                  </div>
                </MenuItem>
                <MenuItem className="submenu">
                  <div>
                    <span className="icon_back">
                      <i data-visualcompletion="css-img" class="gneimcpui"></i>
                    </span>
                    <span className="icon_text">Feed preference</span>
                  </div>
                </MenuItem>
                <MenuItem className="submenu">
                  <div>
                    <span className="icon_back">
                      <i data-visualcompletion="css-img" class="gneimcpuj"></i>
                    </span>
                    <span className="icon_text">Language</span>
                  </div>
                </MenuItem>
              </>
            )}

            {headerstage === 2 && (
              <>
                <IconButton onClick={() => setheaderstage(0)}>
                  <ArrowBackIcon className="sub_mic_back" />
                </IconButton>
                <span className="sub_mnu_head">Help & support</span>
                <MenuItem className="submenu">
                  <div>
                    <span className="icon_back">
                      <i data-visualcompletion="css-img" class="gneimcpub"></i>
                    </span>
                    <span className="icon_text">Help Centre</span>
                  </div>
                </MenuItem>
                <MenuItem className="submenu">
                  <div>
                    <span className="icon_back">
                      <i data-visualcompletion="css-img" class="gneimcpuk"></i>
                    </span>
                    <span className="icon_text">Support Inbox</span>
                  </div>
                </MenuItem>
                <MenuItem className="submenu">
                  <div>
                    <span className="icon_back">
                      <i data-visualcompletion="css-img" class="gneimcpul"></i>
                    </span>
                    <span className="icon_text">Report a problem</span>
                  </div>
                </MenuItem>
                <MenuItem className="submenu">
                  <div>
                    <span className="icon_back">
                      <i data-visualcompletion="css-img" class="gneimcpum"></i>
                    </span>
                    <span className="icon_text">Check Wi-Fi connection</span>
                  </div>
                </MenuItem>
              </>
            )}

            {headerstage === 3 && (
              <>
                <IconButton onClick={() => setheaderstage(0)}>
                  <ArrowBackIcon className="sub_mic_back" />
                </IconButton>
                <span className="sub_mnu_head">Diaplay & accessibility</span>

                <div className="submenu_q">
                  <span className="icon_back">
                    <i data-visualcompletion="css-img" class="gneimcpuc"></i>
                  </span>
                  <span className="icon_text test_s">
                    <b>Dark mode</b>
                    <br />
                    <div className="test_s_u">
                      Adjust the appearance of Facebook to reduce glare and give
                      your eyes a break.
                    </div>
                  </span>
                  <div className="darkmd_menu">
                    <label for="darkmode_on">
                      <MenuItem className="submenu">
                        <div>
                          <span className="icon_dmode">Off</span>
                        </div>
                        <input
                          type="radio"
                          id="darkmode_on"
                          name="darkmode"
                          value=""
                          className="dark_radio"
                        />
                      </MenuItem>
                    </label>
                    <label for="darkmode_off">
                      <MenuItem className="submenu">
                        <div>
                          <span className="icon_dmode">On</span>
                        </div>
                        <input
                          type="radio"
                          id="darkmode_off"
                          name="darkmode"
                          value=""
                          className="dark_radio"
                        />
                      </MenuItem>
                    </label>
                    <label for="darkmode_auto">
                      <MenuItem className="submenu_long">
                        <div>
                          <span className="icon_dmode">Automatic</span>
                          <div className="sub_t_dnd">
                            We'll automatically adjust the display based on your
                            device's system settings.
                          </div>
                        </div>
                        <input
                          type="radio"
                          id="darkmode_auto"
                          name="darkmode"
                          value=""
                          className="dark_radio"
                        />
                      </MenuItem>
                    </label>
                  </div>
                </div>

                <div className="submenu_q">
                  <span className="icon_back">
                    <i data-visualcompletion="css-img" class="gneimcpun"></i>
                  </span>
                  <span className="icon_text test_s">
                    <b>Compact mode</b>
                    <br />
                    <div className="test_s_u">
                      Make your font size smaller so that more content can fit
                      on the screen.
                    </div>
                  </span>
                  <div className="darkmd_menu">
                    <label for="compact_off">
                      <MenuItem className="submenu">
                        <div>
                          <span className="icon_dmode">Off</span>
                        </div>
                        <input
                          type="radio"
                          id="compact_off"
                          name="compact"
                          value=""
                          className="dark_radio"
                        />
                      </MenuItem>
                    </label>
                    <label for="compact_on">
                      <MenuItem className="submenu">
                        <div>
                          <span className="icon_dmode">On</span>
                        </div>
                        <input
                          type="radio"
                          id="compact_on"
                          name="compact"
                          value=""
                          className="dark_radio"
                        />
                      </MenuItem>
                    </label>
                  </div>
                </div>
                <MenuItem className="submenu ri">
                  <div>
                    <span className="icon_back">
                      <i data-visualcompletion="css-img" class="gneimcpuo"></i>
                    </span>
                    <span className="icon_text">
                      <b>Keyboard</b>
                    </span>
                  </div>
                </MenuItem>
              </>
            )}
          </div>
        </div>
      )}
      <Outlet />
    </>
  );
};
export default Header;
