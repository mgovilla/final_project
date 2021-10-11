import React from 'react';
import { ResumeContext } from '../pages/Context';

interface Props {
  module: models.Module
}

interface States {
}

class Module extends React.Component<Props, States> {
  constructor(props : Props) {
    super(props)
    this.state = {
    }
    this.handleToggle = this.handleToggle.bind(this)
  }
  static contextType = ResumeContext
  context!: React.ContextType<typeof ResumeContext>
  // Toggle the module to be in the resume or not
  handleToggle() {
    console.log(this.context.data)
  }

  render() {
    return (
      <li>{this.props.module.title}<br/><button className="toggleButton" onClick={this.handleToggle}>Toggle</button><button className="deleteButton">Delete</button></li>
    )
  }
}
export default Module;