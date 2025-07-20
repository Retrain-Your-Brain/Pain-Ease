import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { MenuItem, Select, type SelectChangeEvent } from "@mui/material";
import { SideMenuOptions } from "../../store/types";
import { changeSideMenu } from "../../store/appSlice";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const sideMenuOption = useAppSelector((state) => state.app.sideMenuOption);
  const dispatch = useAppDispatch();

  const handleSideMenuChange = (event: SelectChangeEvent<keyof typeof SideMenuOptions>) => {
    const newOption = event.target.value;
    dispatch(changeSideMenu(newOption));
  }

  return (
    <div>
      <nav className="fixed top-0 left-0 w-full bg-white shadow z-50 p-2">
        <div className=" h-12 text-left items-center">
          <div className="flex justify-center items-center space-x-3">
            <img
              src="/final.png" 
              alt="Logo"
              className="h-12 w-12 "
            />
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
              <div className="absolute left-0 mt-2 w-40 bg-white rounded-md shadow-lg z-10">\
                <Select<keyof typeof SideMenuOptions>
                  label="Option"
                  value={sideMenuOption}
                  onChange={handleSideMenuChange}
                >
                  {
                    (Object.keys(SideMenuOptions) as Array<keyof typeof SideMenuOptions>).map((option) => (
                      <MenuItem key={option} value={option}>
                        {SideMenuOptions[option]}
                      </MenuItem>
                    ))
                  }
                </Select>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};
