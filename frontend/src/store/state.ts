import { SideMenuOptions } from "./types";

export type AppState = {
    sideMenuOption: keyof typeof SideMenuOptions;
};

export const getAppState = (): AppState => ({
    sideMenuOption: "ExercisePlanner"
});