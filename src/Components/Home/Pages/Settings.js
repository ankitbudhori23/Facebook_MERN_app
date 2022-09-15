import { useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../../Features/Userslice";
import { useDispatch } from "react-redux";
import { login } from "../../../Features/Userslice";

const Profile = () => {
  const [name, setname] = useState();
  const [sname, setsname] = useState();
  const [pass, setpass] = useState();
  const [desc, setdesc] = useState();
  const [ppic, setppic] = useState();
  const [cpic, setcpic] = useState();

  const userdata = useSelector(selectUser);
  const dispatch = useDispatch();

  const submit = async (e) => {
    e.preventDefault();

    // update uer information
    await fetch(`${process.env.REACT_APP_API}/user/${userdata.user._id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userId: userdata.user._id,
        firstname: name,
        surname: sname,
        desc: desc,
        password: pass,
        profilePicture: ppic,
        coverPicture: cpic
      })
    })
      .then((res) => res.json())
      .then((res) => {
        console.error(res);
        dispatch(
          login({
            user: res.user
          })
        );
      });
  };

  // get personal post
  const refresh = () => {
    fetch(`${process.env.REACT_APP_API}/post/${userdata.user._id}`, {
      method: "GET",
      header: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then((res) => res.json())
      .then((res2) => {
        // setpost(res2.data.reverse());
        console.error(res2.data);
      });
  };
  return (
    <>
      <form onSubmit={submit}>
        name
        <input
          type="text"
          value={name}
          onChange={(e) => setname(e.target.value)}
        />
        <br />
        surname
        <input
          type="text"
          value={sname}
          onChange={(e) => setsname(e.target.value)}
        />
        <br />
        pass{" "}
        <input
          type="text"
          value={pass}
          onChange={(e) => setpass(e.target.value)}
        />
        <br />
        desc
        <input
          type="text"
          value={desc}
          onChange={(e) => setdesc(e.target.value)}
        />
        <br />
        pro pic
        <input
          type="text"
          value={ppic}
          onChange={(e) => setppic(e.target.value)}
        />
        <br />
        cover pic
        <input
          type="text"
          value={cpic}
          onChange={(e) => setcpic(e.target.value)}
        />
        <br />
        <input type="submit" />
      </form>
      {userdata.user._id}
    </>
  );
};
export default Profile;
