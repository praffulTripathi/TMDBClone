import { LazyLoadImage } from 'react-lazy-load-image-component';
import '../../styles/castcard.css'

interface Cast {
    name: string,
    characterName: string,
    castProfilePicture: string
}
interface Props {
    cast: Cast
}

function CastCard({ cast }: Props) {
    return (
        <div className="castCard">
            <div className="castProfilePicture">
                <LazyLoadImage className="castPic" src={cast.castProfilePicture} alt={cast.name} loading='lazy' />
            </div>
            <div className="castName">{cast.name}</div>
            <div className="characterName">{cast.characterName}</div>
        </div>
    )
}
export default CastCard;