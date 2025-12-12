import { useEffect, useState } from "react"
import { useNavigate, useParams, Link } from "react-router-dom"
import { toyService } from "../services/toy.service.js"
import { saveToy } from "../store/actions/toy.actions.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"

import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"

export function ToyEdit() {
    const navigate = useNavigate()
    const { toyId } = useParams()
    const [toyToEdit, setToyToEdit] = useState(null)

    useEffect(() => {
        if (!toyId) {
            setToyToEdit(toyService.getEmptyToy())
        } else {
            toyService.getById(toyId)
                .then(setToyToEdit)
                .catch(() => navigate("/toy"))
        }
    }, [])

    if (!toyToEdit) return <div>Loading...</div>

    const validationSchema = Yup.object({
        name: Yup.string()
            .required("Name is required")
            .min(2, "Too short")
            .max(15, "Too long"),
        price: Yup.number()
            .required("Price is required")
            .min(1, "Must be at least 1"),
        inStock: Yup.boolean(),
    })

    function onSave(values) {
        saveToy(values)
            .then(() => {
                showSuccessMsg("Toy saved!")
                navigate("/toy")
            })
            .catch(() => showErrorMsg("Problem saving toy"))
    }

    return (
        <section className="toy-edit">
            <h2>{toyId ? "Edit Toy" : "Add Toy"}</h2>

            <Formik
                initialValues={toyToEdit}
                enableReinitialize={true}
                validationSchema={validationSchema}
                onSubmit={onSave}
            >
                {({ errors, touched, dirty }) => (

                    <Form>
                        <label>Name:</label>
                        <Field name="name" type="text" />
                        {errors.name && touched.name && (
                            <div className='errors'>{errors.name}</div>
                        )}
                        <label>Price:</label>
                        <Field name="price" type="number" />
                        {errors.price && touched.price && (
                            <div className='errors'>{errors.price}</div>
                        )}
                        <label>In Stock:</label>
                        <Field name="inStock" type="checkbox" />

                        <button type="submit">
                            {toyId ? "Save" : "Add"}
                        </button>
                        <Link to="/toy">Cancel</Link>
                    </Form>
                )}
            </Formik>
        </section>
    )
}
