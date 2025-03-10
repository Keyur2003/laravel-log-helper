const vscode = require('vscode');

async function methodCallTracer() {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        vscode.window.showErrorMessage('No active editor found');
        return;
    }

    // Ask the user for the method name
    const methodName = await vscode.window.showInputBox({
        prompt: 'Enter the method name to trace (leave empty to trace the current method)',
        placeHolder: 'Method name (e.g., processOrder)'
    });

    if (methodName === undefined) {
        return; // User cancelled
    }

    const position = editor.selection.active;
    const lineText = editor.document.lineAt(position.line).text;
    const indent = lineText.match(/^\s*/)[0];

    let tracerCode = '';
    
    if (methodName === '') {
        // Trace the current method
        tracerCode = `
${indent}// Method call tracing - Added by DebugBuddy
${indent}\\Log::info('Method called: ' . __METHOD__ . ' with parameters: ' . json_encode(func_get_args())); // Added by DebugBuddy
${indent}$debugBuddyStartTime = microtime(true); // Added by DebugBuddy
${indent}$debugBuddyResult = null; // Added by DebugBuddy
${indent}try {
${indent}    // Your original method code here
${indent}    // Store the result in $debugBuddyResult before returning
${indent}} finally {
${indent}    \\Log::info('Method completed: ' . __METHOD__ . ' in ' . round((microtime(true) - $debugBuddyStartTime) * 1000, 2) . 'ms'); // Added by DebugBuddy
${indent}    \\Log::info('Method returned: ' . json_encode($debugBuddyResult)); // Added by DebugBuddy
${indent}}
${indent}return $debugBuddyResult; // Added by DebugBuddy`;
    } else {
        // Create a method wrapper
        tracerCode = `
${indent}// Method call tracing wrapper - Added by DebugBuddy
${indent}public function ${methodName}WithTracing(...$args) {
${indent}    \\Log::info('Method called: ${methodName} with parameters: ' . json_encode($args)); // Added by DebugBuddy
${indent}    $debugBuddyStartTime = microtime(true); // Added by DebugBuddy
${indent}    $result = $this->${methodName}(...$args);
${indent}    \\Log::info('Method completed: ${methodName} in ' . round((microtime(true) - $debugBuddyStartTime) * 1000, 2) . 'ms'); // Added by DebugBuddy
${indent}    \\Log::info('Method returned: ' . json_encode($result)); // Added by DebugBuddy
${indent}    return $result;
${indent}}`;
    }

    editor.edit(editBuilder => {
        editBuilder.insert(position, tracerCode);
    });
}

module.exports = methodCallTracer; 