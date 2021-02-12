import React from "react";
import styled from "styled-components";

const LogoImg = styled.img`
  height: 75px;
  width: 75px;
`;

const Logo = () => {
  return <LogoImg src="../../logo192.png" />;
};

export default Logo;
