import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { Link } from "react-router-dom";
import axios from "axios";
import { Tooltip } from "react-tooltip";

const ViewSizes = () => {

  const [Size, setSize] = useState([]);
  const [isChildSelectChecked, setisChildSelectChecked] = useState([]);
  const [isMasterSelectChecked, setisMasterSelectChecked] = useState(false);

  const fetchSizes = () => {
    axios.get(`http://localhost:4000/api/admin-panel/size/read-size`)
      .then((response) => {
        console.log(response.data);
        setSize(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  const updateStatus = (e) => {
    const status = (e.target.textContent !== 'Active');
    axios.put(`http://localhost:4000/api/admin-panel/size/update-status/${e.target.value}`, { status })
      .then((response) => {
        console.log(response.data);
        setSize((prev) => (
          prev.map((size) => {
            if (size._id == e.target.value) {
              return { ...size, status };
            }
            else {
              return size;
            }
          })
        ))
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    fetchSizes();
  }, [])

  useEffect(() => {
    setisChildSelectChecked(new Array(Size.length).fill(false));
  }, [Size])


  const handleMasterCheckbox = (e) => {
    const newMasterCheckedState = !isMasterSelectChecked;
    setisMasterSelectChecked(newMasterCheckedState);

    // Set all checkboxes to the same state as master checkbox
    setisChildSelectChecked(new Array(Size.length).fill(newMasterCheckedState));
  }

  const handleChildCheckbox = (index) => {
    const updatedCheckedStates = isChildSelectChecked.map((checked, i) => i === index ? !checked : checked);
    setisChildSelectChecked(updatedCheckedStates);
    // If all checkboxes are checked, set master checkbox to true, otherwise false
    const allChecked = updatedCheckedStates.every((checked) => checked === true);
    setisMasterSelectChecked(allChecked);
  }

  return (
    <div className="w-[90%] bg-white mx-auto border rounded-[10px] my-[150px]">
      <span className="block border-b rounded-[10px_10px_0_0] bg-[#f8f8f9] text-[#303640] h-[50px] p-[8px_16px] text-[23px] font-bold">
        View Size
      </span>
      <div className="w-[90%] mx-auto">
        <table className="w-full my-[20px]">
          <thead>
            <tr className="text-left border-b">
              <th>
                Delete
                <input onChange={handleMasterCheckbox} checked={isMasterSelectChecked} type="checkbox" name="deleteAll" className="m-[0_10px] accent-[#5351c9] cursor-pointer input"
                />
              </th>
              <th>Sno</th>
              <th>Size Name</th>
              <th>Size Order</th>
              <th>Action</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {
              Size.map((size, index) => (
                <tr className="border-b">
                  <td>
                    <input checked={isChildSelectChecked[index]} onChange={() => handleChildCheckbox(index)}
                      type="checkbox"
                      name="delete"
                      className="accent-[#5351c9] cursor-pointer input"
                    />
                  </td>
                  <td>{index + 1}</td>
                  <td>{size.name}</td>
                  <td>{size.order}</td>
                  <td className="flex gap-[5px]">
                    <MdDelete className="my-[5px] text-red-500 cursor-pointer" /> |{" "}
                    <Link to="/dashboard/sizes/update-size">
                      <CiEdit className="my-[5px] text-yellow-500 cursor-pointer" />
                    </Link>
                  </td>
                  <td>
                    <button onClick={updateStatus} value={size._id} data-tooltip-id="btn-tooltip" data-tooltip-content={!size.status ? "Click to Active" : " Click to Inactive"} className={`${size.status ? "bg-green-600" : "bg-red-600"} text-white font-light rounded-md my-1 p-1 w-[80px] h-[35px] cursor-pointer`}>
                      {size.status ? "Active" : "Inactive"}
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

export default ViewSizes;
