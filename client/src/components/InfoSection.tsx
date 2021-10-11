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
  sectionType: number;
}

/*
interface States {
  modalOpen: boolean;
}
*/

export default function InfoSection(props : Props) {

  const { data: modules, mutate, error } = useSWR('/modules', fetcher('GET'))
  const [open, setOpen] = useState(false)

  var handleAdd = useCallback(async (t: number, s: string, e : any) => {
    console.log(`create new module: ${s}`)
    await EndPoint.newModule({type: t, value: {title: s, content: e }});
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
        <ModuleForm handleSubmit={ handleAdd } st={props.sectionType} />
      </Modal>
    </>)
  let formattedModules: any[] = [];
  /*
  for (var j = 0; j < modules.length; j++) {
    if (modules[j].type == props.sectionType) {
      moduleThings.push(modules[j]);
    }
  }
  */
  if (!error && modules) {
    console.log(modules.length)
    for (var j = 0; j < modules.length; j++) {
      if (modules[j].type == props.sectionType) {
        formattedModules.push(modules[j])
        console.log(formattedModules)
      }
    }
  }
  moduleElements.push(...formattedModules.map((fm, i) => <Module title={formattedModules[i].value.title} content={""} />));
  if (!error && !modules) return <p>Loading</p>
  else return (
    <div>
      {!error && (
      <div>
      <li onClick={props.onClick}>{props.sectionTitle}</li>
      <div className={menuStatus} id="modules">
        <ul>
          {moduleElements}
        </ul>
      </div>
      </div>
      )}
    </div>
  )
}
  
