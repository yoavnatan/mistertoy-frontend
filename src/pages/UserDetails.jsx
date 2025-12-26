import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { userService } from "../services/user.service";

export function UserDetails() {
    const [user, setUser] = useState()
    const { userId } = useParams()

    useEffect(() => {
        if (userId) loadUser()
    })

    async function loadUser() {
        try {
            const user = await userService.getById(userId)
            setUser(user)

        } catch (err) {
            console.log('Could not load user details', err)
            navigate('/toy')

        }

    }

    if (!user) return <div>Loading...</div>
    const { fullname } = user
    return (
        <div className="user-details container">
            <h2>User's Name: {fullname}</h2>
            <h3>User's Reviews: </h3>
            <ul>
                {user.reviews.map(review =>
                    <li key={review._id}><pre>{JSON.stringify(review, null, 2)}</pre></li>

                )}
            </ul>
            <Link to={`/toy`}>Back</Link>
        </div>
    )

}