import { ComponentItem, Toolbar, FloatingToolbar, ToolbarItemUnion } from "@remirror/react";

// Code copied from the WYSIWYG editor example
// Floaring toolbars include the bold, italics, underline, strikethrough, and code
var floatingToolbarItems = [{
    type: ComponentItem.ToolbarGroup,
    label: 'Simple Formatting',
    items: [{
        type: ComponentItem.ToolbarCommandButton,
        commandName: 'toggleBold',
        display: 'icon'
    }, {
        type: ComponentItem.ToolbarCommandButton,
        commandName: 'toggleItalic',
        display: 'icon'
    }, {
        type: ComponentItem.ToolbarCommandButton,
        commandName: 'toggleUnderline',
        display: 'icon'
    }, {
        type: ComponentItem.ToolbarCommandButton,
        commandName: 'toggleStrike',
        display: 'icon'
    }, {
        type: ComponentItem.ToolbarCommandButton,
        commandName: 'toggleCode',
        display: 'icon'
    }]
}];

/**
 * Bubble menu for the pre-packaged editors
 */
var BubbleMenu = () => {
    return <FloatingToolbar items={floatingToolbarItems as ToolbarItemUnion[]} positioner={"selection"} placement={"bottom"}></FloatingToolbar>
};

// Toolbar items
var toolbarItems = [{
    type: ComponentItem.ToolbarGroup,
    label: 'History',
    items: [{
        type: ComponentItem.ToolbarCommandButton,
        commandName: 'undo',
        display: 'icon'
    }, {
        type: ComponentItem.ToolbarCommandButton,
        commandName: 'redo',
        display: 'icon'
    }, {
        type: ComponentItem.ToolbarCommandButton,
        commandName: 'toggleColumns',
        display: 'icon',
        attrs: {
            count: 2
        }
    }],
    separator: 'end'
}, {
    type: ComponentItem.ToolbarGroup,
    label: 'Clipboard',
    items: [{
        type: ComponentItem.ToolbarCommandButton,
        commandName: 'copy',
        display: 'icon'
    }, {
        type: ComponentItem.ToolbarCommandButton,
        commandName: 'cut',
        display: 'icon'
    }, {
        type: ComponentItem.ToolbarCommandButton,
        commandName: 'paste',
        display: 'icon'
    }],
    separator: 'end'
}, {
    type: ComponentItem.ToolbarGroup,
    label: 'Heading Formatting',
    items: [{
        type: ComponentItem.ToolbarCommandButton,
        commandName: 'toggleHeading',
        display: 'icon',
        attrs: {
            level: 1
        }
    }, {
        type: ComponentItem.ToolbarCommandButton,
        commandName: 'toggleHeading',
        display: 'icon',
        attrs: {
            level: 2
        }
    }, {
        type: ComponentItem.ToolbarCommandButton,
        commandName: 'toggleHeading',
        display: 'icon',
        attrs: {
            level: 3
        }
    }],
    separator: 'end'
}, {
    type: ComponentItem.ToolbarGroup,
    label: 'Simple Formatting',
    items: [{
        type: ComponentItem.ToolbarCommandButton,
        commandName: 'toggleBold',
        display: 'icon'
    }, {
        type: ComponentItem.ToolbarCommandButton,
        commandName: 'toggleItalic',
        display: 'icon'
    }, {
        type: ComponentItem.ToolbarCommandButton,
        commandName: 'toggleUnderline',
        display: 'icon'
    }],
    separator: 'end'
}, {
    type: ComponentItem.ToolbarGroup,
    label: 'Lists',
    items: [{
        type: ComponentItem.ToolbarCommandButton,
        commandName: 'toggleBulletList',
        display: 'icon'
    }, {
        type: ComponentItem.ToolbarCommandButton,
        commandName: 'toggleOrderedList',
        display: 'icon'
    }, {
        type: ComponentItem.ToolbarCommandButton,
        commandName: 'toggleTaskList',
        display: 'icon'
    }, {
        type: ComponentItem.ToolbarCommandButton,
        commandName: 'createTable',
        display: 'icon'
    }],
    separator: 'none'
}];

var TopToolbar = () => {
    return <Toolbar items={toolbarItems as ToolbarItemUnion[]} refocusEditor={true} label={"Top Toolbar"}></Toolbar>
};

export {
    BubbleMenu,
    TopToolbar
}
