import { useState, useEffect } from 'react'

export function Popup({ header, footer, children, isOpen, close }) {


    useEffect(() => {

    }, [])
    if (!isOpen) return
    return (
        <>
            <section className="popup container">
                <button className="btn-close" onClick={close}>X</button>
                <header>{header}</header>
                <main>
                    {children}
                </main>
                <footer>{footer}</footer>
            </section>
        </>
    )
}