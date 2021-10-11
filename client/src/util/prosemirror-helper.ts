import EditorState from "prosemirror-state"
import {Schema ,DOMParser, DOMSerializer} from "prosemirror-model";
import {addListNodes} from "prosemirror-schema-list"
import {schema} from "prosemirror-schema-basic"

const mySchema = new Schema({
    nodes: addListNodes(schema.spec.nodes, "paragraph block*", "block"),
    marks: schema.spec.marks
  })

const combineContents = (contents: Array<EditorState.EditorState>) => {
    const div = document.createElement('div')
    
    contents.forEach((state) => {
        const content = DOMSerializer.fromSchema(schema).serializeFragment(state.doc.content)
        div.appendChild(content)
    })

    let newState = EditorState.EditorState.create({doc: DOMParser.fromSchema(schema).parse(div)})

    return newState
}


export default combineContents;