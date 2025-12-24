import { useEffect, useState } from "react";
import { toyService } from "../services/toy.service.js";
import { Link, useParams } from "react-router-dom"
import { Popup } from "../cmps/Popup.jsx";
import { Chat } from "../cmps/Chat.jsx";
import { useOnlineStatus } from "../cmps/hooks/useOnlineStatus.js"
import { ToyMessages } from "../cmps/ToyMessages.jsx";
import { useSelector } from "react-redux";


export function ToyDetails() {
    const loggedinUser = useSelector(storeState => storeState.userModule.loggedinUser)
    const [toy, setToy] = useState(null)
    const [popupIsOpen, setPopupIsOpen] = useState(false)
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

    function onSaveMsg(txt) {
        toyService.saveMsg(txt)
    }


    console.log(toy)

    if (!toy) return <div>Loading...</div>
    return (
        <>
            <span className="material-symbols-outlined" onClick={onTogglePopup}>
                chat
            </span>
            <h1>{isOnline ? '✅ Online' : '❌ Disconnected'}</h1>

            <section className="toy-details">
                <h1>Toy name: {toy.name} </h1>
                <h5>price: {toy.price}</h5>
                <img src={toy.imgUrl} />
                <Link to={`/toy`}>Back</Link>
            </section>
            <Popup isOpen={popupIsOpen} header={'How can I help?'} footer={''} close={onTogglePopup}>
                <Chat />
            </Popup>
            <h2>Messages: </h2>
            <ToyMessages toy={toy} setToy={setToy} loggedinUser={loggedinUser} />
        </>

    )
}

