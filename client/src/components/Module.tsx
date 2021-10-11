import React from 'react';
import { mutate } from 'swr';
import { ResumeContext } from '../pages/Remix';
import { EndPoint } from '../util/endpoint';

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
    this.handleDelete = this.handleDelete.bind(this)
  }
  // static contextType = ResumeContext
  // declare context: React.ContextType<typeof ResumeContext>
  handleDelete: React.MouseEventHandler<HTMLButtonElement> = (async () => {
    console.log('delete module: ' + module.id);
    await EndPoint.deleteModule(module.id);
  });
  // Toggle the module to be in the resume or not
  handleToggle() {
  }

  render() {
    return (
      <li>{this.props.module.title}<br/><button className="toggleButton" onClick={this.handleToggle}>Toggle</button><button className="deleteButton">Delete</button></li>
    )
  }
}
export default Module;