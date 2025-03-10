const vscode = require('vscode');

function exceptionCatcher() {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        vscode.window.showErrorMessage('No active editor found');
        return;
    }

    const selection = editor.selection;
    const text = editor.document.getText(selection);

    if (!text) {
        vscode.window.showErrorMessage('Please select some code to wrap with exception handling');
        return;
    }

    // Get the indentation of the selected code
    const startLine = selection.start.line;
    const startLineText = editor.document.lineAt(startLine).text;
    const indent = startLineText.match(/^\s*/)[0];
    
    // Add one level of indentation for the code inside the try block
    const innerIndent = indent + '    ';
    
    // Indent each line of the selected text
    const indentedText = text.split('\n').map(line => {
        // If the line is not empty, add the inner indentation
        if (line.trim() !== '') {
            return innerIndent + line.trim();
        }
        return line;
    }).join('\n');

    // Create the try-catch block
    const tryCatchBlock = `${indent}try {
${indentedText}
${indent}} catch (\\Exception $e) {
${indent}    \\Log::error('Exception caught: ' . $e->getMessage()); // Added by DebugBuddy
${indent}    \\Log::error('File: ' . $e->getFile() . ' Line: ' . $e->getLine()); // Added by DebugBuddy
${indent}    \\Log::error('Stack trace: ' . $e->getTraceAsString()); // Added by DebugBuddy
${indent}    // Handle the exception as needed
${indent}}`;

    editor.edit(editBuilder => {
        // Replace the selected code with the try-catch block
        editBuilder.replace(selection, tryCatchBlock);
    });
}

module.exports = exceptionCatcher; 