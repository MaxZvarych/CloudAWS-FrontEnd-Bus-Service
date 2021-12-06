import axios from "axios";

const baseURL =
  "http://a9b41ad67318c4b8c8e356dc2ef6a97a-1329213901.us-east-2.elb.amazonaws.com:3300/dev/bus";
const sensorDataURL =
  "http://a9b41ad67318c4b8c8e356dc2ef6a97a-1329213901.us-east-2.elb.amazonaws.com:3300/dev/sensordata";

export const getAllBuses = async () => {
  try {
    let responseData = await axios.get(baseURL);
    console.log(responseData);
    return responseData.data;
  } catch {
    console.log("error, cant fetch data");
  }
};

export const getAllSensorsData = async () => {
  try {
    let responseData = await axios.get(sensorDataURL);
    // console.log(responseData);
    return responseData.data;
  } catch {
    console.log("error, cant fetch data");
  }
};

export const getSpecificSensorData = async (id) => {
  try {
    let responseData = await axios.get(`${sensorDataURL}/${id}`);
    console.log(responseData);
    return responseData.data;
  } catch {
    console.log("error, cant fetch data");
  }
};

export const postBus = async (body) => {
  // const json = JSON.stringify(body);
  try {
    let responseData = await axios.post(baseURL, body);
    console.log(responseData);
    return responseData.data;
  } catch {
    console.log("error, cant fetch data");
  }
};
