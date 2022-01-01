import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  /* Using this inherit reset method means you can use content-box or padding-box without a universal selector overriding your CSS */
  html {
  scroll-behavior: smooth;
}

* {
  box-sizing: border-box;
}

body {
  background-color: #040714;
  color: #f9f9f9;

  font-family: Avenir-Roman, sans-serif;
  margin: 0;
  padding: 0;
}

a {
  color: #f9f9f9;
  text-decoration: none;
}

@media only screen and (min-width: 768px) {
  body {
    font-size: 16px;
  }
}
@media only screen and (min-width: 480px) and (max-width: 769px) {
  body {
    font-size: 15px;
  }
}

@media only screen and (min-width: 479px) {
  body {
    font-size: 14px;
  }
}

`;

export default GlobalStyle;
