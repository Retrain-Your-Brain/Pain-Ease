import axios from "axios";


export const reminderAPI = async () => {
    {
        const token=localStorage.getItem('token')
      const response = await axios.get("http://localhost:5000/get-reminder", {
        headers:{
            Authorization:`Bearer ${token}`
        }
      });
      return response.data;
    }
  };

  export const deleteReminderAPI = async (id:string) => {
    {
        const token=localStorage.getItem('token')
      const response = await axios.delete(`http://localhost:5000/delete-reminder/${id}`, {
        headers:{
            Authorization:`Bearer ${token}`
        }
      });

      return response.data;
    }
  };

  export const updateReminderAPI = async (id:string) => {
    {
        const token=localStorage.getItem('token')
      const response = await axios.put(`http://localhost:5000/update-reminder/${id}`,{}, {
        headers:{
            Authorization:`Bearer ${token}`
        }
      });

      return response.data;
    }
  };
