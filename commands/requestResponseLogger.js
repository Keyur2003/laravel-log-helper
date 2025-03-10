const vscode = require('vscode');

async function requestResponseLogger() {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        vscode.window.showErrorMessage('No active editor found');
        return;
    }

    // Ask the user what they want to log
    const logType = await vscode.window.showQuickPick(
        ['Request', 'Response', 'Both'],
        { placeHolder: 'What do you want to log?' }
    );

    if (!logType) {
        return; // User cancelled
    }

    const position = editor.selection.active;
    const lineText = editor.document.lineAt(position.line).text;
    const indent = lineText.match(/^\s*/)[0];

    let logCode = '';

    if (logType === 'Request' || logType === 'Both') {
        logCode += `
${indent}// Log request data
${indent}\\Log::info('Request URL: ' . request()->url()); // Added by DebugBuddy
${indent}\\Log::info('Request Method: ' . request()->method()); // Added by DebugBuddy
${indent}\\Log::info('Request Headers: ' . json_encode(request()->headers->all())); // Added by DebugBuddy
${indent}\\Log::info('Request Body: ' . json_encode(request()->all())); // Added by DebugBuddy`;
    }

    if (logType === 'Response' || logType === 'Both') {
        logCode += `
${indent}// Log response data (add this before returning the response)
${indent}\\Log::info('Response Status: ' . $response->status()); // Added by DebugBuddy
${indent}\\Log::info('Response Headers: ' . json_encode($response->headers->all())); // Added by DebugBuddy
${indent}\\Log::info('Response Body: ' . json_encode($response->getContent())); // Added by DebugBuddy`;
    }

    editor.edit(editBuilder => {
        editBuilder.insert(position, logCode);
    });
}

module.exports = requestResponseLogger; 