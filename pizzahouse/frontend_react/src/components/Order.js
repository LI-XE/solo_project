import Axios from 'axios'
import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { domain, header } from '../env'
import { useGlobalState } from '../state/provider'

const Order = () => {
    const [{ cartuncomplit }, dispatch] = useGlobalState()
    // console.log(cartproductf_uncomplit?.id);
    const [address, setAddress] = useState("")
    const [mobile, setMobile] = useState("")
    const [email, setEmail] = useState("")
    const history = useHistory()
    const orderData = {
        "cartId": cartuncomplit?.id,
        "address": address,
        "mobile": mobile,
        "email": email
    }

    const ordernow = async () => {
        Axios({
            method: "post",
            url: `${domain}/api/orders/`,
            headers: header,
            data: orderData
        }).then(response => {
            // console.log(response.data);
            dispatch({
                type: "PAGE_RELOAD",
                pagereload: response.data
            })
            dispatch({
                type: "ADD_CARTUNCOMPLIT",
                cartuncomplit: null
            })
            history.push('/oldorders')
        })
    }
    return (
        <div className="container">
            <div className="row">
                <div className=" p-2 mt-5">
                    <h1>Order Details</h1>
                    <table className="table table-striped mt-4">
                        <thead>
                            <th>SN</th>
                            <th>Product</th>
                            <th>Rate</th>
                            <th>Quantity</th>
                            <th>Subtotal</th>
                        </thead>
                        <tbody>
                            {
                                cartuncomplit?.cartproduct.map((data, i) => (
                                    <tr key={i}>
                                        <td>{i + 1}</td>
                                        <td>{data.product[0].title}</td>
                                        <td>{data.price}</td>
                                        <td>{data.quantity}</td>
                                        <td>$ {data.subtotal}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                        <tfoot>
                            <tr>
                                <th colSpan="4" className="text-right" >Total</th>
                                <th>$ {cartuncomplit?.total}</th>
                            </tr>
                        </tfoot>
                    </table>
                    <Link to='/cart' className="btn btn-warning">Edit Cart</Link>
                </div>
                <div className="mt-5">
                    <h1>Order Now</h1>
                    <div>
                        <div className="form-group">
                            <label>Address</label>
                            <input onChange={(e) => setAddress(e.target.value)} type="text" className="form-control" placeholder="Address" />
                        </div>
                        <div className="form-group">
                            <label>Mobile</label>
                            <input onChange={(e) => setMobile(e.target.value)} type="text" className="form-control" placeholder="Mobile" />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input onChange={(e) => setEmail(e.target.value)} type="text" className="form-control" placeholder="Email" />
                        </div>
                        <button className="btn btn-info mt-3" onClick={ordernow}>Order</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Order;