import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { domain } from '../env'
import Product from './Product'

const Home = () => {
    const [products, setProducts] = useState(null);
    const [categoris, setCategoris] = useState(null)
    // useEffect(() => {
    //     const getdata = () => {
    //         Axios({
    //             method: "get",
    //             url: `${domain}/api/product/`
    //         }).then(res => {
    //             setProducts(res.data)
    //         })
    //     }
    //     getdata()
    // }, [])

    // const nextpage = async () => {
    //     Axios({
    //         method: "get",
    //         url: products?.next
    //     }).then(res => {
    //         setProducts(res.data)
    //     })
    // }

    // const prevoous = async () => {
    //     Axios({
    //         method: "get",
    //         url: products?.previous
    //     }).then(res => {
    //         setProducts(res.data)
    //     })
    // }
    // // console.log(products);
    // useEffect(() => {
    //     const getcategory = async () => {
    //         await Axios({
    //             method: "get",
    //             url: `${domain}/api/category/`
    //         }).then(response => {
    //             // console.log(response.data);
    //             setCategoris(response.data)
    //         })
    //     }
    //     getcategory()
    // }, [])
    return (
        <div className="container-fluid">
            <h1>Welcome to Pizza House!</h1>
            <img className="home_img" src="/EventImages/event3.jpg" alt="home" />
        </div>
    )
}

export default Home
