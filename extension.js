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
                let variableName = selectedText.trim();

                // Add $ if it's missing and the selected text is not an array-like structure
                if (variableName && !variableName.startsWith('$')) {
                    variableName = `$${variableName}`;
                }

                // Create the log statement with the selected variable
                logStatement = `\\Log::info(${variableName});`;
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