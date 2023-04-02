import React, { useEffect } from "react";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { useDispatch, useSelector } from "react-redux";

import {
  addHealthCenter,
  getCenters,
  deleteCenter,
  editCenter,
} from "../../features/healthCenters/healthCentersSlice";
import "leaflet/dist/leaflet.css";
import "./AddCenter.css";

import markerIconx from "../Images/marker-icon.png";
import markerIcon2x from "../Images/marker-icon-2x.png";
// import { compose } from "@reduxjs/toolkit";

const CentersTable = () => {
  const dispatch = useDispatch();

  const { center, loading } = useSelector((state) => state.center);
  // console.log(center);
  const healthCenters = center;
  const listedHealthCenters = healthCenters.filter((center) => !center.isListed);

  // const [isListed, setIsListed] = useState(healthCenters.map(() => true));

  const handleCheckboxChange = (id, isListed) => {
    // event.preventDefault();
    console.log(id, isListed);
    dispatch(editCenter({ id, isListed }));
  };

  useEffect(() => {
    const getData = () => {
      dispatch(getCenters());
    };

    getData();
  }, [dispatch]);

  const markerIcon = new L.Icon({
    iconUrl: markerIconx,
    iconRetinaUrl: markerIcon2x,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [0, -41],
  });

  const handleAddressSubmit = (event) => {
    event.preventDefault();
    const name = event.target.elements.name.value;
    const address = event.target.elements.address.value;
    const category = event.target.elements.category.value;
    const isListed = false;
    dispatch(addHealthCenter({ name, address, category, isListed }));
    event.target.reset();
  };

  const deleteHealthCenter = (index) => {
    dispatch(deleteCenter(index));
  };

  if (loading) {
    return "loading...";
  }

  return (
    <div className="container">
      <div className=" box">
        <form
          onSubmit={handleAddressSubmit}
          className=" max-w-lg bg-white rounded-md mx-auto xl:m-20 lg:m-12 p-12"
        >
          <div className="mb-4">
            <label htmlFor="name" className="block font-medium mb-2">
              Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter name"
              className="border border-gray-300 rounded-md py-2 px-3 w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="address" className="block font-medium mb-2">
              Address
            </label>
            <input
              type="text"
              name="address"
              placeholder="Enter address"
              className="border border-gray-300 rounded-md py-2 px-3 w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="category" className="block font-medium mb-2">
              Category
            </label>
            <select
              name="category"
              className="border border-gray-300 rounded-md py-2 px-3 w-full"
            >
              <option value="">-- Select a category --</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
              <option value="E">E</option>
              <option value="F">F</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
          >
            Add
          </button>
        </form>
        <table className=" bg-white table-fixed w-[80%] border-collapse border border-gray-400 m-12">
          <thead>
            <tr>
              <th className="w-[10rem] border border-gray-400 px-4 py-2">
                Name
              </th>
              <th className="w-[20rem] border border-gray-400 px-4 py-2">
                Address
              </th>
              <th className="w-[10rem] border border-gray-400 px-4 py-2">
                Category
              </th>
              <th className="w-[10rem] border border-gray-400 px-4 py-2">
                Delete
              </th>
              <th className="w-[10rem] border border-gray-400 px-4 py-2">
                Unlist
              </th>
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
                    checked={healthCenter.isListed}
                    onChange={() =>
                      handleCheckboxChange(
                        healthCenter.docRef,
                        healthCenter.isListed
                      )
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="rounded-md bg-white w-fit p-2 m-12">
          <MapContainer
            id="map"
            className="justify-center "
            center={[51.505, -0.09]}
            zoom={13}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {
              listedHealthCenters.map((healthCenter, index) => (
                // isListed[index] && (
                <Marker
                  position={[healthCenter.lat, healthCenter.lon]}
                  icon={markerIcon}
                >
                  <Popup>
                    <div>
                      <h3>Name: {healthCenter.name}</h3>
                      <p>Adress: {healthCenter.address}</p>
                      <p>Category: {healthCenter.category}</p>
                      <button
                        className="bg-cyan-300 p-2 rounded-md"
                        type="button"
                        onClick={() => deleteHealthCenter(index)}
                      >
                        Remove
                      </button>
                    </div>
                  </Popup>
                </Marker>
              ))
              // )
            }
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default CentersTable;
