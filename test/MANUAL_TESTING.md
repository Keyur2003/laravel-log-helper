# Manual Testing Guide for Laravel Debug Buddy

This guide will help you manually test all features of the Laravel Debug Buddy extension.

## Setup

1. Open the `test/manual-test.php` file in VS Code
2. Make sure the Laravel Debug Buddy extension is installed and activated

## Test Cases

### 1. Log Variable

#### Single Variable
1. Place your cursor on `$user` (line 9)
2. Press `Ctrl+Shift+L` (or `Cmd+Shift+L` on Mac)
3. Verify that `\Log::info($user); // Added by DebugBuddy` is added on the next line

#### Multiple Variables
1. Select both `$user` and `$posts` in the `testMultipleVariables` method (lines 20-24)
2. Press `Ctrl+Shift+L` (or `Cmd+Shift+L` on Mac)
3. Verify that a log statement with both variables is added

#### String with Variables
1. Select `$message` in the `testStringWithVariables` method (line 37)
2. Press `Ctrl+Shift+L` (or `Cmd+Shift+L` on Mac)
3. Verify that a log statement with the string is added

### 2. DD Variable

#### Single Variable
1. Place your cursor on `$user` (line 9)
2. Press `Ctrl+Shift+D` (or `Cmd+Shift+D` on Mac)
3. Verify that `dd($user);` is added on the next line

#### Multiple Variables
1. Select both `$user` and `$posts` in the `testMultipleVariables` method (lines 20-24)
2. Press `Ctrl+Shift+D` (or `Cmd+Shift+D` on Mac)
3. Verify that a dd statement with both variables is added

#### String with Variables
1. Select `$message` in the `testStringWithVariables` method (line 37)
2. Press `Ctrl+Shift+D` (or `Cmd+Shift+D` on Mac)
3. Verify that a dd statement with the string is added

### 3. Quick Log Variable

#### Single Variable
1. Select `$user` (line 9)
2. Press `Ctrl+Shift+Q` (or `Cmd+Shift+Q` on Mac)
3. Verify that `// added by debugbuddy` and `\Log::info($user);` are added below the line

#### Multiple Variables
1. Select both `$user` and `$posts` in the `testMultipleVariables` method (lines 20-24)
2. Press `Ctrl+Shift+Q` (or `Cmd+Shift+Q` on Mac)
3. Verify that a quick log statement with the selected text is added below

#### String with Variables
1. Select `$message` in the `testStringWithVariables` method (line 37)
2. Press `Ctrl+Shift+Q` (or `Cmd+Shift+Q` on Mac)
3. Verify that a quick log statement with the string is added below

### 4. Quick DD Variable

#### Single Variable
1. Select `$user` (line 9)
2. Press `Ctrl+Shift+W` (or `Cmd+Shift+W` on Mac)
3. Verify that `// added by debugbuddy` and `dd($user);` are added below the line

#### Multiple Variables
1. Select both `$user` and `$posts` in the `testMultipleVariables` method (lines 20-24)
2. Press `Ctrl+Shift+W` (or `Cmd+Shift+W` on Mac)
3. Verify that a quick dd statement with the selected text is added below

#### String with Variables
1. Select `$message` in the `testStringWithVariables` method (line 37)
2. Press `Ctrl+Shift+W` (or `Cmd+Shift+W` on Mac)
3. Verify that a quick dd statement with the string is added below

### 5. Time Execution

#### Single Operation
1. Select the line `$result = $this->complexOperation();` in the `testTimeExecution` method (line 51)
2. Press `Ctrl+Shift+T` (or `Cmd+Shift+T` on Mac)
3. Verify that timing code is added before and after the selected line

#### Loop Operation
1. Select the entire foreach loop in the `testTimeExecution` method (lines 57-59)
2. Press `Ctrl+Shift+T` (or `Cmd+Shift+T` on Mac)
3. Verify that timing code is added before and after the selected block

### 6. Remove Debug Statements

1. Go to the `testRemoveDebugStatements` method (lines 64-80)
2. Press `Ctrl+Shift+R` (or `Cmd+Shift+R` on Mac)
3. Verify that all debug statements are removed:
   - `\Log::info($user); // Added by DebugBuddy`
   - `\dd($posts);`
   - `$debugBuddyStartTime = microtime(true); // Added by DebugBuddy`
   - `\Log::info("Execution time: " . round((microtime(true) - $debugBuddyStartTime) * 1000, 2) . "ms"); // Added by DebugBuddy`

## Edge Cases to Test

1. **Empty Selection**: Try using the commands with no text selected
2. **Invalid Variables**: Try using the commands on text that isn't a valid PHP variable
3. **Multiple Lines**: Test with multi-line selections
4. **Indentation**: Verify that the added code maintains proper indentation
5. **Comments**: Test with comments in the code
6. **Nested Structures**: Test with nested loops and conditionals

## Context Menu Testing

1. Right-click on a variable and verify that all Laravel Debug Buddy commands are available in the context menu
2. Test each command from the context menu to ensure they work correctly

## Reporting Issues

If you encounter any issues during testing, please report them with:
1. The exact steps to reproduce
2. The expected behavior
3. The actual behavior
4. Any error messages
5. Screenshots if applicable 