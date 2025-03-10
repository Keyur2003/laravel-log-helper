const vscode = require('vscode');
const { getSelectedText, insertStatement } = require('../utils/editorUtils');

function logVariable() {
    const editor = vscode.window.activeTextEditor;

    if (!editor) return;

    // Use a Set for faster lookups of excluded variables
    const excludedVariables = new Set(['$this']); // Add more as needed

    const { selectedText, cursorPosition, document } = getSelectedText(editor);
    let logStatement;
    let cursorOffsetFromLogStart = -1;

    if (selectedText.trim() === '') {
        const lineText = document.lineAt(cursorPosition.line).text;
        const stringRegex = /(["'`])(?:(?=(\\?))\2.)*?\1/g;
        let isInsideString = false;

        for (let stringMatch; (stringMatch = stringRegex.exec(lineText)) !== null;) {
            const stringContent = stringMatch[0];
            const start = stringMatch.index;
            const end = start + stringContent.length;

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
                // Skip logging if the variable is in the excluded list
                if (excludedVariables.has(variable)) {
                    return;
                }
                logStatement = `\\Log::info(${variable}); // Added by DebugBuddy`;
            } else {
                logStatement = `\\Log::info(""); // Added by DebugBuddy`;
                cursorOffsetFromLogStart = 12;
            }
        }
    } else {
        const trimmedText = selectedText.trim();
        const variableRegex = /^\$[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*$/;
        const variableNameRegex = /^[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*$/;

        if (variableRegex.test(trimmedText)) {
            logStatement = `\\Log::info(${trimmedText}); // Added by DebugBuddy`;
        } else if (variableNameRegex.test(trimmedText)) {
            // If the selected text is a valid variable name (without $), prepend $ to it
            const variable = `$${trimmedText}`;
            if (excludedVariables.has(variable)) {
                return;
            }
            logStatement = `\\Log::info(${variable}); // Added by DebugBuddy`;
        } else {
            const variables = selectedText.match(/\$[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*/g) || [];

            // Filter out excluded variables and use a Set to filter out duplicates
            const uniqueVariables = new Set(variables.filter(variable => !excludedVariables.has(variable)));

            if (uniqueVariables.size > 1) {
                const variablePairs = Array.from(uniqueVariables).map(variable => {
                    const key = variable.slice(1); // Remove the $ to get the variable name
                    return `"${key}" => ${variable}`; // Format as "keyname" => $value
                }).join(', ');
                logStatement = `\\Log::info([${variablePairs}]); // Added by DebugBuddy`;
            } else if (uniqueVariables.size === 1) {
                const [variable] = uniqueVariables; // Destructure to get the first (and only) variable
                const key = variable.slice(1); // Remove the $ to get the variable name
                logStatement = `\\Log::info(["${key}" => ${variable}]); // Added by DebugBuddy`;
            } else {
                logStatement = `\\Log::info('${trimmedText}'); // Added by DebugBuddy`;
            }
        }
    }

    insertStatement(editor, logStatement, cursorOffsetFromLogStart);
}

module.exports = logVariable;
