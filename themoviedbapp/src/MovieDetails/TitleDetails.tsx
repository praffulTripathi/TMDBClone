import { useEffect, useState } from "react";
import TitleOverview from "./TitleOverview";
import OtherTitleDetails from "./OtherTitleDetails";
import LandingPageSuspense from "../LandingPageSuspense";
import { Helmet } from "react-helmet";
import { LazyLoadComponent } from "react-lazy-load-image-component";

interface Props {
    titleID: string
}

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
    original_language: string,
}
interface Crew {
    name: string,
    job: string
}
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
interface ReleaseDateNCertification {
    country: string,
    country_release_date: string,
    content_rating: string
}

function TitleDetails({ titleID }: Props) {
    const [titleInfo, setTitleInfo] = useState<TitleDetails | null>(null);
    const [titleCast, setTitleCast] = useState<Array<Cast>>([]);
    const [crewMembers, setCrewMembers] = useState<Array<Crew>>([]);
    const [otherTitleDetails, setOtherTitleDetails] = useState<OtherDetails | null>(null);
    const [releaseDateAndCertification, setReleaseDateAndCertification] = useState<ReleaseDateNCertification | null>(null);
    const getTitleDetailsByID: string = `https://api.themoviedb.org/3/movie/${titleID}`;
    const getTitleCreditsByID: string = `https://api.themoviedb.org/3/movie/${titleID}/credits`;
    const releaseDateEndpointByID: string = `https://api.themoviedb.org/3/movie/${titleID}/release_dates`;
    function getKeyValue(object: any, key: string): any {
        if (object.hasOwnProperty(key))
            return object[key];
    }
    const setGenres: Function = (titleGenreIDs: Array<number>) => {
        const titleGenres: Array<string> = titleGenreIDs.map((genreID) => {
            return getKeyValue(genreID, "name");
        })
        return titleGenres;
    }
    const options: object = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MDU5NjQxMTY3MjI3YjA3ZDJhNWVkZjgzZDZlOTczMCIsInN1YiI6IjY0Nzk4YWIyY2FlZjJkMDBjMjk5NTljOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CjKZMhqaOHP6C63nj6MjSxBDDLnR6-dgrzo7CsWcL3U'
        }
    };
    const formatRuntime: Function = (runtime: number) => {
        return `${Math.floor(runtime / 60)}h ${runtime % 60}m`
    }
    const formatReleaseDate: Function = (releaseDate: string) => {
        const yyyymmdd: Array<string> = releaseDate.split('-');
        yyyymmdd.reverse();
        const ddmmyyyy = `${yyyymmdd[0]}/${yyyymmdd[1]}/${yyyymmdd[2]}`;
        return ddmmyyyy;
    }
    const filterTopCrew: Function = (response: JSON) => {
        const crewList: Array<Object> = getKeyValue(response, "crew");
        const creditsToSearch = new Set<string>();
        creditsToSearch.add('Writer');
        creditsToSearch.add('Director');
        creditsToSearch.add('Characters');
        creditsToSearch.add('Producer');
        creditsToSearch.add('Screenplay');
        creditsToSearch.add('Story');
        crewList.map((crewMember: Object) => {
            const crewMemberJob: string = getKeyValue(crewMember, "job");
            if (creditsToSearch.has(crewMemberJob)) {
                const crewMemberName = getKeyValue(crewMember, "name");
                const credit: Crew = { name: crewMemberName, job: crewMemberJob }
                setCrewMembers(crewMembers => {
                    if (crewMembers == undefined)
                        return [credit];
                    else return [...crewMembers, credit];
                });
            }
        })
    }
    const filterTopCast: Function = (response: JSON) => {
        const allCast: Array<Object> = getKeyValue(response, "cast");
        allCast.map((cast) => {
            const crrCast: Cast = {
                name: getKeyValue(cast, "name"),
                characterName: getKeyValue(cast, "character"),
                castProfilePicture: "https://www.themoviedb.org/t/p/w138_and_h175_face/" + getKeyValue(cast, "profile_path")
            }
            setTitleCast(titleCast => [...titleCast, crrCast]);
        })
    }
    const getTitleDetailsAsync = async (url: string, options: object) => {
        await fetch(url, options)
            .then(response => response.json())
            .then(response => {
                setTitleInfo({
                    original_title: getKeyValue(response, "original_title"),
                    poster_path: 'https://www.themoviedb.org/t/p/w300_and_h450_bestv2' + getKeyValue(response, "poster_path"),
                    backdrop_path: 'https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces' + getKeyValue(response, "backdrop_path"),
                    release_date: formatReleaseDate(getKeyValue(response, "release_date")),
                    year_of_release: getKeyValue(response, "release_date").split('-')[0],
                    runtime: formatRuntime(getKeyValue(response, "runtime")),
                    tagline: getKeyValue(response, "tagline"),
                    genres: setGenres(getKeyValue(response, "genres")),
                    vote_average: getKeyValue(response, "vote_average"),
                    overview: getKeyValue(response, "overview"),
                    original_language: getKeyValue(response, "original_language")
                });
                setOtherTitleDetails({
                    status: getKeyValue(response, "status"),
                    revenue: getKeyValue(response, "revenue"),
                    budget: getKeyValue(response, "budget"),
                    homepage: getKeyValue(response, "homepage"),
                    original_language: getKeyValue(response, "original_language"),
                })
            })
            .catch(error => console.error(error));
    }
    const getCastDetailsAsync = async (url: string, options: object) => {
        await fetch(url, options)
            .then(response => response.json())
            .then(response => {
                filterTopCrew(response);
                filterTopCast(response);
            })
            .catch(error => console.error(error));
    }

    const getReleaseDateAndCertification = async (url: string, options: object) => {
        let resultsIN: Object | undefined, resultsUS: Object | undefined = undefined;
        let indiaCertification = undefined, usCertification = undefined;
        let indiaReleaseDate = undefined, usReleaseDate = undefined, countryReleaseDate = undefined;
        await fetch(url, options)
            .then(response => response.json())
            .then(response => {
                const results: Array<Object> = getKeyValue(response, "results");
                resultsIN = results.find((result) => getKeyValue(result, "iso_3166_1") === "IN");
                resultsUS = results.find((result) => getKeyValue(result, "iso_3166_1") === "US");
                const release_dates_in: Array<Object> | undefined = getKeyValue(resultsIN, "release_dates");
                const release_dates_us: Array<Object> | undefined = getKeyValue(resultsUS, "release_dates");
                indiaCertification = release_dates_in?.find((releaseDate) => getKeyValue(releaseDate, "certification") !== "" && getKeyValue(releaseDate, "type") === 3)
                usCertification = release_dates_us?.find((releaseDate) => getKeyValue(releaseDate, "certification") !== "" && getKeyValue(releaseDate, "type") === 3)
                indiaReleaseDate = release_dates_in?.find((releaseDate) => getKeyValue(releaseDate, "release_date") !== "" && getKeyValue(releaseDate, "type") === 3)
                usReleaseDate = release_dates_us?.find((releaseDate) => getKeyValue(releaseDate, "release_date") !== "" && getKeyValue(releaseDate, "type") === 3)

                const content_rating = indiaCertification !== undefined ? getKeyValue(indiaCertification, "certification") : getKeyValue(usCertification, "certification");

                countryReleaseDate = indiaReleaseDate === undefined ? getKeyValue(usReleaseDate, "release_date") : getKeyValue(indiaReleaseDate, "release_date");
                const dateString: string = countryReleaseDate.split('T')[0];
                const dateObject = new Date(dateString);
                const formattedReleaseDate = new Intl.DateTimeFormat('en-US', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                }).format(dateObject);
                const country = indiaReleaseDate !== undefined ? "(IN)" : "(US)";
                setReleaseDateAndCertification({ country: country, country_release_date: formattedReleaseDate, content_rating: content_rating });
            })
            .catch(error => console.error(error));
    }
    useEffect(() => {
        getTitleDetailsAsync(getTitleDetailsByID, options);
        getCastDetailsAsync(getTitleCreditsByID, options);
        getReleaseDateAndCertification(releaseDateEndpointByID, options)
    }, [])

    const formatCardTitleToRoute: Function = (title: string) => {
        title = title.replace(/ /g, '-');
        title = title.replace(/:/g, '');
        return title;
    }
    if (titleInfo == null) {
        return (
            <LandingPageSuspense />
        )
    }

    if (titleInfo != null && crewMembers.length > 0 && releaseDateAndCertification != null) {
        const pageTitle = `${titleInfo.original_title} (${titleInfo.year_of_release}) - The Movie Database (TMDB)`
        return (
            <div className="bodyContent">
                <Helmet><title>{pageTitle}</title></Helmet>

                <TitleOverview titleInfo={titleInfo} titleID={titleID} credits={crewMembers} releaseDateAndCertification={releaseDateAndCertification} />
                <section className="otherTitleDetails">
                    <OtherTitleDetails titleCast={titleCast} titleID={titleID} otherTitleDetails={otherTitleDetails} />
                </section>
            </div>
        )
    }
    else return (<><LandingPageSuspense /></>)
}
export default TitleDetails;