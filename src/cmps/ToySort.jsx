import { utilService } from "../services/util.service.js"

import { useEffect, useRef, useState } from "react"


export function ToySort({ filterBy, onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    const debouncedSetFilterRef = useRef(utilService.debounce(onSetFilter, 0))


    const isFirstRender = useRef(true)

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false
            return
        }
        console.log(filterByToEdit)
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        const field = target.name
        let value = target.value
        console.log('field:', field)
        console.log(target.value)

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value || ''
                break

            case 'checkbox':
                value = target.checked
                break

            default: break
        }

        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value, pageIdx: 0 }))
    }


    return (
        <div className="sort-container">
            <select value={filterByToEdit.sort} name="sort" onChange={handleChange} id="sort">
                <option value="">Sort By</option>
                <option value="name">Name</option>
                <option value="price">Price</option>
                <option value="createdAt">Creation time</option>
            </select>
        </div>
    )
}
