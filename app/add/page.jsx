"use client";

import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { firestore } from "../components/firebase-config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    screenName: "",
    followersCount: 0,
    followingCount: 0,
    location: "",
    verified: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    const parsedValue = type === "number" ? parseInt(value, 10) : value;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : parsedValue,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting data:", formData);
    try {
      // Sending data to Firebase Firestore
      await addDoc(collection(firestore, "users"), formData);
      toast.success("Data sent successfully");

      setFormData({
        name: "",
        screenName: "",
        followersCount: 0,
        followingCount: 0,
        location: "",
        verified: false,
      });
    } catch (error) {
      console.error("Error sending data:", error);
      toast.error("Error sending data. Please try again.");
    }
  };

  return (
    <div>
      <ToastContainer />
      <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 p-10">
        <div className="font-bold text-2xl m-5">Add Data to Firebase</div>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          className="border border-black rounded-xl px-4 py-2 mb-2 w-full"
        />
        <input
          type="text"
          name="screenName"
          value={formData.screenName}
          onChange={handleChange}
          placeholder="Screen Name"
          className="border border-black rounded-xl px-4 py-2 mb-2 w-full"
        />
        <input
          type="number"
          name="followersCount"
          value={formData.followersCount}
          onChange={handleChange}
          placeholder="Followers Count"
          className="border border-black rounded-xl px-4 py-2 mb-2 w-full"
        />
        <input
          type="number"
          name="followingCount"
          value={formData.followingCount}
          onChange={handleChange}
          placeholder="Following Count"
          className="border border-black rounded-xl px-4 py-2 mb-2 w-full"
        />
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Location"
          className="border border-black rounded-xl px-4 py-2 mb-2 w-full"
        />
        <div className="mb-4">
          <input
            type="checkbox"
            name="verified"
            checked={formData.verified}
            onChange={handleChange}
            className="mr-2"
          />
          <label className="font-bold" htmlFor="verified">
            Verified
          </label>
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;
