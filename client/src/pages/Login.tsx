
export default function Login() {
    let uri = encodeURI(`https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID_LOCAL}&redirect_uri=${process.env.REACT_APP_GITHUB_CALLBACK}`)
    
    return (
        <a className="App-link" href={uri} rel="noreferrer" >
          Basic Login
        </a>
    )
}