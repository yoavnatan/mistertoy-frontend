import { useState, useEffect, useRef } from "react"

export function Chat() {

    const [msgToSend, setMsgToSend] = useState({ from: 'user', txt: '' })
    const [msgs, setMsgs] = useState([])

    // useEffect(() => {
    //     const timerId = setTime
    // })

    function handleChange({ target }) {
        setMsgToSend(prevMsg => ({ ...prevMsg, txt: target.value }))
    }

    function onSubmitForm(ev) {
        ev.preventDefault()
        setMsgs([...msgs, msgToSend])
        console.log(msgs)
        setTimeout(sendFeedbackMsg, 1500)
    }

    function sendFeedbackMsg() {
        console.log(msgs)
        return setMsgs(prevMsgs => [...prevMsgs, { from: 'support', txt: 'Ok no problem!' }])
    }

    return (
        <section className='chat container'>
            <ul className="clean-list">
                {msgs.map((msg, idx) => (
                    <li key={idx}>{msg.from} : {msg.txt}</li>
                ))}
            </ul>

            <form onSubmit={onSubmitForm}>
                <input type='txt'
                    name='msg'
                    id='msg'
                    onChange={handleChange}
                    value={msgToSend.txt}>
                </input>
                <button>Send</button>
            </form>
        </section>

    )
}