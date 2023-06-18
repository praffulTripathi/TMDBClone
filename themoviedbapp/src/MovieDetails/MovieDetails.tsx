import { useLocation } from "react-router-dom";
import Footer from "../Footer";
import Header from "../Header";
import { useRef } from "react";
import TitleDetails from "./TitleDetails";
import { Helmet } from 'react-helmet';

function MovieDetails() {
  const routeURL: string = useLocation().pathname;
  const titleID = useRef<string>(routeURL.split('/')[2].split('-')[0]);
  const titleName = useRef<string>(routeURL.split('/')[2].split('-')[1]);
  return (
    <>
      <Header />
      <TitleDetails titleID={titleID.current} />
      <Footer />
    </>
  )
}
export default MovieDetails;