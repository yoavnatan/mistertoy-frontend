import { useEffect, useRef, useState } from "react"
import { SOCKET_EMIT_SEND_MSG, SOCKET_EMIT_SET_TOPIC, SOCKET_EVENT_ADD_MSG, SOCKET_EVENT_TYPING, socketService } from "../services/socket.service.js"
import { useSelector } from "react-redux"
import { toyService } from "../services/toy.service.js"
import { utilService } from "../services/util.service.js"

export function ChatRoom({ toy }) {
    const toyId = toy._id
    const [msg, setMsg] = useState({ txt: '' })
    const [msgs, setMsgs] = useState(toy.chatMsgs || [])
    const [isTyping, setIsTyping] = useState(false)

    const emitTyping = useRef(
        utilService.debounce(() => {
            socketService.emit('chat-typing', toyId)
        }, 0)
    )

    const debouncedOnStopTyping = useRef(utilService.debounce(onStopTyping, 300))
    const loggedInUser = useSelector(storeState => storeState.userModule.loggedinUser)
    useEffect(() => {
        socketService.emit(SOCKET_EMIT_SET_TOPIC, toyId)
        socketService.on(SOCKET_EVENT_ADD_MSG, addMsg)
        socketService.on(SOCKET_EVENT_TYPING, onTyping)
        return () => {
            socketService.off(SOCKET_EVENT_ADD_MSG)
            socketService.off(SOCKET_EVENT_TYPING)

        }
    }, [])

    function onTyping() {
        console.log('typing')
        setIsTyping(true)
        debouncedOnStopTyping.current()       // setIsTyping(false)
    }
    function onStopTyping() {
        setIsTyping(false)
    }

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

    async function handleFormChange(ev) {
        const { name, value } = ev.target
        setMsg(prevMsg => ({ ...prevMsg, [name]: value }))
        emitTyping.current()
    }
    console.log(isTyping)

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
                {isTyping && <li>Typing...</li>}
            </ul>
        </section>
    )
}