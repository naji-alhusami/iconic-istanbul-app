import React, { useEffect } from "react";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { useDispatch, useSelector } from "react-redux";

import {
  getCenters,
  deleteCenter,
} from "../../features/healthCenters/healthCentersSlice";
import "leaflet/dist/leaflet.css";
import "./CentersMap.css";

import markerIconx from "../Images/marker-icon.png";
import markerIcon2x from "../Images/marker-icon-2x.png";

const CentersMap = (props) => {
  const dispatch = useDispatch();

  const { center, loading } = useSelector((state) => state.center);
  const healthCenters = center;

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
                props.isListed[index] && (
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

export default CentersMap;
