import { useParams, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMoviebyid } from "./slice";
import "./MovieDetails.css";
import LinearProgress from "@mui/material/LinearProgress";

export function MovieDetails() {
  const { id } = useParams();
  const { selectedMovie, isLoading } = useSelector((state) => state.movies);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMoviebyid(id));
  }, [id, dispatch]);

  return (
    <div>
      {isLoading ? (
        <LinearProgress />
      ) : (
        <div className="information-container">
          <div className="movie-detail-backButton">
            <Button
              variant="contained"
              color="secondary"
              size="small"
              onClick={() => navigate("/")}
              startIcon={<KeyboardBackspaceIcon fontSize="small" />}
            >
              Back
            </Button>
          </div>
          <div className="trailer-container">
            <iframe
              className="trailer"
              width="800"
              height="500"
              src={selectedMovie.trailer}
              title={selectedMovie.name}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            ></iframe>
          </div>
          <div className="movie-detail-container">
            <img src={selectedMovie.image} alt={selectedMovie.name} />
            <div className="specs">
              <h2 className="movie-title">{selectedMovie.name}</h2>
              <h4 className="movie-title">{`Release date: ${selectedMovie.release_date}`}</h4>
              <p className="rating">{`Rating: ${selectedMovie.rating}`}</p>
              <p>{`Director: ${selectedMovie.director}`}</p>
              <p>{`Hero: ${selectedMovie.hero}`}</p>
              <p>{`Heroine: ${selectedMovie.heroine}`}</p>
              <p>{`Villian: ${selectedMovie.villian}`}</p>
              <p>{`story: ${selectedMovie.description}`}</p>
            </div>
            <p>{selectedMovie.summary}</p>
          </div>
        </div>
      )}
    </div>
  );
}
