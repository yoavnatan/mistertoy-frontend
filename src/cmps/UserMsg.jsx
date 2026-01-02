import { useEffect, useRef, useState } from 'react'
import { eventBusService, showSuccessMsg } from '../services/event-bus.service.js'
import { SOCKET_EVENT_TOYS_UPDATE, socketService } from '../services/socket.service.js'

export function UserMsg() {
    const [msg, setMsg] = useState(null)
    const timeoutIdRef = useRef()

    useEffect(() => {
        const unsubscribe = eventBusService.on('show-user-msg', msg => {
            setMsg(msg)
            window.scrollTo({ top: 0, behavior: 'smooth' });
            if (timeoutIdRef.current) {
                clearTimeout(timeoutIdRef.current)
                timeoutIdRef.current = null
            }
            timeoutIdRef.current = setTimeout(closeMsg, 3000)


        })
        socketService.on(SOCKET_EVENT_TOYS_UPDATE, update => {
            showSuccessMsg(`Admin has ${update.txt}`)
        })
        return () => {
            unsubscribe()
            socketService.off(SOCKET_EVENT_TOYS_UPDATE)
        }
    }, [])

    function closeMsg() {
        setMsg(null)
    }

    if (!msg) return <span></span>
    return (
        <section className={`user-msg ${msg.type}`}>
            {msg.txt}
            <button className="btn" onClick={closeMsg}>
                x
            </button>
        </section>
    )
}
