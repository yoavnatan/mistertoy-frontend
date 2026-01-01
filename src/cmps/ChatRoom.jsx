import { useEffect, useState } from "react"
import { SOCKET_EMIT_SEND_MSG, SOCKET_EMIT_SET_TOPIC, SOCKET_EVENT_ADD_MSG, socketService } from "../services/socket.service.js"
import { useSelector } from "react-redux"
import { toyService } from "../services/toy.service.js"

export function ChatRoom({ toy }) {
    const toyId = toy._id
    const [msg, setMsg] = useState({ txt: '' })
    const [msgs, setMsgs] = useState(toy.chatMsgs || [])


    const loggedInUser = useSelector(storeState => storeState.userModule.loggedinUser)
    useEffect(() => {
        socketService.emit(SOCKET_EMIT_SET_TOPIC, toyId)
        socketService.on(SOCKET_EVENT_ADD_MSG, addMsg)
        return () => {
            socketService.off(SOCKET_EVENT_ADD_MSG, addMsg)
        }
    }, [])

    function addMsg(newMsg) {
        setMsgs(prevMsgs => [...prevMsgs, newMsg])
    }

    async function sendMsg(ev) {
        ev.preventDefault()
        const from = loggedInUser?.fullname || 'Guest'
        const newMsg = { from, txt: msg.txt }
        try {
            await toyService.saveChatMsg(toyId, newMsg)
            socketService.emit(SOCKET_EMIT_SEND_MSG, newMsg)
            setMsg({ txt: '' })

        } catch (err) {
            console.log(err)
        }
        // if (isBotMode) sendBotResponse()
        // for now - we add the msg ourself
        // addMsg(newMsg)
    }

    function handleFormChange(ev) {
        const { name, value } = ev.target
        setMsg(prevMsg => ({ ...prevMsg, [name]: value }))
    }

    return (
        <section className="chat">
            <h2>Lets Chat</h2>

            <form onSubmit={sendMsg}>
                <input
                    type="text" value={msg.txt} onChange={handleFormChange}
                    name="txt" autoComplete="off" />
                <button>Send</button>
            </form>

            <ul>
                {msgs.map((msg, idx) => (<li key={idx}>{msg.from}: {msg.txt}</li>))}
            </ul>
        </section>
    )
}