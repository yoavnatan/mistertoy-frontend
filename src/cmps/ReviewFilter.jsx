
import { useEffect, useRef, useState } from "react"
import { utilService } from "../services/util.service.js"
import TextField from "./TextField.jsx"

export function ReviewFilter({ filterBy, onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })


    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        let { value, name: field, type } = target
        value = type === 'number' ? +value : value

        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }

    return (
        <section className="toy-filter  flex">
            <TextField placeHolder={"Search"} type={"text"} value={filterByToEdit.txt} name={"txt"} handleChange={handleChange} />
        </section>
    )
}


