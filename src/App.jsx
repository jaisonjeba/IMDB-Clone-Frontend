import "./App.css";
import { MovieList } from "./MovieList";
import { Routes, Route } from "react-router-dom";
import { MovieDetails } from "./MovieDetails";
import { EditMovie } from "./EditMovies";
import { NavBar } from "./NavBar";
import { AddMovie } from "./AddMovie";

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<MovieList />} />
        <Route path="/movies/:id" element={<MovieDetails />} />
        <Route path="/edit/:id" element={<EditMovie />} />
        <Route path="/addmovie" element={<AddMovie />} />
      </Routes>
    </div>
  );
}

export default App;
