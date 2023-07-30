import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";

import { addIconicPlace } from "../../features/iconicPlaces/iconicPlacesSlice";

const AddPlaceForm = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const inputRef = useRef(null);
  const dispatch = useDispatch();

  const handleImageChange = (event) => {
    const files = event.target.files;
    const selectedImages = [];
  
    // Convert FileList to an array
    for (let i = 0; i < files.length; i++) {
      selectedImages.push(files[i]);
    }
  
    setSelectedImage(selectedImages);
  };

  const handleAddressSubmit = (event) => {
    event.preventDefault();
    const category = event.target.elements.category.value;
    const name = event.target.elements.name.value;
    const description = event.target.elements.description.value;
    const address = event.target.elements.address.value;
    const isListed = true;
    if (selectedImage) {
      dispatch(
        addIconicPlace({
          category,
          name,
          address,
          description,
          selectedImage,
          isListed,
        })
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
            <option value="Mosques and Religious Sites">
              Mosques and Religious Sites
            </option>
            <option value="Palaces and Historical Residences">
              Palaces and Historical Residences
            </option>
            <option value="Cafés and Coffee Shops">
              Cafés and Coffee Shops
            </option>
            <option value="Shopping Malls and Centers">
              Shopping Malls and Centers
            </option>
            <option value="Bridges and Landmarks">Bridges and Landmarks</option>
            <option value="Other">Other</option>
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
          <label htmlFor="description" className="block font-medium mb-2">
            Description
          </label>
          <input
            type="text"
            name="description"
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
          className="bg-orange-400 hover:text-white font-bold py-2 px-4 rounded hover:bg-orange-900"
        >
          Add To Map
        </button>
      </form>
    </div>
  );
};

export default AddPlaceForm;
