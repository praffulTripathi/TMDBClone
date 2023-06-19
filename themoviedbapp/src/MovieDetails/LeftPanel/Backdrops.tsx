import { LazyLoadImage } from "react-lazy-load-image-component";
import { Image } from "./Media";

interface Props{
    backdrops: Array<Image>
}
function Backdrops({backdrops}:Props){
    const updateText: HTMLElement | null = document.querySelector(`.updateViewAllText`);
    if(updateText)
        updateText.innerHTML="View All Backdrops";
    return(
    <div className="titleBackdrops scrollbar">
    {
        backdrops.map((backdrop:Image,index:number)=>{
            return(
                <div className="backdrop" key={`backdrops-${index}`}>
                    <LazyLoadImage className="backdrop" src={backdrop.image_path} alt='backdrop' loading='lazy' />
                </div>
            )
        })
    }
    </div>
    )
}
export default Backdrops;