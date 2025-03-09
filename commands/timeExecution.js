const vscode = require('vscode');

function timeExecution() {
    const editor = vscode.window.activeTextEditor;
    if (!editor) return;
    const { selection, document } = editor;
    const selectedText = document.getText(selection);
    if (!selectedText.trim()) {
        vscode.window.showErrorMessage('Please select a code block to calculate the time of its execution.');
        return;
    }
    
    // Get the indentation of the first and last lines of the selected code
    const firstLine = document.lineAt(selection.start.line);
    const lastLine = document.lineAt(selection.end.line);
    const firstLineIndentation = firstLine.text.match(/^\s*/)[0];
    const lastLineIndentation = lastLine.text.match(/^\s*/)[0];
    
    // Store the original start line (we'll need this to reposition the cursor)
    const originalStartLine = selection.start.line;
    
    // Generate the timing code with the appropriate indentation
    const startTimeCode = `${firstLineIndentation}$debugBuddyStartTime = microtime(true); // Added by DebugBuddy\n`;
    const endTimeCode = `\n${lastLineIndentation}\\Log::info("Execution time: " . round((microtime(true) - $debugBuddyStartTime) * 1000, 2) . "ms"); // Added by DebugBuddy`;
    
    // Insert the start time code at the beginning of the selection
    const startPosition = new vscode.Position(selection.start.line, 0);
    
    editor.edit(editBuilder => {
        editBuilder.insert(startPosition, startTimeCode);
    }).then(() => {
        // Make sure we get the updated document after first edit
        const updatedSelection = editor.selection;
        const updatedDocument = editor.document;
        
        // Get the exact line of the end of the selection
        const endLine = updatedSelection.end.line;
        // Get position at the end of that line
        const lineEndPosition = updatedDocument.lineAt(endLine).range.end;
        
        editor.edit(editBuilder => {
            // Insert at the end of the line
            editBuilder.insert(lineEndPosition, endTimeCode);
        }).then(() => {
            // After both edits are complete, reposition the cursor
            // The start line is now originalStartLine + 1 (because we inserted a line above)
            const newLine = originalStartLine + 1;
            // Get the first non-whitespace character in the line
            const firstNonWhitespaceCharacterIndex = document.lineAt(newLine).firstNonWhitespaceCharacterIndex;
            // Create a new position at the start of the code (after indentation)
            const newPosition = new vscode.Position(newLine, firstNonWhitespaceCharacterIndex);
            // Create a new selection that's just a cursor at the new position (deselects the code)
            const newSelection = new vscode.Selection(newPosition, newPosition);
            // Set the new selection/cursor position
            editor.selection = newSelection;
            // Make sure the editor reveals this position
            editor.revealRange(new vscode.Range(newPosition, newPosition));
        });
    });
}

module.exports = timeExecution;