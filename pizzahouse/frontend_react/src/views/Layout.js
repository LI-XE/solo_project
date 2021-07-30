import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import CategoryProducts from '../components/CatagoryProducts';
import Product from '../components/Product';
import { domain, usertoken, header } from '../env';
import { useGlobalState } from '../state/provider';

const Layout = () => {
    const [{ profile, pagereload, cartcomplit, cartuncomplit }, dispatch] = useGlobalState();
    const [products, setProducts] = useState(null);
    const [categories, setCategoris] = useState(null)
    // console.log(usertoken, "this is user token");
    // console.log(profile, "$$$$ this is profile");
    // console.log(cartcomplit)
    // console.log(cartcomplit)


    useEffect(() => {
        const getdata = async () => {
            Axios({
                method: "get",
                url: `${domain}/api/product/`
            }).then(res => {
                // console.log(res.data);
                setProducts(res.data)
            })
        }
        getdata()
    }, [])

    useEffect(() => {
        const getcategory = async () => {
            await Axios({
                method: "get",
                url: `${domain}/api/category/`
            }).then(response => {
                // console.log(response.data);
                setCategoris(response.data)
            })
        }
        getcategory()
    }, [])


    return(
        <div>
            <div className="row">
                <div className="col-md-3 mt-3 bg-warning text-dark">
                    <h1 className="m-5">All Categoris</h1>
                    {
                        categories !== null &&
                        categories?.map((category, i) => (
                            <div className="p-2 m-3" key={i}>
                                <Link to={`/category/${category.id}`} className="fw-bold fs-2 text-primary">{category.title}</Link>
                            </div>
                        ))
                    }
                </div>
                <div className="col-md-9">
                    <div className="row">

                    {
                        products !== null &&
                        products?.map((item, i) => (
                                <div key={i} className="col-md-4 my-3">
                                    <Product item={item} />
                                </div>

                        ))
                    }
                    

                    </div>
                    {/* <div className="homepage__pagination">
                        <div className="">
                            {
                                products?.previous !== null ?
                                    <button onClick={prevoous} class="btn btn-lg btn-success"><i class="fas fa-backward"></i> Previous</button>
                                    :
                                    <button class="btn btn-lg btn-success" disabled> <i class="fas fa-backward"></i> Previous</button>
                            }
                        </div>
                        <div className="">
                            {
                                products?.next !== null ?
                                    <button onClick={nextpage} class="btn btn-lg btn-danger">Next <i class="fas fa-forward"></i></button>
                                    :
                                    <button class="btn btn-lg btn-danger" disabled>Next <i class="fas fa-forward"></i></button>
                            }
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    )

}

export default Layout;