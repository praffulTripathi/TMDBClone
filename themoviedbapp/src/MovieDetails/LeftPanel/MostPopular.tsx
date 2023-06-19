import { LazyLoadImage } from "react-lazy-load-image-component"
import { Image, Video, openVideoInModal } from "./Media"
import { CSSProperties } from "react";
import PlaySVG from '../../assets/play.svg'

interface Props {
    mostPopular: [Video, Image, Image] | null
}
function MostPopular({ mostPopular }: Props) {
    const updateText: HTMLElement | null = document.querySelector(`.updateViewAllText`);
    if (updateText)
        updateText.innerHTML = "";
    if (mostPopular) {
        return (
            <div className="popularMedia scrollbar">
                <div className="video" onClick={(event)=>(openVideoInModal(mostPopular[0].streaming_path))}>
                    <img src={mostPopular[0].thumbnail_path} className="videoThumbnail"></img>
                    <div className="playButton">
                        <img className="playButtonSVG" src={PlaySVG}></img> 
                    </div>
                </div>
                <div className="backdrop">
                    <LazyLoadImage className="backdrop" src={mostPopular[1].image_path} alt='backdrop' loading='lazy' />
                </div>
                <div className="poster">
                    <LazyLoadImage className="poster" src={mostPopular[2].image_path} alt='poster' loading='lazy' />
                </div>
            </div>
        )
    }
    else return (<></>)
}
export default MostPopular
