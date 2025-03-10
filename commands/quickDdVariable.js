const vscode = require('vscode');

function quickDdVariable() {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        vscode.window.showErrorMessage('No active editor found');
        return;
    }

    const selection = editor.selection;
    const text = editor.document.getText(selection);

    if (!text) {
        vscode.window.showErrorMessage('Please select some code to dump');
        return;
    }

    // Get the line of the end of the selection
    const endLine = selection.end.line;
    const endLineText = editor.document.lineAt(endLine).text;
    const indent = endLineText.match(/^\s*/)[0];
    
    // Create a position at the end of the line
    const endOfLine = new vscode.Position(endLine, editor.document.lineAt(endLine).range.end.character);

    editor.edit(editBuilder => {
        // Add the dd statement on the next line with the same indentation
        editBuilder.insert(endOfLine, `\n${indent}dd(${text}); // Added by DebugBuddy`);
    });
}

module.exports = quickDdVariable; 