import React, { useState, useEffect, useRef } from "react";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { useDispatch, useSelector } from "react-redux";

import { getPlaces } from "../../features/iconicPlaces/iconicPlacesSlice";
import "leaflet/dist/leaflet.css";
// import "./IconicPlaces.css";

import markerIconx from "../Images/marker-icon.png";
import markerIcon2x from "../Images/marker-icon-2x.png";

const IconicPlaces = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const { place } = useSelector((state) => state.place);
  const iconicPlaces = place;
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

  const backToPlacesHandler = () => {
    mapRef.current.flyToBounds(getBounds());
    setShow(false);
  };

  return (
    <div className="container">
      <div className=" box">
        {/* Health Center Table */}
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
              </tr>
            ))}
          </tbody>
        </table>

        {/* Health Center Map */}
        <div className="rounded-md bg-white w-fit p-2 m-12">
          <MapContainer
            id="map"
            className="justify-center "
            ref={mapRef}
            // center={[0, 0]}
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

export default IconicPlaces;
