
export function ReviewPreview({ review }) {
    return (
        <article>
            <h2>About toy: {review.aboutToy.name}</h2>
            <h2>By : {review.byUser.fullname}</h2>
            <p>{review.txt}</p>

        </article>
    )
}