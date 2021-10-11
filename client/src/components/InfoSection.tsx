import React from 'react';
import Module from './Module';

interface Props {
  sectionTitle: string;
  moduleContent: string[];
  onClick: React.MouseEventHandler<HTMLLIElement>;
  isOpen: boolean;
}

interface States {
}

class InfoSection extends React.Component<Props, States> {
  constructor(props : Props) {
    super(props)
    this.state = {
    }
  }

  render() {
    let menuStatus = this.props.isOpen ? 'isopen' : 'notopen';
    let modules = this.props.moduleContent.map((mc, i) => <Module text={mc} />);
    return (
      <div>
      <li onClick={ this.props.onClick }>{ this.props.sectionTitle }</li>
      <div className={ menuStatus } id="modules">
        <ul>
          { modules }
        </ul>
      </div>
      </div>
    )
  }
}

export default InfoSection;