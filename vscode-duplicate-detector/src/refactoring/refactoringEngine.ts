import { DuplicateGroup } from '../detector/duplicateDetector';
import * as path from 'path';

export interface RefactoringSuggestion {
    type: 'extract-function' | 'extract-class' | 'use-utility' | 'extend-existing';
    title: string;
    description: string;
    duplicateGroup: DuplicateGroup;
    suggestedLocation?: string;
    suggestedCode?: string;
    benefits: string[];
    effort: 'low' | 'medium' | 'high';
}

export class RefactoringEngine {
    generateSuggestions(duplicates: DuplicateGroup[]): RefactoringSuggestion[] {
        const suggestions: RefactoringSuggestion[] = [];

        for (const duplicate of duplicates) {
            if (duplicate.category === 'utility') {
                suggestions.push(this.createUtilitySuggestion(duplicate));
            } else if (duplicate.blocks[0].type === 'function' || duplicate.blocks[0].type === 'method') {
                suggestions.push(this.createExtractFunctionSuggestion(duplicate));
            } else if (duplicate.blocks[0].type === 'class') {
                suggestions.push(this.createExtractClassSuggestion(duplicate));
            }
        }

        return suggestions;
    }

    private createExtractFunctionSuggestion(duplicate: DuplicateGroup): RefactoringSuggestion {
        const blocks = duplicate.blocks;
        const commonPath = this.findCommonPath(blocks.map(b => b.filePath));
        
        const functionName = this.suggestFunctionName(blocks[0].name);
        const suggestedLocation = path.join(commonPath, 'utils', 'shared.ts');

        return {
            type: 'extract-function',
            title: `Extract common function: ${functionName}`,
            description: `Found ${blocks.length} similar implementations of "${blocks[0].name}". Consider extracting to a shared utility function.`,
            duplicateGroup: duplicate,
            suggestedLocation,
            suggestedCode: this.generateExtractedFunction(blocks[0], functionName),
            benefits: [
                'Reduces code duplication',
                'Improves maintainability',
                'Single source of truth for logic',
                'Easier to test',
            ],
            effort: blocks.length < 5 ? 'low' : 'medium',
        };
    }

    private createExtractClassSuggestion(duplicate: DuplicateGroup): RefactoringSuggestion {
        const blocks = duplicate.blocks;
        const commonPath = this.findCommonPath(blocks.map(b => b.filePath));
        
        const className = this.suggestClassName(blocks[0].name);
        const suggestedLocation = path.join(commonPath, 'shared', `${className}.ts`);

        return {
            type: 'extract-class',
            title: `Extract common class: ${className}`,
            description: `Found ${blocks.length} similar class implementations. Consider creating a base class or shared library.`,
            duplicateGroup: duplicate,
            suggestedLocation,
            suggestedCode: this.generateBaseClass(blocks[0], className),
            benefits: [
                'Promotes code reuse through inheritance',
                'Centralizes common behavior',
                'Easier to maintain and extend',
                'Follows DRY principle',
            ],
            effort: blocks.length < 3 ? 'medium' : 'high',
        };
    }

    private createUtilitySuggestion(duplicate: DuplicateGroup): RefactoringSuggestion {
        const block = duplicate.blocks[0];
        
        let utilityName = 'unknown';
        let replacement = '';

        // Detect the type of utility pattern
        if (block.code.includes('JSON.parse') && block.code.includes('JSON.stringify')) {
            utilityName = 'deep cloning';
            replacement = 'structuredClone() or Lodash _.cloneDeep()';
        } else if (block.code.includes('.map(')) {
            utilityName = 'array mapping';
            replacement = 'Lodash _.map()';
        } else if (block.code.includes('.filter(')) {
            utilityName = 'array filtering';
            replacement = 'Lodash _.filter()';
        } else if (block.code.includes('setTimeout') && block.code.includes('clearTimeout')) {
            utilityName = 'debouncing';
            replacement = 'Lodash _.debounce()';
        }

        return {
            type: 'use-utility',
            title: `Replace ${utilityName} with existing utility`,
            description: `Custom ${utilityName} implementation can be replaced with ${replacement}.`,
            duplicateGroup: duplicate,
            benefits: [
                'Use well-tested library functions',
                'Reduce custom code maintenance',
                'Better performance in many cases',
                'Standard implementation patterns',
            ],
            effort: 'low',
        };
    }

    private suggestFunctionName(originalName: string): string {
        // Clean up the name and make it more generic
        const cleaned = originalName.replace(/\d+$/, '').replace(/[_-]/g, '');
        return `shared${cleaned.charAt(0).toUpperCase()}${cleaned.slice(1)}`;
    }

    private suggestClassName(originalName: string): string {
        const cleaned = originalName.replace(/\d+$/, '').replace(/[_-]/g, '');
        return `Base${cleaned.charAt(0).toUpperCase()}${cleaned.slice(1)}`;
    }

    private generateExtractedFunction(block: any, functionName: string): string {
        return `/**
 * Extracted common function from ${block.filePath}
 * Original function: ${block.name}
 */
export function ${functionName}(/* parameters */) {
    // TODO: Extract common logic here
    // Original code:
    ${this.indentCode(block.code, 1)}
}`;
    }

    private generateBaseClass(block: any, className: string): string {
        return `/**
 * Base class extracted from common patterns
 * Original class: ${block.name}
 */
export class ${className} {
    // TODO: Extract common properties and methods
    
    constructor() {
        // Common initialization logic
    }
    
    // Common methods extracted from:
    ${this.indentCode(`// ${block.filePath}`, 1)}
}`;
    }

    private indentCode(code: string, level: number): string {
        const indent = '    '.repeat(level);
        return code.split('\n').map(line => indent + line).join('\n');
    }

    private findCommonPath(filePaths: string[]): string {
        if (filePaths.length === 0) return '';
        if (filePaths.length === 1) return path.dirname(filePaths[0]);

        const paths = filePaths.map(p => p.split(path.sep));
        const commonParts: string[] = [];

        for (let i = 0; i < paths[0].length; i++) {
            const part = paths[0][i];
            if (paths.every(p => p[i] === part)) {
                commonParts.push(part);
            } else {
                break;
            }
        }

        return commonParts.join(path.sep);
    }
}
