import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'

const GlobalStyle = createGlobalStyle`
    ${reset}
    * {
        border: 1px solid rgb(224, 224, 224);
        white-space: nowrap;
    }
    
    :focus {
        outline: none;
    }

    a {
        text-decoration: none;
        margin:1px;
    }
    
    h1 {
        font-size: 1.4rem;
        font-weight: 900;
        align-self: flex-start;
        margin: 10px;
        padding: 0 0 5px 10px;
        text-transform: uppercase;
        width: 93%;
        border-bottom: 3px double rgba(0,0,0,0.5);
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