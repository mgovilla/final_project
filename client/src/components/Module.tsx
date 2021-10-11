import React from 'react';
import { ResumeContext } from '../pages/Context';
import { EndPoint } from '../util/endpoint';


interface Props {
  module: models.Module
}

interface States {
}

class Module extends React.Component<Props, States> {
  static contextType = ResumeContext
  context!: React.ContextType<typeof ResumeContext>
  
  constructor(props : Props) {
    super(props)
    this.state = {
    }
    this.handleToggle = this.handleToggle.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  handleDelete: React.MouseEventHandler<HTMLButtonElement> = (async () => {
    console.log('delete module: ' + this.props.module._id);
    await EndPoint.deleteModule(this.props.module._id);
  });

  // Toggle the module to be in the resume or not
  async handleToggle() {
    if(this.context.data) {
      console.log(this.context.data[0])
      let c = this.context.data[0].content.indexOf(this.props.module._id)
      // the id exits in the resume content
      if (c >= 0) {
        // remove it
        this.context.data[0].content.splice(c, 1)
        await EndPoint.updateResume(this.context.data[0]._id, this.context.data[0].content)
      } else {
        // else add it
        this.context.data[0].content.push(this.props.module._id)
        await EndPoint.updateResume(this.context.data[0]._id, this.context.data[0].content)
      }
      this.context.mutate && this.context.mutate()
    }

  }

  render() {
    return (
      <li>{this.props.module.title}<br/><button className="toggleButton" onClick={this.handleToggle}>Toggle</button><button className="deleteButton" onClick={this.handleDelete}>Delete</button></li>
    )
  }
}
export default Module;