const vscode = require('vscode');
const { getSelectedText, insertStatement } = require('../utils/editorUtils');

function logVariable() {
    const editor = vscode.window.activeTextEditor;

    if (editor) {
        const { selectedText, cursorPosition, document } = getSelectedText(editor);

        let logStatement;
        let cursorOffsetFromLogStart = -1;

        if (selectedText.trim() === '') {
            const lineText = document.lineAt(cursorPosition.line).text;
            const stringRegex = /(["'`])(?:(?=(\\?))\2.)*?\1/g;
            let stringMatch;
            let isInsideString = false;

            while ((stringMatch = stringRegex.exec(lineText)) !== null) {
                const start = stringMatch.index;
                const end = start + stringMatch[0].length;

                if (cursorPosition.character >= start && cursorPosition.character <= end) {
                    isInsideString = true;
                    const stringContent = stringMatch[0];
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
            const variableRegex = /^[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*$/;
            if (variableRegex.test(selectedText.trim())) {
                logStatement = `\\Log::info($${selectedText.trim()});`;
            } else {
                const variableRegex = /\$[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*/g;
                const variables = selectedText.match(variableRegex) || [];

                if (variables.length > 1) {
                    // Construct the log statement with "keyname" => $value pairs
                    const variablePairs = variables.map(variable => {
                        const key = variable.replace('$', ''); // Remove the $ to get the variable name
                        return `"${key}" => ${variable}`; // Format as "keyname" => $value
                    }).join(', ');
                    logStatement = `\\Log::info([${variablePairs}]);`;
                } else if (variables.length === 1) {
                    const key = variables[0].replace('$', ''); // Remove the $ to get the variable name
                    logStatement = `\\Log::info(["${key}" => ${variables[0]}]);`;
                } else {
                    logStatement = `\\Log::info('${selectedText.trim()}');`;
                }
            }
        }

        insertStatement(editor, logStatement, cursorOffsetFromLogStart);
    }
}

module.exports = logVariable;