const vscode = require('vscode');

function removeDebugStatements() {
    const editor = vscode.window.activeTextEditor;

    if (!editor) return;

    const document = editor.document;
    const text = document.getText();

    // Regular expressions to match debug statements
    const debugPatterns = [
        // Matches \Log::info() or Log::info() with the comment (both uppercase and lowercase formats)
        /(\s*)\\?Log::info\([^;]*\);?\s*\/\/\s*Added by DebugBuddy/g,
        /(\s*)\\?Log::info\([^;]*\);?\s*\/\/\s*added by debugbuddy/g,
        
        // Matches dd() with the comment (both uppercase and lowercase formats)
        /(\s*)dd\([^;]*\);?\s*\/\/\s*Added by DebugBuddy/g,
        /(\s*)dd\([^;]*\);?\s*\/\/\s*added by debugbuddy/g,
        
        // Matches dd() without comment (for backward compatibility)
        /(\s*)dd\([^;]*\);?\s*/g,
        
        // Matches $debugBuddyStartTime = microtime(true); with the comment
        /(\s*)\$debugBuddyStartTime\s*=\s*microtime\s*\(\s*true\s*\);\s*\/\/\s*Added by DebugBuddy/g,
        /(\s*)\$debugBuddyStartTime\s*=\s*microtime\s*\(\s*true\s*\);\s*\/\/\s*added by debugbuddy/g,
        
        // Matches \Log::info("Execution time: ...") with the comment
        /(\s*)\\?Log::info\("Execution time: " \. round\(\s*\(\s*microtime\(\s*true\s*\)\s*-\s*\$debugBuddyStartTime\s*\)\s*\*\s*1000,\s*2\s*\)\s*\.\s*"ms"\s*\);?\s*\/\/\s*Added by DebugBuddy/g,
        /(\s*)\\?Log::info\("Execution time: " \. round\(\s*\(\s*microtime\(\s*true\s*\)\s*-\s*\$debugBuddyStartTime\s*\)\s*\*\s*1000,\s*2\s*\)\s*\.\s*"ms"\s*\);?\s*\/\/\s*added by debugbuddy/g,
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