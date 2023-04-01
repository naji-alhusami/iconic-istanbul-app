import React, { useState, useEffect } from "react";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { useDispatch, useSelector } from "react-redux";

import {
  addHealthCenter,
  getCenters,
  deleteCenter,
} from "../../features/healthCenters/healthCentersSlice";
import "leaflet/dist/leaflet.css";
import "./Centers.css";

import markerIconx from "../Images/marker-icon.png";
import markerIcon2x from "../Images/marker-icon-2x.png";

const Centers = () => {
  const dispatch = useDispatch();

  const { center, loading } = useSelector((state) => state.center);
  const healthCenters = center;

  const [isListed, setIsListed] = useState(healthCenters.map(() => true));

  const handleCheckboxChange = (event, index) => {
    const newList = [...isListed];
    newList[index] = event.target.checked;
    setIsListed(newList);
    console.log(isListed);
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
    console.log(name, address, category);
    dispatch(addHealthCenter({ name, address, category }));
    event.target.reset();
  };

  const deleteHealthCenter = (index) => {
    dispatch(deleteCenter(index));
  };

  if (loading) {
    return "loading...";
  }

  console.log(healthCenters);
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
            {/* <input
              type="text"
              name="category"
              placeholder="Enter category"
              className="border border-gray-300 rounded-md py-2 px-3 w-full"
            /> */}
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
            Add to Maps
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
                List
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
                    checked={isListed[index]}
                    onChange={(event) => handleCheckboxChange(event, index)}
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
            {healthCenters.map(
              (healthCenter, index) =>
                isListed[index] && (
                  <Marker
                    // key={index}
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
                )
            )}
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default Centers;
