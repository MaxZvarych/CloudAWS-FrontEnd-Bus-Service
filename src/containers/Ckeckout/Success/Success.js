import React from "react";
import { CartContainer, ButtonSuccess } from "./Success.styled";
import { Result } from "antd";
import { useHistory } from "react-router-dom";

const Success = () => {
  let history = useHistory();
  return (
    <CartContainer>
      <Result
        status="success"
        title="Your order was sent to processing!"
        subTitle="Order Number: 34534545645645. You can check your receipt on your e-mail."
        extra={[
          <ButtonSuccess onClick={() => history.push("/catalog")}>
            Go to Catalog
          </ButtonSuccess>,
        ]}
      />
    </CartContainer>
  );
};

export default Success;
