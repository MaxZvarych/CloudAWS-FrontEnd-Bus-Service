import React from "react";
import { useHistory } from "react-router-dom";
import security from "../../Icons/Bus.jpg";

import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Footer, ItemWrapper, CardStyled } from "./CardItem.styled";

const { Meta } = CardStyled;

const CardItem = ({
  type = "Private",
  age,
  imageSrc = security,
  capacity = 50,
  run = 30000,
  producer = "GE",
  additional_prop = null,
  id,
}) => {
  let history = useHistory();

  const handleClick = () => {
    history.push(`/item?id=${id}`);
  };

  return (
    <ItemWrapper>
      <CardStyled
        hoverable
        style={{ width: "300px", borderRadius: "20px" }}
        cover={
          <img
            src={imageSrc}
            style={{
              width: "300px",
              borderRadius: "20px 20px 0 0",
            }}
          />
        }
        actions={[
          <SettingOutlined key='setting' onClick={handleClick} />,
          <EditOutlined key='edit' />,
          <EllipsisOutlined key='ellipsis' />,
        ]}
      >
        <Meta title={`Type: ${type}`} description={`Age: ${age}`} />
        <Footer>
          <p style={{ fontWeight: "bold", fontSize: "16px" }}>
            Capacity is:{capacity} <br /> Bus' run:
            {run} <br /> Bus' producer:
            {producer} <br />
            {run} <br />
            Bus' number: ${id}
          </p>
          {additional_prop ? (
            <p style={{ fontWeight: "bold", fontSize: "16px" }}>
              Bus' {additional_prop.name} is:
              {additional_prop.data}
            </p>
          ) : (
            <></>
          )}
        </Footer>
      </CardStyled>
    </ItemWrapper>
  );
};

export default CardItem;
