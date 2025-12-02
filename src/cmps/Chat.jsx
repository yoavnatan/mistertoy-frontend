import { useState, useEffect, useRef } from "react"

export function Chat() {

    const [msgToSend, setMsgToSend] = useState({ from: 'User', txt: '' })
    const [msgs, setMsgs] = useState([{ from: 'Support', txt: 'Hello, How can I help?' }])
    const refInput = useRef()

    useEffect(() => {
        refInput.current.focus()
    }, [])


    function handleChange({ target }) {
        setMsgToSend(prevMsg => ({ ...prevMsg, txt: target.value }))
    }

    function onSubmitForm(ev) {
        ev.preventDefault()
        setMsgs([...msgs, msgToSend])
        setMsgToSend(prevMsg => ({ ...prevMsg, txt: '' }))
        setTimeout(sendFeedbackMsg, 1500)
        refInput.current.focus()

    }

    function sendFeedbackMsg() {
        console.log(msgs)
        return setMsgs(prevMsgs => [...prevMsgs, { from: 'Support', txt: 'Ok no problem!' }])
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
                    value={msgToSend.txt}
                    ref={refInput}>
                </input>
                <button>Send</button>
            </form>
        </section>

    )
}