import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { loadReviews, setFilterBy } from "../store/actions/review.actions.js";
import { showErrorMsg } from "../services/event-bus.service.js";
import { Loader } from "../cmps/Loader.jsx";
import { ReviewList } from "../cmps/ReviewList.jsx";
import { ReviewFilter } from "../cmps/ReviewFilter.jsx";

export function ReviewExplore() {

    const reviews = useSelector(storeState => storeState.reviewModule.reviews || [])
    const isLoading = useSelector(storeState => storeState.reviewModule.isLoading)
    const filterBy = useSelector(storeState => storeState.reviewModule.filterBy)

    useEffect(() => {
        loadReviews().catch(err => {
            console.log('err: ', err)
            showErrorMsg('Cannot load reviews!', err)
        })
    }, [filterBy])

    function onSetFilter(filterBy) {
        setFilterBy(filterBy)
    }

    return (
        <main>
            <ReviewFilter filterBy={filterBy} onSetFilter={onSetFilter} />
            <Loader isLoading={isLoading}>
                <ReviewList
                    reviews={reviews}
                // onRemoveToy={onRemoveToy}
                // loggedinUser={loggedinUser}
                />
            </Loader>
        </main>
    )
}
