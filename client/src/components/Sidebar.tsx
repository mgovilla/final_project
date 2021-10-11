import React from 'react';
import InfoSection from './InfoSection';
import Module from './Module';

interface Props {
}

interface States {
  active: number
}

const CIplaceholderModules = [
  "Add CI Module",
  "CI Placeholder Module 1",
  "CI Placeholder Module 2",
  "CI Placeholder Module 3"
]

const objplaceholderModules = [
  "Add Obj Module",
  "obj Placeholder Module 1",
  "obj Placeholder Module 2",
  "obj Placeholder Module 3"
]

const edplaceholderModules = [
  "Add Edu Module",
  "ed Placeholder Module 1",
  "ed Placeholder Module 2",
  "ed Placeholder Module 3"
]

const WEplaceholderModules = [
  "Add Work Module",
  "WE Placeholder Module 1",
  "WE Placeholder Module 2",
  "WE Placeholder Module 3"
]

const skplaceholderModules = [
  "Add Skill Module",
  "sk Placeholder Module 1",
  "sk Placeholder Module 2",
  "sk Placeholder Module 3"
]

const AEplaceholderModules = [
  "Add AE Module",
  "AE Placeholder Module 1",
  "AE Placeholder Module 2",
  "AE Placeholder Module 3"
]

const sectionTitles = [
  "Contact Info",
  "Objective",
  "Education",
  "Work Experience",
  "Skills",
  "Additional Experience"
]
const pms = [
  CIplaceholderModules,
  objplaceholderModules,
  edplaceholderModules,
  WEplaceholderModules,
  skplaceholderModules,
  AEplaceholderModules
]

class Sidebar extends React.Component<Props, States> {
  constructor(props: Props) {
    super(props)
    this.state = {
      active: 0
    }
  }

  render() {
    let infosections = pms.map((pm, i) => <InfoSection key={i} onClick={() => this.setState({ active: i })} isOpen={i == this.state.active} sectionTitle={sectionTitles[i]} moduleContent={pms[i]} sectionType={i} />);

    return (
      <div id="menu">
        <ul>
          { infosections }
        </ul>
      </div>
    )
  }
}

export default Sidebar;