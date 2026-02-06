# Installation Guide - Duplicate Code Detector

This guide walks you through installing and setting up the Duplicate Code Detector extension in VS Code.

## Prerequisites

Before installing, ensure you have:
- **VS Code** version 1.85.0 or higher
- **Node.js** 20.x or higher (for development)
- **npm** or **yarn** package manager

## Installation Methods

### Method 1: Install from VS Code Marketplace (Recommended)

> **Note**: This method will be available once the extension is published to the marketplace.

1. Open VS Code
2. Click on the Extensions icon in the Activity Bar (or press `Ctrl+Shift+X`)
3. Search for "Duplicate Code Detector"
4. Click the **Install** button
5. Reload VS Code if prompted

### Method 2: Install from VSIX File

If you have a `.vsix` package file:

1. Download the `.vsix` file
2. Open VS Code
3. Go to Extensions view (`Ctrl+Shift+X`)
4. Click the `...` (More Actions) menu at the top
5. Select "Install from VSIX..."
6. Browse to and select the downloaded `.vsix` file
7. Reload VS Code when prompted

### Method 3: Install from Source (Development)

For developers or testing the latest version:

#### Step 1: Clone the Repository

```bash
cd /path/to/your/projects
git clone https://github.com/butterfly930/Nextjs-Project.git
cd Nextjs-Project/vscode-duplicate-detector
```

#### Step 2: Install Dependencies

```bash
npm install
```

This will install all required dependencies including:
- TypeScript compiler
- Babel parser for AST analysis
- VS Code extension types
- ESLint for code quality

#### Step 3: Compile TypeScript

```bash
npm run compile
```

This compiles the TypeScript source code to JavaScript in the `out/` directory.

#### Step 4: Open in VS Code

```bash
code .
```

#### Step 5: Run the Extension

1. Press `F5` to launch the Extension Development Host
2. A new VS Code window will open with the extension loaded
3. Open a project folder in this new window
4. Test the extension commands

#### Step 6: Make Changes (Optional)

To develop or modify the extension:

1. Make changes to files in the `src/` directory
2. Run `npm run watch` to automatically compile on save
3. Reload the Extension Development Host window (`Ctrl+R`)

### Method 4: Build and Package VSIX

To create your own installable package:

#### Step 1: Install vsce

```bash
npm install -g @vscode/vsce
```

#### Step 2: Package the Extension

```bash
cd vscode-duplicate-detector
vsce package
```

This creates a `.vsix` file (e.g., `duplicate-code-detector-1.0.0.vsix`)

#### Step 3: Install the Package

Follow Method 2 above to install the generated `.vsix` file.

## First-Time Setup

After installation, configure the extension for optimal performance:

### 1. Open Settings

- **Windows/Linux**: File → Preferences → Settings
- **Mac**: Code → Preferences → Settings

### 2. Search for "Duplicate Detector"

Type "duplicate detector" in the search box to see all available settings.

### 3. Configure Basic Settings

Recommended starting configuration:

```json
{
  "duplicateDetector.minimumTokens": 50,
  "duplicateDetector.similarityThreshold": 0.85,
  "duplicateDetector.scanOnSave": false,
  "duplicateDetector.excludePatterns": [
    "**/node_modules/**",
    "**/dist/**",
    "**/build/**",
    "**/.git/**",
    "**/coverage/**"
  ],
  "duplicateDetector.includeExtensions": [
    ".ts",
    ".tsx",
    ".js",
    ".jsx"
  ]
}
```

### 4. Workspace-Specific Settings (Optional)

Create `.vscode/settings.json` in your project:

```json
{
  "duplicateDetector.minimumTokens": 60,
  "duplicateDetector.similarityThreshold": 0.90,
  "duplicateDetector.excludePatterns": [
    "**/node_modules/**",
    "**/dist/**",
    "**/test/**",
    "**/__tests__/**"
  ]
}
```

## Verification

Verify the installation works correctly:

### 1. Check Extension is Loaded

1. Open Extensions view (`Ctrl+Shift+X`)
2. Search for "Duplicate Code Detector"
3. You should see it marked as installed

### 2. Test Commands

