const {EditorState} = require("prosemirror-state")
import {Schema, DOMParser, DOMSerializer} from "prosemirror-model";
const {addListNodes} = require("prosemirror-schema-list")
const {schema} = require("prosemirror-schema-basic")

//I don't know if this is actually needed
//
// const mySchema = new Schema({
//     nodes: addListNodes(schema.spec.nodes, "paragraph block*", "block"),
//     marks: schema.spec.marks
//   })
  
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