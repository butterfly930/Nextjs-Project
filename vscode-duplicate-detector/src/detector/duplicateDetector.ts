import * as vscode from 'vscode';
import { CodeBlock } from '../analyzer/codeAnalyzer';

export interface DuplicateGroup {
    id: string;
    blocks: CodeBlock[];
    similarity: number;
    category: 'exact' | 'similar' | 'utility';
}

export class DuplicateDetector {
    private similarityThreshold: number;
    private minimumTokens: number;

    constructor() {
        this.similarityThreshold = this.getConfig<number>('similarityThreshold');
        this.minimumTokens = this.getConfig<number>('minimumTokens');
    }

    findDuplicates(codeBlocks: CodeBlock[]): DuplicateGroup[] {
        const duplicates: DuplicateGroup[] = [];
        const processed = new Set<number>();

        for (let i = 0; i < codeBlocks.length; i++) {
            if (processed.has(i)) continue;

            const block1 = codeBlocks[i];
            if (block1.tokens.length < this.minimumTokens) continue;

            const similarBlocks: CodeBlock[] = [block1];

            for (let j = i + 1; j < codeBlocks.length; j++) {
                if (processed.has(j)) continue;

                const block2 = codeBlocks[j];
                if (block2.tokens.length < this.minimumTokens) continue;

                const similarity = this.calculateSimilarity(block1, block2);

                if (similarity >= this.similarityThreshold) {
                    similarBlocks.push(block2);
                    processed.add(j);
                }
            }

            if (similarBlocks.length > 1) {
                processed.add(i);
                const avgSimilarity = this.calculateAverageSimilarity(similarBlocks);
                duplicates.push({
                    id: this.generateId(),
                    blocks: similarBlocks,
                    similarity: avgSimilarity,
                    category: avgSimilarity > 0.95 ? 'exact' : 'similar',
                });
            }
        }

        return duplicates;
    }

    findDuplicatesAcrossRepos(codeBlocks: CodeBlock[]): DuplicateGroup[] {
        // Group blocks by repository
        const repoBlocks = new Map<string, CodeBlock[]>();
        
        for (const block of codeBlocks) {
            const repo = this.getRepositoryFromPath(block.filePath);
            if (!repoBlocks.has(repo)) {
                repoBlocks.set(repo, []);
            }
            repoBlocks.get(repo)!.push(block);
        }

        // Find cross-repository duplicates
        const duplicates: DuplicateGroup[] = [];
        const repos = Array.from(repoBlocks.keys());

        for (let i = 0; i < repos.length; i++) {
            const repo1Blocks = repoBlocks.get(repos[i])!;

            for (let j = i + 1; j < repos.length; j++) {
                const repo2Blocks = repoBlocks.get(repos[j])!;

                for (const block1 of repo1Blocks) {
                    if (block1.tokens.length < this.minimumTokens) continue;

                    const similarBlocks: CodeBlock[] = [block1];

                    for (const block2 of repo2Blocks) {
                        if (block2.tokens.length < this.minimumTokens) continue;

                        const similarity = this.calculateSimilarity(block1, block2);

                        if (similarity >= this.similarityThreshold) {
                            similarBlocks.push(block2);
                        }
                    }

                    if (similarBlocks.length > 1) {
                        const avgSimilarity = this.calculateAverageSimilarity(similarBlocks);
                        duplicates.push({
                            id: this.generateId(),
                            blocks: similarBlocks,
                            similarity: avgSimilarity,
                            category: avgSimilarity > 0.95 ? 'exact' : 'similar',
                        });
                    }
                }
            }
        }

        return duplicates;
    }

    async findSimilarCode(code: string, currentFile: string): Promise<DuplicateGroup[]> {
        // This would need access to the analyzer to tokenize the code
        // For now, return empty array
        return [];
    }

    detectUtilityReplacements(codeBlocks: CodeBlock[]): DuplicateGroup[] {
        const replacements: DuplicateGroup[] = [];

        // Common utility patterns to detect
        const utilityPatterns = [
            {
                name: 'Array mapping',
                pattern: /\.map\s*\(\s*\w+\s*=>\s*\w+\.\w+\s*\)/,
                suggestion: 'Consider using Lodash _.map or Array.from',
            },
            {
                name: 'Array filtering',
                pattern: /\.filter\s*\(\s*\w+\s*=>\s*\w+\.\w+\s*===\s*/,
                suggestion: 'Consider using Lodash _.filter',
            },
            {
                name: 'Deep cloning',
                pattern: /JSON\.parse\s*\(\s*JSON\.stringify\s*\(/,
                suggestion: 'Use structuredClone() or Lodash _.cloneDeep',
            },
            {
                name: 'Date formatting',
                pattern: /new\s+Date\s*\(\s*\)\.toLocaleString/,
                suggestion: 'Consider using date-fns or Moment.js',
            },
            {
                name: 'Debouncing',
                pattern: /setTimeout\s*\(\s*\(\s*\)\s*=>\s*\{[\s\S]*clearTimeout/,
                suggestion: 'Use Lodash _.debounce',
            },
        ];

        for (const block of codeBlocks) {
            for (const pattern of utilityPatterns) {
                if (pattern.pattern.test(block.code)) {
                    replacements.push({
                        id: this.generateId(),
                        blocks: [block],
                        similarity: 1.0,
                        category: 'utility',
                    });
                }
            }
        }

        return replacements;
    }

    private calculateSimilarity(block1: CodeBlock, block2: CodeBlock): number {
        // Use Jaccard similarity for token comparison
        const set1 = new Set(block1.tokens);
        const set2 = new Set(block2.tokens);

        const intersection = new Set([...set1].filter(x => set2.has(x)));
        const union = new Set([...set1, ...set2]);

        return intersection.size / union.size;
    }

    private calculateAverageSimilarity(blocks: CodeBlock[]): number {
        if (blocks.length < 2) return 1.0;

        let totalSimilarity = 0;
        let comparisons = 0;

        for (let i = 0; i < blocks.length; i++) {
            for (let j = i + 1; j < blocks.length; j++) {
                totalSimilarity += this.calculateSimilarity(blocks[i], blocks[j]);
                comparisons++;
            }
        }

        return comparisons > 0 ? totalSimilarity / comparisons : 1.0;
    }

    private getRepositoryFromPath(filePath: string): string {
        // Extract repository name from file path
        const parts = filePath.split(/[\/\\]/);
        
        // Try to find a typical repository root indicator
        const indicators = ['src', 'lib', 'app', 'packages', '.git'];
        
        for (let i = parts.length - 1; i >= 0; i--) {
            if (indicators.includes(parts[i])) {
                return parts[i - 1] || parts[i];
            }
        }
        
        return parts[0] || 'unknown';
    }

    private generateId(): string {
        return `dup_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    private getConfig<T>(key: string): T {
        return vscode.workspace
            .getConfiguration('duplicateDetector')
            .get<T>(key) as T;
    }
}
