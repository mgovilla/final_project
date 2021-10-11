import React, { useCallback, useContext } from 'react';
import { ResumeContext } from '../pages/Context';
import { EndPoint } from '../util/endpoint';

interface Props {
  module: models.Module
}

export default function Module(props: Props) {
  const { data, mutate } = useContext(ResumeContext)

  // Toggle the module to be in the resume or not
  const handleToggle = useCallback(async () => {
    if (data) {
      let c = data[0].content.indexOf(props.module._id)
      // the id exits in the resume content
      if (c >= 0) {
        // remove it
        data[0].content.splice(c, 1)
        await EndPoint.updateResume(data[0]._id, data[0].content)
      } else {
        // else add it
        data[0].content.push(props.module._id)
        await EndPoint.updateResume(data[0]._id, data[0].content)
      }

      mutate && mutate()
      console.log(data[0])
    }
  }, [data, mutate, props.module._id])

  // Delete handler
  const handleDelete = useCallback(async () => {
    if (data) {
      console.log('delete module: ' + props.module._id);
      await EndPoint.deleteModule(props.module._id);
      mutate && mutate()
    }
  }, [data, mutate, props.module._id])

  return (
    <li>{props.module.title}<br /><button className="toggleButton" onClick={handleToggle}>Toggle</button><button className="deleteButton" onClick={handleDelete}>Delete</button></li>
  )
}