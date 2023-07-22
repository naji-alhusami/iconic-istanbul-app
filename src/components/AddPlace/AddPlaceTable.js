import React from "react";
import { useDispatch } from "react-redux";

import { showPlace } from "../../features/iconicPlaces/iconicPlacesSlice";

const AddPlaceTable = ({
  handleCheckboxChange,
  iconicPlaces,
  deleteIconicPlaces,
  setShowPlaceSlider,
}) => {
  console.log(iconicPlaces);
  const dispatch = useDispatch();

  const handleShowPlaceInfo = (id) => {
    console.log(id);
    setShowPlaceSlider(true);
    dispatch(showPlace(id));
  };

  return (
    <table className="bg-white table-fixed border-collapse border border-gray-400 m-4 my-8 w-auto md:w-auto">
      <tbody>
        <tr>
          <th className=" border border-gray-400 p-2 md:w-[10rem]">Category</th>
          {iconicPlaces.map((iconicPlace, index) => (
            <td key={index} className="border border-gray-400 p-1 text-center">
              {iconicPlace.category}
            </td>
          ))}
        </tr>

        <tr>
          <th className=" border border-gray-400 p-2 md:w-[10rem]">Name</th>
          {iconicPlaces.map((iconicPlace, index) => (
            <td key={index} className="border border-gray-400 p-1 text-center">
              {iconicPlace.name}
            </td>
          ))}
        </tr>
        <tr>
          <th className=" border border-gray-400 p-2 md:w-[10rem]">Address</th>
          {iconicPlaces.map((iconicPlace, index) => (
            <td key={index} className="border border-gray-400 p-1 text-center">
              {iconicPlace.address}
            </td>
          ))}
        </tr>

        <tr>
          <th className=" border border-gray-400 p-2 md:w-[10rem]">
            Information
          </th>
          {iconicPlaces.map((iconicPlace, index) => (
            <td key={index} className="border border-gray-400 p-1 text-center">
              <button
                className="my-2 rounded-md shadowtransition-all duration-250 bg-cyan-400 hover:bg-cyan-500 text-m p-2"
                type="button"
                onClick={() => handleShowPlaceInfo(iconicPlace.id)}
              >
                Show Information
              </button>
            </td>
          ))}
        </tr>

        <tr>
          <th className=" border border-gray-400 p-2 md:w-[10rem]">Delete</th>
          {iconicPlaces.map((iconicPlace, index) => (
            <td key={index} className="border border-gray-400 p-1 text-center">
              <button
                className="my-2 rounded-md shadowtransition-all duration-250 bg-cyan-400 hover:bg-cyan-500 text-m p-2"
                type="button"
                onClick={() => deleteIconicPlaces(iconicPlace.docRef)}
              >
                Remove
              </button>
            </td>
          ))}
        </tr>

        <tr>
          <th className=" border border-gray-400 p-2 md:w-[10rem]">
            List/Unlist
          </th>
          {iconicPlaces.map((iconicPlace, index) => (
            <td key={index} className="border border-gray-400 p-1 text-center">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-gray-600"
                checked={iconicPlace.isListed}
                onChange={() =>
                  handleCheckboxChange(iconicPlace.docRef, iconicPlace.isListed)
                }
              />
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  );
};

export default AddPlaceTable;
