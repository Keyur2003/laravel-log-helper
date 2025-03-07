# Laravel Debug Buddy

A **Visual Studio Code Extension** designed to streamline debugging in **Laravel** projects by quickly logging variables using `\Log::info()` and `dd()`.

## 🚀 Features

- **Log Variables:** Instantly log selected variables with `\Log::info($variable);`.
- **Dump and Die:** Use `dd($variable);` to quickly debug and terminate execution.
- **Smart Detection:**
  - Automatically detects variables under the cursor or inside strings.
  - Handles multiple variables by logging them as an array.
- **Indentation Preservation:** Maintains proper code indentation when inserting log statements.
- **Cursor Positioning:** Places the cursor between quotes for quick editing when no variable is selected.
- **Keyboard Shortcuts:**
  - **Log Variable:** 
    - **Windows/Linux:** `Ctrl + Shift + L`
    - **macOS:** `Cmd + Shift + L`
  - **Dump and Die:**
    - **Windows/Linux:** `Ctrl + Shift + D`
    - **macOS:** `Cmd + Shift + D`

---

## 📌 Usage

### Logging Variables with `\Log::info()`
1. Select a variable in your Laravel project.
2. Press `Ctrl + Shift + L` (or `Cmd + Shift + L` on macOS).
3. The extension will append `\Log::info($variable);` below the selected variable, maintaining the proper indentation.

### Debugging with `dd()`
1. Select a variable or place the cursor inside a string or on a variable.
2. Press `Ctrl + Shift + D` (or `Cmd + Shift + D` on macOS).
3. The extension will append `dd($variable);` below the selected variable or string, maintaining the proper indentation.

---

## 💡 Examples

### Example 1: Logging a Variable
#### Before
```php
$user = Auth::user();
```

#### After pressing `Ctrl + Shift + L`
```php
$user = Auth::user();
\Log::info($user);
```

---

### Example 2: Logging Multiple Variables
#### Before
```php
$user = Auth::user();
$posts = Post::all();
```

#### After selecting `$user, $posts` and pressing `Ctrl + Shift + L`
```php
$user = Auth::user();
$posts = Post::all();
\Log::info([$user, $posts]);
```

---

### Example 3: Using `dd()` for Quick Debugging
#### Before
```php
$user = Auth::user();
```

#### After pressing `Ctrl + Shift + D`
```php
$user = Auth::user();
dd($user);
```

---

### Example 4: Logging a String
#### Before
```php
echo "Hello, World!";
```

#### After placing the cursor inside the string and pressing `Ctrl + Shift + L`
```php
echo "Hello, World!";
\Log::info("Hello, World!");
```

---

### Example 5: Using `dd()` with a String
#### Before
```php
echo "Debug this message";
```

#### After placing the cursor inside the string and pressing `Ctrl + Shift + D`
```php
echo "Debug this message";
dd("Debug this message");
```

---

## 🔧 Installation

1. Install the extension from the [Visual Studio Code Marketplace](https://marketplace.visualstudio.com/items?itemName=KeyurSanghani.laravel-log-helper).
2. Reload Visual Studio Code to activate the extension.

---

## 📢 Contributing

We welcome contributions! If you'd like to improve this extension:

- Open an issue or submit a pull request on [GitHub](https://github.com/Keyur2003/laravel-log-helper.git).
- Ensure your code follows best practices and is well-documented.

---

## 📜 License

This project is open-source and licensed under the [MIT License](LICENSE).

---

**Developed with ❤️ by [Keyur Sanghani](https://github.com/Keyur2003)**
