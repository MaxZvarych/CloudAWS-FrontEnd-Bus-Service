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
  // const json = JSON.stringify(body);
  try {
    let responseData = await axios.post(baseURL, body, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
    console.log(responseData);
    return responseData.data;
  } catch {
    console.log("error, cant fetch data");
  }
};
