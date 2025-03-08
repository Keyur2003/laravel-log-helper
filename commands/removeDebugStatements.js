const vscode = require('vscode');

function removeDebugStatements() {
    const editor = vscode.window.activeTextEditor;

    if (!editor) return;

    const document = editor.document;
    const text = document.getText();

    // Regular expressions to match debug statements
    const debugPatterns = [
        /(\s*)\\?Log::info\([^;]*\);?\s*/g, // Matches \Log::info() or Log::info()
        /(\s*)dd\([^;]*\);?\s*/g, // Matches dd()
        /(\s*)\$debugBuddyStartTime\s*=\s*now\(\);\s*/g, // Matches $debugBuddyStartTime = now();
        /(\s*)\\?Log::info\("Execution time: " \. now\(\)->diffInMilliseconds\(\$debugBuddyStartTime\) \. "ms"\);\s*/g, // Matches \Log::info("Execution time: ...")
    ];

    // Split the text into lines
    const lines = text.split('\n');
    const linesToRemove = new Set();

    // Process each line to remove debug statements while preserving formatting
    const newLines = lines.map((line, index) => {
        const originalLine = line;

        debugPatterns.forEach((regex) => {
            line = line.replace(regex, (match, indentation) => {
                if (originalLine.trim() === match.trim()) {
                    linesToRemove.add(index);
                    return '';
                }
                return indentation;
            });
        });

        return line;
    });

    // Remove lines that became empty due to debug statement removal
    const finalLines = newLines.filter((line, index) => {
        return !linesToRemove.has(index) || line.trim() !== '';
    });

    // Join the lines back together
    const newText = finalLines.join('\n');

    // Apply the changes to the document
    editor.edit((editBuilder) => {
        const firstLine = document.lineAt(0);
        const lastLine = document.lineAt(document.lineCount - 1);
        const textRange = new vscode.Range(firstLine.range.start, lastLine.range.end);
        editBuilder.replace(textRange, newText);
    });
}

module.exports = removeDebugStatements;