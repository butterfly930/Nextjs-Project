# Example: Using the Duplicate Code Detector

This directory contains example code files that demonstrate the types of duplicates the extension can detect.

## Example Files

### 1. duplicate-functions.ts
Contains multiple similar validation functions that could be refactored into a single utility.

### 2. duplicate-classes.ts  
Shows similar class implementations that could share a common base class.

### 3. utility-patterns.ts
Demonstrates custom implementations that could be replaced with standard libraries.

## How to Test

1. Open this `examples` directory in VS Code
2. Run: `Duplicate Detector: Scan Current Workspace`
3. View the detected duplicates in the sidebar
4. Run: `Duplicate Detector: Suggest Refactoring` to see recommendations
5. Run: `Duplicate Detector: Detect Utility Replacements` for library suggestions

## Expected Results

The extension should detect:
- 3 similar email validation functions
- 2 similar user data classes
- Multiple utility replacement opportunities
- Suggestions for creating shared utilities

## Learning Points

After running the detector on these examples, you'll understand:
- How similarity thresholds work
- What constitutes a "duplicate"
- How to interpret refactoring suggestions
- When to extract common code vs. keep separate implementations
