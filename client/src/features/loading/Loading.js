import React from "react";
import styled, { keyframes } from "styled-components";

const LoadingImage = styled.img.attrs({
  src: "../../logo192.png",
  alt: "owl",
})`
  width: 250px;
  height: 250px;
  border-radius: 50%;
  border: 4px solid #3b945e;
`;

const rotate = keyframes`
from {
    transfrom: rotate(0deg);
}
to {
    transform: rotate(360deg);
}`;

const Rotate = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${rotate} 1.5s linear infinite;
`;

const Loading = () => {
  return (
    <Rotate className="container">
      <LoadingImage />
    </Rotate>
  );
};

export default Loading;
