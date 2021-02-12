import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { useSelector } from "react-redux";
import { selectAlert } from "../alert/alertSlice";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const StyledAlert = styled.div`
  position: fixed;
  left: 50%;
  top: 40%;
  z-index: 9999;
  transform: translate(-50%, 0);
  animation: ${fadeIn} 0.7s linear;
`;

const AlertContainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Alert = () => {
  const alerts = useSelector(selectAlert);
  const [alert, setAlert] = useState({ type: "", message: "" });
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (alerts.length > 0) {
      setAlert(alerts[alerts.length - 1]);
      setShow(true);
      setTimeout(() => {
        setShow(false);
      }, 3000);
    }
  }, [alerts]);

  return show ? (
    <StyledAlert className={`alert alert-${alert.type} text-center`}>
      <i className="fas fa-exclamation-circle" /> {alert.message}
    </StyledAlert>
  ) : null;
};

export default Alert;
