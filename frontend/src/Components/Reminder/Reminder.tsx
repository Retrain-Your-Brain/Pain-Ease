import * as React from "react";
import dayjs, { Dayjs } from "dayjs";
import Grid from "@mui/material/Grid";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { TimeClock } from "@mui/x-date-pickers/TimeClock";
import Private from "../Navbar/PrivateNavbar";
import { useAppDispatch } from "../../store/store";
import { addError } from "../../store/errorSlice";
import axios from "axios";
import { motion } from "framer-motion";
import { deleteReminderAPI, reminderAPI, updateReminderAPI } from "../../reminder";

const today = dayjs();

interface Reminder {
  _id: string;
  reminderTime: string;
  message: string;
  notified: boolean;
  createdAt: string;
}


export default function ValidationBehaviorView() {
  const dispatch = useAppDispatch();
  const [date, setDate] = React.useState<Dayjs | null>(null);
  const [time, setTime] = React.useState<Dayjs | null>(null);

  const [reminder, setReminder] = React.useState<Reminder[]>([]);

  const handleButton = async (id: string) => {
    try {
      await deleteReminderAPI(id);
      await loadReminders();
    } catch (err: any) {
      const message = err.message || "Something went wrong.";
      dispatch(addError(message));
    }
  };
  const loadReminders = React.useCallback(async () => {
    try {
      const data = await reminderAPI();
      setReminder(data);
      
    } catch (err: any) {
      const message = err.message || "Something went wrong.";
      dispatch(addError(message));
    }
  }, [dispatch]);

  React.useEffect(() => {
    loadReminders();
  }, [loadReminders]);

  const handleSubmit = async () => {
    if (!date || !time) {
      alert("Please select both");
      return;
    }
    const combinedDateTime = date!
      .hour(time!.hour() ?? 0)
      .minute(time!.minute() ?? 0)
      .second(time!.second() ?? 0);

    const isoString = combinedDateTime.toISOString();
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        "http://localhost:5000/add-reminder",
        {
          reminderTime: isoString,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 201) {
        alert("Reminder created successfully!");
        await loadReminders();
      }
    } catch (err: any) {
      const message = err.message || "Something went wrong.";
      dispatch(addError(message));
    }
  };



  React.useEffect(()=>{
    const checkReminders = async()=>{

      const now=new Date().getTime()
      for (const r of reminder) {
          const reminderTime= new Date(r.reminderTime).getTime()
          const timeDiff= reminderTime - now
          if(!r.notified && timeDiff<=0 && timeDiff>-6000 ){
              alert(`Reminder:${r.message}`)
              await updateReminderAPI(r._id)  
          }
      }
      loadReminders()
  }
  
    checkReminders()
    const interval= setInterval(checkReminders,30000)
    return ()=>clearInterval(interval)
  },[reminder])
  
  return (
    <div className=" pt-50 ">
      <Private />
      <div className="min-h-screen h-auto bg-gradient-to-br from-indigo-100 via-blue-100 to-cyan-100 p-10 relative">
        <motion.h1
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, type: "spring" }}
          className="text-4xl font-extrabold text-center text-blue-700 mb-8"
        >
          What days are you wanting to exercise?
        </motion.h1>
        <div className="flex flex-col lg:flex-row items-start justify-center gap-10">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="bg-white p-6 rounded-2xl shadow-lg"
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Grid
                container
                columns={{ xs: 1, lg: 2 }}
                spacing={4}
                alignItems="center"
                justifyContent="center"
              >
                <Grid>
                  <DateCalendar
                    defaultValue={today}
                    disablePast
                    onChange={(newDate) => setDate(newDate)}
                  />
                </Grid>
                <Grid>
                  <TimeClock
                    defaultValue={dayjs()}
                    onChange={(time) => setTime(time)}
                  />
                </Grid>
              </Grid>
            </LocalizationProvider>

            <button
              className="mt-6 w-full px-4 py-2 rounded-lg bg-gradient-to-tr from-blue-500 to-teal-400 text-white font-bold shadow-md hover:scale-105 transition-transform duration-300"
              onClick={handleSubmit}
            >
              Save Reminder
            </button>
          </motion.div>
        </div>

        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="bg-white w-full max-w-sm p-6 rounded-3xl shadow-xl border-l-4 border-indigo-400"
        >
          <h1 className="text-2xl font-bold text-indigo-700 mb-4 text-center"></h1>
          All reminders
          <ul>
            {reminder.map((r) => (
              <li key={r._id} className="p-4 border rounded mb-2 shadow">
                <button
                  className="top-0 ml-70 pb-2 font-extrabold"
                  onClick={() => handleButton(r._id)}
                >
                  X
                </button>
                <div>⏰ {new Date(r.reminderTime).toLocaleString()}</div>
                <div>Status: {r.notified ? "✅ Notified" : "🕒 Pending"}</div>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  );
}
