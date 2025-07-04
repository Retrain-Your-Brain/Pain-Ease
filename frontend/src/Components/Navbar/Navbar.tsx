import React, { useState } from "react";

const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <nav className="fixed top-0 left-0 w-full bg-white shadow z-50 p-2">
        {/* Flex container to align image, title, and menu horizontally */}
        <div className="flex justify-between items-center">
          {/* Left section: Image + Title */}
          <div className="flex items-center space-x-3">
            <img
              src="/pic.png" // Make sure pic.png is in public folder
              alt="Logo"
              className="h-40 w-40 rounded-full"
            />
            <h1 className="text-2xl text-blue-400 font-bold">PainEase</h1>
          </div>

          {/* Right section: Menu Button */}
          <div className="relative">
            <button
              onClick={() => setOpen(!open)}
              className="text-white bg-blue-500 px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none"
            >
              Menu
            </button>

            {/* Dropdown */}
            {open && (
              <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-10">
                <a
                  href="#item1"
                  className="block px-4 py-2 text-gray-700 hover:bg-blue-100"
                >
                  Track Progress
                </a>
                <a
                  href="#item2"
                  className="block px-4 py-2 text-gray-700 hover:bg-blue-100"
                >
                  Customize Plan
                </a>
                <a
                  href="#item3"
                  className="block px-4 py-2 text-gray-700 hover:bg-blue-100"
                >
                  Rewards
                </a>
                <a
                  href="#item4"
                  className="block px-4 py-2 text-gray-700 hover:bg-blue-100"
                >
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
