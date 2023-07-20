import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMoviebyid, updateMoviebyId } from "./slice";
import "./EditMovies.css";
import LinearProgress from "@mui/material/LinearProgress";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

const formValidationSchema = yup.object({
  name: yup.string().required(),
  hero: yup.string().required(),
  heroine: yup.string().required(),
  producer: yup.string().required(),
  director: yup.string().required(),
  villian: yup.string().required(),
  image: yup.string().required().url(),
  rating: yup.number().required().min(0).max(10),
  description: yup.string().required().min(20),
  trailer: yup.string().required().url(),
  release_date: yup.string().required(),
});

export function EditMovie() {
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMoviebyid(id));
  }, [dispatch, id]);
  const { isLoading, selectedMovie } = useSelector((state) => state.movies);
  return (
    <div>
      {isLoading ? <LinearProgress /> : selectedMovie && <EditMovieForm />}
    </div>
  );
}

function EditMovieForm() {
  const { selectedMovie } = useSelector((state) => state.movies);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { handleChange, handleBlur, handleSubmit, touched, values, errors } =
    useFormik({
      initialValues: {
        name: selectedMovie.name,
        image: selectedMovie.image,
        rating: selectedMovie.rating,
        description: selectedMovie.description,
        trailer: selectedMovie.trailer,
        release_date: selectedMovie.release_date,
        hero: selectedMovie.hero,
        heroine: selectedMovie.heroine,
        producer: selectedMovie.producer,
        villian: selectedMovie.villian,
        director: selectedMovie.director,
      },
      validationSchema: formValidationSchema,
      onSubmit: async (values) => {
        try {
          console.log("hi");
          await dispatch(
            updateMoviebyId({ movie: values, id: selectedMovie._id })
          );
          navigate("/");
        } catch (error) {
          console.error("Error updating movie:", error);
        }
      },
    });

  return (
    <div>
      <div className="edit-movie-header">
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={() => navigate(-1)}
          startIcon={<KeyboardBackspaceIcon fontSize="small" />}
        >
          Back
        </Button>

        <h2>Edit Movie</h2>
      </div>

      <div className="edit-movie-container">
        <form onSubmit={handleSubmit} className="edit-movie-form">
          <TextField
            name="name"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.name}
            placeholder="Enter Movie Name"
            variant="outlined"
            label="Movie Name"
            size="small"
            helperText={touched.name && errors.name ? errors.name : null}
          />
          <TextField
            name="release_date"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.release_date}
            placeholder="Enter release Date"
            variant="outlined"
            label="Release Date"
            size="small"
            helperText={
              touched.release_date && errors.release_date
                ? errors.release_date
                : null
            }
          />
          <TextField
            name="producer"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.producer}
            placeholder="producer name"
            variant="outlined"
            label="producer Name"
            size="small"
            helperText={
              touched.producer && errors.producer ? errors.producer : null
            }
          />
          <TextField
            name="director"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.director}
            placeholder="Enter director name"
            variant="outlined"
            label="producer Name"
            size="small"
            helperText={
              touched.director && errors.director ? errors.director : null
            }
          />
          <TextField
            name="hero"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.hero}
            placeholder="Enter Hero Name"
            variant="outlined"
            label="Hero Name"
            size="small"
            helperText={touched.hero && errors.hero ? errors.hero : null}
          />
          <TextField
            name="heroine"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.heroine}
            placeholder="Enter Heroine Name"
            variant="outlined"
            label="Heroine Name"
            size="small"
            helperText={
              touched.heroine && errors.heroine ? errors.heroine : null
            }
          />
          <TextField
            name="villian"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.villian}
            placeholder="Enter villian Name"
            variant="outlined"
            label="villian Name"
            size="small"
            helperText={
              touched.villian && errors.villian ? errors.villian : null
            }
          />
          <TextField
            name="image"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.image}
            variant="outlined"
            label="Poster"
            placeholder="paste Image Address"
            size="small"
            helperText={touched.image && errors.image ? errors.image : null}
          />

          <TextField
            name="rating"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.rating}
            variant="outlined"
            label="Rating"
            placeholder="Give Rating"
            size="small"
            helperText={touched.rating && errors.rating ? errors.rating : null}
          />

          <TextField
            name="description"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.description}
            variant="outlined"
            label="Summary"
            placeholder="Add Summary"
            size="small"
          />
          {touched.description && errors.description
            ? errors.description
            : null}
          <TextField
            name="trailer"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.trailer}
            variant="outlined"
            label="Trailer Link"
            placeholder="paste Trailer Link"
            size="small"
            helperText={
              touched.trailer && errors.trailer ? errors.trailer : null
            }
          />
          <Button color="success" variant="contained" type="submit">
            Update
          </Button>
        </form>
      </div>
    </div>
  );
}
