import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";

import { addIconicPlace } from "../../features/iconicPlaces/iconicPlacesSlice";

const AddPlaceForm = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const inputRef = useRef(null);
  const dispatch = useDispatch();

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  const handleAddressSubmit = (event) => {
    event.preventDefault();
    const name = event.target.elements.name.value;
    const address = event.target.elements.address.value;
    const category = event.target.elements.category.value;
    const isListed = true;
    if (selectedImage) {
      console.log(selectedImage);
      dispatch(
        addIconicPlace({ category, name, address, selectedImage, isListed })
      );
    }

    event.target.reset();
  };

  return (
    <div>
      <form
        onSubmit={handleAddressSubmit}
        className="bg-white rounded-md p-5 m-4 my-8 md:w-[40rem]"
      >
        <div className="mb-4">
          <label htmlFor="category" className="block font-medium mb-2">
            Category
          </label>
          <select
            name="category"
            className="border border-gray-300 rounded-md py-2 px-3 w-full"
            required
          >
            <option value="">-- Select a category --</option>
            <option value="Historical">Historical</option>
            <option value="Restaurants">Restaurants</option>
            <option value="Shopping">Shopping</option>
            <option value="D">D</option>
            <option value="E">E</option>
            <option value="F">F</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="name" className="block font-medium mb-2">
            Name
          </label>
          <input
            type="text"
            name="name"
            placeholder="Enter name"
            className="border border-gray-300 rounded-md py-2 px-3 w-full"
            required
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
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="address" className="block font-medium mb-2">
            Upload Pictures
          </label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            ref={inputRef}
            className="border border-gray-300 rounded-md py-2 px-3 w-full"
            multiple
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
        >
          Add To Map
        </button>
      </form>
    </div>
  );
};

export default AddPlaceForm;
