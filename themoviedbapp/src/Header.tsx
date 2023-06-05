import PlusIcon from './styles/icons/plus_icon.svg'


function Header() {
    return (
        <div className="header">
            <div className="navbarWrapper">
                <div className="navbar">
                    <a href="/" className="movieDBLogo">
                        <img src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"></img>
                    </a>
                    <ul className="navbar_menu_list">
                        <li className="navbar_menu_list_item">Movies</li>
                        <li className="navbar_menu_list_item">TV Shows</li>
                        <li className="navbar_menu_list_item">People</li>
                        <li className="navbar_menu_list_item">More</li>
                    </ul>
                </div>
                <div className="otheractions">
                    <ul className="otheractions_list">
                        <li className="otheractions_list_item">
                            <img src={PlusIcon} className="plusIcon"></img>
                        </li>
                        <li className="otheractions_list_item siteLanguage">
                            EN
                        </li>
                        <li className="otheractions_list_item">
                            Login
                        </li>
                        <li className="otheractions_list_item">
                            Join TMDB
                        </li>
                        <li className="otheractions_list_item">
                            <img className="searchIcon" src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-28-search-blue-177462d06db81ff2a02aa022c1c0be5ba4200d7bd3f51091ed9298980e3a26a1.svg"></img>
                        </li>
                    </ul>
                </div>
            </div>

        </div>
    )
}
export default Header;