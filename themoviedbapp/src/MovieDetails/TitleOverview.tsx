
import { CSSProperties, useEffect, useRef, useState } from 'react';
import './titleoverview.css'
import ArrowExpandSVG from '../assets/arrow-expand.svg'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Helmet } from 'react-helmet';
import AddToListSvg from '../assets/add-to-list-white.svg'
import FavoriteSvg from '../assets/favorite-white.svg'
import WatchlistSvg from '../assets/watchlist-white.svg'
import YourRatingSvg from '../assets/yourRating-white.svg'
import PlaySvg from '../assets/play.svg'

interface TitleDetails {
    original_title: string,
    poster_path: string,
    backdrop_path: string,
    release_date: string,
    year_of_release: string,
    runtime: string,
    tagline: string,
    genres: Array<string>,
    vote_average: string,
    overview: string,
    original_language: string
}
interface Crew {
    name: string,
    job: string
}
interface ReleaseDateNCertification {
    country: string,
    country_release_date: string,
    content_rating: string
}
interface Props {
    titleInfo: TitleDetails,
    credits: Array<Crew>,
    titleID: string,
    releaseDateAndCertification: ReleaseDateNCertification
}

function TitleOverview({ titleInfo, titleID, credits, releaseDateAndCertification }: Props) {
    let titleWrapperBkgImage: CSSProperties = {};
    titleWrapperBkgImage.backgroundImage = `url(${titleInfo.backdrop_path})`;
    credits = credits.slice(0, Math.min(7, credits.length));
    const blurPoster: Function = () => {
        const visiblePoster: HTMLElement | null = document.querySelector('.visiblePoster');
        visiblePoster?.classList.toggle('isHidden');
        const hiddenBlurredDiv: HTMLElement | null = document.querySelector('.hiddenBlurredDiv');
        hiddenBlurredDiv?.classList.toggle('isBlurActive');
    }
    const unblurPoster: Function = () => {
        const visiblePoster: HTMLElement | null = document.querySelector('.visiblePoster');
        visiblePoster?.classList.toggle('isHidden');
        const hiddenBlurredDiv: HTMLElement | null = document.querySelector('.hiddenBlurredDiv');
        hiddenBlurredDiv?.classList.toggle('isBlurActive');
    }
    const enableDropdown: Function = (listActionToToggle: string) => {
        const dropdownListToToggle: HTMLElement | null = document.getElementById(`${listActionToToggle}-tooltip`);
        dropdownListToToggle?.classList.toggle("displayActions")
    }
    return (
        <div className="titleWrapper">
            <div className="background" style={titleWrapperBkgImage}></div>
            <div className="titleOverview">
                <div className="titlePoster" onMouseOver={(event) => { blurPoster() }} onMouseOut={(event) => { unblurPoster() }}>
                    <div className="visiblePoster">
                        <LazyLoadImage className="titlePosterImage" src={titleInfo.poster_path} alt={titleInfo.original_title} loading='lazy' />
                    </div>
                    <div className="hiddenBlurredDiv">
                        <div className="svgAndText">
                            <img src={ArrowExpandSVG} className="arrowExpandSVG"></img>
                            <span>Expand</span>
                        </div>
                    </div>
                </div>
                <div className="titleInfo">
                    <div className="titleAndYOR">
                        <span className="originalTitle">{titleInfo.original_title}</span>
                        <span className="yearOfRelease">({titleInfo.year_of_release})</span>
                    </div>
                    <div className="genreAndRunTime">
                        <span className="contentRating">{releaseDateAndCertification.content_rating}</span>
                        <span className="titleReleaseDate">{releaseDateAndCertification.country_release_date}</span>
                        <span className="countryOfRelease">&nbsp;{releaseDateAndCertification.country}</span>
                        <div className="genreDotOuter"><div className="dotInner"></div></div>
                        <div className="genres">
                            {
                                titleInfo.genres.map((genre, index) => {
                                    if (index == titleInfo.genres.length - 1)
                                        return (<span className="genre" key={`genre-${index}`}>{genre}</span>);
                                    else return (<span className="genre" key={`genre-${index}`}>{genre},&nbsp;</span>)
                                })
                            }
                        </div>
                        <div className="genreDotOuter"><div className="dotInner"></div></div>
                        <span className="runtime">{titleInfo.runtime}</span>
                    </div>
                    <div className="userscoreAndOtherOptions">
                        <div className="userscore">
                            {titleInfo.vote_average}
                        </div>
                        <div className="userScoreText">
                            User Score
                        </div>
                        <div className="otherOptions">
                            <div className="titleOptions" id='options-add-to-list' onMouseOver={(event) => enableDropdown('options-add-to-list')} onMouseOut={(event) => enableDropdown('options-add-to-list')}>
                                <img src={AddToListSvg} className="titleOptionsSVG"></img>
                                <div className="titleOptionsTooltip" id='options-add-to-list-tooltip'>Add to list</div>
                            </div>
                            <div className="titleOptions" id='options-favorite' onMouseOver={(event) => enableDropdown('options-favorite')} onMouseOut={(event) => enableDropdown('options-favorite')}>
                                <img src={FavoriteSvg} className="titleOptionsSVG"></img>
                                <div className="titleOptionsTooltip" id='options-favorite-tooltip'>Mark as favorite</div>
                            </div>
                            <div className="titleOptions" id='options-watchlist'  onMouseOver={(event) => enableDropdown('options-watchlist')} onMouseOut={(event) => enableDropdown('options-watchlist')}>
                                <img src={WatchlistSvg} className="titleOptionsSVG"></img>
                                <div className="titleOptionsTooltip" id='options-watchlist-tooltip'>Add to your watchlist</div>
                            </div>
                            <div className="titleOptions"  onMouseOver={(event) => enableDropdown('options-rate')} onMouseOut={(event) => enableDropdown('options-rate')}>
                                <img src={YourRatingSvg} className="titleOptionsSVG"></img>
                                <div className="titleOptionsTooltip" id='options-rate-tooltip'>Rate it!</div>
                            </div>
                        </div>
                        <div className="playTrailer">
                            <img src={PlaySvg} className="titleOptionsSVG"></img>
                            <span>Play Trailer</span>
                        </div>
                    </div>
                    <div className="tagline">
                        {titleInfo.tagline}
                    </div>
                    <div className="overview">
                        <div className="overviewHeading">
                            Overview
                        </div>
                        <div className="titleDescription">
                            <p>{titleInfo.overview}</p>
                        </div>
                    </div>
                    <div className="titleCredits">
                        {
                            credits.map((credit, index) => {
                                return (
                                    <div className="jobAndCredit" key={`crew-${index}`}>
                                        <div className="credit">
                                            {credit.name}
                                        </div>
                                        <div className="job">
                                            {credit.job}
                                        </div>
                                    </div>);
                            })}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default TitleOverview;