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
        <li>{this.props.title}</li>
    )
  }
}

export default Module;