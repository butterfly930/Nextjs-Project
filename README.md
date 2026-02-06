# VS Code Duplicate Code Detector Agent

A powerful Visual Studio Code extension that scans multiple repositories for duplicated logic patterns, identifies similar functions and classes across different codebases, and provides intelligent refactoring suggestions.

## 🎯 Overview

This extension helps developers:
- **Find duplicated code** across single or multiple repositories
- **Detect similar patterns** in functions, classes, and methods
- **Get refactoring suggestions** to extract common logic into shared libraries
- **Identify opportunities** to use existing utilities instead of custom implementations
- **Improve code quality** by reducing duplication and technical debt

## ✨ Key Features

### 1. Multi-Repository Scanning
- Scan your current workspace or multiple repositories simultaneously
- Detect code duplicates across different projects
- Support for JavaScript, TypeScript, Python, Java, C#, Go, and more

### 2. Intelligent Detection
- **Exact Duplicates**: Find code blocks that are identical or nearly identical (95%+ similarity)
- **Similar Patterns**: Detect functions and classes with similar logic structure (85-95% similarity)
- **Utility Replacements**: Identify custom code that could use standard libraries

### 3. Smart Refactoring Suggestions
- Extract common logic into shared utilities
- Recommend base classes for inheritance
- Suggest using existing libraries (Lodash, date-fns, etc.)
- Identify opportunities to extend existing implementations
- Provide effort estimates for each refactoring

### 4. Rich Visual Interface
- Interactive tree view showing all detected duplicates
- Detailed HTML reports with code previews
- Click-to-navigate to code locations
- Similarity scores and categorization

## 📦 Installation

See [INSTALLATION.md](vscode-duplicate-detector/INSTALLATION.md) for detailed installation instructions.

### Quick Install (From Source)

```bash
cd vscode-duplicate-detector
npm install
npm run compile
# Press F5 in VS Code to launch
```

## 🚀 Quick Start

1. **Open VS Code** with your project
2. **Open Command Palette** (`Ctrl+Shift+P` or `Cmd+Shift+P`)
3. **Type** "Duplicate Detector: Scan Current Workspace"
4. **View results** in the Duplicate Detector sidebar
5. **Click** on any duplicate to navigate to the code

## 📚 Documentation

- **[README.md](vscode-duplicate-detector/README.md)** - Feature overview and configuration
- **[INSTALLATION.md](vscode-duplicate-detector/INSTALLATION.md)** - Installation guide
- **[USAGE_GUIDE.md](vscode-duplicate-detector/USAGE_GUIDE.md)** - Comprehensive usage instructions
- **[Examples](vscode-duplicate-detector/examples/)** - Sample code demonstrating detectable patterns

## 🎮 Available Commands

| Command | Description |
|---------|-------------|
| `Duplicate Detector: Scan Current Workspace` | Scan the active workspace for duplicates |
| `Duplicate Detector: Scan Multiple Repositories` | Scan multiple repository paths |
| `Duplicate Detector: Find Similar Functions/Classes` | Find code similar to your selection |
| `Duplicate Detector: Suggest Refactoring` | Get refactoring recommendations |
| `Duplicate Detector: Detect Utility Replacements` | Find library replacement opportunities |
| `Duplicate Detector: Show Analysis Report` | View detailed HTML report |

## ⚙️ Configuration

Configure through VS Code Settings (`Ctrl+,`):

```json
{
  "duplicateDetector.minimumTokens": 50,
  "duplicateDetector.similarityThreshold": 0.85,
  "duplicateDetector.excludePatterns": [
    "**/node_modules/**",
    "**/dist/**",
    "**/build/**"
  ],
  "duplicateDetector.includeExtensions": [
    ".ts", ".tsx", ".js", ".jsx", ".py", ".java", ".go", ".cs"
  ],
  "duplicateDetector.scanOnSave": false
}
```

## 💡 Use Cases

### Code Review
Check if new code duplicates existing implementations:
1. Select your new function
2. Run "Find Similar Functions/Classes"
3. Review existing alternatives
4. Decide whether to reuse or proceed

### Technical Debt Reduction
Systematically eliminate duplicates:
1. Scan entire workspace
2. View analysis report
3. Sort by similarity (highest first)
4. Refactor in small batches

### Microservices Consolidation
Find shared utilities across services:
1. Scan multiple repositories
2. Review cross-repo duplicates
3. Extract to shared library
4. Update services to use shared code

### Library Migration
Replace custom utilities with standard libraries:
1. Run "Detect Utility Replacements"
2. Review suggested libraries
3. Prioritize high-impact patterns
4. Migrate and test

## 🔍 How It Works

### Code Analysis
- Uses **Abstract Syntax Tree (AST)** parsing via Babel
- Extracts functions, classes, methods, and code blocks
- Tokenizes code for efficient comparison
- Generates structural hashes for similarity detection

### Duplicate Detection
- **Token-based comparison** using Jaccard similarity algorithm
- **Structural analysis** via AST comparison
- **Pattern matching** for common utility implementations
- Configurable similarity thresholds and minimum code size

### Refactoring Engine
- Analyzes duplicate patterns to suggest refactorings
- Recommends extraction strategies (functions, classes, utilities)
- Provides effort estimates (low, medium, high)
- Generates suggested code and locations

## 🎨 Screenshots & Examples

### Example: Detecting Duplicate Functions

The extension can detect these similar email validation functions:

```typescript
// Function 1
export function validateUserEmail(email: string): boolean {
    if (!email) return false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Function 2  
export function checkEmailFormat(email: string): boolean {
    if (!email) return false;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}
```

**Result**: 90% similar - suggests extracting to shared utility.

### Example: Detecting Utility Replacements

Detects custom implementations that could use libraries:

```typescript
// Custom implementation
function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

// Suggestion
// Use structuredClone() or Lodash _.cloneDeep()
```

## 🛠️ Supported Languages

- JavaScript (`.js`, `.jsx`)
- TypeScript (`.ts`, `.tsx`)
- Python (`.py`)
- Java (`.java`)
- C# (`.cs`)
- Go (`.go`)

Additional languages can be added through configuration.

## 📊 Performance Tips

- Exclude large directories (node_modules, dist, build)
- Use specific file extensions to limit scope
- Increase `minimumTokens` for large codebases
- Scan incrementally rather than entire codebase
- Close unnecessary files before scanning

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

MIT License - see LICENSE file for details

## 🐛 Reporting Issues

Found a bug or have a feature request? Please create an issue on GitHub with:
- VS Code version
- Extension version
- Steps to reproduce
- Expected vs actual behavior

## 🙏 Acknowledgments

Built with:
- [Babel Parser](https://babeljs.io/docs/en/babel-parser) - AST parsing
- [VS Code Extension API](https://code.visualstudio.com/api) - Extension framework
- TypeScript - Type-safe development

## 📞 Support

- **Documentation**: Check README, INSTALLATION, and USAGE_GUIDE files
- **Examples**: See the `examples/` directory for sample code
- **Issues**: Create an issue on GitHub
- **Questions**: Refer to the comprehensive documentation

---

**Made with ❤️ for developers who care about code quality**

**Happy Refactoring! 🚀**
