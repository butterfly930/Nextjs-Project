# Duplicate Code Detector for VS Code

A powerful VS Code extension that scans multiple repositories for duplicated logic patterns, identifies similar functions and classes across different codebases, and suggests refactoring opportunities.

## Features

### 🔍 Multi-Repository Scanning
- Scan your current workspace or multiple repositories simultaneously
- Detect code duplicates across different projects
- Support for multiple programming languages (JavaScript, TypeScript, Python, Java, C#, Go)

### 🎯 Smart Detection
- **Exact Duplicates**: Find code blocks that are identical or nearly identical
- **Similar Patterns**: Detect functions and classes with similar logic structure
- **Utility Replacements**: Identify custom code that could be replaced with standard libraries

### 💡 Intelligent Refactoring Suggestions
- Extract common logic into shared libraries
- Recommend base classes for inheritance
- Suggest using existing utilities instead of custom implementations
- Identify opportunities to extend existing implementations

### 📊 Visual Reports
- Interactive tree view showing all detected duplicates
- Detailed HTML reports with code previews
- Similarity scores and categorization
- Click to navigate to code locations

## Installation

### From Source

1. Clone this repository
2. Open in VS Code
3. Run `npm install` to install dependencies
4. Press F5 to launch the extension in development mode

### From VSIX

1. Package the extension: `vsce package`
2. Install the .vsix file in VS Code

## Usage

### Quick Start

1. Open VS Code and load your workspace
2. Open the Command Palette (`Ctrl+Shift+P` or `Cmd+Shift+P`)
3. Type "Duplicate Detector" to see available commands

### Available Commands

- **Duplicate Detector: Scan Current Workspace** - Scan the active workspace for duplicates
- **Duplicate Detector: Scan Multiple Repositories** - Scan multiple repository paths
- **Duplicate Detector: Find Similar Functions/Classes** - Find code similar to your current selection
- **Duplicate Detector: Suggest Refactoring** - Get refactoring recommendations
- **Duplicate Detector: Detect Utility Replacements** - Find opportunities to use standard libraries
- **Duplicate Detector: Show Analysis Report** - View a detailed HTML report

### Viewing Results

1. After scanning, results appear in the "Duplicate Detector" sidebar
2. Expand groups to see individual instances
3. Click on any item to jump to that code location
4. Use "Show Report" for a comprehensive HTML view

## Configuration

Access settings through VS Code Preferences → Extensions → Duplicate Code Detector

### Available Settings

```json
{
  "duplicateDetector.minimumTokens": 50,
  "duplicateDetector.similarityThreshold": 0.85,
  "duplicateDetector.excludePatterns": [
    "**/node_modules/**",
    "**/dist/**",
    "**/build/**",
    "**/.git/**"
  ],
  "duplicateDetector.includeExtensions": [
    ".ts",
    ".tsx",
    ".js",
    ".jsx",
    ".py",
    ".java",
    ".go",
    ".cs"
  ],
  "duplicateDetector.scanOnSave": false
}
```

### Configuration Options

- **minimumTokens** (default: 50) - Minimum code size to consider for duplication
- **similarityThreshold** (default: 0.85) - Threshold for similarity detection (0-1)
- **excludePatterns** - Glob patterns to exclude from scanning
- **includeExtensions** - File extensions to include in analysis
- **scanOnSave** - Automatically scan files when saved

## How It Works

### 1. Code Analysis
The extension uses Abstract Syntax Tree (AST) parsing to understand code structure:
- Extracts functions, classes, and methods
- Tokenizes code for comparison
- Generates structural hashes for similarity matching

### 2. Duplicate Detection
Multiple algorithms work together:
- **Token-based comparison** using Jaccard similarity
- **Structural analysis** via AST comparison
- **Pattern matching** for common utility implementations

### 3. Refactoring Suggestions
AI-powered analysis generates:
- Extraction recommendations for common code
- Base class suggestions for similar classes
- Library replacement opportunities
- Effort estimates for each refactoring

## Examples

### Finding Duplicates in Current Workspace

1. Open Command Palette
2. Select "Duplicate Detector: Scan Current Workspace"
3. Wait for analysis to complete
4. View results in the sidebar

### Scanning Multiple Repositories

1. Open Command Palette
2. Select "Duplicate Detector: Scan Multiple Repositories"
3. Enter comma-separated paths: `/path/to/repo1, /path/to/repo2`
4. Review cross-repository duplicates

### Getting Refactoring Suggestions

1. Run a scan to detect duplicates
2. Open Command Palette
3. Select "Duplicate Detector: Suggest Refactoring"
4. Review suggestions in the webview panel

## Supported Languages

- **JavaScript** (.js, .jsx)
- **TypeScript** (.ts, .tsx)
- **Python** (.py)
- **Java** (.java)
- **C#** (.cs)
- **Go** (.go)

Additional languages can be added through configuration.

## Best Practices

### For Accurate Detection
- Set appropriate `minimumTokens` for your codebase (larger for big projects)
- Adjust `similarityThreshold` based on strictness needed
- Exclude generated code and dependencies

### For Effective Refactoring
- Start with high-similarity duplicates (>95%)
- Consider effort estimates when prioritizing
- Review suggestions before implementing
- Test thoroughly after refactoring

## Performance Tips

- Exclude large directories (node_modules, dist, build)
- Use specific file extensions to limit scope
- Scan incrementally rather than entire codebase
- Close unnecessary files before scanning

## Troubleshooting

### Scan Takes Too Long
- Reduce scope by excluding more directories
- Increase `minimumTokens` to focus on larger duplicates
- Scan individual directories separately

### Too Many False Positives
- Increase `similarityThreshold`
- Adjust `minimumTokens` higher
- Refine `includeExtensions` to focus on relevant files

### Not Finding Expected Duplicates
- Lower `similarityThreshold`
- Check if files are excluded by patterns
- Verify file extensions are included

## Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details

## Feedback

Found a bug or have a feature request? Please open an issue on GitHub.

## Acknowledgments

Built with:
- [Babel Parser](https://babeljs.io/docs/en/babel-parser) - AST parsing
- [VS Code Extension API](https://code.visualstudio.com/api) - Extension framework

---

**Happy Refactoring! 🚀**
