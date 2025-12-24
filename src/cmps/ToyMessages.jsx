import { useState } from "react"
import { toyService } from "../services/toy.service"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"


export function ToyMessages({ toy, setToy, loggedinUser }) {

    const [msg, setMsg] = useState('')
    const [isUpdateing, setIsUpdating] = useState(false)

    function onAddMsg() {
        setIsUpdating(true)
    }

    function handleChange({ target }) {
        setMsg(target.value)
    }

    async function onSaveMsg(ev) {
        ev.preventDefault()
        try {
            const savedMsg = await toyService.saveMsg(toy._id, msg)
            setToy(prevToy => ({
                ...prevToy, msgs: [...(prevToy.msgs || []), savedMsg]
            }))
            setMsg('')
            showSuccessMsg('Messege Saved')
        } catch (err) {
            showErrorMsg('Cannot save Message')
        }
    }

    async function onRemoveMsg(msgId) {
        try {
            await toyService.removeMsg(toy._id, msgId)
            setToy(prevToy => ({
                ...prevToy,
                msgs: prevToy.msgs.filter(msg => msg.id !== msgId)
            }))
            showSuccessMsg('Message removed')
        } catch (err) {
            showErrorMsg('Cannot remove msg')
        }
    }

    console.log(toy.msgs)
    return (
        <>
            {loggedinUser && <button className="btn btn-add-msg" onClick={onAddMsg}>Add msg</button>}
            {isUpdateing && <form onSubmit={onSaveMsg}>
                <input type="text" value={msg} onChange={handleChange} />
                <button className="save">Save</button>
            </form>}
            <ul className="toy-msgs clean-list">
                {toy.msgs?.map(msg =>
                    <li key={msg.id}>{msg.txt} <button onClick={() => onRemoveMsg(msg.id)}>X</button> </li>
                )}
            </ul>
        </>
    )
}