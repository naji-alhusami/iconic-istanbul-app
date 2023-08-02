import React, { useState, useEffect, useRef } from "react";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { useDispatch, useSelector } from "react-redux";

import "./AddPlace.css";

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

  const [showPlaceInfoOnMap, setShowPlaceInfoOnMap] = useState(false);
  const [showPlaceSlider, setShowPlaceSlider] = useState(false);
  const [showTableInfo, setShowTableInfo] = useState(false);

  const mapRef = useRef();
  const infoTableRef = useRef(null);
  const infoPlaceRef = useRef(null);

  const { place } = useSelector((state) => state.place);
  const iconicPlaces = place;

  const listedIconicPlaces = iconicPlaces.filter((place) => place.isListed);

  useEffect(() => {
    const getData = () => {
      dispatch(getPlaces());
    };

    getData();
  }, [dispatch]);

  useEffect(() => {
    if (showPlaceSlider) {
      infoPlaceRef.current.scrollIntoView({ behavior: "smooth" });
    }
    if (showTableInfo) {
      infoTableRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [showPlaceSlider, showTableInfo]);

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
    setShowPlaceInfoOnMap(false);
  };

  const deleteIconicPlaces = (index) => {
    mapRef.current.flyToBounds(getBounds());
    dispatch(deletePlace(index));
    setShowPlaceInfoOnMap(false);
  };

  return (
    <div className="bg-container">
      <div className="flex flex-col justify-center items-center">
        <h1 className="m-10 text-2xl md:text-4xl font-bold text-white bg-orange-700 p-4 rounded-md">
          ADD PLACES
        </h1>

        {/* Iconic Place Adding Form */}
        <AddPlaceForm />

        {/* Iconic Places Table */}
        <AddPlaceTable
          infoTableRef={infoTableRef}
          handleCheckboxChange={handleCheckboxChange}
          iconicPlaces={iconicPlaces}
          deleteIconicPlaces={deleteIconicPlaces}
          setShowPlaceSlider={setShowPlaceSlider}
          showRows="true"
        />
      </div>

      {/* Health Centers Map */}
      <div className="flex flex-col">
        <div className="rounded-md bg-white p-2 mx-20 my-5">
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
                    setShowPlaceInfoOnMap(true);
                  },
                }}
              >
                {showPlaceInfoOnMap && (
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
      </div>

      {showPlaceSlider && (
        <div className="flex flex-col items-center" ref={infoPlaceRef}>
          <AddPlaceSlider
            setShowTableInfo={setShowTableInfo}
            setShowPlaceSlider={setShowPlaceSlider}
          />
        </div>
      )}
    </div>
  );
};

export default AddPlace;
