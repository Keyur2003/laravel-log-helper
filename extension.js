const vscode = require('vscode');
const ddVariable = require('./commands/ddVariable');
const logVariable = require('./commands/logVariable');
const removeDebugStatements = require('./commands/removeDebugStatements');
const timeExecution = require('./commands/timeExecution');
const quickLogVariable = require('./commands/quickLogVariable');
const quickDdVariable = require('./commands/quickDdVariable');

function activate(context) {
    let disposableLog = vscode.commands.registerCommand('laravel-debug-buddy.logVariable', logVariable);
    let disposableDd = vscode.commands.registerCommand('laravel-debug-buddy.ddVariable', ddVariable);
    let disposableRemoveDebug = vscode.commands.registerCommand('laravel-debug-buddy.removeDebugStatements', removeDebugStatements);
    let disposableTimeExecution = vscode.commands.registerCommand('laravel-debug-buddy.timeExecution', timeExecution);
    let disposableQuickLog = vscode.commands.registerCommand('laravel-debug-buddy.quickLogVariable', quickLogVariable);
    let disposableQuickDd = vscode.commands.registerCommand('laravel-debug-buddy.quickDdVariable', quickDdVariable);

    context.subscriptions.push(
        disposableLog, 
        disposableDd, 
        disposableRemoveDebug, 
        disposableTimeExecution,
        disposableQuickLog,
        disposableQuickDd
    );
}

function deactivate() { }

module.exports = {
    activate,
    deactivate
};