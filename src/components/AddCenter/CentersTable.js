import React, { useState } from "react";
import CentersMap from "./CentersMap";

import { useDispatch, useSelector } from "react-redux";
import { deleteCenter } from "../../features/healthCenters/healthCentersSlice";
import AddCenterForm from "./AddCenterForm";

const CentersTable = () => {
  const dispatch = useDispatch();

  const { center } = useSelector((state) => state.center);
  const healthCenters = center;

  const [isListed, setIsListed] = useState(healthCenters.map(() => true));

  const handleCheckboxChange = (event, index) => {
    const newList = [...isListed];
    newList[index] = event.target.checked;
    setIsListed(newList);
    console.log(isListed);
  };

  const deleteHealthCenter = (index) => {
    dispatch(deleteCenter(index));
  };

  //   if (loading) {
  //     return "loading...";
  //   }

  return (
    <>
      <AddCenterForm />

      <table className=" bg-white table-fixed w-[80%] border-collapse border border-gray-400 m-12">
        <thead>
          <tr>
            <th className="w-[10rem] border border-gray-400 px-4 py-2">Name</th>
            <th className="w-[20rem] border border-gray-400 px-4 py-2">
              Address
            </th>
            <th className="w-[10rem] border border-gray-400 px-4 py-2">
              Category
            </th>
            <th className="w-[10rem] border border-gray-400 px-4 py-2">
              Delete
            </th>
            <th className="w-[10rem] border border-gray-400 px-4 py-2">List</th>
          </tr>
        </thead>
        <tbody>
          {healthCenters.map((healthCenter, index) => (
            <tr>
              <td className="border border-gray-400 px-4 py-2">
                <input
                  type="text"
                  className="w-full"
                  value={healthCenter.name}
                  readOnly
                />
              </td>
              <td className="border border-gray-400 px-4 py-2">
                <input
                  type="text"
                  className="w-full"
                  value={healthCenter.address}
                  readOnly
                />
              </td>
              <td className="border border-gray-400 text-center px-4 py-2 ">
                <input
                  type="text"
                  className="w-full"
                  value={healthCenter.category}
                  readOnly
                />
              </td>
              <td className="border border-gray-400 px-4 py-2 flex justify-center">
                <button
                  className="my-2 px-4 py-2 rounded-md shadowtransition-all duration-250 bg-cyan-400 hover:bg-cyan-500 text-m"
                  type="button"
                  onClick={() => deleteHealthCenter(healthCenter.docRef)}
                >
                  Remove
                </button>
              </td>
              <td className="border border-gray-400 text-center px-4 py-2 ">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 px-4 py-2 text-gray-600"
                  checked={isListed[index]}
                  onChange={(event) => handleCheckboxChange(event, index)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <CentersMap isListed={isListed} />
    </>
  );
};

export default CentersTable;
