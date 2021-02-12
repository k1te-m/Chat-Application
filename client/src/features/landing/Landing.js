import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Logo from "../Logo";
import { useSelector, useDispatch } from "react-redux";
import { selectAuth, loadUser } from "../auth/authSlice";
import ChannelBoard from "../channelboard/ChannelBoard";
import SocketContext from "../context/socket";
import Footer from "../footer/Footer";
import Loading from "../loading/Loading";

const LandingWrapper = styled.div`
  height: 68vh;
  @media (min-width: 768px) {
    height: 79vh;
  }
  @media (min-width: 992px) {
    height: 84vh;
  }
  @media (min-width: 1200px) {
    height: 79vh;
  }
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
  const auth = useSelector(selectAuth);
  const dispatch = useDispatch();
  const socket = useContext(SocketContext);

  useEffect(() => {
    if (!auth.user) {
      dispatch(loadUser());
    }
    socket.on("connect", () => {
      console.log("Connected with the back-end.");
      console.log(socket.id);

      socket.on("disconnect", () => {
        console.log(socket.id);
      });
    });
  }, [auth.user, dispatch, socket]);

  if (auth.isLoading) {
    return <Loading />;
  } else if (auth.user === null) {
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
                <SignUpBtn className="btn btn-success mb-1">Sign up</SignUpBtn>
              </Link>
            </SignUpRow>
            <LoginRow className="row">
              <Link to="/login">
                <LoginBtn className="btn btn-success">Log in</LoginBtn>
              </Link>
            </LoginRow>
          </div>
        </LandingWrapper>
        <Footer />
      </>
    );
  } else {
    return <ChannelBoard />;
  }
};

export default Landing;
