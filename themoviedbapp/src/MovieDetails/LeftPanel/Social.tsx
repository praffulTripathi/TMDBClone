import Discussions from "./Discussions";
import Reviews from "./Reviews";

function Social() {
    const toggleBottomPill:Function = (selector:string) =>{
        const reviewsPill: HTMLElement | null = document.querySelector(`.bottomPill.reviews`);
        const discussionsPill: HTMLElement | null = document.querySelector(`.bottomPill.discussions`);
        reviewsPill?.classList.toggle('isActive');
        discussionsPill?.classList.toggle('isActive');
    }
    return (
        <div className="social">
            <div className="socialMenu">
                <span className="socialHeading">Social</span>
                <div className="socialOptions" onClick={(event)=>toggleBottomPill()}>
                    <div className="socialOptionText">Reviews</div>
                    <div className="countResults"></div>
                    <div className="bottomPill reviews isActive"></div>
                </div>
                <div className="socialOptions" onClick={(event)=>toggleBottomPill()}>
                    <div className="socialOptionText">Discussions</div>
                    <div className="countResults"></div>
                    <div className="bottomPill discussions"></div>
                </div>
            </div>
            <Reviews />
            <Discussions />
            <span className="fullCastNCrew">Read All Reviews</span>
        </div>
    )
}
export default Social;