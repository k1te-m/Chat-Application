import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { selectAlert } from "../alert/alertSlice";

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
    <div className={`alert alert-${alert.type}`}>
      <i className="fas fa-exclamation-circle" /> {alert.message}
    </div>
  ) : null;
};

export default Alert;
