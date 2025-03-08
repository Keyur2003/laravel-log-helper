const vscode = require('vscode');

function removeDebugStatements() {
    const editor = vscode.window.activeTextEditor;

    if (editor) {
        const document = editor.document;
        const text = document.getText();

        // Regular expressions to match debug statements
        const logRegex = /(\s*)\\?Log::info\([^;]*\);?\s*/g; // Matches \Log::info() or Log::info()
        const ddRegex = /(\s*)dd\([^;]*\);?\s*/g; // Matches dd()
        const timeStartRegex = /(\s*)\$debugBuddyStartTime\s*=\s*now\(\);\s*/g; // Matches $debugBuddyStartTime = now();
        const timeEndRegex = /(\s*)\\?Log::info\("Execution time: " \. now\(\)->diffInMilliseconds\(\$debugBuddyStartTime\) \. "ms"\);\s*/g; // Matches \Log::info("Execution time: ...");

        // Split the text into lines
        const lines = text.split('\n');

        // Track which lines became empty after removing debug statements
        const linesToRemove = new Set();

        // Process each line to remove debug statements while preserving formatting
        const newLines = lines.map((line, index) => {
            const originalLine = line;

            // Remove \Log::info() or Log::info() statements
            line = line.replace(logRegex, (match, indentation) => {
                if (originalLine.trim() === match.trim()) {
                    linesToRemove.add(index);
                    return '';
                }
                return indentation;
            });

            // Remove dd() statements
            line = line.replace(ddRegex, (match, indentation) => {
                if (originalLine.trim() === match.trim()) {
                    linesToRemove.add(index);
                    return '';
                }
                return indentation;
            });

            // Remove $debugBuddyStartTime = now(); statements
            line = line.replace(timeStartRegex, (match, indentation) => {
                if (originalLine.trim() === match.trim()) {
                    linesToRemove.add(index);
                    return '';
                }
                return indentation;
            });

            // Remove \Log::info("Execution time: ..."); statements
            line = line.replace(timeEndRegex, (match, indentation) => {
                if (originalLine.trim() === match.trim()) {
                    linesToRemove.add(index);
                    return '';
                }
                return indentation;
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
}

module.exports = removeDebugStatements;