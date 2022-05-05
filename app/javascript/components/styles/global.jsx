import { css } from "@emotion/react";

const global = css`
  body{
    background-color: #F1F5F8;
    font-family: 'Roboto', sans-serif;
    font-weight: 600;
  }

  ul{
    list-style-type: none;
  }

  li{
    margin: 1rem;
    background-color: #FFFFFF;
    border-radius: 8px;
    padding: 0.5rem;
    text-align: center;
    box-shadow: 0px 10px 40px rgba(0, 0, 0, 0.03);
  }
`;

export default global