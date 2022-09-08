import Axios from "axios";
import React from "react";
import { Link, useHistory } from "react-router-dom";
import { domain, header } from "../env";
import { useGlobalState } from "../state/provider";
import Product from "./Product";

const Cart = () => {
  const [{ pagereload, cartuncomplit, delete_cartuncomplit }, dispatch] =
    useGlobalState();
  const history = useHistory();
  console.log(cartuncomplit, " $$$$$$$$$");
  let cart_product_length = 0;
  if (cartuncomplit !== null) {
    cart_product_length = cartuncomplit?.cartproduct?.length;
  } else {
    cart_product_length = 0;
  }

  const updatecart = async (id) => {
    await Axios({
      method: "post",
      url: `${domain}/api/updatecart/`,
      headers: header,
      data: { id: id },
    }).then((response) => {
      // console.log(response);
      dispatch({
        type: "PAGE_RELOAD",
        pagereload: response.data,
      });
    });
  };

  const editcart = async (id) => {
    await Axios({
      method: "post",
      url: `${domain}/api/editcart/`,
      headers: header,
      data: { id: id },
    }).then((response) => {
      // console.log(response);
      dispatch({
        type: "PAGE_RELOAD",
        pagereload: response.data,
      });
    });
  };
  const deletecartproduct = async (id) => {
    await Axios({
      method: "post",
      url: `${domain}/api/deletecartproduct/`,
      headers: header,
      data: { id: id },
    }).then((response) => {
      console.log(response);
      dispatch({
        type: "PAGE_RELOAD",
        pagereload: response.data,
      });
      dispatch({
        type: "DELETE_CARTUNCOMPLIT",
        delete_cartuncomplit: response.data,
      });
      
    });
  };
  const deletecart = async (id) => {
    await Axios({
      method: "post",
      url: `${domain}/api/deletecart/`,
      headers: header,
      data: { id: id },
    })
      .then((response) => {
        // console.log(response);
        dispatch({
          type: "PAGE_RELOAD",
          pagereload: response.data,
        });
        dispatch({
          type: "ADD_CARTUNCOMPLIT",
          cartuncomplit: null,
        });
        alert("Full Cart is Deleted");
        history.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="cart p-5">
      <div className="order container mx-auto">
        <div className="flex items-center">
          {cart_product_length !== 0 ? (
            <table class="container-fluid">
              <thead>
                <tr className="row">
                  <th className="col-1">Number</th>
                  <th className="col-3">Product</th>
                  <th className="col-2">Price</th>
                  <th className="col-1">quantity</th>
                  <th className="col-2">Subtotal</th>
                  <th className="col-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {cartuncomplit?.cartproduct.map((data, i) => (
                  <tr key={i} className="row">
                    <td className="col-1 my-3">{i + 1}</td>
                    <td className="col-3 my-3">{data.title}</td>
                    <td className="col-2 my-3">{data.price}</td>
                    <td className="col-1 my-3">{data.quantity}</td>
                    <td className="col-2 my-3">{data.subtotal}</td>
                    <td className="col-3 my-3">
                      <button
                        className="btn btn-warning px-3"
                        onClick={() => editcart(data.id)}
                      >
                        -
                      </button>
                      <button
                        className="btn btn-primary mx-3 px-3"
                        onClick={() => updatecart(data.id)}
                      >
                        +
                      </button>
                      <a
                        className="btn btn-danger"
                        href="#"
                        role="button"
                        onClick={() => deletecartproduct(data.id)}
                      >
                        <img src="img\trash.svg" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="border-top">
                <tr className="row my-3">
                  <th className="col-8">Total: </th>
                  <th className="col-2">{cartuncomplit?.total}</th>
                  <th className="col-2">
                    <Link to="/order" className="btn btn-success">
                      Order NOW
                    </Link>
                  </th>
                </tr>
              </tfoot>
            </table>
          ) : (
            <div>
              <div className="container mx-auto text-center">
                <h1 className="text-3xl font-bold mb-2">Cart Empty</h1>

                <p>
                  You haven't ordered a pizza yet. To order a pizza, go to the
                  main page.
                </p>
                <div className="m-5">
                  <img src="/img/empty_cart.png" alt="Empty Cart"></img>
                </div>
                <Link
                  to="/layout"
                  className="px-5 py-2 rounded-pill btn-primary text-white font-bold m-5"
                >
                  Go back to order!
                </Link>
              </div>
            </div>
          )}

          <div className="row mt-5">
            <div className="col">
              <Link to="/oldorders" className="btn btn-info">
                Old orders
              </Link>
            </div>
            {cart_product_length != 0 && (
              <div className="col">
                <Link
                  to="/layout"
                  className="px-5 py-2 rounded-pill btn-primary text-white font-bold m-5"
                >
                  Order More
                </Link>
                <Link
                  className="btn rounded-pill btn-danger px-5 py-1"
                  onClick={() => deletecart(cartuncomplit?.id)}
                >
                  Delete Cart
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
