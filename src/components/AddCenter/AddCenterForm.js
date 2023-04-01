import React from "react";

import { useDispatch } from "react-redux";
import { addHealthCenter } from "../../features/healthCenters/healthCentersSlice";

const AddCenterForm = () => {
  const dispatch = useDispatch();

  const handleAddressSubmit = (event) => {
    event.preventDefault();
    const name = event.target.elements.name.value;
    const address = event.target.elements.address.value;
    const category = event.target.elements.category.value;
    console.log(name, address, category);
    dispatch(addHealthCenter({ name, address, category }));
    event.target.reset();
  };

  return (
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
        Add to Maps
      </button>
    </form>
  );
};

export default AddCenterForm;
