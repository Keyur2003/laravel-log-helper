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
        vscode.window.showErrorMessage('Please select some text to log');
        return;
    }

    const position = selection.end;
    const indent = editor.document.lineAt(position.line).text.match(/^\s*/)[0];

    editor.edit(editBuilder => {
        editBuilder.insert(position, `\n${indent}// added by debugbuddy\n${indent}\\Log::info(${text});`);
    });
}

module.exports = quickLogVariable; 