# Duplicate Code Detector - Usage Guide

This guide will help you get started with the Duplicate Code Detector extension and make the most of its features.

## Installation & Setup

### Installing the Extension

1. **From VS Code Marketplace** (when published):
   - Open VS Code
   - Go to Extensions (Ctrl+Shift+X / Cmd+Shift+X)
   - Search for "Duplicate Code Detector"
   - Click Install

2. **From Source** (for development):
   ```bash
   cd vscode-duplicate-detector
   npm install
   npm run compile
   # Press F5 in VS Code to launch in development mode
   ```

### First-Time Configuration

After installation, configure the extension for your needs:

1. Open VS Code Settings (File → Preferences → Settings)
2. Search for "Duplicate Detector"
3. Adjust these key settings:
   - **Similarity Threshold**: Start with 0.85 (85% similarity)
   - **Minimum Tokens**: Start with 50 for most projects
   - **Exclude Patterns**: Add your build/dist directories

## Basic Workflow

### Scanning Your Current Workspace

This is the most common use case:

1. Open your project in VS Code
2. Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac)
3. Type: `Duplicate Detector: Scan Current Workspace`
4. Wait for the scan to complete
5. View results in the "Duplicate Detector" sidebar

**What happens:**
- All files matching your configured extensions are analyzed
- Functions, classes, and methods are extracted
- Similar code patterns are identified
- Results appear in the sidebar grouped by similarity

### Understanding the Results

Results are organized in a tree view:

```
Duplicate Detector
├─ Duplicate Group 1 (3 instances) - 95% similar
│  ├─ utils.ts:15-30 - function: validateEmail
│  ├─ auth.ts:45-60 - function: checkEmail
│  └─ user.ts:100-115 - function: verifyEmail
├─ Duplicate Group 2 (2 instances) - 88% similar
│  ├─ api.ts:20-45 - function: fetchData
│  └─ service.ts:80-105 - function: getData
```

**Key Information:**
- **Group Number**: Each duplicate pattern gets a group
- **Instance Count**: How many times the pattern appears
- **Similarity %**: How similar the code blocks are
- **Location**: File name and line numbers
- **Type & Name**: Function/class/method name

### Viewing Code Locations

Click any item in the tree to:
- Jump to that location in your code
- See the duplicate highlighted
- Compare with other instances

## Advanced Features

### Scanning Multiple Repositories

Perfect for finding duplicates across microservices or related projects:

1. Open Command Palette
2. Select: `Duplicate Detector: Scan Multiple Repositories`
3. Enter paths separated by commas:
   ```
   /path/to/frontend, /path/to/backend, /path/to/shared
   ```
4. Wait for cross-repository analysis
5. Review duplicates that span multiple projects

**Use Cases:**
- Finding shared utility code
- Identifying candidates for shared libraries
- Discovering inconsistent implementations
- Planning code consolidation

### Finding Similar Code to Your Selection

Analyze specific code on-demand:

1. Select a block of code in your editor
2. Open Command Palette
3. Select: `Duplicate Detector: Find Similar Functions/Classes`
4. View similar patterns across your codebase

**Best For:**
- "Has this been implemented before?"
- Finding all variations of a pattern
- Discovering related functionality
- Code review assistance

### Getting Refactoring Suggestions

Transform duplicates into actionable improvements:

1. Run a scan (workspace or multi-repo)
2. Open Command Palette
3. Select: `Duplicate Detector: Suggest Refactoring`
4. Review suggestions in the webview panel

**Suggestion Types:**

1. **Extract Function** - Pull common logic into shared utilities
   - Shows suggested function signature
   - Recommends location for new file
   - Lists all places to replace

2. **Extract Class** - Create base classes for similar implementations
   - Suggests base class structure
   - Identifies common methods/properties
   - Recommends inheritance strategy

3. **Use Utility** - Replace custom code with libraries
   - Identifies library equivalents
   - Shows before/after examples
   - Recommends packages to use

**Effort Estimates:**
- 🟢 **Low**: Quick wins, < 1 hour
- 🟡 **Medium**: Moderate refactoring, 1-4 hours
- 🔴 **High**: Significant work, > 4 hours

### Detecting Utility Replacements

Find custom code that could use standard libraries:

1. Open Command Palette
2. Select: `Duplicate Detector: Detect Utility Replacements`
3. Review opportunities to use established libraries

**Common Patterns Detected:**
- JSON.parse(JSON.stringify()) → structuredClone()
- Custom array operations → Lodash
- Manual date formatting → date-fns
- DIY debouncing → Lodash _.debounce
- Custom deep cloning → Lodash _.cloneDeep

### Viewing the Analysis Report

Get a comprehensive HTML report:

1. After scanning, open Command Palette
2. Select: `Duplicate Detector: Show Analysis Report`
3. View detailed report with:
   - Summary statistics
   - All duplicate groups
   - Code previews
   - Similarity scores

**Report Sections:**
- **Summary Cards**: Overview statistics
- **Exact Duplicates**: 95%+ similarity
- **Similar Patterns**: 85-95% similarity
- **Utility Opportunities**: Library replacements

## Configuration Options Explained

### minimumTokens (default: 50)

Controls the minimum size of code to analyze.

**Lower values (20-40):**
- ✅ Catches smaller duplicates
- ❌ More false positives
- ❌ Slower scanning

**Higher values (60-100):**
- ✅ Fewer false positives
- ✅ Faster scanning
- ❌ Misses smaller duplicates

**Recommendation:** 
- Small projects: 30-40
- Medium projects: 50-60
- Large projects: 70-100

### similarityThreshold (default: 0.85)

Determines how similar code must be to match.

