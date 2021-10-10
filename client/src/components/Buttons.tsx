import React, { Component } from 'react';
import user from './imgs/defaultUser.png'

var bgColors = {
  "DarkBlue": "#175C9C",
  'LightBlue': '#CAE6FF'
};




export const HomeButton = () => (
  <div className='btn' >
    <div onClick=
      {event => window.location.href ='/Home.tsx'}>
      Home
    </div>
  </div>
)

export const ShareButton = () => (
  <div className='btn' >
    <div>Share</div>
  </div>
)

interface CardState {
  showMenu: Boolean
}

interface CardProps {
}
let uri = encodeURI(`https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID_LOCAL}&redirect_uri=${process.env.REACT_APP_GITHUB_CALLBACK}`)

export class Card extends Component<CardProps, CardState>  {
  
  constructor(props: CardProps) {
    super(props);

    this.state = {showMenu: false}

    this.showMenu = this.showMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }

  showMenu(event: { preventDefault: () => void; }) {
    event.preventDefault();

    this.setState({ showMenu: true }, () => {
      document.addEventListener('click', this.closeMenu);
    });
  }

  closeMenu() {
    this.setState({ showMenu: false }, () => {
      document.removeEventListener('click', this.closeMenu);
    });
  }
        // TODO: fix the profile button dropdown
  render() {
    return (
      <div>
        <img src={user} alt='User' height='35px' width='auto' style={{
          borderRadius: 20,
          backgroundColor: 'white',
          marginRight: '50px',
          marginTop: '3px'
        }} />
        {
          this.state.showMenu
            ? (
              <div className="menu">
                <button> Menu item 1 </button>
                <button> Menu item 2 </button>
                <a
                  className="App-link"
                  href={uri}
                  rel="noreferrer"
                >
                  Basic Login
                </a>
              </div>
            )
            : (
              null
            )
        }
      </div>
    );
  }
}

export const Profile = () => (
  <li>
    <img src={user} alt='User' height='35px' width='auto' style={{
      borderRadius: 20,
      backgroundColor: 'white',
      marginRight: '50px',
      marginTop: '3px'
    }} />
  </li>

)


