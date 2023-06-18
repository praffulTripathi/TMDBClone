import './media.css'

function Media(){
    const toggleBottomPill:Function = (selector:string) =>{
        const activePill: HTMLElement | null = document.querySelector(`.isMediaActive`);
        activePill?.classList.toggle('isMediaActive');
        const reviewsPill: HTMLElement | null = document.querySelector(`.${selector}`);
        reviewsPill?.classList.toggle('isMediaActive');
    }
    return(
        <div className="socialMenu">
            <span className="socialHeading">Media</span>
                <div className="socialOptions" onClick={(event)=>toggleBottomPill('mostPopular')}>
                    <div className="socialOptionText">Most Popular</div>
                    <div className="countResults"></div>
                    <div className="bottomPill mostPopular isMediaActive"></div>
                </div>
                <div className="socialOptions" onClick={(event)=>toggleBottomPill('videos')}>
                    <div className="socialOptionText">Videos</div>
                    <div className="countResults"></div>
                    <div className="bottomPill videos"></div>
                </div>
                <div className="socialOptions" onClick={(event)=>toggleBottomPill('backdrops')}>
                    <div className="socialOptionText">Backdrops</div>
                    <div className="countResults"></div>
                    <div className="bottomPill backdrops"></div>
                </div>
                <div className="socialOptions" onClick={(event)=>toggleBottomPill('posters')}>
                    <div className="socialOptionText">Posters</div>
                    <div className="countResults"></div>
                    <div className="bottomPill posters"></div>
                </div>
        </div>
    )
}
export default Media;