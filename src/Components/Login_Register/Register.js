import { useState } from "react";
import "./Register.css";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import CloseIcon from "@mui/icons-material/Close";
import AlertTitle from "@mui/material/AlertTitle";

function Register(props) {
  const [error, seterror] = useState({
    statue: false,
    msg: "",
    type: ""
  });
  const [regloding, setregloding] = useState(false);
  const [user, setuser] = useState({
    firstname: "",
    surname: "",
    email: "",
    username: "",
    password: "",
    date: "",
    month: "",
    year: "",
    gender: ""
  });

  const handlechange = (e) => {
    const { name, value } = e.target;
    setuser({
      ...user,
      [name]: value
    });
  };

  const register = async (e) => {
    e.preventDefault();
    if (
      user.firstname &&
      user.surname &&
      user.email &&
      user.username &&
      user.date &&
      user.password &&
      user.month &&
      user.year &&
      user.gender
    ) {
      setregloding(true);
      let regresult = await fetch(
        `${process.env.REACT_APP_API}/auth/register`,
        {
          method: "post",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify(user)
        }
      );

      regresult = await regresult.json();
      // console.log(regresult);
      if (regresult.error) {
        seterror({
          status: true,
          msg: regresult.error,
          type: "error"
        });
      } else {
        seterror({
          status: true,
          msg: `Register successfully "${regresult.email}" now login !`,
          type: "success"
        });
      }
      setuser({
        firstname: "",
        surname: "",
        email: "",
        username: "",
        password: "",
        date: "",
        month: "",
        year: "",
        gender: ""
      });
      setregloding(false);
    } else {
      seterror({ status: true, msg: "All field are required", type: "error" });
    }
  };
  return (
    props.trigger && (
      <>
        <div className="reg_form">
          {error.status === true && (
            <div className="regerror">
              <Alert severity={error.type}>
                <AlertTitle>
                  <b>{error.type}</b>
                </AlertTitle>
                {error.msg}
                <CloseIcon onClick={() => seterror(false)} className="regerr" />
              </Alert>
            </div>
          )}
          <form onSubmit={register}>
            <img
              alt=""
              onClick={() => {
                props.settrigger(false);
                seterror(false);
              }}
              className="regcanbtn"
              src="https://static.xx.fbcdn.net/rsrc.php/v3/y2/r/__geKiQnSG-.png"
            />
            <div className="reg_top">
              <h2 className="first_title">Sign Up</h2>
              <p className="first_sub_title">It's quick and easy.</p>
            </div>
            <hr className="regphr" />

            <div className="input">
              <input
                type="text"
                name="firstname"
                placeholder="First name"
                className="fna all"
                value={user.firstname}
                onChange={handlechange}
              />
              <input
                type="text"
                name="surname"
                placeholder="Surname"
                className="sure_name all"
                value={user.surname}
                onChange={handlechange}
              />
              <br />
              <input
                type="email"
                name="email"
                placeholder="Email address"
                className="all1"
                value={user.email}
                onChange={handlechange}
              />
              <br />
              <input
                type="text"
                name="username"
                placeholder="Username"
                className="all1"
                value={user.username}
                onChange={handlechange}
              />
              <br />
              <input
                type="password"
                name="password"
                placeholder="New password"
                className="all1"
                value={user.password}
                onChange={handlechange}
              />
              <br />
            </div>

            <p className="sub_title_2" id="sub_title">
              Date of Birth
            </p>
            <select name="date" value={user.date} onChange={handlechange}>
              <option>Date</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>6</option>
              <option>7</option>
              <option>8</option>
              <option>9</option>
              <option>10</option>
              <option>11</option>
              <option>12</option>
              <option>13</option>
              <option>14</option>
              <option>15</option>
              <option>16</option>
              <option>17</option>
              <option>18</option>
              <option>19</option>
              <option>20</option>
              <option>21</option>
              <option>22</option>
              <option>23</option>
              <option>24</option>
              <option>25</option>
              <option>26</option>
              <option>27</option>
              <option>28</option>
              <option>29</option>
              <option>30</option>
              <option>31</option>
            </select>
            <select name="month" value={user.month} onChange={handlechange}>
              <option>Month</option>
              <option>Jan</option>
              <option>Feb</option>
              <option>Mar</option>
              <option>Apr</option>
              <option>May</option>
              <option>Jun</option>
              <option>Jul</option>
              <option>Aug</option>
              <option>Sep</option>
              <option>Oct</option>
              <option>Nov</option>
              <option>Dec</option>
            </select>
            <select name="year" value={user.year} onChange={handlechange}>
              <option>Year</option>
              <option>2022</option>
              <option>2021</option>
              <option>2020</option>
              <option>2019</option>
              <option>2018</option>
              <option>2017</option>
              <option>2016</option>
              <option>2015</option>
              <option>2014</option>
              <option>2013</option>
              <option>2012</option>
              <option>2011</option>
              <option>2010</option>
              <option>2009</option>
              <option>2008</option>
              <option>2007</option>
              <option>2006</option>
              <option>2005</option>
              <option>2004</option>
              <option>2003</option>
              <option>2002</option>
              <option>2001</option>
              <option>2000</option>
              <option>1999</option>
              <option>1998</option>
              <option>1997</option>
              <option>1996</option>
            </select>

            <br />
            <p className="sub_title_3" id="sub_title">
              Gender
            </p>

            <div className="female all_gender">
              <label className="gender" htmlFor="female">
                Female
              </label>
              <input
                type="radio"
                id="female"
                name="gender"
                value="female"
                checked={user.gender === "female"}
                onChange={handlechange}
              />
            </div>
            <div className="male all_gender">
              <label className="gender" htmlFor="male">
                Male
              </label>
              <input
                type="radio"
                id="male"
                name="gender"
                value="male"
                checked={user.gender === "male"}
                onChange={handlechange}
              />
            </div>
            <div className="other all_gender">
              <label className="gender" htmlFor="other">
                Custom
              </label>
              <input
                type="radio"
                id="other"
                name="gender"
                value="other"
                checked={user.gender === "other"}
                onChange={handlechange}
              />
            </div>
            <br />
            {/* <p className="sub_title_4">
              People who use our service may have uploaded your contact
              information to Facebook.
              <a href="#">Learn more.</a>
            </p>
            <p className="sub_title_4 tnc">
              By clicking Sign Up, you agree to our
              <a href="#"> Terms, Data Policy</a> and
              <a href="">Cookie</a>
              Policy. You may receive SMS notifications from us and can opt out
              at any time.
            </p> */}
            <div className="subbtn">
              {!regloding ? (
                <button type="submit" className="submit">
                  Register
                </button>
              ) : (
                <button type="submit" className="submit" disabled>
                  <CircularProgress className="regspin" />
                </button>
              )}
            </div>
          </form>
        </div>
      </>
    )
  );
}

export default Register;
