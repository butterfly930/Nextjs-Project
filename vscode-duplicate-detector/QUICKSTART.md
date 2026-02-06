# Quick Start Guide

Get the Duplicate Code Detector extension running in under 5 minutes!

## For End Users

### Install & Use

1. **Install the extension** (when published to marketplace):
   - Open VS Code Extensions view (`Ctrl+Shift+X`)
   - Search for "Duplicate Code Detector"
   - Click Install

2. **Run your first scan**:
   - Open a project in VS Code
   - Press `Ctrl+Shift+P`
   - Type: "Duplicate Detector: Scan Current Workspace"
   - View results in the sidebar

3. **Get refactoring suggestions**:
   - After scanning, press `Ctrl+Shift+P`
   - Type: "Duplicate Detector: Suggest Refactoring"
   - Review suggestions in the webview

That's it! You're now detecting duplicates. 🎉

## For Developers

### Development Setup

```bash
# Clone the repository
git clone https://github.com/butterfly930/Nextjs-Project.git
cd Nextjs-Project/vscode-duplicate-detector

# Install dependencies
npm install

# Compile TypeScript
npm run compile

# Open in VS Code
code .

# Press F5 to launch Extension Development Host
# The extension will run in a new VS Code window
```

### Project Structure

```
vscode-duplicate-detector/
├── src/
│   ├── extension.ts              # Main entry point
│   ├── analyzer/
│   │   └── codeAnalyzer.ts       # AST parsing & code extraction
│   ├── detector/
│   │   └── duplicateDetector.ts  # Duplicate detection algorithms
│   ├── refactoring/
│   │   └── refactoringEngine.ts  # Refactoring suggestions
│   ├── report/
│   │   └── reportGenerator.ts    # HTML report generation
│   └── views/
│       └── resultsProvider.ts    # Tree view provider
├── examples/                      # Example duplicate code
├── package.json                   # Extension manifest
└── tsconfig.json                  # TypeScript config
```

### Making Changes

1. **Edit source files** in `src/`
2. **Compile**: `npm run compile` (or use watch mode: `npm run watch`)
3. **Reload extension**: Press `Ctrl+R` in Extension Development Host window
4. **Test your changes**

### Key Files to Know

- **extension.ts**: Registers commands and initializes components
- **codeAnalyzer.ts**: Parses code and extracts functions/classes
- **duplicateDetector.ts**: Compares code blocks and finds duplicates
- **refactoringEngine.ts**: Generates refactoring suggestions
- **package.json**: Extension configuration, commands, and settings

## Quick Test

### Test with Examples

The extension includes example files:

```bash
# Open the examples directory
code vscode-duplicate-detector/examples

# In VS Code:
# 1. Press Ctrl+Shift+P
# 2. Type: "Duplicate Detector: Scan Current Workspace"
# 3. See detected duplicates in sidebar
```

### What You Should See

The extension will detect:
- ✅ 3 similar email validation functions (90%+ similar)
- ✅ 3 similar manager classes (95%+ similar)
- ✅ 2 deep clone utility implementations
- ✅ 2 debounce function implementations
- ✅ Multiple utility replacement opportunities

## Common Commands

### Development

```bash
# Install dependencies
npm install

# Compile once
npm run compile

# Watch for changes (auto-compile)
npm run watch

# Run linter
npm run lint

# Package extension
npm run vscode:prepublish
vsce package
```

### Testing Commands in Extension

Once the Extension Development Host is running:

1. **Scan Workspace**: `Ctrl+Shift+P` → "Scan Current Workspace"
2. **Find Similar**: Select code → `Ctrl+Shift+P` → "Find Similar Functions"
3. **Get Suggestions**: `Ctrl+Shift+P` → "Suggest Refactoring"
4. **View Report**: `Ctrl+Shift+P` → "Show Analysis Report"

## Configuration

### Default Settings

```json
{
  "duplicateDetector.minimumTokens": 50,
  "duplicateDetector.similarityThreshold": 0.85,
  "duplicateDetector.scanOnSave": false
}
```

### Adjust for Your Needs

- **Finding too many duplicates?** → Increase `similarityThreshold` to 0.90
- **Scan is slow?** → Increase `minimumTokens` to 70-100
- **Want auto-scan?** → Set `scanOnSave` to `true`

## Troubleshooting

### Extension doesn't load
- Check VS Code version (must be 1.85.0+)
- Run `npm install` to ensure dependencies are installed
- Check Developer Tools (Help → Toggle Developer Tools) for errors

### Commands not working
- Ensure extension is activated (check "Duplicate Code Detector extension is now active" in console)
- Reload the Extension Development Host window (`Ctrl+R`)

### Compilation errors
```bash
# Clear and rebuild
rm -rf out/
npm run compile
```

## Next Steps

### For Users
- 📖 Read [USAGE_GUIDE.md](USAGE_GUIDE.md) for detailed instructions
- 🎨 Try the [examples](examples/) directory
- ⚙️ Configure settings for your workflow

### For Developers
- 🔧 Explore the source code
- 🧪 Add new detection patterns
- 🌐 Add support for more languages
- 📝 Improve documentation

## Resources

- **Full Documentation**: [README.md](README.md)
- **Installation**: [INSTALLATION.md](INSTALLATION.md)
- **Detailed Usage**: [USAGE_GUIDE.md](USAGE_GUIDE.md)
- **Examples**: [examples/](examples/)

## Getting Help

- **Documentation**: Check the guides first
- **Examples**: Look at example files
- **Issues**: Create a GitHub issue
- **Code**: Review the well-commented source

---

**Ready to eliminate duplicate code? Let's go! 🚀**
