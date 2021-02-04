import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Logo from "../Logo";

const LandingWrapper = styled.div`
  display: flex;
`;

const HeaderRow = styled.div`
  text-align: center;
  margin-top: 3rem;
`;

const SignUpRow = styled.div`
  text-align: center;
  margin-top: 2rem;
`;

const LoginRow = styled.div`
  text-align: center;
`;

const LoginBtn = styled.button`
  width: 50%;
  background-color: green;
`;

const SignUpBtn = styled.button`
  width: 50%;
  background-color: green;
`;

const Landing = () => {
  return (
    <>
      <LandingWrapper className="wrapper">
        <div className="container">
          <Logo />
          <HeaderRow className="row">
            <h1>Welcome!</h1>
          </HeaderRow>
          <SignUpRow className="row">
            <Link to="/signup">
              <SignUpBtn>Sign up</SignUpBtn>
            </Link>
          </SignUpRow>
          <LoginRow className="row">
            <Link to="/login">
              <LoginBtn>Log in</LoginBtn>
            </Link>
          </LoginRow>
        </div>
      </LandingWrapper>
    </>
  );
};

export default Landing;
