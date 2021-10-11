import {Schema, DOMParser, DOMSerializer} from "prosemirror-model";
const {EditorState} = require("prosemirror-state")
const {addListNodes} = require("prosemirror-schema-list")
const {schema} = require("prosemirror-schema-basic")
  
const combineContents = (contents: Array<typeof EditorState>) => {
    const div = document.createElement('div')
    
    contents.forEach((state) => {
        const content = DOMSerializer.fromSchema(schema).serializeFragment(state.doc.content)
        div.appendChild(content)
    })

    let newState = EditorState.create({doc: DOMParser.fromSchema(schema).parse(div)})

    return newState
}


export default combineContents;