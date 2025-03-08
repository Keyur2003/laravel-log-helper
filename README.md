# Laravel Debug Buddy 

Laravel Debug Buddy is a powerful VS Code extension designed to simplify debugging in Laravel applications. It provides quick and easy access to common debugging tasks, such as logging variables, dumping variables, timing code execution, and cleaning up debug statements. With intuitive commands and keyboard shortcuts, this extension enhances productivity and streamlines the debugging process.

---

## Table of Contents
1. [Installation](#installation)
2. [Features](#features)
   - [Log Variable](#log-variable)
   - [DD Variable](#dd-variable)
   - [Time Execution](#time-execution)
   - [Remove Debug Statements](#remove-debug-statements)
3. [Keyboard Shortcuts](#keyboard-shortcuts)
4. [Contributing](#contributing)
5. [Support](#support)

---

## Installation

1. **Install from VS Code Marketplace**:
   - Open VS Code.
   - Go to the Extensions view by clicking on the Extensions icon in the Activity Bar on the side of the window or pressing `Ctrl+Shift+X`.
   - Search for **"Laravel Debug Buddy"**.
   - Click **Install**.
   - Alternatively, you can install it directly from the [Marketplace link](https://marketplace.visualstudio.com/items?itemName=KeyurSanghani.laravel-debug-buddy).

2. **Reload VS Code**:
   - After installation, reload VS Code to activate the extension.

---

## Features

### Log Variable
Logs the selected variable or text to the Laravel log file using `Log::info()`.

#### Usage:
1. Select the variable or text you want to log.
2. Right-click and choose **Log Variable** from the context menu, or use the keyboard shortcut:
   - **Windows/Linux**: `Ctrl+Shift+L`
   - **Mac**: `Cmd+Shift+L`

#### Examples:
```php
// Before:
$user = User::find(1);

// After:
\Log::info($user);
```
```php
// Before:
"Hello, World!";

// After:
\Log::info("Hello, World!");
```
```php
// Before:
"User email: {$user->email}";

// After:
\Log::info("User email: {$user->email}");
```

---

### DD Variable
Dumps the selected variable or text using Laravel's `dd()` helper.

#### Usage:
1. Select the variable or text you want to dump.
2. Right-click and choose **DD Variable** from the context menu, or use the keyboard shortcut:
   - **Windows/Linux**: `Ctrl+Shift+D`
   - **Mac**: `Cmd+Shift+D`

#### Examples:
```php
// Before:
$user = User::find(1);

// After:
dd($user);
```
```php
// Before:
"Hello, World!";

// After:
dd("Hello, World!");
```
```php
// Before:
$user = User::find(1);
$posts = Post::all();

// After:
dd(["user" => $user, "posts" => $posts]);
```

---

### Time Execution
Measures the execution time of a selected code block and logs it using `Log::info()`.

#### Usage:
1. Select the code block you want to time.
2. Right-click and choose **Time Execution** from the context menu, or use the keyboard shortcut:
   - **Windows/Linux**: `Ctrl+Shift+T`
   - **Mac**: `Cmd+Shift+T`

#### Examples:
```php
// Before:
$user = User::find(1);

// After:
$debugBuddyStartTime = now();
$user = User::find(1);
\Log::info("Execution time: " . now()->diffInMilliseconds($debugBuddyStartTime) . "ms");
```
```php
// Before:
foreach ($users as $user) {
    $user->notify(new WelcomeNotification);
}

// After:
$debugBuddyStartTime = now();
foreach ($users as $user) {
    $user->notify(new WelcomeNotification);
}
\Log::info("Execution time: " . now()->diffInMilliseconds($debugBuddyStartTime) . "ms");
```

---

### Remove Debug Statements
Removes all debug statements (`Log::info`, `dd`, `$debugBuddyStartTime`, and execution time logs) from the current file.

#### Usage:
1. Open the file containing debug statements.
2. Right-click and choose **Remove Debug Statements** from the context menu, or use the keyboard shortcut:
   - **Windows/Linux**: `Ctrl+Shift+R`
   - **Mac**: `Cmd+Shift+R`

#### Examples:
```php
// Before:
\Log::info($user);

// After:
// Removed
```
```php
// Before:
dd($user);

// After:
// Removed
```
```php
// Before:
$debugBuddyStartTime = now();
$user = User::find(1);
\Log::info("Execution time: " . now()->diffInMilliseconds($debugBuddyStartTime) . "ms");

// After:
$user = User::find(1);
```

---

## Keyboard Shortcuts

| Command                  | Windows/Linux       | Mac               |
|--------------------------|---------------------|-------------------|
| Log Variable             | `Ctrl+Shift+L`      | `Cmd+Shift+L`     |
| DD Variable              | `Ctrl+Shift+D`      | `Cmd+Shift+D`     |
| Time Execution           | `Ctrl+Shift+T`      | `Cmd+Shift+T`     |
| Remove Debug Statements  | `Ctrl+Shift+R`      | `Cmd+Shift+R`     |

---

## Contributing

We welcome contributions to improve Laravel Debug Buddy! Here’s how you can contribute:

1. **Fork the Repository**:  
   [Fork the repository on GitHub](https://github.com/Keyur2003/laravel-log-helper).

2. **Create a Branch**:  
   Create a new branch for your feature or bug fix.

3. **Make Changes**:  
   Implement your changes and ensure the code follows best practices.

4. **Submit a Pull Request**:  
   Open a pull request with a detailed description of your changes.

---

## Support

If you encounter any issues or have suggestions for improvement, please open an issue on the [GitHub Issues page](https://github.com/Keyur2003/laravel-log-helper/issues).

For general questions or feedback, feel free to reach out via the repository's [GitHub Discussions](https://github.com/Keyur2003/laravel-log-helper/discussions).

---

## License

Laravel Debug Buddy is open-source software licensed under the [MIT License](https://github.com/Keyur2003/laravel-log-helper/blob/main/LICENSE).

**Developed with ❤️ by [Keyur Sanghani](https://github.com/Keyur2003)**
