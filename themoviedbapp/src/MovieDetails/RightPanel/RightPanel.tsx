import Keywords from "./Keywords";
import OtherTitleDetails from "../OtherTitleDetails";
import SocialMediaLinks from "./SocialMediaLinks";
import './rightpanel.css'

interface OtherDetails {
    status: string,
    revenue: number,
    budget: number,
    homepage: string,
    original_language: string
}

interface Props {
    otherTitleDetails: OtherDetails | null,
    titleID: string
}

function RightPanel({ otherTitleDetails, titleID }: Props) {
    if (otherTitleDetails != null) {
        const formatDollars: Function = (amount: number): string => {
            return amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
        }
        const languageCode: string = otherTitleDetails?.original_language;
        const languageCodeToEnglish = new Intl.DisplayNames(['en'], { type: 'language' }).of(languageCode);
        return (
            <div className="rightPanel">
                <div className="titleFacts">
                    <SocialMediaLinks otherTitleDetails={otherTitleDetails} />
                    <div className="titleStatus">
                        <div className="status">
                            <span><b>Status</b></span>
                            <span>{otherTitleDetails?.status}</span>
                        </div>
                        <div className="originalLanguage">
                            <span><b>Original Language</b></span>
                            <span>{languageCodeToEnglish}</span>
                        </div>
                        <div className="budget">
                            <span><b>Budget</b></span>
                            <span>{formatDollars(otherTitleDetails?.budget)}</span></div>
                        <div className="revenue">
                            <span><b>Revenue</b></span>
                            <span>{formatDollars(otherTitleDetails?.revenue)}</span></div>
                    </div>
                    <Keywords titleID={titleID} />
                </div>
                <div className="contributors"></div>
            </div>
        )
    }
    else { return (<></>) }
}
export default RightPanel;