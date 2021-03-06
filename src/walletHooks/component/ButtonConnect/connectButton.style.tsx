import styled from "styled-components";

export const ButtonLogOut = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: #fff;
`;

export const SpanBalance = styled.span``;

export const Button = styled.button`
  cursor: pointer;
  width: 200px;
  height: 40px;
  border-radius: 4px;
  line-height: 40px;
  border: none;
  font-size: 14px;
  color: #ffffff;
  background-color: #e44b05;
  cursor: pointer;

  &:hover {
    background-color: #bd3c00;
  }
`;

export const AccountDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 4px;
  padding: 2px 2px 2px 10px;
  width: 200px;
  height: 40px;
  font-size: 14px;
  color: #fff;
  background-color: #174862;
`;

export const WalletSpan = styled.span`
  display: block;
  margin-left: 10px;
  border-radius: 4px;
  padding: 10px;
  background-color: #252525;
  cursor: pointer;
`;
