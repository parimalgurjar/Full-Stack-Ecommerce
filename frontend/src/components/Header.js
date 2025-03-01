import React, { useContext, useState } from "react";
import Logo from "./Logo";
import { ImSearch } from "react-icons/im";
import { FaUserCircle } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import SummaryApi from "../common";
import { toast } from "react-toastify";
import { setUserDetails } from "../store/userSlice";
import ROLE from "../common/role";
import Context from "../context";




const Header = () => {
  const user = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  const [menuDisplay, setMenuDisplay] = useState(false);
  const context=useContext(Context)
  const searchInput=useLocation()
  //const search=new URLSearchParams()
  const [search,setSearch]=useState(searchInput?.search?.split("=")[1])
  const handleLogout = async () => {
    try {
      const response = await fetch(SummaryApi.logout_user.url, {
        method: SummaryApi.logout_user.method,
        credentials: "include",
      });
      const data = await response.json();
      if (data.success) {
        toast.success(data.message);
        dispatch(setUserDetails(null));
        navigate('/');
      } else if (data.error) {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("An error occurred while logging out.");
    }
  };
  const handleSearch=(e)=>{
    const {value}=e.target
    setSearch(value)
    
    if(value){
      navigate(`/search?query=${value}`);

    }
    else{
      navigate('/search')
    }

  }

  return (
    <header className="h-16 shadow-md bg-white fixed z-40 w-full">
      <div className="h-full container mx-auto flex items-center px-8 justify-between">
        <div>
          <Link to="/">
            <Logo w={90} h={50} />
          </Link>
        </div>
        <div className="hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow">
          <input
            type="text"
            placeholder="Search your product..."
            className="pl-3 outline-none"
            onChange={handleSearch}
            value={search}
          />
          <div className="text-lg min-w-[50px] h-8 bg-red-600 flex items-center justify-center rounded-r-full text-white">
            <ImSearch />
          </div>
        </div>
        <div>
          <div className="flex items-center justify-center gap-7">
           <div className="flex justify-center">
            {
              user?._id && (
           <div className="flex justify-center text-3xl cursor-pointer relative" onClick={() => setMenuDisplay((prev) => !prev)}>
              {user?.profilePic ? (
                <img src={user?.profilePic} alt={user?.name} className="w-8 h-8 rounded-full" />
              ) : (
                <FaUserCircle className="text-2xl" />
              )}
            </div>

              )
            }

            {menuDisplay && (
              <div className="absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded hidden md:block">
                <nav style={{ fontSize: "16px" }}>
                  {
                    user?.role===ROLE.ADMIN &&(
                      <Link to="/admin-panel/all-products" className="whitespace-nowrap hover:bg-slate-100 p-2 block" onClick={() => setMenuDisplay((prev) => !prev)}>
                      Admin Panel
                    </Link>
                    )
                  }
                 
                </nav>
              </div>
            )}
           </div>
           {
                 user?._id &&(
            <Link to='/cart' className="text-2xl relative">
              <span>
                <FaCartShopping />
              </span>
            
              <div className="bg-red-600 flex items-center justify-center w-5 h-5 p-2 text-white rounded-full absolute -top-2 -right-3">
                <p className="text-sm">{context?.cartProductCount}</p>
              </div>
            </Link>
                  
                 )
              }

            {user ? (
              <button onClick={handleLogout} className="bg-red-600 text-white rounded-full px-3 py-1 hover:bg-red-700">
                Logout
              </button>
            ) : (
              <Link to="/login">
                <button className="bg-red-600 text-white rounded-full px-3 py-1 hover:bg-red-700">
                  Login
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
