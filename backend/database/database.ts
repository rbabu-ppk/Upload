import mongoose from "mongoose";

export const dbConnection = () => {
  mongoose
    .connect("mongodb://127.0.0.1:27017/spikes" || process.env.DB_LOCAL_URI)
    .then(() => {
      console.log("db connected");
    });
};
