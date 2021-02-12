import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { selectAuth } from "../auth/authSlice";
import { useSelector } from "react-redux";

const FooterStyled = styled.footer``;

const Footer = () => {
  const auth = useSelector(selectAuth);

  const { user } = auth;

  return (
    <FooterStyled className="footer font-small">
      <div className="container text-center">
        <hr />
        <i className="fab fa-github" />
        <div className="row">
          <a href="https://github.com/k1te-m/Chat-Application">
            GitHub Repository
          </a>
        </div>
        <div className="row">
          <span>
            Developer: <a href="https://github.com/k1te-m">Kevin Miller</a>
          </span>
        </div>
        <div className="row">
          <p className="mb-0">
            About: A MERN stack application that allows real time communication
            between users, utilizing websockets and React Redux.
          </p>
        </div>
      </div>
      <div className="footer-copyright text-center py-3">© 2021 Copyright</div>
    </FooterStyled>
  );
};

export default Footer;
