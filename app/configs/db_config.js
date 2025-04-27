import mongoose from "mongoose";
export const CONNECT_DB = async () => {
  try {
    const DB_OPT = {
      dbName: "inventoryDB",
    };
    await mongoose.connect(process.env.DB_URL, DB_OPT);
    console.log(`Successfully connected to ${DB_OPT.dbName}`);
  } catch (error) {
    console.log("Error at connecting db", error);
  }
};
