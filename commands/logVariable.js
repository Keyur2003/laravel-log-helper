const vscode = require('vscode');
const { getSelectedText, insertStatement } = require('../utils/editorUtils');

function logVariable() {
    const editor = vscode.window.activeTextEditor;

    if (!editor) return;

    const { selectedText, cursorPosition, document } = getSelectedText(editor);
    let logStatement;
    let cursorOffsetFromLogStart = -1;

    if (selectedText.trim() === '') {
        const lineText = document.lineAt(cursorPosition.line).text;
        const stringRegex = /(["'`])(?:(?=(\\?))\2.)*?\1/g;
        let isInsideString = false;

        for (let stringMatch; (stringMatch = stringRegex.exec(lineText)) !== null;) {
            const [stringContent, start, end] = [stringMatch[0], stringMatch.index, stringMatch.index + stringMatch[0].length];

            if (cursorPosition.character >= start && cursorPosition.character <= end) {
                isInsideString = true;
                logStatement = `\\Log::info(${stringContent});`;
                break;
            }
        }

        if (!isInsideString) {
            const wordRange = document.getWordRangeAtPosition(cursorPosition, /\$[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*/);

            if (wordRange) {
                const variable = document.getText(wordRange);
                logStatement = `\\Log::info(${variable});`;
            } else {
                logStatement = `\\Log::info("");`;
                cursorOffsetFromLogStart = 12;
            }
        }
    } else {
        const trimmedText = selectedText.trim();
        const variableRegex = /^[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*$/;

        if (variableRegex.test(trimmedText)) {
            logStatement = `\\Log::info($${trimmedText});`;
        } else {
            const variables = selectedText.match(/\$[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*/g) || [];

            if (variables.length > 1) {
                const variablePairs = variables.map(variable => {
                    const key = variable.slice(1); // Remove the $ to get the variable name
                    return `"${key}" => ${variable}`; // Format as "keyname" => $value
                }).join(', ');
                logStatement = `\\Log::info([${variablePairs}]);`;
            } else if (variables.length === 1) {
                const key = variables[0].slice(1); // Remove the $ to get the variable name
                logStatement = `\\Log::info(["${key}" => ${variables[0]}]);`;
            } else {
                logStatement = `\\Log::info('${trimmedText}');`;
            }
        }
    }

    insertStatement(editor, logStatement, cursorOffsetFromLogStart);
}

module.exports = logVariable;