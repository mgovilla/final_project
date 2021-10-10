import { render } from "@testing-library/react";
import { Component } from "react";

interface props {
    title: String
}

export class ResumeListItem extends Component<any, any>{
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <div className="resumeListItem">
                <p>{this.props.title}</p>
            </div>
        )
    }

}

export class RecentResume extends Component<any, any>{
    constructor(props: any) {
        super(props);
    }
    render() {
        return (
            <div className='recentResume'>
                <div className='rectangle'/>
                <p className='recentResumeTitle'>{this.props.title}</p>
            </div>
        )
    }
}

export class AddResume extends Component<any, any>{
    constructor(props: any) {
        super(props);
    }
    render() {
        return (
            <div className='addResume'>
                <img src='imgs/addResume.png' alt='Add Resume Image' />
                <p>Add New Resume</p>
            </div>
        )
    }
  }