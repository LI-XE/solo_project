import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { domain, header } from '../env'
import { useGlobalState } from '../state/provider'
import Header from './Header'

const Oldorders = () => {
    const [orders, setOrders] = useState(null)
    // console.log(orders);
    const [reload, setReload] = useState(null);
    const [{ profile, pagereload}, dispatch ]= useGlobalState();
    useEffect(() => {
        const getorder = async () => {
            await Axios({
                method: 'get',
                url: `${domain}/api/orders/`,
                headers: header
            }).then(response => {
                // console.log(response.data);
                setOrders(response.data)
            })
        }
        getorder()
    }, [reload])
    const deleteorderhistory = async (id) => {
        await Axios({
            method: "delete",
            url: `${domain}/api/orders/${id}/`,
            headers: header
        }).then((res) => {
            // console.log(res.data);
            setReload(res.data)
        })
    }

    return (
        <div className="container">
            <h1 className="m-5">Orders History</h1>
            {
                orders?.length !== 0 ?(
                <>
                <table className="table">
                    <thead>
                        <tr>
                            <th>SN</th>
                            <th>Total</th>
                            <th>Product</th>
                            <th>Order Status</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                    orders?.map((order, i) => (
                        <tr key={i}>
                            <td>{i + 1}</td>
                            <td>$ {order?.total}</td>
                            <td>{order?.cartproduct?.length}</td>
                            <td>{order?.order_status}</td>
                            <td><Link to={`/orderdetails/${order.id}`} className="btn btn-success">Details</Link></td>
                            <td><p onClick={() => deleteorderhistory(order?.id)} className="btn btn-danger">Delete</p></td>
                        </tr>
                        )) 
                    }
                    </tbody>
                </table>
                </>):
                (
                    <div>
                        <h1 className="display-3">
                            No Old Order
                        </h1>
                    </div>
                )
            }  
            <Link to="/cart" className="btn btn-primary mt-5">Go Back</Link>

        </div>
    )
}

export default Oldorders;