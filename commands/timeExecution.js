const vscode = require('vscode');

function timeExecution() {
    const editor = vscode.window.activeTextEditor;

    if (editor) {
        const selection = editor.selection;
        const selectedText = editor.document.getText(selection);

        if (!selectedText.trim()) {
            vscode.window.showErrorMessage('Please select a code block to calculate the time of its execution.');
            return;
        }

        // Get the indentation of the first line of the selected code
        const firstLine = editor.document.lineAt(selection.start.line);
        const firstLineIndentation = firstLine.text.match(/^\s*/)[0];

        // Get the indentation of the last line of the selected code
        const lastLine = editor.document.lineAt(selection.end.line);
        const lastLineIndentation = lastLine.text.match(/^\s*/)[0];

        // Generate the timing code with the appropriate indentation
        const startTimeCode = `${firstLineIndentation}$debugBuddyStartTime = now();\n`;
        const endTimeCode = `${lastLineIndentation}\\Log::info("Execution time: " . now()->diffInMilliseconds($debugBuddyStartTime) . "ms");\n`;

        // Insert the start time code at the beginning of the selection
        const startPosition = new vscode.Position(selection.start.line, 0);
        editor.edit(editBuilder => {
            editBuilder.insert(startPosition, startTimeCode);
        }).then(() => {
            // Calculate the correct position for the end time code
            const document = editor.document;
            let endLine = selection.end.line;

            // If the selection ends in the middle of a line, move to the next line
            if (!selection.end.isEqual(document.lineAt(endLine).range.end)) {
                endLine += 1;
            }

            // Insert the end time code **below the selected block**
            const endPosition = new vscode.Position(endLine + 1, 0);
            editor.edit(editBuilder => {
                editBuilder.insert(endPosition, endTimeCode);
            });
        });
    }
}

module.exports = timeExecution;