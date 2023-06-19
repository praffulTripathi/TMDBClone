import FacebookSVG from '../../assets/facebook-logo.svg'
import TwitterSVG from '../../assets/twitter-logo.svg'
import InstaSVG from '../../assets/insta-logo.svg'
import HomepageLinkSVG from '../../assets/homepage-link.svg'
import './socialMediaLinks.css'
import { OtherDetails } from './RightPanel'
import { useEffect, useState } from 'react'
import { getKeyValue, options } from '../../helper'
import { enableDropdown } from '../TitleOverview'

interface ExternalLinks {
    facebook: string,
    twitter: string,
    instagram: string,
    homepage: string
}
interface Props {
    titleID: string,
    homepageLink: string
}

function SocialMediaLinks({ titleID, homepageLink }: Props) {
    const externalLinksURL = `https://api.themoviedb.org/3/movie/${titleID}/external_ids`;
    const [externalLinks, setExternalLinks] = useState<ExternalLinks>({ facebook: '', twitter: '', instagram: '', homepage: homepageLink });

    const getExternalLinks: Function = async (url: string, options: Object) => {
        await fetch(url, options)
            .then(response => response.json())
            .then(response => {
                let faceBookLink: string | undefined = undefined, twitterLink: string | undefined = undefined, instagramLink: string | undefined = undefined;
                getKeyValue(response, "facebook_id") !== undefined ? faceBookLink = "https://www.facebook.com/" + getKeyValue(response, "facebook_id") : faceBookLink = '';
                getKeyValue(response, "instagram_id") !== undefined ? instagramLink = "https://www.instagram.com/" + getKeyValue(response, "instagram_id") : instagramLink = '';
                getKeyValue(response, "twitter_id") !== undefined ? twitterLink = "https://www.twitter.com/" + getKeyValue(response, "twitter_id") : twitterLink = '';
                setExternalLinks({ facebook: faceBookLink, twitter: twitterLink, instagram: instagramLink, homepage: homepageLink });
            })
            .catch(error => console.error(error));
    }
    useEffect(() => {
        getExternalLinks(externalLinksURL, options);
    }, [])
    return (
        <div className="socialMediaLinks">
            {
                externalLinks.facebook !== '' ?
                    <div className="socialLink" onMouseOver={(event) => enableDropdown('options-facebook')} onMouseOut={(event) => enableDropdown('options-facebook')}>
                        <a href={externalLinks.facebook} target="_blank" rel="noopener noreferrer">
                            <img src={FacebookSVG} className="socialSVG"></img>
                        </a>
                        <div className="titleOptionsTooltip socialLinkToolTip" id="options-facebook-tooltip">Visit Facebook</div>
                    </div> : null
            }
            {
                externalLinks.twitter !== '' ?
                    <div className="socialLink" onMouseOver={(event) => enableDropdown('options-twitter')} onMouseOut={(event) => enableDropdown('options-twitter')}>
                        <a href={externalLinks.twitter} target="_blank" rel="noopener noreferrer">
                            <img src={TwitterSVG} className="socialSVG"></img>
                        </a>
                        <div className="titleOptionsTooltip socialLinkToolTip" id="options-twitter-tooltip">Visit Twitter</div>
                    </div> : null
            }
            {
                externalLinks.instagram !== '' ?
                    <div className="socialLink" onMouseOver={(event) => enableDropdown('options-instagram')} onMouseOut={(event) => enableDropdown('options-instagram')}>
                        <a href={externalLinks.instagram} target="_blank" rel="noopener noreferrer">
                            <img src={InstaSVG} className="socialSVG"></img>
                        </a>
                        <div className="titleOptionsTooltip socialLinkToolTip" id="options-instagram-tooltip">Visit Instagram</div>
                    </div> : null
            }
            {
                externalLinks.homepage !== '' ?
                    <div className="socialLink" onMouseOver={(event) => enableDropdown('options-homepage')} onMouseOut={(event) => enableDropdown('options-homepage')}>
                        <a href={externalLinks.homepage} target="_blank" rel="noopener noreferrer">
                            <img src={HomepageLinkSVG} className="socialSVG homepage"></img>
                        </a>
                        <div className="titleOptionsTooltip socialLinkToolTip" id="options-homepage-tooltip">Visit Homepage</div>
                    </div> : null
            }
        </div>
    )
}
export default SocialMediaLinks;