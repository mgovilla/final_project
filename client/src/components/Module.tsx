import React from 'react';

interface Props {
  title: string;
  content: string;
}

interface States {
}

class Module extends React.Component<Props, States> {
  constructor(props : Props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (
      <li>{this.props.title}<br/><button className="toggleButton">Toggle</button><button className="deleteButton">Delete</button></li>
    )
  }
}

export default Module;