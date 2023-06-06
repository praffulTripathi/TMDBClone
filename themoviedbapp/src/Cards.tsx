import AddToListSvg from './assets/add-to-list.svg'
import FavoriteSvg from './assets/favorite.svg'
import WatchlistSvg from './assets/watchlist.svg'
import YourRatingSvg from './assets/yourRating.svg'


interface APIResponse {
    jsonResponse: object | null
}
interface Props {
    jsonResponse: APIResponse,
    topic: string
}
interface CardDetails {
    title: string,
    release_date: string,
    vote_average: number,
    poster_path: string
}
function Cards({ jsonResponse, topic }: Props): any {
    function getKeyValue(object: any, key: string): any {
        return object[key];
    }
    function transformDateTime(result: object): string {
        let apiDateTime: string = getKeyValue(result, "release_date") == undefined ? getKeyValue(result, "first_air_date") : getKeyValue(result, "release_date");
        const dateObj: Date = new Date(apiDateTime);
        const options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric', year: 'numeric' };
        const formattedDate: string = dateObj.toLocaleDateString('en-US', options);
        return formattedDate;
    }
    function formatAverageToPercentage(result: object): number {
        let voteAverage: number = getKeyValue(result, "vote_average");
        voteAverage *= 10;
        return Math.round(voteAverage);
    }
    const blurCard = (cardKeyID: string, cardMenuKeyID: string) => {
        const anyBlurredCard: HTMLElement | null = document.querySelector('.blurCard');
        anyBlurredCard?.classList.toggle('blurCard');
        const anyCardMenuOn: HTMLElement | null = document.querySelector('.toggleDisplay');
        anyCardMenuOn?.classList.toggle('toggleDisplay');
        const cardToBlur: HTMLElement | null = document.getElementById(cardKeyID);
        cardToBlur?.classList.toggle('blurCard');
        const cardMenuToDisplay: HTMLElement | null = document.getElementById(cardMenuKeyID);
        cardMenuToDisplay?.classList.toggle('toggleDisplay');
    }
    if (!jsonResponse.hasOwnProperty("jsonResponse")) {
        const results: Array<object> = getKeyValue(jsonResponse, "results");
        let cardsToDisplay: Array<CardDetails> = [];
        results?.map((result, index) => {
            if (getKeyValue(result, "title") !== undefined || getKeyValue(result, "name")) {
                let newCard: CardDetails = {
                    title: getKeyValue(result, "title") == undefined ? getKeyValue(result, "name") : getKeyValue(result, "title"),
                    release_date: transformDateTime(result),
                    vote_average: formatAverageToPercentage(result),
                    poster_path: "https://www.themoviedb.org/t/p/w220_and_h330_face" + getKeyValue(result, "poster_path"),
                };
                cardsToDisplay = [...cardsToDisplay, newCard];
            }
        });
        return (
            cardsToDisplay.map((card, index) => {
                const cardKeyID: string = `${topic}-card-${index}`;
                const cardMenuKeyID: string = `${topic}-menu-${index}`;
                return (
                    <div className="card" key={cardKeyID} id={cardKeyID}>
                        <div className="poster">
                            <img className="cardPoster" src={card.poster_path}></img>
                            <div className="movieOptions" onClick={(event) => { blurCard(cardKeyID, cardMenuKeyID) }}>
                                <div className="dot"></div>
                                <div className="dot"></div>
                                <div className="dot"></div>
                            </div>
                        </div>
                        <div className="movieTitle">
                            {card.title}
                        </div>
                        <div className="releaseDate">
                            {card.release_date}
                        </div>
                        <div className="voteAverage">
                            {card.vote_average}%
                        </div>
                        <div className="cardActionItemsDiv" id={cardMenuKeyID}>
                            <ul className="cardActionItems">
                                <li className="cardActionItem">
                                    <img src={AddToListSvg} className="listIcon"></img>
                                    <div className="itemDesc">
                                        Add to List
                                    </div>
                                </li>

                                <li className="cardActionItem">
                                    <img src={FavoriteSvg} className="listIcon"></img>
                                    <div className="itemDesc">
                                        Favorite
                                    </div>
                                </li>

                                <li className="cardActionItem">
                                    <img src={WatchlistSvg} className="listIcon"></img>
                                    <div className="itemDesc">
                                        Watchlist
                                    </div>
                                </li>

                                <li className="cardActionItem" id={cardMenuKeyID}>
                                    <img src={YourRatingSvg} className="listIcon"></img>
                                    <div className="itemDesc">
                                        Your rating
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                )
            })

        )
    }
}
export default Cards;