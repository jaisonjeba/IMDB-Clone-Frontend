import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMovieFromserver } from "./slice";
import "./MovieList.css";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import DoneIcon from "@mui/icons-material/Done";
import { useNavigate } from "react-router-dom";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import LinearProgress from "@mui/material/LinearProgress";

export const MovieList = () => {
  const { moviesList, isLoading } = useSelector((state) => state.movies);
  const [change, setchange] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMovieFromserver());
  }, [dispatch]);
  return (
    <div>
      {isLoading ? (
        <LinearProgress />
      ) : (
        <div className="main-container">
          <h1>What to watch</h1>
          <h2 className="topic-picks">
            Top Picks <ArrowForwardIosRoundedIcon style={{ color: "white" }} />
          </h2>
          <p>TV shows and movies just for you</p>
          <div className="movielist-container">
            {moviesList &&
              moviesList.map((movie) => (
                <div key={movie._id} className="movie-card">
                  <img src={movie.image} alt={movie.name} />
                  <div className="card-content">
                    <div>⭐ {movie.rating}</div>
                    <h3>{movie.name}</h3>
                    <div
                      className="watchlist"
                      onClick={() => setchange(!change)}
                    >
                      {change ? <AddIcon /> : <DoneIcon />}
                      WatchList
                    </div>
                    <div className="card-action">
                      <div
                        className="trailer-btn"
                        onClick={() => navigate(`/movies/${movie._id}`)}
                      >
                        <PlayArrowRoundedIcon />
                        Trailer
                      </div>
                      <IconButton
                        onClick={() => navigate(`edit/${movie._id}`)}
                        style={{ color: "white" }}
                      >
                        <EditIcon />
                      </IconButton>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};
