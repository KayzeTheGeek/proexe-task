import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// import store from "./store";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await axios(
    "https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data"
  );

  return response.data;
});

const usersSlice = createSlice({
  name: "users",
  initialState: {
    usersList: null,
    status: "idle",
    userID: undefined,
  },
  reducers: {
    deleteUser(state, action) {
      state.usersList = state.usersList.filter((value) => {
        if (value.id === action.payload) {
          return false;
        }

        return true;
      });
    },
    addUser(state, action) {
      const { name } = action.payload;

      function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }

      let highestID = state.usersList.reduce((tot, value) => {
        return Math.max(tot, value.id);
      }, -1);

      console.log("myagaggaValue", action.payload);

      state.usersList.push({
        id: highestID + 1,
        ...action.payload,
        city: "NYC",
        username: name
          .split(" ")
          .map((value) => capitalizeFirstLetter(value))
          .join(""),
      });
    },
    updateUser(state, action) {
      const { id, name, email } = action.payload;
      function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }

      state.usersList = state.usersList.map((value) => {
        if (value.id === id) {
          return {
            ...value,
            name,
            username: name
              .split(" ")
              .map((value) => capitalizeFirstLetter(value))
              .join(""),
            email,
          };
        }
        return value;
      });
    },
    setID(state, action) {
      state.userID = action.payload;
    },
  },
  extraReducers: {
    [fetchUsers.fulfilled]: (state, action) => {
      state.status = "succeeded";
      // Add any fetched posts to the array
      state.usersList = action.payload.map((value) => {
        const {
          id,
          name,
          username,
          email,
          address: { city },
        } = value;
        return { id, name, username, email, city };
      });
    },
    [fetchUsers.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export const { deleteUser, addUser, setID, updateUser } = usersSlice.actions;
export default usersSlice.reducer;

export const selectAllNotifications = (state) => state.notifications;
