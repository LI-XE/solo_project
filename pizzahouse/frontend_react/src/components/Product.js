import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { domain, header } from '../env';
import { useGlobalState } from '../state/provider';
import Axios from 'axios';


const Product = ({ item }) => {
    const [{ profile }, dispatch] = useGlobalState()
    const history = useHistory()

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
            history.pushState("/login")
        )
    }


    return (
        <div className="card single_product p-3" >
            <Link to={`/product/${item.id}`} className="product_image">
                <img className="card-img-top" src={item.image} alt="Card image cap" />
            </Link>
            <div className="card-body">
                <h5 className="card-title">{item.title}</h5>
                <p className="card-text">
                    {(item.description).substring(0, 20)}... <Link to={`/product/${item.id}`}> Read more</Link>
                </p>
            </div>
            <div className="card-footer my-3">
                <h5>Price: <del className="mx-3">$ {item.marcket_price}</del>$ {item.selling_price}</h5>
                {/* <Link class="btn btn-primary text-right">Add to Cart</Link> */}
                <button onClick={ ()=>addtocart(item.id) } className="btn btn-danger">Add to Cart</button>
            </div>
        </div>
    )
}

export default Product;

// import Axios from 'axios'
// import React from 'react'
// import { Link, useHistory } from 'react-router-dom'
// import { domain } from '../env'
// import { useGlobalState } from '../state/provider'

// const Product = ({ item }) => {
//     const [{ profile }, dispatch] = useGlobalState()

//     const history = useHistory()

//     const addtocart = async (id) => {
//         profile !== null ? (
//             await Axios({
//                 method: 'post',
//                 url: `${domain}/api/addtocart/`,
//                 headers: {
//                     Authorization: `token ${window.localStorage.getItem('token')}`
//                 },
//                 data: { "id": id }
//             }).then(response => {
//                 // console.log(response);
//                 dispatch({
//                     type: "ADD_RELOADPAGE_DATA",
//                     reloadpage: response
//                 })
//             })
//         ) : (
//                 history.push("/login")
//             )

//     }
//     return (
//         <div class="card single_product" >
//             <Link to={`/product/${item.id}`} className="product_image">
//                 <img class="card-img-top" src={item.image} alt="Card image cap" />
//             </Link>
//             <div class="card-body">
//                 <h5 class="card-title">{item.title}</h5>
//                 <p class="card-text">
//                     {(item.description).substring(0, 50)}... <Link to={`/product/${item.id}`}> Read more</Link>
//                 </p>
//                 <Link onClick={() => addtocart(item.id)} class="btn btn-primary">Add to Cart</Link>
//             </div>
//             <div className="card-footer">
//                 <h5>Price: <del>{item.marcket_price}$</del> {item.selling_price}$</h5>
//             </div>
//         </div>
//     )
// }

// export default Product