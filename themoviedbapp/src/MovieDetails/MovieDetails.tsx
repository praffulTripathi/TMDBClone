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
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const setIframeSource = (src: string) => {
    if (iframeRef.current) {
      iframeRef.current.src = src;
    }
  };
  return (
    <div className="movieDetails">
      <div className="bodyContents">
        <Header />
        <TitleDetails titleID={titleID.current} />
        <Footer />
      </div>
      <div className="videoPlayer">
      </div>
    </div>
  )
}
export default MovieDetails;