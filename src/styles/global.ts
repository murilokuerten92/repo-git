import { createGlobalStyle } from 'styled-components';

import githubBackground from '../assets/github-background.svg';

export default createGlobalStyle`
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background: #F0F0F5 url(${githubBackground}) no-repeat 70% top;
  -webkit-font-smoothing: antialized;
}

body, input, button {
  font: 16px Roboto, sans-serif;
}

#root {
  max-width: 960px;
  margin: auto;
  padding: 40px 20px;
}

button {
  cursor: pointer;
}

`;
