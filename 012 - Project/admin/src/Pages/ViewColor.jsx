import axios from "axios";
import React, { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { Tooltip } from "react-tooltip";

const ViewColor = () => {

  const [Color, setColor] = useState([]);
  const [isChildSelectChecked, setisChildSelectChecked] = useState([]);
  const [isMasterSelectChecked, setisMasterSelectChecked] = useState(false);

  const fetchColor = () => {
    axios.get(`http://localhost:4000/api/admin-panel/color/read-color`)
      .then((response) => {
        console.log(response.data);
        setColor(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  const updateStatus = (e) => {
    const status = (e.target.textContent !== 'Active');
    axios.put(`http://localhost:4000/api/admin-panel/color/update-status/${e.target.value}`, { status })
      .then((response) => {
        console.log(response.data);
        setColor((prev) => (
          prev.map((color) => {
            if (color._id == e.target.value) {
              return { ...color, status };
            }
            else {
              return color;
            }
          })
        ))
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    fetchColor();
  }, [])

  useEffect(() => {
    setisChildSelectChecked(new Array(Color.length).fill(false));
  }, [Color])


  const handleMasterCheckbox = (e) => {
    const newMasterCheckedState = !isMasterSelectChecked;
    setisMasterSelectChecked(newMasterCheckedState);

    // Set all checkboxes to the same state as master checkbox
    setisChildSelectChecked(new Array(Color.length).fill(newMasterCheckedState));
  }

  const handleChildCheckbox = (index) => {
    const updatedCheckedStates = isChildSelectChecked.map((checked, i) => i === index ? !checked : checked);
    setisChildSelectChecked(updatedCheckedStates);
    // If all checkboxes are checked, set master checkbox to true, otherwise false
    const allChecked = updatedCheckedStates.every((checked) => checked === true);
    setisMasterSelectChecked(allChecked);
  }

  return (
    <div className="w-[90%] bg-white rounded-[10px] border mx-auto my-[150px]">
      <span className="block h-[40px] border-b rounded-[10px_10px_0_0] bg-[#f8f8f9] text-[#303640] p-[8px_16px] text-[20px]">
        View Color
      </span>
      <div className="w-[90%] mx-auto my-[20px]">
        <table className="w-full">
          <thead>
            <tr className="border-b text-left">
              <th className="flex p-2">
                <button className="bg-[#5351c9] font-light text-white rounded-md p-1 w-[80px] h-[35px] my-[10px] mr-[10px]">
                  Delete
                </button>
                <input onChange={handleMasterCheckbox} checked={isMasterSelectChecked}
                  type="checkbox"
                  name="deleteAll"
                  className="cursor-pointer accent-[#5351c9] input"
                />
              </th>
              <th className="p-2">Sno.</th>
              <th className="p-2">Color Name</th>
              <th className="p-2">Color</th>
              <th className="p-2">Action</th>
              <th className="p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {
              Color.map((color, index) => (
                <tr className="border-b">
                  <td className="p-2">
                    <input checked={isChildSelectChecked[index]} onChange={() => handleChildCheckbox(index)}
                      type="checkbox"
                      name="delete"
                      className="cursor-pointer accent-[#5351c9] input"
                    />
                  </td>
                  <td className="p-2">{index + 1}</td>
                  <td className="p-2">{color.name}</td>
                  <td className="p-2">
                    <div style={{ backgroundColor: color.code }}
                      className={`w-[90%] mx-auto h-[20px] border`}></div>
                  </td>
                  <td className="p-2">
                    <MdDelete className="my-[5px] text-red-500 cursor-pointer inline" />{" "}
                    |{" "}
                    <Link to="/dashboard/color/update-colors">
                      <CiEdit className="my-[5px] text-yellow-500 cursor-pointer inline" />
                    </Link>
                  </td>
                  <td className="p-2">
                  <button onClick={updateStatus} value={color._id} data-tooltip-id="btn-tooltip" data-tooltip-content={!color.status ? "Click to Active" : " Click to Inactive"} className={`${color.status ? "bg-green-600" : "bg-red-600"} text-white font-light rounded-md my-1 p-1 w-[80px] h-[35px] cursor-pointer`}>
                      {color.status ? "Active" : "Inactive"}
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

export default ViewColor;
