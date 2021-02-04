import React from "react";
import styled from "styled-components";

const LogoutBtn = styled.button``;

const LogoutButton = ({ logout }) => {
  return <LogoutBtn onClick={logout}>Log out</LogoutBtn>;
};

export default LogoutButton;
