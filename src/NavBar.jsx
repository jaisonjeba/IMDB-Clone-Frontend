import "./NavBar.css";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import { useNavigate } from "react-router-dom";
export const NavBar = () => {
  const navigate = useNavigate();
  return (
    <div className="navbar-container">
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/575px-IMDB_Logo_2016.svg.png" />
      <div className="actions-container">
        <div onClick={() => navigate("/addmovie")}>Add Movie</div>
        <AccountCircleRoundedIcon style={{ color: "white" }} />
      </div>
    </div>
  );
};
