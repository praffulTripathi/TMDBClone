import { CSSProperties } from "react";
import PlaySVG from '../../assets/play.svg'
import { Video } from "./Media";

interface Props {
    videos: Array<Video>,
    videoPlayerStatus: Boolean
}
function Videos({ videos, videoPlayerStatus }: Props) {
    const updateText: HTMLElement | null = document.querySelector(`.updateViewAllText`);
    const openVideoInModal: Function = (streaming_path: string) => {
        console.log(streaming_path);
        const videoPlayer: HTMLElement | null = document.querySelector(`.videoPlayer`);
        videoPlayer?.classList.toggle('isActive');
    }
    if (updateText)
        updateText.innerHTML = "View All Videos";
    return (
        <div className="titleVideos scrollbar">
            {
                videos.map((video: Video, index: number) => {
                    return (
                        <div className="video" key={`videos-${index}`} onClick={(event) => (openVideoInModal(video.streaming_path))}>
                            <img src={video.thumbnail_path} className="videoThumbnail"></img>
                            <div className="playButton">
                                <img className="playButtonSVG" src={PlaySVG} alt="Play Video"></img>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}
export default Videos;