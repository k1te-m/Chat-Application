// Dependencies
import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { useSelector } from "react-redux";
import { selectAlert } from "../alert/alertSlice";

// FadeIn keyframe
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

// CSS for Alert
const StyledAlert = styled.div`
  position: fixed;
  left: 50%;
  top: 42.5%;
  z-index: 9999;
  transform: translate(-50%, 0);
  animation: ${fadeIn} 0.7s linear;
`;

const Alert = () => {
  // Selector & Local States
  const alerts = useSelector(selectAlert);
  const [alert, setAlert] = useState({ type: "", message: "" });
  const [show, setShow] = useState(false);

  // Use Effect, calls setAlert for the most recent item in the alerts array, sets show to true and sets a timeout to stop showing the alert after 3 seconds
  useEffect(() => {
    if (alerts.length > 0) {
      setAlert(alerts[alerts.length - 1]);
      setShow(true);
      setTimeout(() => {
        setShow(false);
      }, 3000);
    }
  }, [alerts]);

  // If show is true, return the StyledAlert, if false return null
  return show ? (
    <StyledAlert className={`alert alert-${alert.type} text-center`}>
      <i className="fas fa-exclamation-circle" /> {alert.message}
    </StyledAlert>
  ) : null;
};

export default Alert;
