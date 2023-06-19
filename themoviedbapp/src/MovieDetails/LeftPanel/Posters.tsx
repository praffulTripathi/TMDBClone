import { LazyLoadImage } from "react-lazy-load-image-component";
import { Image } from "./Media";

interface Props{
    posters: Array<Image>
}
function Posters({posters}:Props){
    const updateText: HTMLElement | null = document.querySelector(`.updateViewAllText`);
    if(updateText)
        updateText.innerHTML="View All Posters";
    return(
    <div className="titlePosters scrollbar">
    {
        posters.map((poster:Image,index:number)=>{
            return(
                <div className="poster" key={`posters-${index}`}>
                    <LazyLoadImage className="poster" src={poster.image_path} alt='poster' loading='lazy' />
                </div>
            )
        })
    }
    </div>
    )
}
export default Posters;