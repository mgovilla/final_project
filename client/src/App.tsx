import React from 'react';
import logo from './logo.svg';
import './App.css';
import { NavBar } from './components/NavBar';
import { AddResume, RecentResume, ResumeListItem } from './components/Files'

function App() {
  return (
    <div className="App">
      <NavBar/>
      <div className="RecentSection">
        <h1>Recent</h1> 
        <div className='recentResumeList'>
          <AddResume/>
          <RecentResume title='Recent Resume 1'/>
        </div>
      </div>
      <div className="ResumeList">
        <h1>Resumes</h1>
        <ResumeListItem title='Resume 1'/>
        <ResumeListItem title='Resume 1'/>
        <ResumeListItem title='Resume 1'/>
        <ResumeListItem title='Resume 1'/>

      </div>
      
        
    </div>
  );
}

export default App;
