import { useEffect, useState } from "react";
import { toyService } from "../services/toy.service.js";
import { Link, useParams } from "react-router-dom"
import { Popup } from "../cmps/Popup.jsx";
import { Chat } from "../cmps/Chat.jsx";
import { useOnlineStatus } from "../cmps/hooks/useOnlineStatus.js"
import { ToyMessages } from "../cmps/ToyMessages.jsx";
import { useSelector } from "react-redux";
import { reviewService } from "../services/review.service.js";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js";
import { ChatRoom } from "../cmps/ChatRoom.jsx";


export function ToyDetails() {
    const loggedinUser = useSelector(storeState => storeState.userModule.loggedinUser)
    const [toy, setToy] = useState(null)
    const [popupIsOpen, setPopupIsOpen] = useState(false)
    const [reviewToEdit, setReviewToEdit] = useState('')
    const [isReviewEdited, setIsReviewEdited] = useState(false)

    const isOnline = useOnlineStatus()

    const { toyId } = useParams()

    useEffect(() => {
        if (toyId) loadToy()

        addEventListener('keydown', (ev) => {
            if (ev.key === 'Escape') setPopupIsOpen(false)
        })
        return removeEventListener('keyDown', (ev) => {
            if (ev.key === 'Escape') setPopupIsOpen(false)
        })

    }, [toyId])

    async function loadToy() {
        try {
            const toy = await toyService.getById(toyId)
            setToy(toy)

        } catch (err) {
            console.log('Could not load toy details', err)
            navigate('/toy')

        }

    }

    function onTogglePopup() {
        setPopupIsOpen(prevState => !prevState)
    }


    function onAddReview() {
        setIsReviewEdited(true)
    }

    async function onSaveReview(ev) {
        ev.preventDefault()
        try {
            const savedReview = await reviewService.saveReview(toy._id, reviewToEdit)
            setToy(prevToy => ({
                ...prevToy, reviews: [...(prevToy.reviews || []), savedReview]
            }))
            setReviewToEdit('')
            showSuccessMsg('Review Saved')
        } catch (err) {
            console.log(err)
            showErrorMsg('Cannot save Review')
        }
    }



    function handleChange({ target }) {
        setReviewToEdit(target.value)
    }



    if (!toy) return <div>Loading...</div>
    console.log(toy)
    return (
        <>
            <span className="material-symbols-outlined" onClick={onTogglePopup}>
                chat
            </span>
            <h1>{isOnline ? '✅ Online' : '❌ Disconnected'}</h1>

            <section className="toy-details">
                <h1>Toy name: {toy.name} </h1>
                <h5>price: {toy.price}</h5>
                <img src={toy.imgUrl ? toy.imgUrl : toy.imgUrl} />
                <Link to={`/toy`}>Back</Link>
            </section>
            <Popup isOpen={popupIsOpen} header={'How can I help?'} footer={''} close={onTogglePopup}>
                <Chat />
            </Popup>
            <h2>Reviews</h2>
            <button disabled={!loggedinUser} className="btn-add-review" onClick={onAddReview}>Add review</button>
            {isReviewEdited && <form onSubmit={onSaveReview}>
                <input type="text" value={reviewToEdit} onChange={handleChange} />
                <button>Save</button>
            </form>}
            <ul>
                {toy.reviews?.map(review =>
                    <li key={review._id}><pre>{JSON.stringify(review, null, 2)}</pre></li>)}
            </ul>
            <h3>Messages: </h3>
            <ToyMessages toy={toy} setToy={setToy} loggedinUser={loggedinUser} />
            <ChatRoom toy={toy} />
        </>

    )
}

