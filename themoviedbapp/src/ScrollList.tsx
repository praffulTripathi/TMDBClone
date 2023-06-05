import { CSSProperties, SyntheticEvent, useEffect, useState } from "react";
import ListFilters from "./ListFilters";
import Cards from "./Cards";

interface Props {
    topic: string
}
interface TopicData {
    title: string,
    filters: string[],
    bkgImage: string
}
function ScrollList({ topic }: Props) {
    const listData = {
        "trending": {
            "title": "Trending",
            "filters": ["Today", "This Week"],
            "bkgImage": "https://www.themoviedb.org/assets/2/v4/misc/trending-bg-39afc2a5f77e31d469b25c187814c0a2efef225494c038098d62317d923f8415.svg"
        },
        "popular": {
            "title": "What's Popular",
            "filters": ["Streaming", "On TV", "For Rent", "In Theatres"],
            "bkgImage": "none"
        },
        "freeToWatch": {
            "title": "Free To Watch",
            "filters": ["Movies", "TV"],
            "bkgImage": "none"
        }
    }

    const [currentActiveFilter, setActiveFilter] = useState(`${topic}-0`);
    // const [apiHTML,setApiHTML]=useState('');
    // const corsProxyUrl = 'https://cors-anywhere.herokuapp.com/';

    function getKeyValue(object: any, key: string): any {
        return object[key];
    }
    // const apiList = {
    //     "trending-0": "https://www.themoviedb.org/remote/panel?panel=trending_scroller&group=today",
    //     "trending-1": "https://www.themoviedb.org/remote/panel?panel=trending_scroller&group=this-week",
    //     "popular-0": "https://www.themoviedb.org/remote/panel?panel=popular_scroller&group=streaming",
    //     "popular-1": "https://www.themoviedb.org/remote/panel?panel=popular_scroller&group=on-tv",
    //     "popular-2": "https://www.themoviedb.org/remote/panel?panel=popular_scroller&group=for-rent",
    //     "popular-3": "https://www.themoviedb.org/remote/panel?panel=popular_scroller&group=in-theatres",
    //     "freeToWatch-0": "https://www.themoviedb.org/remote/panel?panel=free_scroller&group=movie",
    //     "freeToWatch-1": "https://www.themoviedb.org/remote/panel?panel=free_scroller&group=tv"

    // }
    // const fetchHTMLForFilter: Function = (async (apiToCall: string) => {
    //     await fetch(corsProxyUrl+apiToCall)
    //         .then(response => response.text())
    //         .then(html => setApiHTML(html))
    //         .catch(error => console.error(error));
    // })

    const topicData: TopicData = getKeyValue(listData, topic);
    let styles: CSSProperties = { minHeight: '280px', backgroundPosition: 'bottom' };
    if (topicData.bkgImage !== "none")
        styles.backgroundImage = `url(${topicData.bkgImage})`

    const toggleFilterActive: Function = (event: SyntheticEvent, key: string, topic: string) => {
        console.log(key);
        let elementToToggle: HTMLElement | null = document.getElementById(key);
        let currentActiveElement: HTMLElement | null = document.querySelector(`.${topic}.isActive`);
        currentActiveElement?.classList.remove('isActive');
        elementToToggle?.classList.add('isActive');
        setActiveFilter(key);
    }

    // useEffect(() => {
    //     const apiToCall: string = getKeyValue(apiList, currentActiveFilter);
    //     console.log(apiToCall);
    //     fetchHTMLForFilter(apiToCall);
    // }, [currentActiveFilter])


    return (
        <div className="scrollList">
            <div className="listTitleAndCategories">
                <div className="listTitle">
                    {topicData.title}
                </div>
                <ul className="filterList">
                    <ListFilters filters={topicData.filters} topic={topic} toggleFilterActive={toggleFilterActive} />
                </ul>
            </div>
            <div className="listCards" style={styles}>
                {/* {apiHTML && <div dangerouslySetInnerHTML={{ __html: apiHTML }} />} */}
            </div>
        </div>
    )
}
export default ScrollList;