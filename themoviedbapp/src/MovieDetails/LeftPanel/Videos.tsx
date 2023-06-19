import { CSSProperties } from "react";
import PlaySVG from '../../assets/play.svg'
import { Video, openVideoInModal } from "./Media";

interface Props {
    videos: Array<Video>
}
function Videos({ videos }:Props) {
    const updateText: HTMLElement | null = document.querySelector(`.updateViewAllText`);
    if (updateText)
        updateText.innerHTML = "View All Videos";
    return (
        <div className="titleVideos scrollbar">
            {
                videos.map((video: Video, index: number) => {
                    return (
                        <div className="video" key={`videos-${index}`} onClick={(event)=>(openVideoInModal(video.streaming_path))}>
                            <img src={video.thumbnail_path} className="videoThumbnail"></img>
                            <div className="playButton">
                                <img className="playButtonSVG" src={PlaySVG}></img>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}
export default Videos;