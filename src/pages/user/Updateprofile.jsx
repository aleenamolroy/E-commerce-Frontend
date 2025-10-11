import React, { useEffect, useState } from "react";
import Navbar from "../../components/User/Navbar";
import api from "../../Axios";

export default function UpdateProfile() {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState(null);
  const [existingImg, setExistingImg] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("user/viewprofile");
        console.log(res.data);

        const userData = res.data.user;
        setUser(userData);
        setName(userData.name);
        setEmail(userData.email);
        setExistingImg(userData.profile_image);
      } catch (err) {
        alert(err.response?.data?.message || "Error fetching user");
      }
    };

    fetchUser();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    if (image) formData.append("profile_image", image);

    try {
      const res = await api.put("user/Update", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
const updatedUser = {
      name,
      email,
      profile_image: image ? image.name : existingImg, // fallback to existing if no new image
    };

      alert(res.data.message || "Profile updated successfully");
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
    } catch (err) {
      alert(err.response?.data?.message || "Update failed");
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="p-8 rounded-lg shadow max-w-lg w-full bg-white">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Update Profile
          </h2>

          <form
            onSubmit={handleUpdate}
            className="flex flex-col space-y-4 justify-center items-center"
          >
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-400 rounded-md p-2 w-full max-w-sm"
              required
            />

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-400 rounded-md p-2 w-full max-w-sm"
              required
            />

            {existingImg && (
              <div className="my-2">
                <img
                  src={`http://localhost:3000/uploads/${existingImg}`}
                  alt="Current Profile"
                  className="w-32 h-32 object-cover border rounded"
                />
              </div>
            )}

            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              accept="image/*"
              className="border border-gray-400 rounded-md p-2 w-full max-w-sm"
            />

            <button
              type="submit"
              className="bg-blue-700 text-white py-2 px-4 rounded-md hover:bg-blue-800 transition"
            >
              Update Profile
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
