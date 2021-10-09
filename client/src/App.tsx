import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  // change when going to production
  let uri = encodeURI(`https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID_LOCAL}&redirect_uri=${process.env.REACT_APP_GITHUB_CALLBACK}`)

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href={uri}
          rel="noreferrer"
        >
          Basic Login
        </a>
      </header>
    </div>
  );
}

async function getResumes() {
  let response = await fetch('/resumes', {credentials: 'include', headers: {'Content-Type': 'application/json'}})
  let resumes = await response.json()
  
  console.log(resumes)
  return resumes
}

async function getResume(resumeID: string) {
  let response = await fetch(`/resumes/${resumeID}`, {credentials: 'include', headers: {'Content-Type': 'application/json'}})
  let resume = await response.json()
  
  console.log(resume)
  return resume
}

async function newResume(resume: any) {
  let response = await fetch('/resumes', {credentials: 'include', method: 'POST', body: JSON.stringify(resume), headers: {'Content-Type': 'application/json'}})
  let newResume = await response.json()
  
  console.log(newResume)
  return newResume
}

async function updateResume(resumeID: string, content: any) {
  let response = await fetch(`/resumes/${resumeID}`, {credentials: 'include', method: 'POST', body: JSON.stringify({content: content}), headers: {'Content-Type': 'application/json'}})
  let resume = await response.json()
  
  console.log(resume)
  return resume
}

async function deleteResume(resumeID: string) {
  let response = await fetch(`/resumes/${resumeID}`, {credentials: 'include', method: 'DELETE', headers: {'Content-Type': 'application/json'}})
  return response
}


async function getModules(resumeID: string) {
  let response = await fetch(`/modules/${resumeID}`, {credentials: 'include', headers: {'Content-Type': 'application/json'}})
  let modules = await response.json()

  console.log(modules)
  return modules
}

async function newModule(module: any) {
  let response = await fetch('/modules', {credentials: 'include', method: 'POST', body: JSON.stringify(module), headers: {'Content-Type': 'application/json'}})
  let newModule = await response.json()
  
  console.log(newModule)
  return newModule
}


export default App;
