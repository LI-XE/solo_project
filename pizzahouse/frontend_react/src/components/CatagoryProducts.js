import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { domain } from '../env'
import Product from './Product'

const CategoryProducts = () => {
    const { id } = useParams();
    const [category, setCategory] = useState(null)
    useEffect(() => {
        const getcategoryproduct = async () => {
            await Axios({
                method: 'get',
                url: `${domain}/api/category/${id}/`
            }).then(response => {
                // console.log(response.data[0]);
                setCategory(response.data[0]);
            })
        }
        getcategoryproduct()
    }, [])
    return (
        <div className="container">
            <h1>Category: {category?.title}</h1>
            <h2>Category Products</h2>
            <div className="row">
                {
                    category !== null &&
                    category?.category_products?.map((product, i) => (
                        <div className="col-md-3" key={i}>
                            <Product item={product} key={i}/>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default CategoryProducts;