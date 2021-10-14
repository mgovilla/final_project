import React, { useCallback, useContext, useState } from 'react';
import { KeyedMutator } from 'swr';
import { ResumeContext } from '../pages/Context';
import { EndPoint } from '../util/endpoint';
import { useSWRConfig } from 'swr'
interface Props {
  module: models.Module,
  mutateModules: KeyedMutator<any>
}

export default function Module(props: Props) {
  const { resume: data } = useContext(ResumeContext)
  const { mutate } = useSWRConfig()

  // Toggle the module to be in the resume or not
  const handleToggle = useCallback(async () => {
    if (data) {
      let c = data.content.indexOf(props.module._id)
      // the id exits in the resume content
      if (c >= 0) {
        // remove it
        data.content.splice(c, 1)
        await EndPoint.updateResume(data._id, data.content)
      } else {
        // else add it
        data.content.push(props.module._id)
        await EndPoint.updateResume(data._id, data.content)
      }

      // tell SWR that we need to refresh the module data
      mutate(`/resumes/${data._id}/modules`)
    }
  }, [data, mutate, props.module._id])

  // Delete handler
  const handleDelete = useCallback(async () => {
    if (data) {
      console.log('delete module: ' + props.module._id);
      await EndPoint.deleteModule(props.module._id);
      props.mutateModules()
    }
  }, [data, props])

  return (
    <li>{props.module.title}<br /><button className="toggleButton" onClick={handleToggle}>Toggle</button><button className="deleteButton" onClick={handleDelete}>Delete</button></li>
  )
}