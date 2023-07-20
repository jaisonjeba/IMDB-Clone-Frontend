import "./NavBar.css";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import { useNavigate } from "react-router-dom";
import BeenhereRoundedIcon from "@mui/icons-material/BeenhereRounded";
export const NavBar = () => {
  const navigate = useNavigate();
  return (
    <div className="navbar-container">
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/575px-IMDB_Logo_2016.svg.png" />
      <div className="actions-container">
        <BeenhereRoundedIcon />
        <div className="add-movie" onClick={() => navigate("/addmovie")}>
          Add Movie
        </div>
        <AccountCircleRoundedIcon style={{ color: "white" }} />
      </div>
    </div>
  );
};
