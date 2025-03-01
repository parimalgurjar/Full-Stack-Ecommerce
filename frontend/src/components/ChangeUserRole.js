import React, { useState } from 'react';
import ROLE from '../common/role';
import { IoCloseSharp } from "react-icons/io5";
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const ChangeUserRole = ({ name, email, role, userId, onClose,  callfunc }) => {
    const [userRole, setUserRole] = useState(role);

    const handleOnChangeSelect = (e) => {
        setUserRole(e.target.value);
    };

    const updateUserRole = async () => {
        try {
            

            const fetchResponse = await fetch(SummaryApi.updateUser.url, {
                method: SummaryApi.updateUser.method,
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    role: userRole,
                    userId: userId, // Include the userId in the request payload
                }),
            });

            const responseData = await fetchResponse.json();

            if (responseData.success) {
                toast.success(responseData.message || 'Role updated successfully!');
                onClose(); // Close the modal if the operation is successful
                callfunc()
            } else {
                toast.error(responseData.message || 'Failed to update role.'); // Show error message
            }
        } catch (error) {
            toast.error('An error occurred while updating the role.'); // Catch any network or other errors
            console.error("Error updating user role:", error);
        }
    };

    return (
        <div className='fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center z-10 h-full w-full '>
            <div className='bg-white shadow-md p-4 w-full max-w-sm'>
                <button className='block ml-auto' onClick={onClose}>
                    <IoCloseSharp />
                </button>
                <h1 className='font-medium text-lg pb-4'>Change User Role</h1>
                <p>Name: {name}</p>
                <p>Email: {email}</p>
                <div className='flex items-center justify-between my-4'>
                    <p>Role:</p>
                    <select className='px-4 border py-1' value={userRole} onChange={handleOnChangeSelect}>
                        {Object.values(ROLE).map(el => (
                            <option value={el} key={el}>{el}</option>
                        ))}
                    </select>
                </div>
                <button 
                    className='w-fit rounded-full px-3 mx-auto block bg-red-600 text-white py-1 hover:bg-red-700' 
                    onClick={updateUserRole}
                >
                    Change role
                </button>
            </div>
        </div>
    );
};

export default ChangeUserRole;
