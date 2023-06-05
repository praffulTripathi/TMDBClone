function Welcome() {
    return (
        <div className="welcomeLandingPageWrapper">
            <div className="welcomeLandingPage">
                <div className="welcomeInner">
                    <div className="welcomeHeading">
                        Welcome.
                    </div>
                    <div className="welcomeDescr">
                        Millions of movies, TV shows and people to discover. Explore now.
                    </div>
                    <div className="welcomeSearchBar">
                        <div className="searchBar">
                            <input type="text" className="searchInput" autoComplete="off" spellCheck="false" autoCorrect="off" placeholder="Search for a movie, tv show, person......">

                            </input>
                            <button className="searchButton">Search</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Welcome;