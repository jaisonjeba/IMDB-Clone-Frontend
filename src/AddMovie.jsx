import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useFormik } from "formik";
import { addMovietoDb } from "./slice";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import "./AddMovie.css";

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

export function AddMovie() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { handleChange, handleBlur, handleSubmit, touched, values, errors } =
    useFormik({
      initialValues: {
        name: "",
        image: "",
        rating: "",
        description: "",
        trailer: "",
        release_date: "",
        hero: "",
        heroine: "",
        producer: "",
        villian: "",
        director: "",
      },
      validationSchema: formValidationSchema,
      onSubmit: (newMovie) => {
        dispatch(addMovietoDb(newMovie)).then(() => navigate("/"));
      },
    });
  return (
    <div>
      <div className="add-movie-header">
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={() => navigate(-1)}
          startIcon={<KeyboardBackspaceIcon fontSize="small" />}
        >
          Back
        </Button>

        <h2>Add Movie</h2>
      </div>
      <div className="add-movie-container">
        <form onSubmit={handleSubmit} className="add-movie-list">
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
            label="director Name"
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
          <Button variant="contained" type="submit">
            Add Movie
          </Button>
        </form>
      </div>
    </div>
  );
}
