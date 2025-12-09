// const { useState, useEffect, useRef } = React

import { useEffect, useRef, useState } from "react"
import { utilService } from "../services/util.service.js"
import MultipleSelectChip from "./MultiSelect.jsx"


export function ToyFilter({ filterBy, onSetFilter, toyLabels }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })

    onSetFilter = useRef(utilService.debounce(onSetFilter, 300))

    useEffect(() => {
        onSetFilter.current(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        let { value, name: field, type } = target
        value = type === 'number' ? +value : value
        if (type === 'select-multiple') {
            value = [...target.selectedOptions].map(option => option.value)
        }
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }

    function handleMultiSelect({ target }) {
        const labels = []
        for (let i = 0; i < target.selectedOptions.length; i++) {
            const currentVal = target.selectedOptions[i].value
            labels.push(currentVal)
        }
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, labels: labels }))
    }
    return (
        <section className="toy-filter full main-layout">
            <h2>Toys Filter</h2>
            <form >
                <label htmlFor="name">Name:</label>
                <input type="text"
                    id="txt"
                    name="txt"
                    placeholder="By name"
                    value={filterByToEdit.txt}
                    onChange={handleChange}
                />

                <label htmlFor="maxPrice">Max price:</label>
                <input type="number"
                    id="maxPrice"
                    name="maxPrice"
                    placeholder="By max price"
                    value={filterByToEdit.maxPrice || ''}
                    onChange={handleChange}
                />

                <label htmlFor="inStock" > completion: </label>
                <select name="inStock" id="inStock" onChange={handleChange}>
                    <option value="">All</option>
                    <option value="true">In stock</option>
                    <option value="false">Out of stock</option>
                </select>
                {toyLabels &&
                    <MultipleSelectChip values={toyLabels} handleChange={handleChange} filterByToEdit={filterByToEdit} setFilterByToEdit={setFilterByToEdit} />
                    // <select name="labels" id="labels" onChange={handleChange} multiple value={filterByToEdit.labels || []}>
                    //     <option disabled value="">Labels</option>
                    //     {toyLabels.map(label => (
                    //         <option key={label} value={label}>
                    //             {label}
                    //         </option>
                    //     ))}
                    // </select>
                }
            </form>

        </section>
    )
}