
import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'

const GlobalStyle = createGlobalStyle`
    ${reset}
    * {
        border: 1px solid rgb(224, 224, 224);
        white-space: nowrap;
    }
    
    input:focus {
        outline: none;
    }

    textarea:focus {
        outline: none;
    }

    button:focus {
        outline: none;
    }

    a {
        text-decoration: none;
        margin:1px;
    }

    body {
        font-family: 'Nanum Myeongjo', serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    button {
        font: 'Nanum Myeongjo', serif;
    }

    input {
        font: 'Nanum Myeongjo', serif;
    }

    code {
        font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
        monospace;
    }
`

export default GlobalStyle