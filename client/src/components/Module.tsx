import React from 'react';

interface Props {
  text: string;
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
        <li>{this.props.text}</li>
    )
  }
}

export default Module;