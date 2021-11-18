import React, { useEffect, useState } from "react";
import {
  Wrapper,
  CardWrapper,
  AddBusWrapper,
  FormWrapper,
} from "./Catalog.styled";
import CardItem from "../../components/CardItem/CardItem";
import "antd/dist/antd.css";
import { getAllBuses, postBus, getAllSensorsData } from "../utils/Api";
import LoadElement from "../../components/loading/LoadElement";

const Catalog = () => {
  let emptyArray = [];
  const [securities, setSecurities] = useState(emptyArray);
  const [addBusState, setAddBusState] = useState("Add new Bus");
  const [producer, setProducer] = useState("");
  const [age, setAge] = useState(0);
  const [type, setType] = useState("own");
  const [capacity, setCapacity] = useState(50);
  const [run, setRun] = useState(50000);
  const [sensorsData, setSensorsData] = useState([]);
  useEffect(() => {
    if (securities.length == 0) {
      getAllBuses().then((res) => {
        if (res !== undefined) {
          setSecurities(res.data);
        }
      });
    }
  });

  const [localData, SetData] = useState([]);
  useEffect(() => {
    if (localData.length == 0) {
      getAllBuses().then((res) => {
        if (res !== undefined) {
          SetData(res);
        }
      });
    }
  });

  const refetchAllBuses = async () => {
    getAllBuses().then((res) => {
      if (res !== undefined) {
        setSecurities(res.data);
      }
    });
  };

  async function submitData() {
    setAddBusState("Add new Bus");
    postBus({ type, age, capacity, run, producer }).then((response) =>
      refetchAllBuses()
    );
  }

  useEffect(() => {
    const interval = setInterval(() => {
      async function getData() {
        let data = await getAllSensorsData();
        // console.log("Updated sensors data to:", data);
        setSensorsData(data.data);
      }
      getData();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Wrapper>
      {securities.length !== 0 ? (
        <>
          <CardWrapper>
            {securities.map(
              ({ type, age, capacity, run, producer, id }, index) => {
                console.log(sensorsData);
                return index === 0 ||
                  index === 1 ||
                  index === 2 ||
                  index === 3 ? (
                  <CardItem
                    type={type}
                    age={age}
                    capacity={capacity}
                    id={id}
                    run={run}
                    producer={producer}
                    additional_prop={{
                      name: sensorsData[index].sensor_name,
                      data: sensorsData[index].sensor_data,
                    }}
                  />
                ) : (
                  <CardItem
                    type={type}
                    age={age}
                    capacity={capacity}
                    id={id}
                    run={run}
                    producer={producer}
                  />
                );
              }
            )}
          </CardWrapper>
          <AddBusWrapper>
            {addBusState === "Add new Bus" ? (
              <button
                onClick={() => {
                  setAddBusState("Adding a bus");
                }}
              >
                Add new Bus
              </button>
            ) : (
              <FormWrapper>
                <form onSubmit={submitData}>
                  <label>Bus producer</label>

                  <input
                    onChange={(e) => setProducer(e.target.value)}
                    name='busProducer'
                    type='text'
                    placeholder='Bus producer'
                    value={producer}
                  />
                  <label>Bus run</label>

                  <input
                    onChange={(e) => setRun(e.target.value)}
                    name='busRun'
                    type='number'
                    placeholder='Bus run'
                  />

                  <label>Bus capacity</label>

                  <input
                    onChange={(e) => setCapacity(e.target.value)}
                    name='busCapacity'
                    type='number'
                    placeholder='Bus capacity'
                  />

                  <label>Bus age</label>

                  <input
                    onChange={(e) => setAge(e.target.value)}
                    name='busAge'
                    type='number'
                    placeholder='Bus age'
                  />

                  <label>Type</label>

                  <select onSelect={(e) => setType(e.target.value)} name='type'>
                    <option value='own'>own</option>
                    <option value='private'>private</option>
                  </select>
                  <button type='submit'>Submit</button>
                </form>
              </FormWrapper>
            )}
          </AddBusWrapper>
        </>
      ) : (
        <LoadElement></LoadElement>
      )}
    </Wrapper>
  );
};

export default Catalog;
