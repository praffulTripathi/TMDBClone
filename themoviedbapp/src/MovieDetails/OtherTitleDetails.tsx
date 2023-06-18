import LeftPanel from "./LeftPanel/LeftPanel";
import RightPanel from "./RightPanel/RightPanel";

interface Cast {
    name: string,
    characterName: string,
    castProfilePicture: string
}

interface OtherDetails {
    status: string,
    revenue: number,
    budget: number,
    homepage: string,
    original_language: string
}

interface Props {
    titleCast: Array<Cast>,
    titleID: string,
    otherTitleDetails: OtherDetails | null
}

function OtherTitleDetails({ titleCast, titleID, otherTitleDetails}: Props) {
    titleCast = titleCast.slice(0, 11);
    return (
        <div className="otherDetails">
            <LeftPanel titleCast={titleCast} titleID={titleID}></LeftPanel>
            <RightPanel otherTitleDetails={otherTitleDetails} titleID={titleID}></RightPanel>
        </div>
    )
}
export default OtherTitleDetails;