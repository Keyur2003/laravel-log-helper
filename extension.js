const vscode = require('vscode');

function activate(context) {
    let disposable = vscode.commands.registerCommand('laravel-log-helper.logVariable', function () {
        const editor = vscode.window.activeTextEditor;

        if (editor) {
            const selection = editor.selection;
            const selectedText = editor.document.getText(selection);

            let logStatement;

            if (selectedText.trim() === '') {
                // If nothing is selected, insert a basic log statement
                logStatement = `\\Log::info("");`;
            } else {
                // Extract all variables from the selected text
                const variableRegex = /\$[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*/g;
                const variables = selectedText.match(variableRegex) || [];

                if (variables.length > 1) {
                    // If multiple variables are found, log them as an array
                    logStatement = `\\Log::info([${variables.join(', ')}]);`;
                } else if (variables.length === 1) {
                    // If only one variable is found, log it directly
                    logStatement = `\\Log::info(${variables[0]});`;
                } else {
                    // If no variables are found, log the selected text as a string
                    logStatement = `\\Log::info('${selectedText.trim()}');`;
                }
            }

            // Get the position to insert the log statement
            const line = editor.document.lineAt(selection.start.line);
            const indentation = line.text.substring(0, line.firstNonWhitespaceCharacterIndex);

            const position = new vscode.Position(selection.end.line + 1, 0);

            // Insert the log statement with the same indentation
            editor.edit((editBuilder) => {
                editBuilder.insert(position, `${indentation}${logStatement}\n`);
            });
        }
    });

    context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
};