import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { loadReviews } from "../store/actions/review.actions.js";
import { showErrorMsg } from "../services/event-bus.service.js";
import { Loader } from "../cmps/Loader.jsx";
import { ReviewList } from "../cmps/ReviewList.jsx";

export function ReviewExplore() {

    const reviews = useSelector(storeState => storeState.reviewModule.reviews || [])
    const isLoading = useSelector(storeState => storeState.reviewModule.isLoading)

    useEffect(() => {
        loadReviews().catch(err => {
            console.log('err: ', err)
            showErrorMsg('Cannot load reviews!', err)
        })
    }, [])

    return (
        <Loader isLoading={isLoading}>
            <ReviewList
                reviews={reviews}
            // onRemoveToy={onRemoveToy}
            // loggedinUser={loggedinUser}
            />
        </Loader>
    )
}
