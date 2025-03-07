const vscode = require('vscode');

function activate(context) {
    let disposable = vscode.commands.registerCommand('laravel-log-helper.logVariable', function () {
        const editor = vscode.window.activeTextEditor;

        if (editor) {
            const selection = editor.selection;
            const selectedText = editor.document.getText(selection);

            let logStatements = [];

            if (selectedText.trim() === '') {
                // If nothing is selected, log an empty statement
                logStatements.push(`\\Log::info("");`);
            } else {
                // Split the selected text by commas and trim each variable
                const variables = selectedText.split(',').map(v => v.trim());

                // Process each variable
                variables.forEach(variable => {
                    let variableName = variable.trim();

                    // Add $ if it's missing and the selected text is not an array-like structure
                    if (!variableName.startsWith('$') && !variableName.startsWith('[')) {
                        variableName = `$${variableName}`;
                    }

                    // Create the log statement for the variable
                    logStatements.push(`\\Log::info('${variableName}: ', ${variableName});`);
                });
            }

            // Get the current cursor position
            const cursorPosition = selection.active;

            // Find the end of the current scope
            const endOfScopePosition = findEndOfScope(editor.document, cursorPosition);

            // Get the indentation of the current scope
            const line = editor.document.lineAt(endOfScopePosition.line);
            const indentation = line.text.substring(0, line.firstNonWhitespaceCharacterIndex);

            // Insert the log statements just before the end of the scope
            const insertPosition = new vscode.Position(endOfScopePosition.line, 0);

            editor.edit((editBuilder) => {
                logStatements.forEach(logStatement => {
                    editBuilder.insert(insertPosition, `${indentation}${logStatement}\n`);
                });
            });
        }
    });

    context.subscriptions.push(disposable);
}

function deactivate() {}

/**
 * Finds the end of the current scope in PHP code (e.g., the closing brace) based on the cursor position.
 * @param {vscode.TextDocument} document - The active text document.
 * @param {vscode.Position} cursorPosition - The current cursor position.
 * @returns {vscode.Position} - The position of the end of the current scope.
 */
function findEndOfScope(document, cursorPosition) {
    let depth = 0;
    let line = cursorPosition.line;

    // Start from the current line and search downwards
    while (line < document.lineCount) {
        const text = document.lineAt(line).text;

        // Count opening and closing braces to determine scope depth
        for (let i = 0; i < text.length; i++) {
            if (text[i] === '{') {
                depth++;
            } else if (text[i] === '}') {
                depth--;
                if (depth === 0) {
                    // Found the end of the current scope
                    return new vscode.Position(line, i);
                }
            }
        }

        line++;
    }

    // If no scope is found, return the end of the document
    return new vscode.Position(document.lineCount - 1, 0);
}

module.exports = {
    activate,
    deactivate
};