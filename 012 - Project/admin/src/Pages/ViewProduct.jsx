import axios from "axios";
import React, { useEffect, useState } from "react";
import { CiEdit, CiWarning } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";

const ViewProduct = () => {
  let [showDesc1, setShowDesc1] = useState(false);
  let [showShortDesc1, setShowShortDesc1] = useState(false);
  const [Products, setProducts] = useState([]);

  const fetchProducts = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/admin-panel/product/read-products`)
      .then((response) => {
        setProducts(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  useEffect(() => {
    fetchProducts();
  }, [])
  useEffect(() => {
    console.log(Products);
  }, [Products])
  return (
    <div className="w-[90%] mx-auto my-[150px] rounded-[10px] bg-white border">
      <span className="block h-[40px] bg-[#f8f8f9] text-[20px] text-[#303640] font-bold p-[8px_16px] border-b rounded-[10px_10px_0_0]">
        View Product
      </span>
      <div className="w-[90%] mx-auto my-[20px]">
        <table className="w-full">
          <thead>
            <tr className="border-b text-left">
              <th className="flex gap-[5px]">
                Delete{" "}
                <input
                  type="checkbox"
                  id="deleteAll"
                  name="delete"
                  className="input accent-[#5351c9] cursor-pointer h-[fit-content] m-[5px]"
                />
              </th>
              <th>Sno</th>
              <th>Product Name</th>
              <th>Description</th>
              <th>Short Description</th>
              <th>Thumbnail</th>
              <th>Action</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {
              Products.map((product, index) => (
                <tr className="border-b">
                  <td>
                    <input
                      type="checkbox"
                      id="delete"
                      name="delete"
                      className="input accent-[#5351c9] cursor"
                    />
                  </td>
                  <td>{index + 1}</td>
                  <td>{product.name}</td>
                  <td className="w-[200px] p-2">
                    {product.description}
                  </td>
                  <td className="w-[200px] p-2">
                    {product.short_description}
                  </td>
                  <td className="object-contain">
                    {product.thumbnail ?
                      <img
                        src={product.filepath + product.thumbnail}
                        alt="men's t-shirt"
                        width={80}
                        height={80}
                        className="rounded-[5px]"
                      /> :
                      <span className="flex align-middle"> <CiWarning color="orange" size={25} /> Image Not Uploaded</span>
                    }

                  </td>
                  <td>
                    <MdDelete className="my-[5px] text-red-500 cursor-pointer inline" />{" "}
                    |{" "}
                    <Link to="/dashboard/products/update-product">
                      <CiEdit className="my-[5px] text-yellow-500 cursor-pointer inline" />
                    </Link>
                  </td>
                  <td>Display</td>
                </tr>
              ))
            }

          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewProduct;
