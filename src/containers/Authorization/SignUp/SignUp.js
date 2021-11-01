import React from "react";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import {
  GlobalWrapper,
  Wrapper,
  TitleStyled,
  SignUpButton,
  FormikStyled,
  FormStyled,
  InputWrapper,
  InputComponent,
  FormikErrorMessage,
  InputContainer,
  AlreadyMemberWrapper,
  SignInText,
  ParagraphStyled,
} from "./SignUp.styled";

const SignUp = () => {
  let history = useHistory();
  let myStorage = window.localStorage;
  const toSignIn = () => {
    history.push("/login");
  };

  return (
    <GlobalWrapper>
      <Wrapper>
        <TitleStyled>Register the new account</TitleStyled>
        <FormikStyled
          initialValues={{
            userName: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={Yup.object({
            userName: Yup.string()
              .min(3, "Must be at least 3 characters")
              .max(30, "Must be at most 30 characters")
              .required("Please input a value"),
            email: Yup.string()
              .email("Invalid email address")
              .required("Please input a value"),
            password: Yup.string()
              .min(3, "Must be at least 3 characters")
              .required("Please input a value"),
            confirmPassword: Yup.string()
              .oneOf([Yup.ref("password"), null], "Passwords must match")
              .required("Please input a value"),
          })}
          onSubmit={({ userName, password }) => {
            myStorage.setItem(`${userName}`, password);
            myStorage.setItem("isAuthorized", true);
            history.push("/home");
            window.location.reload();
          }}
        >
          {({ handleSubmit }) => (
            <FormStyled onSubmit={handleSubmit}>
              <InputWrapper>
                <InputContainer>
                  <b>Username:</b>
                  <InputComponent
                    title="Username"
                    name="userName"
                    type="text"
                  />
                  <FormikErrorMessage name="userName" component="div" />
                </InputContainer>
                <InputContainer>
                  <b>Email:</b>
                  <InputComponent title="Email" name="email" type="email" />
                  <FormikErrorMessage name="email" component="div" />
                </InputContainer>
                <InputContainer>
                  <b>Password:</b>
                  <InputComponent
                    title="Password"
                    name="password"
                    type="password"
                  />
                  <FormikErrorMessage name="password" component="div" />
                </InputContainer>
                <InputContainer>
                  <b>Confirm Password:</b>
                  <InputComponent
                    title="Confirm password"
                    name="confirmPassword"
                    type="password"
                  />
                  <FormikErrorMessage name="confirmPassword" component="div" />
                </InputContainer>
              </InputWrapper>
              <AlreadyMemberWrapper>
                <ParagraphStyled>Already a member?</ParagraphStyled>
                <SignInText onClick={toSignIn}>Sign in</SignInText>
              </AlreadyMemberWrapper>
              <SignUpButton onSubmit={handleSubmit}>SIGN ME UP</SignUpButton>
            </FormStyled>
          )}
        </FormikStyled>
      </Wrapper>
    </GlobalWrapper>
  );
};

export default SignUp;
