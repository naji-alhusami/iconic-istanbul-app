import React, { useState, useEffect, useRef } from "react";

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

const AddCenter = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const { center } = useSelector((state) => state.center);
  const healthCenters = center;
  // const istanbulBounds = {
  //   minLat: 40.8027,
  //   maxLat: 41.3191,
  //   minLon: 28.5836,
  //   maxLon: 29.3474,
  // };

  // const listedHealthCenters = healthCenters.filter(
  //   (center) =>
  //     center.isListed &&
  //     center.lat >= istanbulBounds.minLat &&
  //     center.lat <= istanbulBounds.maxLat &&
  //     center.lon >= istanbulBounds.minLon &&
  //     center.lon <= istanbulBounds.maxLon
  // );
  const listedHealthCenters = healthCenters.filter((center) => center.isListed);
  console.log(listedHealthCenters);

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
    const isListed = true;
    dispatch(addHealthCenter({ name, address, category, isListed }));

    event.target.reset();
  };

  const mapRef = useRef();

  useEffect(() => {
    if (mapRef.current && healthCenters.length > 0) {
      mapRef.current.fitBounds(getBounds());
    } else if (mapRef.current) {
      mapRef.current.setView([41.0282, 28.9784], 13);
    }

    function getBounds() {
      const bounds = L.latLngBounds([[41.0282, 28.9784]]);
      healthCenters.forEach((healthCenter) => {
        bounds.extend([healthCenter.lat, healthCenter.lon]);
      });
      return bounds;
    }
  }, [healthCenters]);

  function getBounds() {
    const bounds = L.latLngBounds([[41.0282, 28.9784]]);
    healthCenters.forEach((healthCenter) => {
      bounds.extend([healthCenter.lat, healthCenter.lon]);
    });
    return bounds;
  }

  const handleCheckboxChange = (id, isListed) => {
    mapRef.current.flyToBounds(getBounds());
    dispatch(editCenter({ id, isListed }));
  };

  const backToCentersHandler = () => {
    mapRef.current.flyToBounds(getBounds());
    setShow(false);
  };

  const deleteHealthCenter = (index) => {
    mapRef.current.flyToBounds(getBounds());
    dispatch(deleteCenter(index));
    setShow(false);
  };

  return (
    <div className="container">
      <div className=" box">
        {/* Health Centers Adding Form */}
        <form
          onSubmit={handleAddressSubmit}
          className="bg-white rounded-md sm:m-6 xl:m-20 lg:m-12 sm:m-12 form sm:p-12"
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
            Add To Map
          </button>
        </form>

        {/* Health Centers Table */}
        <table className=" bg-white table-fixed  border-collapse border border-gray-400 sm:m-12 table">
          <thead>
            <tr>
              <th className="w-[10rem] border border-gray-400 sm:px-4 sm:py-2">
                Name
              </th>
              <th className="w-[20rem] border border-gray-400 sm:px-4 sm:py-2">
                Address
              </th>
              <th className="w-[10rem] border border-gray-400 sm:px-4 sm:py-2">
                Ctg
              </th>
              <th className="w-[10rem] border border-gray-400 sm:px-4 sm:py-2">
                Delete
              </th>
              <th className="w-[10rem] border border-gray-400 sm:px-4 sm:py-2">
                List/Unlist
              </th>
            </tr>
          </thead>
          <tbody>
            {healthCenters.map((healthCenter, index) => (
              <tr key={index}>
                <td className="border border-gray-400 sm:px-4 sm:py-2 table-name">
                  <input
                    type="text"
                    className="w-full"
                    value={healthCenter.name}
                    readOnly
                  />
                </td>
                <td className="border border-gray-400 sm:px-4 sm:py-2">
                  <input
                    type="text"
                    className="w-full"
                    value={healthCenter.address}
                    readOnly
                  />
                </td>
                <td className="border border-gray-400 text-center sm:px-4 sm:py-2 ">
                  <input
                    type="text"
                    className="w-full"
                    value={healthCenter.category}
                    readOnly
                  />
                </td>
                <td className="border border-gray-400 sm:px-4 sm:py-2 flex justify-center">
                  <button
                    className="my-2 sm:px-4 sm:py-2 rounded-md shadowtransition-all duration-250 bg-cyan-400 hover:bg-cyan-500 text-m table-button"
                    type="button"
                    onClick={() => deleteHealthCenter(healthCenter.docRef)}
                  >
                    Remove
                  </button>
                </td>
                <td className="border border-gray-400 text-center sm:px-4 sm:py-2">
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 sm:px-4 sm:py-2 text-gray-600"
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

        {/* Health Centers Map */}
        <div className="rounded-md bg-white w-fit p-2 m-12">
          <MapContainer
            id="map"
            className="justify-center "
            ref={mapRef}
            // center={[41.01003362171676, 29.002500402493958]}
            // zoom={2}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {
              listedHealthCenters.map((healthCenter, index) => (
                <Marker
                  key={index}
                  position={[healthCenter.lat, healthCenter.lon]}
                  icon={markerIcon}
                  eventHandlers={{
                    click: () => {
                      const map = mapRef.current;
                      map.flyTo([healthCenter.lat, healthCenter.lon], 15, {
                        animate: true,
                        duration: 2,
                      });
                      setShow(true);
                    },
                  }}
                >
                  {show && (
                    <Popup closeOnClick={true} closeButton={true}>
                      <div>
                        <h3 className="p-0">Name: {healthCenter.name}</h3>
                        <p className="p-0">Adress: {healthCenter.address}</p>
                        <p className="p-0">Category: {healthCenter.category}</p>
                        <button
                          className="bg-cyan-300 p-2 rounded-md"
                          type="button"
                          onClick={() => {
                            deleteHealthCenter(healthCenter.docRef);
                          }}
                        >
                          Remove
                        </button>
                        <button
                          className="bg-cyan-300 p-2 rounded-md m-2"
                          type="button"
                          onClick={() => {
                            backToCentersHandler();
                          }}
                        >
                          Back to All Health Centers
                        </button>
                      </div>
                    </Popup>
                  )}
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

export default AddCenter;
