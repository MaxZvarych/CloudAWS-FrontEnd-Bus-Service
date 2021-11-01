import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Wrapper,
  InfoWrapper,
  ButtonsWrapper,
  ItemImage,
  Description,
  SecurityText,
  SecurityTitlePrice,
  Inputs,
  DescriptionFirst,
  ButtonsPriceWrapper,
  ItemButton,
} from "./Item.styled";
import { getAllBuses } from "../../utils/Api";
import security from "../../../Icons/background2.jpg";
import { useDispatch } from "react-redux";
import { createItem } from "../../utils/Redux/Action";

const Item = () => {
  const findSecurity = (data, idx) => {
    let result;
    data.forEach((element) => {
      if (element.id == idx) {
        result = element;
      }
    });
    return result;
  };

  const [foundSecurity, setFoundSecurity] = useState({});
  let id = 0;

  const [securities, setSecurities] = useState([]);
  useEffect(() => {
    if (securities.length == 0) {
      getAllBuses().then((res) => {
        id = parseID();
        console.log(id);
        setFoundSecurity(findSecurity(res.data, id));
        console.log(foundSecurity);
        if (res !== undefined) {
          setSecurities(res);
        }
      });
    }
  });

  const parseID = () => {
    let url = window.location.href;
    const splitted = url.split("?id=");
    return splitted[1];
  };

  let history = useHistory();

  const handleClick = () => {
    history.push(`/catalog`);
  };

  const title = "Apple Inc. Security";
  const text =
    "Apple Securities is a premier security service provider. We provide security services to customers in Singapore";
  const dispatch = useDispatch();

  const goToCard = () => {
    dispatch(
      createItem({
        id: foundSecurity.id,
        price: foundSecurity.price,
        documentOwner: foundSecurity.documentOwner,
        number: 1,
      })
    );
  };

  return (
    <Wrapper>
      <InfoWrapper>
        <ItemImage
          src={security}
          alt='Logo_image'
          width='400px'
          height='400px'
        />
        <Description>
          <DescriptionFirst>
            <SecurityTitlePrice>{title}</SecurityTitlePrice>
            <SecurityText>{text}</SecurityText>
          </DescriptionFirst>
          <Inputs>
            <label style={{ color: "black", fontSize: "16px" }}>
              Amount to buy:
              <input
                style={{ color: "black" }}
                type='number'
                min='0'
                max='50'
              />
            </label>
            <label style={{ color: "black", fontSize: "16px" }}>
              Choose year of issue:
              <select name='pets' id='pet-select' style={{ color: "black" }}>
                <option value=''>--Please choose an option--</option>
                <option value='2000'>2000</option>
                <option value='2005'>2005</option>
                <option value='2011'>2011</option>
                <option value='2014'>2014</option>
                <option value='2018'>2018</option>
                <option value='2020'>2020</option>
              </select>
            </label>
          </Inputs>
        </Description>
      </InfoWrapper>
      <ButtonsPriceWrapper>
        <SecurityTitlePrice>Price: ${foundSecurity.price}</SecurityTitlePrice>
        <ButtonsWrapper>
          <ItemButton onClick={handleClick}>Go back</ItemButton>
          <ItemButton onClick={goToCard}>Add to cart</ItemButton>
        </ButtonsWrapper>
      </ButtonsPriceWrapper>
    </Wrapper>
  );
};

export default Item;
