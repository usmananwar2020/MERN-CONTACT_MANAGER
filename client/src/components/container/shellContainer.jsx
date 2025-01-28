import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar";


const ShellContainer = () => {
    

    return (
        <>
                <div className="min-h-[90vh] flex mt-16">
                    <Sidebar/>
                    <Outlet />
                </div>
                {/* footer */}
                <div className="bg-black flex justify-center items-center w-screen">
                    <p className="p-4 text-sm text-gray-light">{`CONTACT-MANAGER - ${new Date().getFullYear()} © Copyright - All Rights Reserved.`}</p>
                </div>
        </>
    );
};

export default ShellContainer;
