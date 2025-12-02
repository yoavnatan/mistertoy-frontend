import { useState, useEffect } from 'react'

export function Popup({ header, footer, children, isOpen }) {


    useEffect(() => {

    }, [])
    if (!isOpen) return
    return (
        <>
            <header>{header}</header>
            <main>
                {children}
            </main>
            <footer>{footer}</footer>
        </>
    )
}