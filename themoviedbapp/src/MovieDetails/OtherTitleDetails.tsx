import LeftPanel from "./LeftPanel/LeftPanel";
import RightPanel from "./RightPanel/RightPanel";
import { StreamingProvider } from "./TitleDetails";

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
    otherTitleDetails: OtherDetails | null,
    videoPlayerStatus: Boolean,
    providers: StreamingProvider|undefined
}

function OtherTitleDetails({ titleCast, titleID, otherTitleDetails, videoPlayerStatus, providers }: Props) {
    titleCast = titleCast.slice(0, 11);
    return (
        <div className="otherDetails">
            <LeftPanel titleCast={titleCast} titleID={titleID} videoPlayerStatus={videoPlayerStatus}></LeftPanel>
            <RightPanel otherTitleDetails={otherTitleDetails} titleID={titleID} providers={providers}></RightPanel>
        </div>
    )
}
export default OtherTitleDetails;