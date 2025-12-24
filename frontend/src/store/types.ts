export const SideMenuOptions = {
  ExercisePlanner: "Exercise Planner",
  Reminders: "Reminders",
  TrackProgess: "Track Progress",
} as const;

export interface UserModel {
  username: string;
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  id: string;
  token: string;
  user: UserModel;
}
