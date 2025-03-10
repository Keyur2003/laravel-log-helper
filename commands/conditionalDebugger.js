const vscode = require('vscode');

async function conditionalDebugger() {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        vscode.window.showErrorMessage('No active editor found');
        return;
    }

    const selection = editor.selection;
    const text = editor.document.getText(selection);

    if (!text) {
        vscode.window.showErrorMessage('Please select some code or variable to debug conditionally');
        return;
    }

    // Ask the user for the condition
    const condition = await vscode.window.showInputBox({
        prompt: 'Enter the condition for debugging (e.g., $user->id === 1)',
        placeHolder: 'Condition'
    });

    if (!condition) {
        return; // User cancelled
    }

    // Ask the user for the debug type
    const debugType = await vscode.window.showQuickPick(
        ['Log', 'Dump and Die (dd)'],
        { placeHolder: 'Select debug type' }
    );

    if (!debugType) {
        return; // User cancelled
    }

    const endLine = selection.end.line;
    const endLineText = editor.document.lineAt(endLine).text;
    const indent = endLineText.match(/^\s*/)[0];
    
    // Create a position at the end of the line
    const endOfLine = new vscode.Position(endLine, editor.document.lineAt(endLine).range.end.character);

    let debugCode = '';
    if (debugType === 'Log') {
        debugCode = `
${indent}if (${condition}) { // Conditional debug - Added by DebugBuddy
${indent}    \\Log::info('Condition met: ${condition}'); // Added by DebugBuddy
${indent}    \\Log::info(${text}); // Added by DebugBuddy
${indent}}`;
    } else {
        debugCode = `
${indent}if (${condition}) { // Conditional debug - Added by DebugBuddy
${indent}    \\Log::info('Condition met: ${condition}'); // Added by DebugBuddy
${indent}    dd(${text}); // Added by DebugBuddy
${indent}}`;
    }

    editor.edit(editBuilder => {
        // Add the conditional debug code after the selected code
        editBuilder.insert(endOfLine, debugCode);
    });
}

module.exports = conditionalDebugger; 