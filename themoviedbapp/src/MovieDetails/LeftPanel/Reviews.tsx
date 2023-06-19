import { LazyLoadImage } from "react-lazy-load-image-component";
import { Review } from "./Social";
import './reviews.css'

interface Props {
    movieReviews: Review | null
}

function Reviews({ movieReviews }: Props) {
    if (movieReviews != null) {
        let dateTimeFormatted: string | undefined = movieReviews.created_at;
        const date = new Date(dateTimeFormatted);
        const formatOptions: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };
        let isReviewTruncated:boolean=false;
        dateTimeFormatted = date.toLocaleDateString('en-US', formatOptions);
        const splitWords: Array<string> = movieReviews.content.split(' ');
        let truncatedReview:string='';
        if (splitWords.length > 200) {
            isReviewTruncated=true;
            const truncatedWords = splitWords.slice(0, 200);
            truncatedReview = truncatedWords.join(' ');
            truncatedReview+='...' 
        }
        return (
            <div className="reviews">
                <div className="reviewCard">
                    <div className="authorDetails">
                        <div className="authorAvatar">
                            <LazyLoadImage className="authorAvatarImg" src={movieReviews.avatar_path} alt={movieReviews.author} loading='lazy' />
                        </div>
                        <div className="otherReviewDetails">
                            <span className="reviewBy">
                                A review by {movieReviews.author}
                            </span>
                            <span className="reviewDateTime">
                                Written by <b>{movieReviews.author}</b> on {dateTimeFormatted}
                            </span>
                        </div>
                    </div>
                    <div className="reviewContent">
                        {
                            isReviewTruncated===true?(<p>{truncatedReview}&nbsp;<span className="readTheRest">read the rest.</span></p>): (<p>{movieReviews.content}</p>)
                        }
                    </div>
                </div>
            </div>
        )
    }
    else return (<><span>No reviews yet !!</span></>)
}
export default Reviews;