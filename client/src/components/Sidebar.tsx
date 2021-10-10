import React from 'react';

interface Props {
  menuStatus: string;
}

interface States {
  links: {text: string; link: string}[];
}

class MenuLinks extends React.Component<Props, States> {
  constructor(props : Props) {
    super(props)
    this.state = {
      links: [{
        text: 'Contact Info',
        link: ''
      }, {
        text: 'Objective',
        link: ''
      }, {
        text: 'Education',
        link: ''
      }, {
        text: 'Work Experience',
        link: ''
      }, {
        text: 'Skills',
        link: ''
      }, {
        text: 'Additional Experience',
        link: ''
      }]
    }
  }

  render() {
    let links = this.state.links.map((link, i) => <li ref={(i + 1).toString()}><i aria-hidden="true"></i><a href={link.link} target="_blank" rel="noreferrer">{link.text}</a></li>);
    return (
      <div className={this.props.menuStatus} id='menu'>
        <ul>
          { links }
        </ul>
      </div>
    )
  }
}

export default MenuLinks;