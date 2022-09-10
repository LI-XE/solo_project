import React from "react";
import { Link } from "react-router-dom";

const SubMenu = ({ categories, category }) => {
  console.log(categories);
  console.log(category);

  return (
    <div className="menu-page">
      <div className="sub-menus">
        {categories !== null &&
          categories?.map((c, index) => (
            <div className="p-0 m-0" key={index}>
              <Link
                to={`/category/${c.id}`}
                className={`sub-menu ${
                  c.id === category?.id ? "selectedTab" : "nonSelectedTab"
                }`}
              >
                {c.title}
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default SubMenu;

// import Axios from 'axios'
// import React, { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom'
// import { domain } from '../env'
// import Product from './Product'

// const SubMenu = () => {
//     const [products, setProducts] = useState(null);
//     const [categories, setCategoris] = useState(null)
//     useEffect(() => {
//         const getdata = async () => {
//             Axios({
//                 method: "get",
//                 url: `${domain}/api/product/`
//             }).then(res => {
//                 console.log(res.data);
//                 setProducts(res.data)
//             })
//         }
//         getdata()
//     }, [])

//     // const nextpage = async () => {
//     //     Axios({
//     //         method: "get",
//     //         url: products?.next
//     //     }).then(res => {
//     //         setProducts(res.data)
//     //     })
//     // }

//     // const prevoous = async () => {
//     //     Axios({
//     //         method: "get",
//     //         url: products?.previous
//     //     }).then(res => {
//     //         setProducts(res.data)
//     //     })
//     // }
//     // console.log(products);
//     useEffect(() => {
//         const getcategory = async () => {
//             await Axios({
//                 method: "get",
//                 url: `${domain}/api/category/`
//             }).then(response => {
//                 // console.log(response.data);
//                 setCategoris(response.data)
//             })
//         }
//         getcategory()
//     }, [])

//     return(
//         <div className="menu-page">
//             <div className="sub-menus">

//                 {
//                     categories !== null &&
//                     categories?.map((category, i) => (
//                         <div className="p-0 m-0" key={i}>
//                             <Link to={`/category/${category.id}`} className="sub-menu">{category.title}</Link>
//                         </div>
//                     ))
//                 }
//             </div>
//         </div>
//     )

// }

// export default SubMenu;
