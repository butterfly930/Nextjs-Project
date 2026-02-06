import { DuplicateGroup } from '../detector/duplicateDetector';
import { RefactoringSuggestion } from '../refactoring/refactoringEngine';
import * as path from 'path';

export class ReportGenerator {
    generateReportHtml(duplicates: DuplicateGroup[]): string {
        const exactDuplicates = duplicates.filter(d => d.category === 'exact');
        const similarDuplicates = duplicates.filter(d => d.category === 'similar');
        const utilityReplacements = duplicates.filter(d => d.category === 'utility');

        return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Duplicate Code Analysis Report</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: var(--vscode-foreground);
            background-color: var(--vscode-editor-background);
            padding: 20px;
            max-width: 1200px;
            margin: 0 auto;
        }
        h1 {
            color: var(--vscode-textLink-foreground);
            border-bottom: 2px solid var(--vscode-textLink-foreground);
            padding-bottom: 10px;
        }
        h2 {
            color: var(--vscode-textPreformat-foreground);
            margin-top: 30px;
        }
        .summary {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin: 20px 0;
        }
        .summary-card {
            background-color: var(--vscode-editor-inactiveSelectionBackground);
            padding: 20px;
            border-radius: 8px;
            border-left: 4px solid var(--vscode-textLink-foreground);
        }
        .summary-card h3 {
            margin: 0 0 10px 0;
            color: var(--vscode-textLink-foreground);
        }
        .summary-card .number {
            font-size: 2.5em;
            font-weight: bold;
            color: var(--vscode-textPreformat-foreground);
        }
        .duplicate-group {
            background-color: var(--vscode-editor-inactiveSelectionBackground);
            margin: 20px 0;
            padding: 15px;
            border-radius: 8px;
            border-left: 4px solid var(--vscode-gitDecoration-modifiedResourceForeground);
        }
        .duplicate-group.exact {
            border-left-color: var(--vscode-errorForeground);
        }
        .duplicate-group.utility {
            border-left-color: var(--vscode-gitDecoration-addedResourceForeground);
        }
        .code-location {
            margin: 10px 0;
            padding: 10px;
            background-color: var(--vscode-editor-background);
            border-radius: 4px;
            font-family: 'Courier New', monospace;
            font-size: 0.9em;
        }
        .code-preview {
            background-color: var(--vscode-textCodeBlock-background);
            padding: 10px;
            border-radius: 4px;
            overflow-x: auto;
            margin: 10px 0;
        }
        pre {
            margin: 0;
            font-family: 'Courier New', monospace;
            font-size: 0.85em;
            white-space: pre-wrap;
        }
        .similarity-badge {
            display: inline-block;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 0.85em;
            font-weight: bold;
            background-color: var(--vscode-badge-background);
            color: var(--vscode-badge-foreground);
        }
    </style>
</head>
<body>
    <h1>🔍 Duplicate Code Analysis Report</h1>
    
    <div class="summary">
        <div class="summary-card">
            <h3>Total Duplicates</h3>
            <div class="number">${duplicates.length}</div>
        </div>
        <div class="summary-card">
            <h3>Exact Matches</h3>
            <div class="number">${exactDuplicates.length}</div>
        </div>
        <div class="summary-card">
            <h3>Similar Code</h3>
            <div class="number">${similarDuplicates.length}</div>
        </div>
        <div class="summary-card">
            <h3>Utility Opportunities</h3>
            <div class="number">${utilityReplacements.length}</div>
        </div>
    </div>

