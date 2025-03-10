const vscode = require('vscode');

function quickLogVariable() {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        vscode.window.showErrorMessage('No active editor found');
        return;
    }

    const selection = editor.selection;
    const text = editor.document.getText(selection);

    if (!text) {
        vscode.window.showErrorMessage('Please select some code to log');
        return;
    }

    // Get the line of the end of the selection
    const endLine = selection.end.line;
    const endLineText = editor.document.lineAt(endLine).text;
    const indent = endLineText.match(/^\s*/)[0];
    
    // Create a position at the end of the line
    const endOfLine = new vscode.Position(endLine, editor.document.lineAt(endLine).range.end.character);

    editor.edit(editBuilder => {
        // Add the log statement on the next line with the same indentation
        editBuilder.insert(endOfLine, `\n${indent}\\Log::info(${text}); // Added by DebugBuddy`);
    });
}

module.exports = quickLogVariable; 