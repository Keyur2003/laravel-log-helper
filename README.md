# Laravel Log Helper

A **Visual Studio Code Extension** designed to streamline debugging in **Laravel** projects by quickly logging variables using `\Log::info()`.

## 🚀 Features

- Instantly log selected variables with `\Log::info($variable);`.
- Automatically adds `$` to variable names if missing.
- **Keyboard Shortcut:**
  - **Windows/Linux:** `Ctrl + Alt + L`
  - **macOS:** `Cmd + Alt + L`

## 📌 Usage

1. Select a variable in your Laravel project.
2. Press `Ctrl + Alt + L` (or `Cmd + Alt + L` on macOS).
3. The extension will append `\Log::info($variable);` below the selected variable, maintaining the proper indentation.

## 🔧 Installation

1. Install the extension from the [Visual Studio Code Marketplace](https://marketplace.visualstudio.com/items?itemName=KeyurSanghani.laravel-log-helper).
2. Reload Visual Studio Code to activate the extension.

## 💡 Example

### Before
```php
$user = Auth::user();
```

### After pressing the shortcut
```php
$user = Auth::user();
\Log::info($user);
```

## 📢 Contributing

We welcome contributions! If you'd like to improve this extension:

- Open an issue or submit a pull request on [GitHub](https://github.com/Keyur2003/laravel-log-helper.git).
- Ensure your code follows best practices and is well-documented.

## 📜 License

This project is open-source and licensed under the [MIT License](LICENSE).

---

**Developed with ❤️ by [Keyur Sanghani](https://github.com/Keyur2003)**
