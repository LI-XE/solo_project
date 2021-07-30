import React, { useEffect } from 'react';
import Axios from 'axios';
import './App.css';
// import { Router, Link  } from '@reach/router';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import Login from './components/Login';
import Register from './components/Register';
import Nav from './views/Nav';
import Home from './components/Home';
import Menu from './components/Menu';
import Event from './components/Event';
import Cart from './components/Cart';
import Layout from './views/Layout';
import Profile from './components/Profile';
import ProductDetails from './components/ProductDetails';
import CategoryProducts from './components/CatagoryProducts';
import { domain, usertoken, header } from './env';
import { useGlobalState } from './state/provider';
import Oldorders from './components/Oldorders';
import OrdersDetail from './components/OrdersDetail';
import Order from './components/Order';


function App() {
  const [{ profile, pagereload, cartcomplit, cartuncomplit }, dispatch] = useGlobalState();
  // console.log(usertoken, "this is user token");
  // console.log(profile, "$$$$ this is profile");
  // console.log(cartcomplit, " #### cartcomplit")
  // console.log(cartuncomplit, "%%%%%% cartuncomplit")
  const tokenget = window.localStorage.getItem('token')
  useEffect( () => {
    if (usertoken !== null) {
      const getdata = async () => {
        await Axios({
          method: "get",
          url: `${domain}/api/profile/`,
          headers: header
        }).then(res => {
          console.log(res.data, "$$$$$ user profile data")
          // console.log(user)
          dispatch({
            type: "ADD_PROFILE",
            profile: res.data["data"]
            
          })
        }) 
        .catch(e => {
          // console.log(e)
          dispatch({
            type: "ADD_PROFILE",
            profile: null
          })
      })
    }
      getdata()
    }

  }, [pagereload])

  useEffect(() => {
    if (tokenget !== null) {
      const getcart = async () => {
        await Axios({
          method: "get",
          url: `${domain}/api/cart/`,
          headers: header
        }).then(res => {
          console.log(res.data, " Cart ......This is Cart");
          {
            const all_data = []
            res.data.map(data => {
              if (data.complit) {
                all_data.push(data)
                dispatch({
                  type: "ADD_CARTCOMPLIT",
                  cartcomplit: all_data
                  
                })
                // console.log(true);
              }
              else {
                
                dispatch({
                  type: "ADD_CARTUNCOMPLIT",
                  cartuncomplit: data,
                  
                })
                // console.log(false)
              }
            })
          }
        })
      }
      getcart()
    }
  }, [pagereload])

  
  return (
    <div className="App">
      <BrowserRouter>
      <Header />
        <Switch>
          <Route exact path="/" component={Nav} />
          <Route exact path="/product/:id" component={ ProductDetails } />
          <Route exact path="/category/:id" component={ CategoryProducts } />
          <Route exact path="/home" component={ Home } />
          <Route exact path="/layout" component={ Layout } />
          
          {
            profile !== null ? (
              <>
                
                <Route exact path="/profile" component={ Profile } />
                <Route exact path="/cart" component={ Cart } />
                <Route exact path="/oldorders" component={ Oldorders } />
                <Route exact path="/order" component={ Order } />
                <Route exact path="/orderdetails/:id" component={ OrdersDetail } />
              </>
            ):
            (
              <>
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
              </>
            )
          }
          <Route exact component={Home} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;