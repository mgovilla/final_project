import useSWR from 'swr'
import { fetcher, EndPoint } from '../util/endpoint'
import { useState, useCallback } from 'react'
import Modal from 'react-modal'
import { ResumeForm } from '../components/ResumeForm'
import { Link } from 'react-router-dom'
import deleteIcon from '../images/deleteIcon.png'
import addIcon from '../images/addResume.png'
import { HomeNavBar } from '../components/NavigationBar'
import './Home.css'


export default function Home() {
    const { data: resumes, error, mutate } = useSWR('/resumes', fetcher('GET'))
    const [open, setOpen] = useState(false)

    var handleAdd = useCallback(async (s: string) => {
        console.log(`create new resume: ${s}`)
        setOpen(false)
        await EndPoint.newResume({ title: s, content: [] });
        mutate()
        // redirect to the remix page
    }, [mutate])

    var handleDelete: React.MouseEventHandler<HTMLButtonElement> = useCallback(async (e) => {
        console.log('delete resume: ' + e.currentTarget.getAttribute('id'))
        if (resumes.length > 0) {
            var i: string = e.currentTarget.getAttribute('id') || '0'
            await EndPoint.deleteResume(resumes[parseInt(i)]._id);
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
                    <HomeNavBar />
                    <div className='header'>
                        <h1>Your Resumes</h1>
                        <button className='addResume' onClick={() => setOpen(true)}>
                            Add Resume
                        </button>
                    </div>
                    <Modal isOpen={open} contentLabel="Minimal Modal Example">
                        <button onClick={() => setOpen(false)}>
                            <img src={deleteIcon} alt='close' />
                        </button>
                        <h1>New Resume Name</h1>
                        <ResumeForm handleSubmit={handleAdd}></ResumeForm>
                    </Modal>
                </div>
            )}

            {(!error && resumes) && <ul className='resumeList'>{resumes.map((r: any, i: any) =>
                <li key={r._id} className="resumeListItem">
                    <Link to={`/remix/${r._id}`}>{r.title}</Link>
                    <button className='deleteBtn' id={i} onClick={handleDelete}><img src={deleteIcon} /></button>
                </li>)}</ul>}
        </div>
    );
}