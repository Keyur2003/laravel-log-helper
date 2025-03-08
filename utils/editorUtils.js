const vscode = require('vscode');

function getSelectedText(editor) {
    const selection = editor.selection;
    const selectedText = editor.document.getText(selection);
    const cursorPosition = selection.active;
    const document = editor.document;

    return { selectedText, cursorPosition, document };
}

function insertStatement(editor, statement, cursorOffset) {
    const selection = editor.selection;
    const line = editor.document.lineAt(selection.start.line);
    const indentation = line.text.substring(0, line.firstNonWhitespaceCharacterIndex);
    const position = new vscode.Position(selection.end.line + 1, 0);

    editor.edit((editBuilder) => {
        editBuilder.insert(position, `${indentation}${statement}\n`);
    }).then(success => {
        if (success && cursorOffset > -1) {
            const newPosition = new vscode.Position(
                position.line,
                indentation.length + cursorOffset
            );
            editor.selection = new vscode.Selection(newPosition, newPosition);
        }
    });
}

module.exports = { getSelectedText, insertStatement };