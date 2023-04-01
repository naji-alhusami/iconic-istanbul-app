import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import { useDispatch, useSelector } from 'react-redux';
import L from 'leaflet';
// import { addHealthCenter } from '../../features/users/usersSlice';
import markerIconx from '../Images/marker-icon.png';
import markerIcon2x from '../Images/marker-icon-2x.png';
import 'leaflet/dist/leaflet.css';
import './Centers.css';

const Centers = () => {
  // const dispatch = useDispatch();

  // const marker = useSelector((state) => state.users.marker);
  // console.log(marker);
  const [healthCenters, setHealthCenters] = useState([]);

  const markerIcon = new L.Icon({
    iconUrl: markerIconx,
    iconRetinaUrl: markerIcon2x,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [0, -41],
  });

  const addHealthCenter = async (name, address, category) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${address}&format=json`
      );
      const data = await response.json();
      const { lat, lon } = data[0];
      console.log(lat);
      const newHealthCenter = { name, address, category, lat, lon };
      setHealthCenters([...healthCenters, newHealthCenter]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddressSubmit = (event) => {
    event.preventDefault();
    const name = event.target.elements.name.value;
    const address = event.target.elements.address.value;
    const category = event.target.elements.category.value;
    addHealthCenter(name, address, category);
    console.log(name, address, category);
    // const newHealthCenter = { name, address, category };
    // setHealthCenters([...healthCenters, newHealthCenter]);
    event.target.reset();
    // console.log(healthCenters);
  };

  const deleteHealthCenter = (index) => {
    const newHealthCenters = [...healthCenters];
    newHealthCenters.splice(index, 1);
    setHealthCenters(newHealthCenters);
  };

  return (
    <div
      className="container"
    >
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
            <input
              type="text"
              name="category"
              placeholder="Enter category"
              className="border border-gray-300 rounded-md py-2 px-3 w-full"
            />
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
                    onChange={(e) =>
                      setHealthCenters([
                        ...healthCenters.slice(0, index),
                        { ...healthCenter, name: e.target.value },
                        ...healthCenters.slice(index + 1),
                      ])
                    }
                    readOnly
                  />
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  <input
                    type="text"
                    className="w-full"
                    value={healthCenter.address}
                    onChange={(e) =>
                      setHealthCenters([
                        ...healthCenters.slice(0, index),
                        { ...healthCenter, address: e.target.value },
                        ...healthCenters.slice(index + 1),
                      ])
                    }
                    readOnly
                  />
                </td>
                <td className="border border-gray-400 px-4 py-2 ">
                  <input
                    type="text"
                    className="w-full"
                    value={healthCenter.category}
                    onChange={(e) =>
                      setHealthCenters([
                        ...healthCenters.slice(0, index),
                        { ...healthCenter, category: e.target.value },
                        ...healthCenters.slice(index + 1),
                      ])
                    }
                    readOnly
                  />
                </td>
                <td className="border border-gray-400 px-4 py-2 flex justify-center">
                  <button
                    className="my-2 px-4 py-2 rounded-md shadowtransition-all duration-250 bg-cyan-400 hover:bg-cyan-500 text-m"
                    type="button"
                    onClick={() => deleteHealthCenter(index)}
                  >
                    Remove
                  </button>
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
                    <button
                    className='bg-cyan-300 p-2 rounded-md'
                      type="button"
                      onClick={() => deleteHealthCenter(index)}
                    >
                      Remove
                    </button>
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

export default Centers;
