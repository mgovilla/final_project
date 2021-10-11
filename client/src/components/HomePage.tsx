import { render } from "@testing-library/react";
import { Component } from "react";

export class AddResume extends Component<any, any>{
    constructor(props: any) {
        super(props);
    }
    render() {
        return (
            <button className='addResume'>
                <img src='../images/addResume.png' alt='Add Resume Image' />
                <p>Add New Resume</p>
            </button>
        )
    }
  }