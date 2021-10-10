import useSWR from 'swr'
import { fetcher, EndPoint } from '../util/endpoint'
import { useState, useCallback } from 'react'
import Modal from 'react-modal'
import { ResumeForm } from '../components/resumeForm'

export default function Home() {
    const { data: resumes, error, mutate } = useSWR('/resumes', fetcher('GET'))
    const [open, setOpen] = useState(false)

    var handleAdd = useCallback(async (s: string) => {
        console.log(`create new resume: ${s}`)
        await EndPoint.newResume({ title: s });
        mutate()
        // redirect to the remix page
    }, [mutate])

    var handleDelete: React.MouseEventHandler<HTMLButtonElement> = useCallback(async (e) => {
        console.log('delete new resume')
        if (resumes.length > 0) {
            await EndPoint.deleteResume(resumes[0]._id);
        }
        mutate()
        console.log(resumes)
    }, [mutate, resumes])


    Modal.setAppElement('#root');
    if (!error && !resumes) return <p>Loading</p>
    else return (
        <div>
            {!error && (
                <div>
                    <button onClick={() => setOpen(true)}>"add resume"</button>
                    <Modal isOpen={open} contentLabel="Minimal Modal Example">
                        <button onClick={() => setOpen(false)}>Close Modal</button>
                        <ResumeForm handleSubmit={handleAdd}></ResumeForm>
                    </Modal>
                    <button onClick={handleDelete}>"delete resume"</button>
                </div>
            )}
            {(!error && resumes) && <ul>{resumes.map((r: any) => <li key={r._id}>{r.title}</li>)}</ul>}
        </div>
    );
}