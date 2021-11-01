import axios from "axios";

const baseURL =
  "https://aj0vas3096.execute-api.us-east-2.amazonaws.com/dev/bus";

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
