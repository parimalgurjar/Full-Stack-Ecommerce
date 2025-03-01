import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FaUserCircle } from "react-icons/fa";
import { Link, Outlet, useNavigate } from 'react-router-dom';
import ROLE from '../common/role';

const AdminPanel = () => {
  const user = useSelector((state) => state?.user?.user);
  const navigate=useNavigate()

  useEffect(()=>{
    if(user?.role!==ROLE.ADMIN){
      navigate("/")
    }

  },[user])

  return (
    <div className='min-h-[calc(100vh-80px)] md:flex hidden'>
      <aside className='bg-white min-h-full w-60 customShadow'>
        <div className='flex justify-center items-center flex-col'>
          <div className="flex justify-center items-center text-3xl cursor-pointer relative py-4">
            {user?.profilePic ? (
              <img src={user?.profilePic} alt={user?.name || "Profile"} className="w-20 h-20 rounded-full" />
            ) : (
              <FaUserCircle className="text-4xl" />
            )}
          </div>
          {user?.name ? (
            <p className='capitalize text-lg font-semibold'>{user.name}</p>
          ) : (
            <p className='text-lg font-semibold'>Guest</p>
          )}
          <p className='text-sm text-gray-500'>{user?.role || "Role not available"}</p>
        </div>

        <div>
          <nav className='grid p-4'>
            <Link to={"all-users"} className='px-2 py-2 hover:bg-slate-100'>All users</Link>
            <Link to={"all-products"} className='px-2 py-2 hover:bg-slate-100'>All Product</Link>

          </nav>
        </div>
      </aside>

      <main className='h-full w-full p-4'>
        <Outlet/>
        
      </main>
    </div>
  );
}

export default AdminPanel;
