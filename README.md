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
   - [Query Logger](#query-logger)
   - [Exception Catcher](#exception-catcher)
   - [Request/Response Logger](#requestresponse-logger)
   - [Conditional Debugging](#conditional-debugging)
   - [Method Call Tracer](#method-call-tracer)
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

### Query Logger
Adds a DB::listen query logger to log all database queries executed in the selected code block, showing the SQL query, bindings, and execution time.

#### Examples:

**Before:**
```php
$users = User::where('active', true)->get();
```

**After:**
```php
// Start query logging
\DB::listen(function($query) {
    $bindings = $query->bindings;
    $sql = $query->sql;
    foreach ($bindings as $i => $binding) {
        if ($binding instanceof \DateTime) {
            $bindings[$i] = $binding->format('Y-m-d H:i:s');
        } elseif (is_string($binding)) {
            $bindings[$i] = "'{$binding}'";
        }
    }
    $sql = str_replace(['%', '?'], ['%%', '%s'], $sql);
    $sql = vsprintf($sql, $bindings);
    \Log::info("Query: {$sql} | Time: {$query->time}ms"); // Added by DebugBuddy
});
// End query logging

$users = User::where('active', true)->get();
```

---

### Exception Catcher
Wraps the selected code with a try-catch block that logs detailed exception information.

#### Examples:

**Before:**
```php
$user = User::findOrFail($id);
$user->update($request->all());
```

**After:**
```php
try {
    $user = User::findOrFail($id);
    $user->update($request->all());
} catch (\Exception $e) {
    \Log::error('Exception caught: ' . $e->getMessage()); // Added by DebugBuddy
    \Log::error('File: ' . $e->getFile() . ' Line: ' . $e->getLine()); // Added by DebugBuddy
    \Log::error('Stack trace: ' . $e->getTraceAsString()); // Added by DebugBuddy
    // Handle the exception as needed
}
```

---

### Request/Response Logger
Adds code to log request or response data, including URL, method, headers, and body.

#### Examples:

**Request Logging:**
```php
// Log request data
\Log::info('Request URL: ' . request()->url()); // Added by DebugBuddy
\Log::info('Request Method: ' . request()->method()); // Added by DebugBuddy
\Log::info('Request Headers: ' . json_encode(request()->headers->all())); // Added by DebugBuddy
\Log::info('Request Body: ' . json_encode(request()->all())); // Added by DebugBuddy
```

**Response Logging:**
```php
// Log response data (add this before returning the response)
\Log::info('Response Status: ' . $response->status()); // Added by DebugBuddy
\Log::info('Response Headers: ' . json_encode($response->headers->all())); // Added by DebugBuddy
\Log::info('Response Body: ' . json_encode($response->getContent())); // Added by DebugBuddy
```

---

### Conditional Debugging
Adds conditional debugging code that only logs or dumps when a specific condition is met.

#### Examples:

**Conditional Logging:**
```php
$user = User::find($id);

if ($user->id === 1) { // Conditional debug - Added by DebugBuddy
    \Log::info('Condition met: $user->id === 1'); // Added by DebugBuddy
    \Log::info($user); // Added by DebugBuddy
}
```

---

### Method Call Tracer
Adds code to trace method calls, including parameters, execution time, and return values.

#### Examples:

**Method Tracing:**
```php
// Method call tracing - Added by DebugBuddy
\Log::info('Method called: ' . __METHOD__ . ' with parameters: ' . json_encode(func_get_args())); // Added by DebugBuddy
$debugBuddyStartTime = microtime(true); // Added by DebugBuddy
$debugBuddyResult = null; // Added by DebugBuddy
try {
    // Your original method code here
    // Store the result in $debugBuddyResult before returning
} finally {
    \Log::info('Method completed: ' . __METHOD__ . ' in ' . round((microtime(true) - $debugBuddyStartTime) * 1000, 2) . 'ms'); // Added by DebugBuddy
    \Log::info('Method returned: ' . json_encode($debugBuddyResult)); // Added by DebugBuddy
}
return $debugBuddyResult; // Added by DebugBuddy
```

**Method Wrapper:**
```php
// Method call tracing wrapper - Added by DebugBuddy
public function processOrderWithTracing(...$args) {
    \Log::info('Method called: processOrder with parameters: ' . json_encode($args)); // Added by DebugBuddy
    $debugBuddyStartTime = microtime(true); // Added by DebugBuddy
    $result = $this->processOrder(...$args);
    \Log::info('Method completed: processOrder in ' . round((microtime(true) - $debugBuddyStartTime) * 1000, 2) . 'ms'); // Added by DebugBuddy
    \Log::info('Method returned: ' . json_encode($result)); // Added by DebugBuddy
    return $result;
}
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
| Query Logger             | Ctrl+Shift+1        | Cmd+Shift+1       |
| Exception Catcher        | Ctrl+Shift+2        | Cmd+Shift+2       |
| Request/Response Logger  | Ctrl+Shift+3        | Cmd+Shift+3       |
| Conditional Debugging    | Ctrl+Shift+4        | Cmd+Shift+4       |
| Method Call Tracer       | Ctrl+Shift+5        | Cmd+Shift+5       |

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
