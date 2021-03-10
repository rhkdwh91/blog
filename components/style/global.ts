import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;  
  }

  body {
    font-family: "Noto Sans KR", sans-serif !important;
    box-sizing: border-box;
    background-color: #f7f8fb;
  }
`

export default GlobalStyle