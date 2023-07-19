import React, { useState, useEffect, useRef } from "react";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { useDispatch, useSelector } from "react-redux";

import {
  addIconicPlace,
  getPlaces,
  deletePlace,
  editPlace,
} from "../../features/iconicPlaces/iconicPlacesSlice";
import "leaflet/dist/leaflet.css";
import "./AddPlace.css";

import markerIconx from "../Images/marker-icon.png";
import markerIcon2x from "../Images/marker-icon-2x.png";

const AddPlace = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const { place } = useSelector((state) => state.place);
  const iconicPlaces = place;
  console.log(iconicPlaces);

  const listedIconicPlaces = iconicPlaces.filter((place) => place.isListed);

  useEffect(() => {
    const getData = () => {
      dispatch(getPlaces());
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
    dispatch(addIconicPlace({ name, address, category, isListed }));

    event.target.reset();
  };

  const mapRef = useRef();

  useEffect(() => {
    if (mapRef.current && iconicPlaces.length > 0) {
      mapRef.current.fitBounds(getBounds());
    } else if (mapRef.current) {
      mapRef.current.setView([41.0282, 28.9784], 13);
    }

    function getBounds() {
      const bounds = L.latLngBounds([[41.0282, 28.9784]]);
      iconicPlaces.forEach((iconicPlace) => {
        bounds.extend([iconicPlace.lat, iconicPlace.lon]);
      });
      return bounds;
    }
  }, [iconicPlaces]);

  function getBounds() {
    const bounds = L.latLngBounds([[41.0282, 28.9784]]);
    iconicPlaces.forEach((iconicPlace) => {
      bounds.extend([iconicPlace.lat, iconicPlace.lon]);
    });
    return bounds;
  }

  const handleCheckboxChange = (id, isListed) => {
    mapRef.current.flyToBounds(getBounds());
    dispatch(editPlace({ id, isListed }));
  };

  const backToPlacesHandler = () => {
    mapRef.current.flyToBounds(getBounds());
    setShow(false);
  };

  const deleteIconicPlaces = (index) => {
    mapRef.current.flyToBounds(getBounds());
    dispatch(deletePlace(index));
    setShow(false);
  };

  return (
    <div className="container">
      <div className=" box">
        {/* Iconic Place Adding Form */}
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

        {/* Iconic Places Table */}
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
            {iconicPlaces.map((iconicPlace, index) => (
              <tr key={index}>
                <td className="border border-gray-400 sm:px-4 sm:py-2 table-name">
                  <input
                    type="text"
                    className="w-full"
                    value={iconicPlace.name}
                    readOnly
                  />
                </td>
                <td className="border border-gray-400 sm:px-4 sm:py-2">
                  <input
                    type="text"
                    className="w-full"
                    value={iconicPlace.address}
                    readOnly
                  />
                </td>
                <td className="border border-gray-400 text-center sm:px-4 sm:py-2 ">
                  <input
                    type="text"
                    className="w-full"
                    value={iconicPlace.category}
                    readOnly
                  />
                </td>
                <td className="border border-gray-400 sm:px-4 sm:py-2 flex justify-center">
                  <button
                    className="my-2 sm:px-4 sm:py-2 rounded-md shadowtransition-all duration-250 bg-cyan-400 hover:bg-cyan-500 text-m table-button"
                    type="button"
                    onClick={() => deleteIconicPlaces(iconicPlace.docRef)}
                  >
                    Remove
                  </button>
                </td>
                <td className="border border-gray-400 text-center sm:px-4 sm:py-2">
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 sm:px-4 sm:py-2 text-gray-600"
                    checked={iconicPlace.isListed}
                    onChange={() =>
                      handleCheckboxChange(
                        iconicPlace.docRef,
                        iconicPlace.isListed
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
              listedIconicPlaces.map((iconicPlace, index) => (
                <Marker
                  key={index}
                  position={[iconicPlace.lat, iconicPlace.lon]}
                  icon={markerIcon}
                  eventHandlers={{
                    click: () => {
                      const map = mapRef.current;
                      map.flyTo([iconicPlace.lat, iconicPlace.lon], 15, {
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
                        <h3 className="p-0">Name: {iconicPlace.name}</h3>
                        <p className="p-0">Adress: {iconicPlace.address}</p>
                        <p className="p-0">Category: {iconicPlace.category}</p>
                        <button
                          className="bg-cyan-300 p-2 rounded-md"
                          type="button"
                          onClick={() => {
                            deleteIconicPlaces(iconicPlace.docRef);
                          }}
                        >
                          Remove
                        </button>
                        <button
                          className="bg-cyan-300 p-2 rounded-md m-2"
                          type="button"
                          onClick={() => {
                            backToPlacesHandler();
                          }}
                        >
                          Back to All Iconic Places
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

export default AddPlace;
