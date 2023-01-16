import { Link, useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./navbar.css";
import { images } from "../../constants";
import { useDispatch, useSelector } from "react-redux";
import { faArrowRightFromBracket} from "@fortawesome/free-solid-svg-icons";
import { logout, LOGOUT_ENDPOINT } from "../../redux/auth/authSlice";
import { greeting } from "../../utils/helpers";

const Navbar = () => {
  const navigate = useNavigate();
  const greetingSentence = greeting();

  const { isAuthenticated, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem("user_data"));

  const onLogout = () => {
    dispatch(logout({ url: LOGOUT_ENDPOINT }))
    navigate('/login', { replace: true });
  };

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" className="logo">
          <img
            src={images.logo}
            alt="Logo"
            className="logo-image"
          />
        </Link>
        <div className="navItems">
          {user ? <span className="greeting">Good {greetingSentence} {user.user.username}</span> : <button className="navButton" onClick={() => navigate("/sign_up", {replace: true})}>Register</button>}
          {
            user
                ?
              <button className="logoutButton" onClick={onLogout}>
                 Log out <FontAwesomeIcon icon={faArrowRightFromBracket} className="logout"/>
              </button>
                :
                <button className="navButton" onClick={() => navigate("/login")}>Login</button>
          }
        </div>
      </div>
    </div>
  )
}

export default Navbar