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
    <div>
      <div className="flex flex-col justify-center items-center">
      <h1 className="m-10 text-2xl md:text-4xl font-bold text-white bg-orange-700 p-4 rounded-md">ADD PLACES</h1>
        {/* Iconic Place Adding Form */}
        <form
          onSubmit={handleAddressSubmit}
          className="bg-white rounded-md p-5 m-4 my-8 md:w-[40rem]"
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
        <table className="bg-white table-fixed border-collapse border border-gray-400 m-4 my-8 w-auto md:w-[40rem]">
          <tbody>
            <tr>
              <th className=" border border-gray-400 p-2 md:w-[10rem]">
                Category
              </th>
              {iconicPlaces.map((iconicPlace, index) => (
                <td
                  key={index}
                  className="border border-gray-400 p-1 text-center"
                >
                  {iconicPlace.category}
                </td>
              ))}
            </tr>
            <tr>
              <th className=" border border-gray-400 p-2 md:w-[10rem]">Name</th>
              {iconicPlaces.map((iconicPlace, index) => (
                <td
                  key={index}
                  className="border border-gray-400 p-1 text-center"
                >
                  {iconicPlace.name}
                </td>
              ))}
            </tr>
            <tr>
              <th className=" border border-gray-400 p-2 md:w-[10rem]">
                Address
              </th>
              {iconicPlaces.map((iconicPlace, index) => (
                <td
                  key={index}
                  className="border border-gray-400 p-1 text-center"
                >
                  {iconicPlace.address}
                </td>
              ))}
            </tr>

            <tr>
              <th className=" border border-gray-400 p-2 md:w-[10rem]">
                Delete
              </th>
              {iconicPlaces.map((iconicPlace, index) => (
                <td
                  key={index}
                  className="border border-gray-400 p-1 text-center"
                >
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
                <td
                  key={index}
                  className="border border-gray-400 p-1 text-center"
                >
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 text-gray-600"
                    checked={iconicPlace.isListed}
                    onChange={() =>
                      handleCheckboxChange(
                        iconicPlace.docRef,
                        iconicPlace.isListed
                      )
                    }
                  />
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      {/* Health Centers Map */}
      <div className="rounded-md bg-white p-2 m-4 md:m-36">
        <MapContainer
          className="z-40 h-[30rem]"
          ref={mapRef}
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
                      <p className="p-0">Category: {iconicPlace.category}</p>
                      <h3 className="p-0">Name: {iconicPlace.name}</h3>
                      <p className="p-0">Adress: {iconicPlace.address}</p>
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
          }
        </MapContainer>
      </div>
    </div>
  );
};

export default AddPlace;