    ${exactDuplicates.length > 0 ? this.generateSection('Exact Duplicates', exactDuplicates, 'exact') : ''}
    ${similarDuplicates.length > 0 ? this.generateSection('Similar Code Patterns', similarDuplicates, 'similar') : ''}
    ${utilityReplacements.length > 0 ? this.generateSection('Utility Replacement Opportunities', utilityReplacements, 'utility') : ''}
</body>
</html>
        `;
    }

    generateRefactoringHtml(suggestions: RefactoringSuggestion[]): string {
        return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Refactoring Suggestions</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: var(--vscode-foreground);
            background-color: var(--vscode-editor-background);
            padding: 20px;
            max-width: 1200px;
            margin: 0 auto;
        }
        h1 {
            color: var(--vscode-textLink-foreground);
            border-bottom: 2px solid var(--vscode-textLink-foreground);
            padding-bottom: 10px;
        }
        .suggestion {
            background-color: var(--vscode-editor-inactiveSelectionBackground);
            margin: 20px 0;
            padding: 20px;
            border-radius: 8px;
            border-left: 4px solid var(--vscode-textLink-foreground);
        }
        .suggestion h2 {
            margin: 0 0 10px 0;
            color: var(--vscode-textPreformat-foreground);
        }
        .suggestion-type {
            display: inline-block;
            padding: 4px 12px;
            border-radius: 4px;
            font-size: 0.85em;
            font-weight: bold;
            margin: 10px 0;
            background-color: var(--vscode-badge-background);
            color: var(--vscode-badge-foreground);
        }
        .effort-badge {
            display: inline-block;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 0.8em;
            margin-left: 10px;
        }
        .effort-low { background-color: #28a745; color: white; }
        .effort-medium { background-color: #ffc107; color: black; }
        .effort-high { background-color: #dc3545; color: white; }
        .benefits {
            margin: 15px 0;
        }
        .benefits ul {
            list-style: none;
            padding: 0;
        }
        .benefits li {
            padding: 5px 0;
        }
        .benefits li:before {
            content: "✓ ";
            color: var(--vscode-gitDecoration-addedResourceForeground);
            font-weight: bold;
        }
        .code-preview {
            background-color: var(--vscode-textCodeBlock-background);
            padding: 15px;
            border-radius: 4px;
            overflow-x: auto;
            margin: 15px 0;
        }
        pre {
            margin: 0;
            font-family: 'Courier New', monospace;
            font-size: 0.9em;
        }
        .location {
            font-style: italic;
            color: var(--vscode-descriptionForeground);
            margin: 10px 0;
        }
    </style>
</head>
<body>
    <h1>💡 Refactoring Suggestions</h1>
    <p>Found ${suggestions.length} refactoring opportunities to improve your codebase.</p>
    
    ${suggestions.map((suggestion, index) => this.generateSuggestionHtml(suggestion, index)).join('')}
</body>
</html>
        `;
    }

    private generateSection(title: string, duplicates: DuplicateGroup[], category: string): string {
        return `
    <h2>${title}</h2>
    ${duplicates.map((group, index) => this.generateDuplicateGroupHtml(group, index, category)).join('')}
        `;
    }

    private generateDuplicateGroupHtml(group: DuplicateGroup, index: number, category: string): string {
        const firstBlock = group.blocks[0];
        const codePreview = this.escapeHtml(firstBlock.code.substring(0, 500));
        
        return `
    <div class="duplicate-group ${category}">
        <h3>Group ${index + 1}: ${firstBlock.name} <span class="similarity-badge">${(group.similarity * 100).toFixed(0)}% similar</span></h3>
        <p>Found ${group.blocks.length} instances of similar code:</p>
        ${group.blocks.map(block => `
        <div class="code-location">
            📄 ${this.escapeHtml(path.basename(block.filePath))} 
            (lines ${block.startLine}-${block.endLine})
            <br>
            <small>${this.escapeHtml(block.filePath)}</small>
        </div>
        `).join('')}
        <details>
            <summary>Show code preview</summary>
            <div class="code-preview">
                <pre>${codePreview}${firstBlock.code.length > 500 ? '...' : ''}</pre>
            </div>
        </details>
    </div>
        `;
    }

    private generateSuggestionHtml(suggestion: RefactoringSuggestion, index: number): string {
        return `
    <div class="suggestion">
        <h2>${index + 1}. ${suggestion.title}</h2>
        <span class="suggestion-type">${suggestion.type}</span>
        <span class="effort-badge effort-${suggestion.effort}">Effort: ${suggestion.effort}</span>
        
        <p>${suggestion.description}</p>
        
        ${suggestion.suggestedLocation ? `
        <div class="location">
            📍 Suggested location: ${this.escapeHtml(suggestion.suggestedLocation)}
        </div>
        ` : ''}
        
        <div class="benefits">
            <strong>Benefits:</strong>
            <ul>
                ${suggestion.benefits.map(benefit => `<li>${this.escapeHtml(benefit)}</li>`).join('')}
            </ul>
        </div>
        
        ${suggestion.suggestedCode ? `
        <details open>
            <summary>Suggested implementation</summary>
            <div class="code-preview">
                <pre>${this.escapeHtml(suggestion.suggestedCode)}</pre>
            </div>
        </details>
        ` : ''}
    </div>
        `;
    }

    private escapeHtml(text: string): string {
        const map: { [key: string]: string } = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, m => map[m]);
    }
}
