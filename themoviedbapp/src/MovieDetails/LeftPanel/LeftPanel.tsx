import CastCard from "./CastCard";
import Media from "./Media";
import Recommendations from "./Recommendations";
import Social from "./Social";
import RightArrowSVG from '../../assets/right-arrow.svg'
import '../../styles/social.css'

interface Cast {
    name: string,
    characterName: string,
    castProfilePicture: string
}
interface Props {
    titleCast: Array<Cast>,
    titleID: string,
    videoPlayerStatus: Boolean
}
function LeftPanel({ titleCast, titleID, videoPlayerStatus }: Props) {
    return (
        <div className="leftPanel">
            <div className="topBilledCast">
                <div className="heading">Top Billed Cast</div>
                <div className="titleCast">
                    {
                        titleCast.map((cast, index) => {
                            if (index < 10)
                                return <CastCard cast={cast} key={`cast-${index}`} />
                            else return (
                                <div className="viewMore" key={"viewMore"}>
                                    <span className="viewMoreText">View More</span>
                                    <span className="arrowSVG"><img src={RightArrowSVG} alt="View More"></img></span>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="fullCastNCrew">Full Cast & Crew</div>
            </div>
            <section className="socialSection">
                <Social titleID={titleID} />
            </section>
            <section className="mediaSection">
                <Media titleID={titleID} videoPlayerStatus={videoPlayerStatus} />
            </section>
            <section className="recommendationsSection">
                <Recommendations titleID={titleID} />
            </section>
        </div>
    )
}
export default LeftPanel;