import React from 'react';
import { Link } from 'react-router-dom';
import { useGlobalState } from '../state/provider';
import {Button, Dropdown, Item, Toggle} from 'react-bootstrap';


const Header = (props) => {
    const [{ profile, cartuncomplit }, dispatch] = useGlobalState();
    let cart_product_length = 0;
    if(cartuncomplit !== null){
        cart_product_length = cartuncomplit?.cartproduct?.length
    }else{
        cart_product_length = 0;
    }

    const logoutBtn = () => {
        window.localStorage.clear()
        dispatch({
            type: "ADD_PROFILE",
            profile:null
        })
        window.location.href = "/"
    }
    return(
        <div>
            <nav className="header items-center  py-4 bg-white">
                <div className="d-inline">
                    <a href="/"><img src="/img/logo.jpg" alt="logo"style={{width:'50px'}} /></a>
                    <a href="/" className="pizzahouse"><h1 className="d-inline align-middle mx-3">Pizza House</h1></a>
                    <div className="d-inline">
                        <Dropdown className="d-inline">
                            <Dropdown.Toggle variant="warning" id="dropdown-basic">
                                Menu
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item href="/home">Home</Dropdown.Item>
                                <Dropdown.Item href="/home">Event</Dropdown.Item>
                                <Dropdown.Item href="/layout">Menu</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>
                <div className="d-inline">
                    <ul className="nav align-middle">
                    {
                                profile !== null ?
                                (
                                    <>
                                        <li className=""><a href="/cart">
                                            <img src="/img/cart4.svg" alt="" className="inline-block px-4 rounded-full"></img>
                                            <span>({cart_product_length})</span></a></li>
                                        <li className="mx-5"><a href="/profile">Profile</a></li>
                                        <li className=""><a href="/logout" onClick={logoutBtn}>Logout</a></li>
                                    </>
                                )
                                :
                                (
                                    <>
                                        <li className="ml-5"><a href="/register" className="mx-3">Register</a></li>
                                        <li className=""><a href="/login">Login</a></li>
                                    </>
                                )
                            }
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default Header;


// import React from 'react';
// import { Link } from 'react-router-dom'
// import { useGlobalState } from '../state/provider'
// import { domain } from '../constants';

// const Header = (props) => {
//     const [{ profile, cartItemf_uncomplit }, dispatch] = useGlobalState()
    
//     let cart_itemt_length = 0;
//     if (cartItemf_uncomplit !== null) {
//         cart_itemt_length = cartItemf_uncomplit?.cartItem?.length
//     } else {
//         cart_itemt_length = 0;
//     }

//     const logoutbutton = () => {
//         window.localStorage.clear()
//         dispatch({
//             type: "ADD_PROFILE",
//             profile: null
//         })
//         window.location.href = "/"
//     }

//     return(
//         <div>
//             <nav className="header items-center  py-4 bg-white">
//                 <div className="d-inline">
//                     <a href="/"><img src="/img/logo.jpg" alt="logo"style={{width:'50px'}} /></a>
//                     <a href="/" className="pizzahouse"><h1 className="d-inline align-middle mx-3">Pizza House</h1></a>
//                     <div className="d-inline dropdown">
//                         <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-bs-toggle="dropdown" aria-expanded="false">
//                             Menu
//                         </button>
//                         <ul className="dropdown-menu">
//                             <li><a className="dropdown-item" href="/Menu/pizza">Pizza</a></li>
//                             <li><a className="dropdown-item active" href="/Menu/pasta" aria-current="true">Pasta</a></li>
//                             <li><a className="dropdown-item" href="/Menu/drink">Drink</a></li>
//                         </ul>
//                     </div>
//                 </div>
//                 <div className="d-inline">
//                     <ul className="nav align-middle">
//                     {
//                         profile !== null ? (
//                             <>
//                                 <li className="nav-item">
//                                     <Link to="/cart" className="btn btn-dark">
//                                         {/* <i className="fas fa-cart-plus"></i> */}
//                                         <image src="\img\empty_cart.png" alt="cart" />
//                                         <span>({cart_itemt_length})</span>
//                                     </Link>
//                                 </li>
//                                 <li className="nav-item">
//                                     <Link to="/profile" className="nav-link active btn-dark">Profile</Link>
//                                 </li>
//                                 <li class="nav-item">
//                                     <Link onClick={logoutbutton} className="nav-link active btn-dark">Logout</Link>
//                                 </li>
//                             </>
//                         ) :
//                             (
//                                 <li class="nav-item">
//                                     <Link to="/login" class="nav-link  active btn-dark">Login</Link>
//                                 </li>
//                             )
//                     }
//                     </ul>
//                 </div>
//             </nav>
//         </div>
//     )
// }

// export default Header;