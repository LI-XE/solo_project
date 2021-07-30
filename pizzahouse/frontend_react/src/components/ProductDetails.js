import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useHistory, useParams, Link } from 'react-router-dom'
import { domain, header } from '../env'
import { useGlobalState } from '../state/provider'
import Product from './Product'
import Nav from '../views/Nav'

const ProductDetails = () => {
    const { id } = useParams()
    const [product, setProduct] = useState(null)
    const [categoryproduct, setCategoryproduct] = useState(null)
    const [{ profile }, dispatch] = useGlobalState()
    const history = useHistory()
    console.log(product?.category['id']);
    useEffect(() => {
        const getproduct = async () => {
            await Axios({
                method: 'get',
                url: `${domain}/api/product/${id}/`,
            }).then(response => {
                setProduct(response.data)

            }).catch(error => {
                console.log(error);
            })
        }
        getproduct()
    }, [id])

    const addtocart = async(id) => {
        profile !== null ? (
            await Axios({
                method:"post",
                url:`${domain}/api/addtocart/`,
                headers: header,
                data:{"id":id}
            }).then(response=>{
                console.log(response.data, "$$$$ ADD TO CART!$$$$$$$$$$$$$$")
                dispatch({
                    type: "PAGE_RELOAD",
                    pagereload: response.data
                })
            })
        ) : (
            history.push("/login")
        )
    }

    return (
        <div className="container p-5">
            <h3 className=""><Link to="/layout">Menu</Link></h3>
            {
                product !== null && (
                    <>
                        <div className="row p-5 ">
                            <div>
                              <img className="w-50 p-5 m-5" src={product.image} alt="" />  
                            </div>
                            <div className="p-2 mb-5">
                                <h1>{product.title}</h1>
                                <p>{product.description}</p>
                                <h2>Price: <del className="mx-5">$ {product.marcket_price}</del> $ {product.selling_price}</h2>                        
                                <p onClick={()=>addtocart(product?.id)} className="btn btn-success m-5">Add to Cart</p>
                            </div>
                        </div>
                    </>
                )
            }
        </div>
    )
}

export default ProductDetails;