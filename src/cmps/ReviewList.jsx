import { ReviewPreview } from "./ReviewPreview.jsx";

export function ReviewList({ reviews }) {
    return (
        <ul className="toy-list">
            {reviews.map(review =>
                <li className="toy-preview" key={review._id}>
                    <ReviewPreview review={review} />

                    {/* {loggedinUser && loggedinUser.isAdmin &&  */}
                    {/* <div>
                        <button onClick={() => onRemoveToy(toy._id)}>x</button>
                        <button><Link to={`/toy/edit/${toy._id}`}>Edit</Link></button>
                    </div> */}
                    {/* } */}
                    {/* <button className="buy" onClick={() => addToCart(car)}>
                        Add to Cart
                    </button> */}
                </li>)}
        </ul>
    )
}