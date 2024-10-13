import axios from "axios";
import React, { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'

const ViewCategory = () => {
  let [show1, setShow1] = useState(false);
  let [show2, setShow2] = useState(false);
  let [show3, setShow3] = useState(false);
  let [show4, setShow4] = useState(false);

  const [parentCategories, setparentCategories] = useState([]);

  let fetchParentCategories = () => {

    axios.get('http://localhost:4000/api/admin-panel/parent-category/read-category')
      .then((response) => {
        console.log(response.data.data);
        setparentCategories(response.data.data);
        console.log(parentCategories);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    fetchParentCategories();
  }, [])

  const updateStatus = (e) => {
    const status = (e.target.textContent !== 'Active');
    axios.put(`http://localhost:4000/api/admin-panel/parent-category/update-status/${e.target.value}`, { status })
      .then((response) => {
        console.log(response.data);
        setparentCategories((prev) => (
          prev.map((parentCategory) => {
            if (parentCategory._id == e.target.value) {
              return { ...parentCategory, status };
            }
            else {
              return parentCategory;
            }
          })
        ))
      })
      .catch((error) => {
        console.log(error);
      });
  }


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
                <button
                  className="bg-red-400 rounded-sm px-2 py-1"

                >Delete</button>
                <input
                  type="checkbox"
                  name="deleteAll"
                  id="deleteAllCat"

                  className="accent-[#5351c9]"

                />
              </th>
              <th>Sno</th>
              <th>Category Name</th>
              <th>Description</th>
              <th>Action</th>
              <th>Status</th>
            </tr>
          </thead>


          <tbody>
            {
              parentCategories.map((parentCategory, index) => (
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
                  <td>{parentCategory.name}</td>
                  <td className="w-[200px] flex-wrap p-1">
                    {parentCategory.description}
                    <span onClick={() => setShow1(!show1)} className={show1 === true ? "hidden" : "font-bold cursor-pointer"}>
                      ...Read
                    </span>
                    {
                      show1 === false ? (" ") : (<span>Deserunt nam est delectus itaque sint harum architecto.</span>)
                    }
                  </td>
                  <td>
                    <MdDelete className="my-[5px] text-red-500 cursor-pointer inline" />{" "}
                    |{" "}
                    <Link to={`/dashboard/category/update-category/${'parentCategory._id'}`}>
                      <CiEdit className="my-[5px] text-yellow-500 cursor-pointer inline" />
                    </Link>
                  </td>
                  <td>


                    <button onClick={updateStatus} value={parentCategory._id} data-tooltip-id="btn-tooltip" data-tooltip-content={!parentCategory.status ? "Click to Active" : " Click to Inactive"} className={`${parentCategory.status ? "bg-green-600" : "bg-red-600"} text-white font-light rounded-md my-1 p-1 w-[80px] h-[35px] cursor-pointer`}>
                      {parentCategory.status ? "Active" : "Inactive"}
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
