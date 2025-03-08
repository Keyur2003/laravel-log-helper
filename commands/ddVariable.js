const vscode = require('vscode');
const { getSelectedText, insertStatement } = require('../utils/editorUtils');

function ddVariable() {
    const editor = vscode.window.activeTextEditor;

    if (!editor) return;

    const { selectedText, cursorPosition, document } = getSelectedText(editor);
    let ddStatement;
    let cursorOffsetFromDdStart = -1;

    if (selectedText.trim() === '') {
        const lineText = document.lineAt(cursorPosition.line).text;
        const stringRegex = /(["'`])(?:(?=(\\?))\2.)*?\1/g;
        let isInsideString = false;

        for (let stringMatch; (stringMatch = stringRegex.exec(lineText)) !== null;) {
            const [stringContent, start, end] = [stringMatch[0], stringMatch.index, stringMatch.index + stringMatch[0].length];

            if (cursorPosition.character >= start && cursorPosition.character <= end) {
                isInsideString = true;
                ddStatement = `dd(${stringContent});`;
                break;
            }
        }

        if (!isInsideString) {
            const wordRange = document.getWordRangeAtPosition(cursorPosition, /\$[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*/);

            if (wordRange) {
                const variable = document.getText(wordRange);
                ddStatement = `dd(${variable});`;
            } else {
                ddStatement = `dd("");`;
                cursorOffsetFromDdStart = 4;
            }
        }
    } else {
        const trimmedText = selectedText.trim();
        const variableRegex = /^[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*$/;

        if (variableRegex.test(trimmedText)) {
            ddStatement = `dd($${trimmedText});`;
        } else {
            const variables = selectedText.match(/\$[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*/g) || [];

            if (variables.length > 1) {
                const variablePairs = variables.map(variable => {
                    const key = variable.slice(1); // Remove the $ to get the variable name
                    return `"${key}" => ${variable}`; // Format as "keyname" => $value
                }).join(', ');
                ddStatement = `dd([${variablePairs}]);`;
            } else if (variables.length === 1) {
                const key = variables[0].slice(1); // Remove the $ to get the variable name
                ddStatement = `dd(["${key}" => ${variables[0]}]);`;
            } else {
                ddStatement = `dd('${trimmedText}');`;
            }
        }
    }

    insertStatement(editor, ddStatement, cursorOffsetFromDdStart);
}

module.exports = ddVariable;