import axios from "axios";
import React, { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { Tooltip } from "react-tooltip";

const ViewCategory = () => {
  let [show1, setShow1] = useState(false);
  let [show2, setShow2] = useState(false);
  const [ProductCategories, setProductCategories] = useState([]);
  const [filepath, setfilepath] = useState('');

  const fetchProductCategories = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/admin-panel/product-category/read-category`)
      .then((response) => {
        setfilepath(response.data.filepath);
        setProductCategories(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  useEffect(() => {
    fetchProductCategories();
  }, [])

  return (
    <div className="w-[90%] mx-auto my-[150px] bg-white rounded-[10px] border">
      <span className="block h-[40px] bg-[#f8f8f9] text-[20px] text-[#303640] p-[8px_16px] border-b rounded-[10px_10px_0_0]">
        View Category
      </span>
      <div className="w-[90%] mx-auto my-[20px]">
        <table className="w-full">
          <thead>
            <tr className="text-left border-b">
              <th>
                Delete{" "}
                <input
                  type="checkbox"
                  name="deleteAll"
                  id="deleteAllCat"
                  className="accent-[#5351c9]"
                />
              </th>
              <th>Sno</th>
              <th>Category Name</th>
              <th>Image</th>
              <th>Description</th>
              <th>Action</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {
              ProductCategories.map((category, index) => (
                <tr className="border-b">
                  <td>
                    <input
                      type="checkbox"
                      name="delete"
                      id="delete1"
                      className="accent-[#5351c9] cursor-pointer"
                    />
                  </td>
                  <td>{index + 1}</td>
                  <td>{category.name}</td>
                  <td className="object-contain p-2">
                    <img
                      src={`${filepath}/${category.thumbnail}`}
                      alt="product men's t-shirt"
                      width={80}
                      height={80}
                    />
                  </td>
                  <td className="w-[200px] flex-wrap p-1">
                    {category.description}
                  </td>
                  <td>
                    <MdDelete className="my-[5px] text-red-500 cursor-pointer inline" />{" "}
                    |{" "}
                    <Link to="/dashboard/products/update-category">
                      <CiEdit className="my-[5px] text-yellow-500 cursor-pointer inline" />
                    </Link>
                  </td>
                  <td>
                    <button value={category._id} data-tooltip-id="btn-tooltip" data-tooltip-content={!category.status ? "Click to Active" : " Click to Inactive"} className={`${category.status ? "bg-green-600" : "bg-red-600"} text-white font-light rounded-md my-1 p-1 w-[80px] h-[35px] cursor-pointer`}>
                      {category.status ? "Active" : "Inactive"}
                    </button>
                    <Tooltip id="btn-tooltip" />
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewCategory;
