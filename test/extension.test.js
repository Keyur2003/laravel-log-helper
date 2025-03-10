const assert = require('assert');
const vscode = require('vscode');
const path = require('path');
const fs = require('fs');

suite('Laravel Debug Buddy Extension Test Suite', () => {
	const testFilePath = path.join(__dirname, 'testFile.php');
	
	suiteSetup(() => {
		// Create a test PHP file
		const testFileContent = `<?php
namespace App\\Tests;

class TestClass
{
	public function testMethod()
	{
		$user = ['id' => 1, 'name' => 'John Doe'];
		$posts = [
			['id' => 1, 'title' => 'Post 1'],
			['id' => 2, 'title' => 'Post 2']
		];
		$email = "user@example.com";
		$message = "User email: {$email}";
		
		// Complex operation
		$result = $this->complexOperation();
		
		// Loop operation
		foreach ($posts as $post) {
			$this->processPost($post);
		}
	}
	
	private function complexOperation()
	{
		// Some complex operation
		return "result";
	}
	
	private function processPost($post)
	{
		// Process post
		return $post;
	}
}`;
		fs.writeFileSync(testFilePath, testFileContent);
	});
	
	suiteTeardown(() => {
		// Clean up test file
		if (fs.existsSync(testFilePath)) {
			fs.unlinkSync(testFilePath);
		}
	});
	
	test('Extension should be present', () => {
		assert.ok(vscode.extensions.getExtension('KeyurSanghani.laravel-debug-buddy'));
	});
	
	test('Should register all commands', async () => {
		const commands = await vscode.commands.getCommands();
		
		// Check if all extension commands are registered
		assert.ok(commands.includes('laravel-debug-buddy.logVariable'));
		assert.ok(commands.includes('laravel-debug-buddy.ddVariable'));
		assert.ok(commands.includes('laravel-debug-buddy.removeDebugStatements'));
		assert.ok(commands.includes('laravel-debug-buddy.timeExecution'));
		assert.ok(commands.includes('laravel-debug-buddy.quickLogVariable'));
		assert.ok(commands.includes('laravel-debug-buddy.quickDdVariable'));
	});
	
	// Note: The following tests are commented out because they require user interaction
	// and would be better tested manually or with a more complex test setup
	
	/*
	test('Should log variable', async () => {
		const document = await vscode.workspace.openTextDocument(testFilePath);
		const editor = await vscode.window.showTextDocument(document);
		
		// Position cursor at the variable
		const position = new vscode.Position(7, 15); // Line with $user variable
		editor.selection = new vscode.Selection(position, position);
		
		// Execute log variable command
		await vscode.commands.executeCommand('laravel-debug-buddy.logVariable');
		
		// Check if log statement was added
		const text = document.getText();
		assert.ok(text.includes('\\Log::info($user); // Added by DebugBuddy'));
	});
	
	test('Should dd variable', async () => {
		const document = await vscode.workspace.openTextDocument(testFilePath);
		const editor = await vscode.window.showTextDocument(document);
		
		// Position cursor at the variable
		const position = new vscode.Position(8, 15); // Line with $posts variable
		editor.selection = new vscode.Selection(position, position);
		
		// Execute dd variable command
		await vscode.commands.executeCommand('laravel-debug-buddy.ddVariable');
		
		// Check if dd statement was added
		const text = document.getText();
		assert.ok(text.includes('dd($posts);'));
	});
	
	test('Should time execution', async () => {
		const document = await vscode.workspace.openTextDocument(testFilePath);
		const editor = await vscode.window.showTextDocument(document);
		
		// Select the complex operation
		const startPos = new vscode.Position(16, 8);
		const endPos = new vscode.Position(16, 42);
		editor.selection = new vscode.Selection(startPos, endPos);
		
		// Execute time execution command
		await vscode.commands.executeCommand('laravel-debug-buddy.timeExecution');
		
		// Check if timing code was added
		const text = document.getText();
		assert.ok(text.includes('$debugBuddyStartTime = microtime(true); // Added by DebugBuddy'));
		assert.ok(text.includes('\\Log::info("Execution time: " . round((microtime(true) - $debugBuddyStartTime) * 1000, 2) . "ms"); // Added by DebugBuddy'));
	});
	
	test('Should quick log variable', async () => {
		const document = await vscode.workspace.openTextDocument(testFilePath);
		const editor = await vscode.window.showTextDocument(document);
		
		// Select the variable
		const startPos = new vscode.Position(11, 8);
		const endPos = new vscode.Position(11, 14);
		editor.selection = new vscode.Selection(startPos, endPos);
		
		// Execute quick log variable command
		await vscode.commands.executeCommand('laravel-debug-buddy.quickLogVariable');
		
		// Check if log statement was added below
		const text = document.getText();
		assert.ok(text.includes('// added by debugbuddy'));
		assert.ok(text.includes('\\Log::info($email);'));
	});
	
	test('Should quick dd variable', async () => {
		const document = await vscode.workspace.openTextDocument(testFilePath);
		const editor = await vscode.window.showTextDocument(document);
		
		// Select the variable
		const startPos = new vscode.Position(12, 8);
		const endPos = new vscode.Position(12, 16);
		editor.selection = new vscode.Selection(startPos, endPos);
		
		// Execute quick dd variable command
		await vscode.commands.executeCommand('laravel-debug-buddy.quickDdVariable');
		
		// Check if dd statement was added below
		const text = document.getText();
		assert.ok(text.includes('// added by debugbuddy'));
		assert.ok(text.includes('dd($message);'));
	});
	
	test('Should remove debug statements', async () => {
		const document = await vscode.workspace.openTextDocument(testFilePath);
		const editor = await vscode.window.showTextDocument(document);
		
		// Add some debug statements first
		const text = document.getText();
		const newText = text.replace(
			'$user = [\'id\' => 1, \'name\' => \'John Doe\'];',
			'$user = [\'id\' => 1, \'name\' => \'John Doe\'];\n        \\Log::info($user); // Added by DebugBuddy\n        dd($user);'
		);
		
		await editor.edit(editBuilder => {
			const entireRange = new vscode.Range(
				document.positionAt(0),
				document.positionAt(document.getText().length)
			);
			editBuilder.replace(entireRange, newText);
		});
		
		// Execute remove debug statements command
		await vscode.commands.executeCommand('laravel-debug-buddy.removeDebugStatements');
		
		// Check if debug statements were removed
		const updatedText = document.getText();
		assert.ok(!updatedText.includes('\\Log::info($user); // Added by DebugBuddy'));
		assert.ok(!updatedText.includes('dd($user);'));
	});
	*/
});
