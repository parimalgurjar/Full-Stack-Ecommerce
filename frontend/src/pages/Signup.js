import React, { useState } from "react";
import signup from "../assest/signin.gif";
import { FaRegEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import imageToBase64 from '../helpers/imageTobase64';
import SummaryApi from "../common";
import { toast } from "react-toastify";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    profilePic: ""
  });
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUploadpic = async (e) => {
    const file = e.target.files[0];
    const imagePic = await imageToBase64(file);

    setData((prev) => ({
      ...prev,
      profilePic: imagePic,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

  

    try {
      const dataResponse = await fetch(SummaryApi.signUp.url, {
        method: SummaryApi.signUp.method,
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const dataApi = await dataResponse.json();

      if (dataApi.success) {
        toast.success(dataApi.message);
        navigate('/');
      } else {
        toast.error(dataApi.message);
      }
    } catch (error) {
      toast.error("An error occurred during signup.");
      console.error("Error during signup:", error);
    }
  };

  return (
    <section id="signup">
      <div className="mx-auto container p-8">
        <div className="bg-white p-2 w-full py-4 max-w-md mx-auto">
          <div className="h-24 w-24 mx-auto bg-white relative overflow-hidden rounded-full">
            <img src={data.profilePic || signup} alt="Profile" />
            <form>
              <label>
                <input type="file" className="hidden" onChange={handleUploadpic} />
                <div className="bg-slate-200 text-center w-full absolute bottom-0 text-xs py-4 bg-opacity-50 font-bold cursor-pointer">
                  Upload&nbsp;photo
                </div>
              </label>
            </form>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="grid mt-5 px-5">
              <label>Full Name:</label>
              <div className="bg-slate-100 py-2 px-2">
                <input
                  type="text"
                  name="name"
                  onChange={handleOnChange}
                  value={data.name}
                  placeholder="Enter your full name"
                  className="w-full h-full outline-none bg-transparent"
                />
              </div>
            </div>
            <div className="grid mt-5 px-5">
              <label>Email:</label>
              <div className="bg-slate-100 py-2 px-2">
                <input
                  type="email"
                  name="email"
                  onChange={handleOnChange}
                  value={data.email}
                  placeholder="Enter your email"
                  className="w-full h-full outline-none bg-transparent"
                />
              </div>
            </div>
            <div className="mt-5 px-5">
              <label>Password:</label>
              <div className="bg-slate-100 py-2 px-2 flex items-center">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  name="password"
                  value={data.password}
                  onChange={handleOnChange}
                  className="w-full h-full outline-none bg-transparent rounded"
                />
                <div className="cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <FaRegEye /> : <FaEyeSlash />}
                </div>
              </div>
            </div>
            <div className="mt-5 px-5">
              <label>Confirm Password:</label>
              <div className="bg-slate-100 py-2 px-2 flex items-center">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  name="confirmPassword"
                  value={data.confirmPassword}
                  onChange={handleOnChange}
                  className="w-full h-full outline-none bg-transparent rounded"
                />
                <div className="cursor-pointer" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                  {showConfirmPassword ? <FaRegEye /> : <FaEyeSlash />}
                </div>
              </div>
            </div>
            <button className="bg-red-600 w-full max-w-[150px] rounded-full px-6 py-2 text-white hover:scale-110 transition-all mx-auto block mt-4 hover:bg-red-700">
              Signup
            </button>
          </form>
          <p className="my-4 px-5 ">
            Already have an account?{" "}
            <Link to="/login" className="text-red-500 hover:text-red-700">
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Signup;
