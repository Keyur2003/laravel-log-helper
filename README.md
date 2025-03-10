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
   - [Quick Log Selected Code](#quick-log-selected-code)
   - [Quick DD Selected Code](#quick-dd-selected-code)
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
Logs the selected variable or text to the Laravel log file using `Log::info()`. Supports single variables, multiple variables, or plain text.

#### Examples:

**Single Variable:**
```php
$user = User::find(1);
\Log::info($user); // Added by DebugBuddy
```

**Plain Text:**
```php
"Hello, World!";
\Log::info("Hello, World!"); // Added by DebugBuddy
```

**Multiple Variables:**
```php
$user = User::find(1);
$posts = Post::all();
\Log::info(["user" => $user, "posts" => $posts]); // Added by DebugBuddy
```

**String with Variables:**
```php
"User email: {$user->email}";
\Log::info("User email: {$user->email}"); // Added by DebugBuddy
```

---

### DD Variable
Dumps the selected variable(s) or text using Laravel's `dd()` helper. Supports single variables, multiple variables, or plain text.

#### Examples:

**Single Variable:**
```php
$user = User::find(1);
dd($user);
```

**Plain Text:**
```php
"Hello, World!";
dd("Hello, World!");
```

**Multiple Variables:**
```php
$user = User::find(1);
$posts = Post::all();
dd(["user" => $user, "posts" => $posts]);
```

**String with Variables:**
```php
"User email: {$user->email}";
dd("User email: {$user->email}");
```

---

### Quick Log Selected Code
Quickly logs the selected code or expression below the current line without modifying the original code. This is perfect for logging complex expressions or code blocks.

#### Examples:

**Before (with selected code):**
```php
$countryId = Country::where('iso_code', 'US')->first()->id;
```

**After:**
```php
$countryId = Country::where('iso_code', 'US')->first()->id;
\Log::info(Country::where('iso_code', 'US')->first()->id); // Added by DebugBuddy
```

---

### Quick DD Selected Code
Quickly dumps and dies with the selected code or expression below the current line without modifying the original code. This is perfect for inspecting complex expressions or code blocks.

#### Examples:

**Before (with selected code):**
```php
$countryId = Country::where('iso_code', 'US')->first()->id;
```

**After:**
```php
$countryId = Country::where('iso_code', 'US')->first()->id;
dd(Country::where('iso_code', 'US')->first()->id); // Added by DebugBuddy
```

---

### Time Execution
Measures the execution time of a selected code block and logs it using `Log::info()`.

#### Examples:

**Single Operation:**
```php
$debugBuddyStartTime = microtime(true); // Added by DebugBuddy
$user = User::find(1);
\Log::info("Execution time: " . round((microtime(true) - $debugBuddyStartTime) * 1000, 2) . "ms"); // Added by DebugBuddy
```

**Loop:**
```php
$debugBuddyStartTime = microtime(true); // Added by DebugBuddy
foreach ($users as $user) {
    $user->notify(new WelcomeNotification);
}
\Log::info("Execution time: " . round((microtime(true) - $debugBuddyStartTime) * 1000, 2) . "ms"); // Added by DebugBuddy
```

---

### Remove Debug Statements
Removes all debug statements (`Log::info`, `dd`, `$debugBuddyStartTime`, and execution time logs) from the current file.

#### Examples:

**Before:**
```php
\Log::info($user); // Added by DebugBuddy
```

**After:**
```php
// Removed
```

**Before:**
```php
dd($user);
```

**After:**
```php
// Removed
```

**Before:**
```php
$debugBuddyStartTime = microtime(true); // Added by DebugBuddy
$user = User::find(1);
\Log::info("Execution time: " . round((microtime(true) - $debugBuddyStartTime) * 1000, 2) . "ms"); // Added by DebugBuddy
```

**After:**
```php
$user = User::find(1);
```

---

## Keyboard Shortcuts

| Command                  | Windows/Linux       | Mac               |
|--------------------------|---------------------|-------------------|
| Log Variable             | Ctrl+Shift+L        | Cmd+Shift+L       |
| DD Variable              | Ctrl+Shift+D        | Cmd+Shift+D       |
| Time Execution           | Ctrl+Shift+T        | Cmd+Shift+T       |
| Remove Debug Statements  | Ctrl+Shift+R        | Cmd+Shift+R       |
| Quick Log Selected Code  | Ctrl+Shift+Q        | Cmd+Shift+Q       |
| Quick DD Selected Code   | Ctrl+Shift+W        | Cmd+Shift+W       |

---

## Contributing

We welcome contributions to improve Laravel Debug Buddy! Here's how you can contribute:

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
