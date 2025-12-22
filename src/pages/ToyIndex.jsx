import { useDispatch, useSelector } from 'react-redux'
import { useState, useRef } from 'react'
import { ToyFilter } from '../cmps/ToyFilter.jsx'
import { ToyList } from '../cmps/ToyList.jsx'
import { toyService } from '../services/toy.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { loadToys, removeToy, removeToyOptimistic, saveToy, setFilterBy } from '../store/actions/toy.actions.js'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ToySort } from '../cmps/ToySort.jsx'
import { Loader } from '../cmps/Loader.jsx'

export function ToyIndex() {

    const dispatch = useDispatch()
    const toys = useSelector(storeState => storeState.toyModule.toys || [])
    const filterBy = useSelector(storeState => storeState.toyModule.filterBy)
    const isLoading = useSelector(storeState => storeState.toyModule.isLoading)


    const isFirstRender = useRef(true)

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false
            return
        }
        loadToys().catch(err => {
            console.log('err: ', err)
            showErrorMsg('Cannot load toys!', err)
        })

    }, [filterBy])


    function onSetFilter(filterBy) {
        setFilterBy(filterBy)
    }

    async function onRemoveToy(toyId) {

        try {
            await removeToyOptimistic(toyId)
            showSuccessMsg('Toy removed')
        } catch (err) {
            showErrorMsg('Cannot remove toy')
        }
    }

    // function onAddToy() {

    //     saveToy(toyToSave)
    //         .then((savedToy) => {
    //             showSuccessMsg(`Toy added (id: ${savedToy._id})`)
    //         })
    //         .catch(err => {
    //             showErrorMsg('Cannot add toy')
    //         })
    // }

    function onEditToy(toy) {
        const price = +prompt('New price?')
        const toyToSave = { ...toy, price }

        saveToy(toyToSave)
            .then((savedToy) => {
                showSuccessMsg(`Toy updated to price: $${savedToy.price}`)
            })
            .catch(err => {
                showErrorMsg('Cannot update toy')
            })
    }

    function addToCart(toy) {
        console.log(`Adding ${toy.name} to Cart`)
        dispatch({ type: ADD_TOY_TO_CART, toy })
        showSuccessMsg('Added to Cart')
    }

    return (
        <section className="toy-index">
            <main>
                {/* <button className='add-btn' onClick={onAddToy}>Add Random Toy ⛐</button> */}
                <ToyFilter filterBy={filterBy} onSetFilter={onSetFilter} />
                <div className="actions flex space-arount">
                    <ToySort filterBy={filterBy} onSetFilter={onSetFilter} />
                    {/* {!isLoading
                    ? <ToyList
                        toys={toys}
                        onRemoveToy={onRemoveToy}
                        onEditToy={onEditToy}
                        addToCart={addToCart}
                    />
                    : <div>Loading...</div>
                } */}
                    <Link className="btn-add" to="/toy/edit">Add Toy</Link>
                </div>

                {/* {isLoading && <Loader />}
                {!isLoading && <ToyList toys={toys} onRemoveToy={onRemoveToy} />} */}
                <Loader isLoading={isLoading}>
                    <ToyList
                        toys={toys}
                        onRemoveToy={onRemoveToy}
                    />
                </Loader>
                <hr />
            </main>
        </section>
    )
}

