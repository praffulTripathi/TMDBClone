import './App.css';
import './styles/landingPage.css'
import './styles/header.css'
import './styles/footer.css'
import './styles/body.css'
import './styles/scrollList.css'
import './styles/cards.css'
import { BrowserRouter as Router, Route, redirect, Routes, createBrowserRouter } from 'react-router-dom';
import LandingPage from './LandingPage/LandingPage';
import MovieDetails from './MovieDetails/MovieDetails';


const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path:"/movie/:movieID" || "/tv/:tvID",
    element: <MovieDetails />
  }
]);

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/movie/:movieID" element={<MovieDetails />} />
      <Route path="/tv/:tvID" element={<MovieDetails />} />
    </Routes>
  );
}

export default App;
