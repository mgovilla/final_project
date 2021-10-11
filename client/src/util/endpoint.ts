declare function fetch(input: RequestInfo, init?: RequestInit): Promise<Response>;

// getters
const fetcher = (method: 'POST' | 'GET') => (
  input: RequestInfo,
  init: RequestInit,
  ...args: any[]
) => fetch(input, { method, credentials: 'include', headers: { 'Content-Type': 'application/json' } }).then(res => res.json());

class EndPoint {

  //gets all resumes for the logged in user
  async getResumes() {
    let response = await fetch('/resumes', { credentials: 'include', headers: { 'Content-Type': 'application/json' } })
    let resumes = await response.json()

    return resumes
  }

  //gets the resume specified by resume ID
  async getResume(resumeID: string) {
    let response = await fetch(`/resumes/${resumeID}`, { credentials: 'include', headers: { 'Content-Type': 'application/json' } })
    let resume = await response.json()

    return resume
  }

  //creates a new resume
  static async newResume(resume: any) {
    let response = await fetch('/resumes', { credentials: 'include', method: 'POST', body: JSON.stringify(resume), headers: { 'Content-Type': 'application/json' } })
    let newResume = await response.json()

    return newResume
  }

  //updates existing resume by passing in the resume id and the content
  static async updateResume(resumeID: string, content: Array<string>) {
    await fetch(`/resumes/${resumeID}`, { credentials: 'include', method: 'POST', body: JSON.stringify({ content: content }), headers: { 'Content-Type': 'application/json' } })
  }

  //delete a resume using the resume ID
  static async deleteResume(resumeID: string) {
    let response = await fetch(`/resumes/${resumeID}`, { credentials: 'include', method: 'DELETE', headers: { 'Content-Type': 'application/json' } })

    return response
  }

  //get all modules linked to a specified resume
  static async getModules(resumeID: string) {
    let response = await fetch(`/resumes/${resumeID}/modules`, { credentials: 'include', headers: { 'Content-Type': 'application/json' } })
    let modules = await response.json()

    return modules
  }

  //delete a resume using the resume ID
  static async deleteModule(resumeID: string) {
    let response = await fetch(`/modules/${resumeID}`, { credentials: 'include', method: 'DELETE', headers: { 'Content-Type': 'application/json' } })

    return response
  }

  //create a new module
  static async newModule(module: any) {
    let response = await fetch('/modules', { credentials: 'include', method: 'POST', body: JSON.stringify(module), headers: { 'Content-Type': 'application/json' } })
    let newModule = await response.json()

    return newModule
  }
  
}

export {
  fetcher,
  EndPoint
}