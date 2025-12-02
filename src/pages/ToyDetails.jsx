import { useEffect, useState } from "react";
import { toyService } from "../services/toy.service.js";
import { Link, useParams } from "react-router-dom"
import { Popup } from "../cmps/Popup.jsx";
import { Chat } from "../cmps/Chat.jsx";


export function ToyDetails() {
    const [toy, setToy] = useState(null)
    const [popupIsOpen, setPopupIsOpen] = useState(false)

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

    function loadToy() {
        toyService.getById(toyId)
            .then(toy => setToy(toy))
            .catch(err => {
                console.log('Could not load toy details', err)
                navigate('/toy')
            })
    }

    function onTogglePopup() {
        setPopupIsOpen(prevState => !prevState)
    }

    if (!toy) return <div>Loading...</div>
    return (
        <>
            <span className="material-symbols-outlined" onClick={onTogglePopup}>
                chat
            </span>
            <section className="toy-details">
                <h1>Toy name: {toy.name} </h1>
                <h5>price: {toy.price}</h5>
                <img src={toy.imgUrl} />
                <Link to={`/toy`}>Back</Link>
            </section>
            <Popup isOpen={popupIsOpen} header={'this is the chat'} footer={'this is the footer'}>
                <Chat />
            </Popup>
        </>

    )
}

