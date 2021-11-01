import axios from "axios";

const baseURL = "http://localhost:3000/dev/bus";

export const getAllBuses = async () => {
  try {
    let responseData = await axios.get(baseURL);
    console.log(responseData);
    return responseData.data;
  } catch {
    console.log("error, cant fetch data");
  }
};

export const postBus = async (body) => {
  try {
    let responseData = await axios.post(baseURL, body);
    console.log(responseData);
    return responseData.data;
  } catch {
    console.log("error, cant fetch data");
  }
};
