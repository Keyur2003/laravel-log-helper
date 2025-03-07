const vscode = require('vscode');

function activate(context) {
    
    let disposableLog = vscode.commands.registerCommand('laravel-debug-buddy.logVariable', logVariable);

    let disposableDd = vscode.commands.registerCommand('laravel-debug-buddy.ddVariable', ddVariable);

    context.subscriptions.push(disposableLog, disposableDd);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
};

function ddVariable() {
    const editor = vscode.window.activeTextEditor;

    if (editor) {
        const selection = editor.selection;
        const selectedText = editor.document.getText(selection);

        let ddStatement;
        let cursorOffsetFromDdStart = -1; // Track where to position the cursor

        if (selectedText.trim() === '') {
            // If nothing is selected, check if the cursor is on a variable or inside a string
            const cursorPosition = selection.active;
            const document = editor.document;
            const lineText = document.lineAt(cursorPosition.line).text;

            // Check if the cursor is inside a string (enclosed by ", ', or `)
            const stringRegex = /(["'`])(?:(?=(\\?))\2.)*?\1/g;
            let stringMatch;
            let isInsideString = false;

            while ((stringMatch = stringRegex.exec(lineText)) !== null) {
                const start = stringMatch.index;
                const end = start + stringMatch[0].length;

                if (cursorPosition.character >= start && cursorPosition.character <= end) {
                    // Cursor is inside this string
                    isInsideString = true;
                    const stringContent = stringMatch[0];
                    ddStatement = `dd(${stringContent});`;
                    break;
                }
            }

            if (!isInsideString) {
                // If not inside a string, check if the cursor is on a variable
                const wordRange = document.getWordRangeAtPosition(cursorPosition, /\$[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*/);

                if (wordRange) {
                    // If the cursor is on a variable, log it
                    const variable = document.getText(wordRange);
                    ddStatement = `dd(${variable});`;
                } else {
                    // If no variable is under the cursor, insert a basic log statement
                    ddStatement = `dd("");`;
                    cursorOffsetFromDdStart = 4; // Position cursor BETWEEN quotes: "\" counts as 1 char
                }
            }
        } else {
            // Extract all variables from the selected text
            const variableRegex = /\$[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*/g;
            const variables = selectedText.match(variableRegex) || [];

            if (variables.length > 1) {
                // If multiple variables are found, log them as an array
                ddStatement = `dd([${variables.join(', ')}]);`;
            } else if (variables.length === 1) {
                // If only one variable is found, log it directly
                ddStatement = `dd(${variables[0]});`;
            } else {
                // If no variables are found, log the selected text as a string
                ddStatement = `dd('${selectedText.trim()}');`;
            }
        }

        // Get the position to insert the log statement
        const line = editor.document.lineAt(selection.start.line);
        const indentation = line.text.substring(0, line.firstNonWhitespaceCharacterIndex);

        const position = new vscode.Position(selection.end.line + 1, 0);

        // Insert the log statement with the same indentation
        editor.edit((editBuilder) => {
            editBuilder.insert(position, `${indentation}${ddStatement}\n`);
        }).then(success => {
            if (success && cursorOffsetFromDdStart > -1) {
                // If cursor needs to be placed between quotes
                const newPosition = new vscode.Position(
                    position.line, 
                    indentation.length + cursorOffsetFromDdStart
                );
                
                // Set the new cursor position
                editor.selection = new vscode.Selection(newPosition, newPosition);
            }
        });
    }
}

function logVariable() {
    const editor = vscode.window.activeTextEditor;

    if (editor) {
        const selection = editor.selection;
        const selectedText = editor.document.getText(selection);

        let logStatement;
        let cursorOffsetFromLogStart = -1; // Track where to position the cursor

        if (selectedText.trim() === '') {
            // If nothing is selected, check if the cursor is on a variable or inside a string
            const cursorPosition = selection.active;
            const document = editor.document;
            const lineText = document.lineAt(cursorPosition.line).text;

            // Check if the cursor is inside a string (enclosed by ", ', or `)
            const stringRegex = /(["'`])(?:(?=(\\?))\2.)*?\1/g;
            let stringMatch;
            let isInsideString = false;

            while ((stringMatch = stringRegex.exec(lineText)) !== null) {
                const start = stringMatch.index;
                const end = start + stringMatch[0].length;

                if (cursorPosition.character >= start && cursorPosition.character <= end) {
                    // Cursor is inside this string
                    isInsideString = true;
                    const stringContent = stringMatch[0];
                    logStatement = `\\Log::info(${stringContent});`;
                    break;
                }
            }

            if (!isInsideString) {
                // If not inside a string, check if the cursor is on a variable
                const wordRange = document.getWordRangeAtPosition(cursorPosition, /\$[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*/);

                if (wordRange) {
                    // If the cursor is on a variable, log it
                    const variable = document.getText(wordRange);
                    logStatement = `\\Log::info(${variable});`;
                } else {
                    // If no variable is under the cursor, insert a basic log statement
                    logStatement = `\\Log::info("");`;
                    cursorOffsetFromLogStart = 12; // Position cursor BETWEEN quotes: "\" counts as 1 char
                }
            }
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
        }).then(success => {
            if (success && cursorOffsetFromLogStart > -1) {
                // If cursor needs to be placed between quotes
                const newPosition = new vscode.Position(
                    position.line, 
                    indentation.length + cursorOffsetFromLogStart
                );
                
                // Set the new cursor position
                editor.selection = new vscode.Selection(newPosition, newPosition);
            }
        });
    }
}