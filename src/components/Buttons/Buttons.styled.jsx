import styled, { css } from "styled-components";

export const Button = styled.button`
  display: block;
  background-color: #969494;
  color: #ffffff;
  font-size: 24px;
  cursor: pointer;
  width: ${(props) =>
    props.value === "AC" || props.value === "0" ? "160px" : "80px"};
  height: 80px;

  ${(props) =>
    props.value === "=" &&
    css`
      position: absolute;
      right: 5px;
      bottom: 5px;
      height: 160px;
    `};
`;
