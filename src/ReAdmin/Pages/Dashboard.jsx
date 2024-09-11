import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Components/SidebarDash"; 
import { IoMenu, IoClose } from "react-icons/io5";  

function Dashboard() {
  const [isSidebarOpen, setSidebarOpen] = useState(false); 

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);  
  };

  return (
    <div className="h-[100vh] flex flex-col md:flex-row">

      <button
        className="md:hidden p-5 flex justify-end"
        onClick={toggleSidebar}
        aria-label="Toggle Sidebar"
      >
        {isSidebarOpen ? <IoClose size={30} /> : <IoMenu size={30} />}
      </button>

      <div
        className={`fixed z-20 top-0 left-0 h-full w-[50%] bg-white shadow-lg transform transition-transform duration-300 ease-in-out md:relative md:w-[35%] lg:w-[25%]  xl:w-[20%] md:transform-none ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar />
      </div>

      <div className="flex-1 p-5 w-full md:w-[75%] lg:w-[75%] xl:w-[80%]">
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;
