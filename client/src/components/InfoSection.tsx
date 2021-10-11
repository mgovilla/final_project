import React, { useCallback, useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useParams } from 'react-router';
import useSWR from 'swr';
import { EndPoint, fetcher } from '../util/endpoint';
import Editor from './Editor';
import Module from './Module';
import { ModuleForm } from './ModuleForm';


interface Props {
  sectionTitle: string;
  moduleContent: string[];
  onClick: React.MouseEventHandler<HTMLLIElement>;
  isOpen: boolean;
}

/*
interface States {
  modalOpen: boolean;
}
*/

export default function InfoSection(props : Props) {

  const { data: modules, mutate } = useSWR('/modules', fetcher('GET'))
  const [open, setOpen] = useState(false)

  var handleAdd = useCallback(async (s: string, e : any) => {
    console.log(`create new module: ${s}`)
    await EndPoint.newModule({ title: s, content: e });
    setOpen(false)
    mutate()
    // redirect to the remix page
  }, [mutate])

  let menuStatus = props.isOpen ? 'isopen' : 'notopen';
  let moduleElements: JSX.Element[] = [];
  moduleElements.push(
    <>
      <li id="addButton" onClick={() => setOpen(true)}>Add Module</li>
      <Modal isOpen={open} contentLabel="create new module">
        <button id="closeModal" onClick={() => setOpen(false)}>&times;</button>
        <ModuleForm handleSubmit={ handleAdd } />
      </Modal>
    </>)
  console.log(modules)
  moduleElements.push(...props.moduleContent.map((mc, i) => <Module title={mc} content={""} />));
  return (
    <div>
      <li onClick={props.onClick}>{props.sectionTitle}</li>
      <div className={menuStatus} id="modules">
        <ul>
          {moduleElements}
        </ul>
      </div>
    </div>
  )
}
  
  /*
  let menuStatus = props.isOpen ? 'isopen' : 'notopen';
  let moduleElements: JSX.Element[] = [];
  moduleElements.push(
    <>
      <li id="addButton" onClick={() => setOpen(true)}>Add Module</li>
      <Modal isOpen={open} contentLabel="create new module">
        <button id="closeModal" onClick={() => setOpen(false)}>&times;</button>
        <ModuleForm handleSubmit={ handleAdd } />
      </Modal>
    </>)
  moduleElements.push(...props.moduleContent.map((mc, i) => <Module title={mc} content={""} />));
  return (
    <div>
      <li onClick={props.onClick}>{props.sectionTitle}</li>
      <div className={menuStatus} id="modules">
        <ul>
          {moduleElements}
        </ul>
      </div>
    </div>
  )
}
*/
/*
class InfoSection extends React.Component<Props, States> {
  constructor(props: Props) {
    super(props)
    this.state = {
      modalOpen: false
    }

    const { data: modules, mutate } = useSWR('/modules', fetcher('GET'))
    const [open, setOpen] = useState(false)

    var handleAdd = useCallback(async (s: string, e : any) => {
    console.log(`create new module: ${s}`)
    await EndPoint.newModule({ title: s, content: e });
    mutate()
    // redirect to the remix page
  }, [mutate])
  }
  
  

  render() {
    let menuStatus = this.props.isOpen ? 'isopen' : 'notopen';
    let modules: JSX.Element[] = [];
    modules.push(
      <>
        <li id="addButton" onClick={() => this.setState({ modalOpen: true })}>Add Module</li>
        <Modal isOpen={this.state.modalOpen} contentLabel="create new module">
          <button id="closeModal" onClick={() => this.setState({modalOpen: false})}>&times;</button>
          <ModuleForm handleSubmit={ this.handleAdd() } />
        </Modal>
      </>)
    modules.push(...this.props.moduleContent.map((mc, i) => <Module title={mc} content={""} />));
    return (
      <div>
        <li onClick={this.props.onClick}>{this.props.sectionTitle}</li>
        <div className={menuStatus} id="modules">
          <ul>
            {modules}
          </ul>
        </div>
      </div>
    )
  }
}

export default InfoSection;
*/