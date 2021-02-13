import React from "react";
import styled from "styled-components";

const FooterStyled = styled.footer`
  a {
    color: #198754;
  }
`;

const Footer = () => {
  return (
    <FooterStyled className="footer font-small">
      <div className="container text-center">
        <hr />
        <i className="fab fa-github" />
        <div className="row">
          <a
            href="https://github.com/k1te-m/Chat-Application"
            target="_blank"
            rel="noreferrer"
          >
            GitHub Repository
          </a>
        </div>
        <div className="row">
          <span>
            Developer:{" "}
            <a
              href="https://github.com/k1te-m"
              target="_blank"
              rel="noreferrer"
            >
              Kevin Miller
            </a>
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
