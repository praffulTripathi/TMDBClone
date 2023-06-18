import FacebookSVG from '../../assets/facebook-logo.svg'
import TwitterSVG from '../../assets/twitter-logo.svg'
import InstaSVG from '../../assets/insta-logo.svg'
import HomepageLinkSVG from '../../assets/homepage-link.svg'
import './socialMediaLinks.css'

interface OtherDetails {
    status: string,
    revenue: number,
    budget: number,
    homepage: string,
    original_language: string
}

interface Props {
    otherTitleDetails: OtherDetails | null
}

function SocialMediaLinks({otherTitleDetails}:Props){
    if(otherTitleDetails!=null){
        return(
            <div className="socialMediaLinks">
                <div className="socialLink">
                    <img src={FacebookSVG} className="socialSVG"></img>
                </div>
                <div className="socialLink">
                    <img src={TwitterSVG} className="socialSVG"></img>
                </div>
                <div className="socialLink">
                    <img src={InstaSVG} className="socialSVG"></img>
                </div>
                <div className="socialLink">
                    <img src={HomepageLinkSVG} className="socialSVG homepage"></img>
                </div>
            </div>
        )
    }
    else return(<></>)
}
export default SocialMediaLinks;