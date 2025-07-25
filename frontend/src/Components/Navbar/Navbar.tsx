import React, { useState } from "react";

const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <nav className="fixed top-0 left-0 w-full bg-white shadow z-50 p-2">
        <div className=" h-12 text-left items-center">
          <div className="flex justify-center items-center space-x-3">
            <img src="/final.png" alt="Logo" className="h-12 w-12 " />
            <h1 className="text-2xl text-blue-400 font-bold text-center">PainEase</h1>
          </div>

          <div className="relative pd-5">
            <button
              onClick={() => setOpen(!open)}
              className="fixed top-3 text-white bg-blue-500 px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none"
            >
              Menu
            </button>

            {open && (
              <div className="absolute left-0 mt-2 w-40 bg-white rounded-md shadow-lg z-10">
                <a href="#item1" className="block px-4 py-2 text-gray-700 hover:bg-blue-100">
                  Track Progress
                </a>
                <a href="#item2" className="block px-4 py-2 text-gray-700 hover:bg-blue-100">
                  Customize Plan
                </a>
                <a href="#item3" className="block px-4 py-2 text-gray-700 hover:bg-blue-100">
                  Rewards
                </a>
                <a href="#item4" className="block px-4 py-2 text-gray-700 hover:bg-blue-100">
                  Weekly Report
                </a>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
