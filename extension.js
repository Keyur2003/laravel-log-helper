const vscode = require('vscode');
const ddVariable = require('./commands/ddVariable');
const logVariable = require('./commands/logVariable');
const removeDebugStatements = require('./commands/removeDebugStatements');
const timeExecution = require('./commands/timeExecution');
const quickLogVariable = require('./commands/quickLogVariable');
const quickDdVariable = require('./commands/quickDdVariable');
const queryLogger = require('./commands/queryLogger');
const exceptionCatcher = require('./commands/exceptionCatcher');
const requestResponseLogger = require('./commands/requestResponseLogger');
const conditionalDebugger = require('./commands/conditionalDebugger');
const methodCallTracer = require('./commands/methodCallTracer');

function activate(context) {
    let disposableLog = vscode.commands.registerCommand('laravel-debug-buddy.logVariable', logVariable);
    let disposableDd = vscode.commands.registerCommand('laravel-debug-buddy.ddVariable', ddVariable);
    let disposableRemoveDebug = vscode.commands.registerCommand('laravel-debug-buddy.removeDebugStatements', removeDebugStatements);
    let disposableTimeExecution = vscode.commands.registerCommand('laravel-debug-buddy.timeExecution', timeExecution);
    let disposableQuickLog = vscode.commands.registerCommand('laravel-debug-buddy.quickLogVariable', quickLogVariable);
    let disposableQuickDd = vscode.commands.registerCommand('laravel-debug-buddy.quickDdVariable', quickDdVariable);
    let disposableQueryLogger = vscode.commands.registerCommand('laravel-debug-buddy.queryLogger', queryLogger);
    let disposableExceptionCatcher = vscode.commands.registerCommand('laravel-debug-buddy.exceptionCatcher', exceptionCatcher);
    let disposableRequestResponseLogger = vscode.commands.registerCommand('laravel-debug-buddy.requestResponseLogger', requestResponseLogger);
    let disposableConditionalDebugger = vscode.commands.registerCommand('laravel-debug-buddy.conditionalDebugger', conditionalDebugger);
    let disposableMethodCallTracer = vscode.commands.registerCommand('laravel-debug-buddy.methodCallTracer', methodCallTracer);

    context.subscriptions.push(
        disposableLog, 
        disposableDd, 
        disposableRemoveDebug, 
        disposableTimeExecution,
        disposableQuickLog,
        disposableQuickDd,
        disposableQueryLogger,
        disposableExceptionCatcher,
        disposableRequestResponseLogger,
        disposableConditionalDebugger,
        disposableMethodCallTracer
    );
}

function deactivate() { }

module.exports = {
    activate,
    deactivate
};