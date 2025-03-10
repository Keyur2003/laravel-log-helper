const vscode = require('vscode');

function queryLogger() {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        vscode.window.showErrorMessage('No active editor found');
        return;
    }

    const selection = editor.selection;
    const text = editor.document.getText(selection);

    if (!text) {
        vscode.window.showErrorMessage('Please select some code to add query logging');
        return;
    }

    // Get the line of the end of the selection
    const endLine = selection.end.line;
    const endLineText = editor.document.lineAt(endLine).text;
    const indent = endLineText.match(/^\s*/)[0];
    
    // Create a position at the end of the line
    const endOfLine = new vscode.Position(endLine, editor.document.lineAt(endLine).range.end.character);

    // Create the query logging code
    const queryLoggerCode = `
${indent}// Start query logging
${indent}\\DB::listen(function($query) {
${indent}    $bindings = $query->bindings;
${indent}    $sql = $query->sql;
${indent}    foreach ($bindings as $i => $binding) {
${indent}        if ($binding instanceof \\DateTime) {
${indent}            $bindings[$i] = $binding->format('Y-m-d H:i:s');
${indent}        } elseif (is_string($binding)) {
${indent}            $bindings[$i] = "'{$binding}'";
${indent}        }
${indent}    }
${indent}    $sql = str_replace(['%', '?'], ['%%', '%s'], $sql);
${indent}    $sql = vsprintf($sql, $bindings);
${indent}    \\Log::info("Query: {$sql} | Time: {$query->time}ms"); // Added by DebugBuddy
${indent}});
${indent}// End query logging`;

    editor.edit(editBuilder => {
        // Add the query logger code before the selected code
        const startLine = selection.start.line;
        const startPosition = new vscode.Position(startLine, 0);
        editBuilder.insert(startPosition, queryLoggerCode + '\n\n');
    });
}

module.exports = queryLogger; 