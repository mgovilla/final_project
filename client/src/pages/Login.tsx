import './Login.css'
import image from '../images/loginImage.png'
export default function Login() {
  let uri = encodeURI(`https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID_LOCAL}&redirect_uri=${process.env.REACT_APP_GITHUB_CALLBACK}`)

  return (
    <div className='loginPage'>
      <h1 style={{fontSize: '108px'}}>
        Resumend
      </h1>
      <h2>Create different version of your resume by remixing your master resume.</h2>
      <a className="login" href={uri} rel="noreferrer" >
        Log in with Github
      </a>
      <img src={image} style={{
        width:'400px',
        display:'block',
        margin: 'auto',
        marginTop:'40px'}}/>
    </div>
  )
}