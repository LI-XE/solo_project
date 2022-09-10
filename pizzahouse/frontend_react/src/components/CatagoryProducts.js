import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { domain } from "../env";
import Product from "./Product";
import SubMenu from "./SubMenu";

const CategoryProducts = () => {
  const { id } = useParams();
  const [category, setCategory] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getcategory = async () => {
      await Axios({
        method: "get",
        url: `${domain}/api/category/`,
      }).then((response) => {
        console.log(response.data);
        setCategories(response.data);
      });
    };
    getcategory();
  }, []);

  useEffect(() => {
    const getcategoryproduct = async () => {
      await Axios({
        method: "get",
        url: `${domain}/api/category/${id}/`,
      }).then((response) => {
        console.log(response.data[0]);
        setCategory(response.data[0]);
      });
    };
    getcategoryproduct();
  }, [id]);

  return (
    <div className="container">
      <SubMenu category={category} categories={categories} />

      <div className="item-list">
        {category !== null &&
          category?.category_products?.map((product, i) => (
            <div className="product p-0 m-0" key={i}>
              <Product item={product} key={i} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default CategoryProducts;
