const vscode = require('vscode');

function removeDebugStatements() {
    const editor = vscode.window.activeTextEditor;

    if (editor) {
        const document = editor.document;
        const text = document.getText();

        const logRegex = /(\s*)\\?Log::info\(.*?\);?\s*/g;
        const ddRegex = /(\s*)dd\(.*?\);?\s*/g;

        const lines = text.split('\n');
        const linesToRemove = new Set();

        const newLines = lines.map((line, index) => {
            const originalLine = line;

            line = line.replace(logRegex, (match, indentation) => {
                if (originalLine.trim() === match.trim()) {
                    linesToRemove.add(index);
                    return '';
                }
                return indentation;
            });

            line = line.replace(ddRegex, (match, indentation) => {
                if (originalLine.trim() === match.trim()) {
                    linesToRemove.add(index);
                    return '';
                }
                return indentation;
            });

            return line;
        });

        const finalLines = newLines.filter((line, index) => {
            return !linesToRemove.has(index) || line.trim() !== '';
        });

        const newText = finalLines.join('\n');

        editor.edit((editBuilder) => {
            const firstLine = document.lineAt(0);
            const lastLine = document.lineAt(document.lineCount - 1);
            const textRange = new vscode.Range(firstLine.range.start, lastLine.range.end);
            editBuilder.replace(textRange, newText);
        });
    }
}

module.exports = removeDebugStatements;