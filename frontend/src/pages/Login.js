import React, { useContext, useState } from "react";
import login from "../assest/signin.gif";
import { FaRegEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import Context from "../context";


const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",

  });
  const navigate=useNavigate()
  const {fetchUserDetails,fetchUserAddToCart }=useContext(Context)
  
    
  
  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };
  const handleSubmit=async(e)=>{
    e.preventDefault()
    const dataResponse=await fetch(SummaryApi.signIn.url,{
      method:SummaryApi.signIn.method,
      credentials:"include",
      headers:{
        "content-type":"application/json"
      },
      body:JSON.stringify(data)

    })
    const dataApi=await dataResponse.json()
    if(dataApi.success){
      toast.success(dataApi.message)
      navigate("/");
      fetchUserDetails()
      fetchUserAddToCart()

      
    }
    if(dataApi.error){
      toast.error(dataApi.error)
    }
    
  }
  
  return (
    <section id="login">
      <div className="mx-auto container p-8">
        <div className="bg-white p-2 w-full py-4 max-w-md mx-auto">
          <div className="h-20 w-20 mx-auto bg-white">
            <img src={login} alt="" style={{ backgroundColor: "white" }} />
          </div>
          <form onSubmit={
            handleSubmit
          }>
            <div className="grid mt-5 px-5">
              <label>Email:</label>
              <div className="bg-slate-100 py-2 px-2">
                <input
                  type="email"
                  name="email"
                  onChange={handleOnChange}
                  value={data.email}
                  placeholder="Enter your email"
                  className="w-full h-full outline-none bg-transparent "
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
            
                  className="w-full h-full outline-none bg-transparent  rounded"
                />
                <div
                  className="cursor-pointer"
                  onClick={() => setShowPassword((preve) => !preve)}
                >
                  <span>{showPassword ? <FaRegEye /> : <FaEyeSlash />}</span>
                </div>
              </div>
              <Link
                to={"/forgot-password"}
                className="block w-fit ml-auto hover:underline hover:text-red-500"
              >
                Forgot password
              </Link>
            </div>
            <button className="bg-red-600 w-full max-w-[150px] rounded-full px-6 py-2 text-white hover:scale-110 transition-all mx-auto block mt-4 hover:bg-red-700">
              Login
            </button>
          </form>
          <p className="my-4 px-5 ">
            Don't have an account ?{" "}
            <Link to={"/sign-up"} className="text-red-500 hover:text-red-700">
              {" "}
              Signup
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