**Lower values (0.70-0.80):**
- ✅ Finds loosely similar code
- ❌ More false positives
- Use for: Discovery mode, initial analysis

**Higher values (0.90-0.98):**
- ✅ Only near-exact matches
- ❌ Misses useful similarities
- Use for: High-confidence duplicates

**Recommendation:**
- Start with: 0.85
- For refactoring: 0.90+
- For exploration: 0.75-0.80

### excludePatterns

Glob patterns to skip during scanning.

**Default exclusions:**
```json
[
  "**/node_modules/**",
  "**/dist/**",
  "**/build/**",
  "**/.git/**"
]
```

**Add for your project:**
- `**/vendor/**` - PHP dependencies
- `**/target/**` - Java build output
- `**/__pycache__/**` - Python cache
- `**/coverage/**` - Test coverage
- `**/*.min.js` - Minified files
- `**/*.generated.ts` - Generated code

### includeExtensions

File types to analyze.

**Default:**
```json
[".ts", ".tsx", ".js", ".jsx", ".py", ".java", ".go", ".cs"]
```

**Add more languages:**
- `".rb"` - Ruby
- `".php"` - PHP
- `".cpp"`, `".h"` - C++
- `".swift"` - Swift
- `".kt"` - Kotlin

### scanOnSave (default: false)

Auto-scan when files are saved.

**Enable if:**
- Working on refactoring project
- Want immediate feedback
- Small codebase

**Disable if:**
- Large codebase (slow)
- Frequent saves
- Limited resources

## Real-World Scenarios

### Scenario 1: Microservices Consolidation

**Goal:** Find duplicated utilities across services

1. Scan multiple repositories:
   ```
   /services/auth, /services/api, /services/jobs
   ```
2. Review cross-repo duplicates
3. Get refactoring suggestions
4. Create shared library package
5. Refactor services to use shared code

### Scenario 2: Code Review

**Goal:** Check if new code duplicates existing logic

1. Select new function/class
2. Run: "Find Similar Functions/Classes"
3. Review existing implementations
4. Either:
   - Use existing code
   - Extend existing class
   - Confirm new implementation is needed

### Scenario 3: Technical Debt Reduction

**Goal:** Systematically eliminate duplicates

1. Scan entire workspace
2. View analysis report
3. Sort by similarity (highest first)
4. Start with exact duplicates (95%+)
5. Refactor in small batches
6. Re-scan to verify reduction

### Scenario 4: Library Migration

**Goal:** Replace custom utilities with libraries

1. Run: "Detect Utility Replacements"
2. Review suggested libraries
3. Prioritize by usage frequency
4. Migrate high-impact patterns first
5. Test thoroughly
6. Remove old custom code

## Tips & Best Practices

### Getting Accurate Results

✅ **Do:**
- Configure exclusions properly
- Start with higher similarity threshold
- Focus on one language/area at a time
- Review manual samples before bulk refactoring

❌ **Don't:**
- Scan node_modules or vendor directories
- Set threshold too low initially
- Auto-refactor without review
- Ignore context and business logic

### Performance Optimization

**For Large Codebases:**
1. Increase `minimumTokens` to 70-100
2. Scan directories separately
3. Use specific file extensions
4. Exclude test files initially
5. Close unnecessary editor tabs

**For Fast Iteration:**
1. Keep `scanOnSave` disabled
2. Scan specific directories
3. Use file type filters
4. Clear results between scans

### Effective Refactoring

**Priority Order:**
1. ✅ Exact duplicates (95%+) - Quick wins
2. ✅ Utility replacements - Standard libraries
3. ✅ Similar functions (90-95%) - Clear patterns
4. ⚠️ Loosely similar (85-90%) - Careful review
5. ❌ Below 85% - Likely not worth it

**Validation Steps:**
1. Review all instances carefully
2. Understand context differences
3. Write tests before refactoring
4. Refactor incrementally
5. Run tests after each change
6. Document the changes

## Troubleshooting

### "Scan takes forever"

**Solutions:**
- Check excluded directories
- Increase `minimumTokens`
- Scan smaller directories
- Close other VS Code windows

### "Too many false positives"

**Solutions:**
- Increase `similarityThreshold` to 0.90+
- Increase `minimumTokens`
- Review exclude patterns
- Consider language-specific patterns

### "Not finding obvious duplicates"

**Solutions:**
- Lower `similarityThreshold` to 0.75
- Lower `minimumTokens` to 30
- Check file extensions included
- Verify files aren't excluded

### "Extension not responding"

**Solutions:**
- Restart VS Code
- Check VS Code Developer Tools (Help → Toggle Developer Tools)
- Review extension output logs
- Clear extension cache

## Keyboard Shortcuts

You can add custom shortcuts for frequently used commands:

1. File → Preferences → Keyboard Shortcuts
2. Search for "Duplicate Detector"
3. Add shortcuts, for example:
   - `Ctrl+Shift+D` - Scan Workspace
   - `Ctrl+Alt+D` - Find Similar
   - `Ctrl+Shift+R` - Show Report

## Integration with Workflow

### CI/CD Integration

While this is a VS Code extension, you can use the concepts to:
- Add duplication checks to CI pipelines
- Set quality gates for similarity scores
- Track duplication metrics over time

### Team Usage

**Best Practices:**
- Share configuration in `.vscode/settings.json`
- Document refactoring patterns
- Regular scan reviews in team meetings
- Track progress on reducing duplicates

## Support & Feedback

- **Issues**: Report bugs or request features on GitHub
- **Questions**: Check the README and this guide first
- **Contributions**: Pull requests welcome!

---

**Need more help?** Check the README.md or create an issue on GitHub.
