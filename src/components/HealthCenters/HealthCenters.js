import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

import { getCenters } from "../../features/healthCenters/healthCentersSlice";
import "leaflet/dist/leaflet.css";
import "./HealthCenters.css";

import markerIconx from "../Images/marker-icon.png";
import markerIcon2x from "../Images/marker-icon-2x.png";

const HealthCenters = () => {
  const dispatch = useDispatch();
  const { center, loading } = useSelector((state) => state.center);
  const healthCenters = center;

  // useEffect for getting data from Firebase
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

  if (loading) {
    return "loading...";
  }

  return (
    <div className="container">
      <div className=" box">
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
                <td className="border border-gray-400 px-4 py-2 ">
                  <input
                    type="text"
                    className="w-full"
                    value={healthCenter.category}
                    readOnly
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
            // scrollWheelZoom={true}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {healthCenters.map((healthCenter, index) => (
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
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default HealthCenters;
