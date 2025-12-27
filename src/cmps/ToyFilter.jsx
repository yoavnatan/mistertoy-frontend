// const { useState, useEffect, useRef } = React

import { useEffect, useRef, useState } from "react"
import { utilService } from "../services/util.service.js"
import MultipleSelectChip from "./MultiSelect.jsx"
import TextField from "./TextField.jsx"
import SelectLabels from "./Select.jsx"
import { toyService } from "../services/toy.service.js"

export function ToyFilter({ filterBy, onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })

    const debouncedOnSetFilter = useRef(utilService.debounce(onSetFilter, 300))
    const toyLabels = toyService.getToyLabels()
    // onSetFilter = useRef(utilService.debounce(onSetFilter, 300))
    const isFirstRender = useRef(true)

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false
            return
        }
        debouncedOnSetFilter.current(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        let { value, name: field, type } = target
        value = type === 'number' ? +value : value
        if (type === 'select-multiple') {
            value = [...target.selectedOptions].map(option => option.value)
        }
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }

    // function handleMultiSelect({ target }) {
    //     const labels = []
    //     for (let i = 0; i < target.selectedOptions.length; i++) {
    //         const currentVal = target.selectedOptions[i].value
    //         labels.push(currentVal)
    //     }
    //     setFilterByToEdit((prevFilter) => ({ ...prevFilter, labels: labels }))
    // }



    return (
        <section className="toy-filter  flex">

            {/* <form > */}
            {/* <label htmlFor="name">Name:</label>
                <input type="text"
                    id="txt"
                    name="txt"
                    placeholder="By name"
                    value={filterByToEdit.txt}
                    onChange={handleChange}
                /> */}
            <TextField placeHolder={"Search by name"} type={"text"} value={filterByToEdit.txt} name={"txt"} handleChange={handleChange} />

            {/* <label htmlFor="maxPrice">Max price:</label>
                <input type="number"
                    id="maxPrice"
                    name="maxPrice"
                    placeholder="By max price"
                    value={filterByToEdit.maxPrice || ''}
                    onChange={handleChange}
                /> */}
            <TextField placeHolder={"Max price"} type={"number"} value={filterByToEdit.MaxPrice} name={"maxPrice"} handleChange={handleChange} />


            {/* <label htmlFor="inStock" > completion: </label>
                <select name="inStock" id="inStock" onChange={handleChange}>
                    <option value="">All</option>
                    <option value="true">In stock</option>
                    <option value="false">Out of stock</option>
                </select> */}

            <SelectLabels value={filterByToEdit.inStock} handleChange={handleChange} />
            {toyLabels &&
                <MultipleSelectChip values={toyLabels} setFilterByToEdit={setFilterByToEdit} />
                // <select name="labels" id="labels" onChange={handleChange} multiple value={filterByToEdit.labels || []}>
                //     <option disabled value="">Labels</option>
                //     {toyLabels.map(label => (
                //         <option key={label} value={label}>
                //             {label}
                //         </option>
                //     ))}
                // </select>
            }
            {/* </form> */}

        </section>
    )
}


