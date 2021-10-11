import React, { useCallback, useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useParams } from 'react-router';
import useSWR from 'swr';
import { EndPoint, fetcher } from '../util/endpoint';
import { ModuleForm } from './ModuleForm';
import Module from './Module'


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

export default function InfoSection(props: Props) {
  const { data: modules, mutate, error } = useSWR('/modules', fetcher('GET'))
  const [open, setOpen] = useState(false)

  var handleAdd = useCallback(async (t: number, s: string, e: any) => {
    console.log(`create new module: ${s}`)
    await EndPoint.newModule({ type: t, title: s, content: e, in_use: false });
    setOpen(false)
    mutate()
    // redirect to the remix page
  }, [mutate])

  if (!error && !modules) return <p>Loading</p>

  let menuStatus = props.isOpen ? 'isopen' : 'notopen';
  let moduleElements: JSX.Element[] = [];
  if (!error && modules) {
    moduleElements.push(
      <>
        <li key={'createNewModule'} id="addButton" onClick={() => setOpen(true)}>Add Module</li>
        <Modal isOpen={open} contentLabel="create new module">
          <button id="closeModal" onClick={() => setOpen(false)}>&times;</button>
          <ModuleForm handleSubmit={handleAdd} st={props.sectionType} />
        </Modal>
      </>)

    moduleElements.push(...(modules as models.Module[]).filter((m) => m.type === props.sectionType).map((m) => <Module key={m._id} module={m} mutateModules={mutate}/>));
  }
  return (
    <div>
      {!error && (
        <div>
          <li key={props.sectionTitle} className={menuStatus} id="infosection" onClick={props.onClick}>{props.sectionTitle}</li>
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

