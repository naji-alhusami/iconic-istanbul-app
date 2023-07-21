import React, { useState, useEffect, useRef } from "react";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { useDispatch, useSelector } from "react-redux";

import {
  getPlaces,
  deletePlace,
  editPlace,
} from "../../features/iconicPlaces/iconicPlacesSlice";
import "leaflet/dist/leaflet.css";
import AddPlaceForm from "./AddPlaceForm";
import AddPlaceTable from "./AddPlaceTable";
import AddPlaceSlider from "./AddPlaceSlider";

import markerIconx from "../Images/marker-icon.png";
import markerIcon2x from "../Images/marker-icon-2x.png";

const AddPlace = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const mapRef = useRef();

  const { place } = useSelector((state) => state.place);
  const iconicPlaces = place;

  const listedIconicPlaces = iconicPlaces.filter((place) => place.isListed);
  console.log(listedIconicPlaces);

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
        <h1 className="m-10 text-2xl md:text-4xl font-bold text-white bg-orange-700 p-4 rounded-md">
          ADD PLACES
        </h1>

        {/* Iconic Place Adding Form */}
        <AddPlaceForm />

        {/* Iconic Places Table */}
        <AddPlaceTable
          handleCheckboxChange={handleCheckboxChange}
          iconicPlaces={iconicPlaces}
          deleteIconicPlaces={deleteIconicPlaces}
        />
      </div>

      {/* Health Centers Map */}
      <div className="rounded-md bg-white p-2 m-4 md:m-36">
        <MapContainer className="z-40 h-[30rem]" ref={mapRef}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {listedIconicPlaces.map((iconicPlace, index) => (
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
          ))}
        </MapContainer>
      </div>
      <div className="md:flex md:flex-col md:items-center">
        <AddPlaceSlider />
      </div>
    </div>
  );
};

export default AddPlace;
