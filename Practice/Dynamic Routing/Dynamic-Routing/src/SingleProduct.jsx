import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function SingleProduct() {

    const obj = useParams();

    const [first, setfirst] = useState();

    console.log(obj);

    return (
        <div><h1>{obj.id}</h1></div>
    )
}

export default SingleProduct