1. Press `Ctrl+Shift+P` to open Command Palette
2. Type "Duplicate Detector"
3. You should see all available commands:
   - Scan Current Workspace
   - Scan Multiple Repositories
   - Find Similar Functions/Classes
   - Suggest Refactoring
   - Detect Utility Replacements
   - Show Analysis Report

### 3. Check Sidebar

1. Look for the Duplicate Detector icon in the Activity Bar (left side)
2. Click it to open the results panel
3. Initially, it should be empty

### 4. Run First Scan

1. Open a project with code files
2. Press `Ctrl+Shift+P`
3. Select "Duplicate Detector: Scan Current Workspace"
4. Wait for the scan to complete
5. Results should appear in the sidebar

## Troubleshooting Installation

### Extension Not Appearing

**Problem**: Extension doesn't show in Extensions view

**Solutions**:
1. Restart VS Code completely
2. Check VS Code version (must be 1.85.0+)
3. Try reinstalling the extension
4. Check VS Code Developer Tools for errors:
   - Help → Toggle Developer Tools
   - Look for errors in Console tab

### Commands Not Found

**Problem**: Commands don't appear in Command Palette

**Solutions**:
1. Reload VS Code window (`Ctrl+R` in Extension Dev Host)
2. Check extension is activated:
   - Open Developer Tools
   - Look for "Duplicate Code Detector extension is now active" message
3. Verify `package.json` has correct `activationEvents`

### Compilation Errors (Development)

**Problem**: TypeScript compilation fails

**Solutions**:
1. Clear `out/` directory:
   ```bash
   rm -rf out/
   npm run compile
   ```
2. Reinstall dependencies:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```
3. Check TypeScript version:
   ```bash
   npx tsc --version
   ```
   Should be 5.x or higher

### Babel Parser Errors

**Problem**: Errors parsing code files

**Solutions**:
1. Check file extensions in configuration
2. Verify Babel dependencies installed:
   ```bash
   npm list @babel/parser @babel/traverse
   ```
3. Try updating Babel packages:
   ```bash
   npm update @babel/parser @babel/traverse @babel/types
   ```

### Performance Issues

**Problem**: Extension is slow or freezes

**Solutions**:
1. Increase `minimumTokens` setting (try 70-100)
2. Add more exclusion patterns
3. Scan smaller directories
4. Close unnecessary files/windows
5. Check VS Code performance:
   - Help → Process Explorer
   - Look for high CPU/memory usage

## Updating the Extension

### From Marketplace

VS Code will automatically notify you of updates. Click "Update" when prompted.

### From Source

```bash
cd vscode-duplicate-detector
git pull origin main
npm install
npm run compile
```

Then reload the Extension Development Host.

### From VSIX

1. Uninstall the current version
2. Install the new `.vsix` file following Method 2

## Uninstalling

### From VS Code

1. Open Extensions view (`Ctrl+Shift+X`)
2. Find "Duplicate Code Detector"
3. Click the gear icon
4. Select "Uninstall"
5. Reload VS Code

### Manual Cleanup

If needed, remove extension data:

**Windows**:
```
%USERPROFILE%\.vscode\extensions\butterfly930.duplicate-code-detector-*
```

**Mac/Linux**:
```bash
rm -rf ~/.vscode/extensions/butterfly930.duplicate-code-detector-*
```

## Next Steps

After successful installation:

1. 📖 Read the [README.md](README.md) for feature overview
2. 📚 Study the [USAGE_GUIDE.md](USAGE_GUIDE.md) for detailed instructions
3. 🚀 Run your first scan on a project
4. ⚙️ Adjust settings based on your needs
5. 💡 Explore refactoring suggestions

## Getting Help

If you encounter issues:

1. Check this installation guide
2. Review the [troubleshooting section](#troubleshooting-installation)
3. Check the [USAGE_GUIDE.md](USAGE_GUIDE.md)
4. Look at VS Code Developer Tools console
5. Create an issue on GitHub with:
   - VS Code version
   - Extension version
   - Error messages
   - Steps to reproduce

## System Requirements

**Minimum**:
- VS Code: 1.85.0
- Node.js: 20.x (for development)
- RAM: 4 GB
- Disk: 100 MB free space

**Recommended**:
- VS Code: Latest stable version
- Node.js: Latest LTS version
- RAM: 8 GB or more
- Disk: 500 MB free space
- SSD for better performance

---

**Happy Coding!** 🎉
