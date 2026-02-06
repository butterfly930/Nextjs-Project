import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { parse } from '@babel/parser';
import traverse from '@babel/traverse';
import * as t from '@babel/types';

export interface CodeBlock {
    type: 'function' | 'class' | 'method' | 'block';
    name: string;
    code: string;
    filePath: string;
    startLine: number;
    endLine: number;
    tokens: string[];
    ast: any;
    hash: string;
}

export class CodeAnalyzer {
    private excludePatterns: string[];
    private includeExtensions: string[];

    constructor() {
        this.excludePatterns = this.getConfig<string[]>('excludePatterns');
        this.includeExtensions = this.getConfig<string[]>('includeExtensions');
    }

    async analyzeWorkspace(
        workspacePath: string,
        progress?: vscode.Progress<{ message?: string; increment?: number }>,
        token?: vscode.CancellationToken
    ): Promise<CodeBlock[]> {
        const files = await this.findFiles(workspacePath);
        const results: CodeBlock[] = [];

        for (let i = 0; i < files.length; i++) {
            if (token?.isCancellationRequested) {
                break;
            }

            const file = files[i];
            progress?.report({
                message: `Analyzing ${path.basename(file)}...`,
                increment: (1 / files.length) * 100,
            });

            const blocks = await this.analyzeFile(file);
            results.push(...blocks);
        }

        return results;
    }

    async analyzeFile(filePath: string): Promise<CodeBlock[]> {
        try {
            const content = fs.readFileSync(filePath, 'utf-8');
            return this.analyzeCode(content, filePath);
        } catch (error) {
            console.error(`Error analyzing file ${filePath}:`, error);
            return [];
        }
    }

    analyzeCode(code: string, filePath: string): CodeBlock[] {
        const blocks: CodeBlock[] = [];
        const ext = path.extname(filePath);

        try {
            let ast;
            
            // Parse based on file extension
            if (['.ts', '.tsx', '.js', '.jsx'].includes(ext)) {
                ast = parse(code, {
                    sourceType: 'module',
                    plugins: ['typescript', 'jsx'],
                });
            } else {
                // For other languages, we'll use simple text-based analysis
                return this.simpleTextAnalysis(code, filePath);
            }

            // Traverse AST to extract code blocks
            traverse(ast, {
                FunctionDeclaration: (path) => {
                    const node = path.node;
                    if (node.loc) {
                        blocks.push(this.createCodeBlock(
                            'function',
                            node.id?.name || 'anonymous',
                            code.substring(node.start!, node.end!),
                            filePath,
                            node.loc.start.line,
                            node.loc.end.line,
                            node
                        ));
                    }
                },
                ClassDeclaration: (path) => {
                    const node = path.node;
                    if (node.loc) {
                        blocks.push(this.createCodeBlock(
                            'class',
                            node.id?.name || 'anonymous',
                            code.substring(node.start!, node.end!),
                            filePath,
                            node.loc.start.line,
                            node.loc.end.line,
                            node
                        ));
                    }
                },
                ClassMethod: (path) => {
                    const node = path.node;
                    if (node.loc && t.isIdentifier(node.key)) {
                        blocks.push(this.createCodeBlock(
                            'method',
                            node.key.name,
                            code.substring(node.start!, node.end!),
                            filePath,
                            node.loc.start.line,
                            node.loc.end.line,
                            node
                        ));
                    }
                },
                ArrowFunctionExpression: (path) => {
                    const node = path.node;
                    if (node.loc && node.body.type === 'BlockStatement') {
                        const parent = path.parent;
                        let name = 'anonymous';
                        
                        if (t.isVariableDeclarator(parent) && t.isIdentifier(parent.id)) {
                            name = parent.id.name;
                        }

                        blocks.push(this.createCodeBlock(
                            'function',
                            name,
                            code.substring(node.start!, node.end!),
                            filePath,
                            node.loc.start.line,
                            node.loc.end.line,
                            node
                        ));
                    }
                }
            });
        } catch (error) {
            console.error(`Error parsing code:`, error);
            return this.simpleTextAnalysis(code, filePath);
        }

        return blocks;
    }

    private simpleTextAnalysis(code: string, filePath: string): CodeBlock[] {
        const blocks: CodeBlock[] = [];
        const lines = code.split('\n');
        
        // Simple pattern matching for common function declarations
        const patterns = [
            /function\s+(\w+)\s*\(/,
            /def\s+(\w+)\s*\(/,  // Python
            /class\s+(\w+)/,
            /public\s+\w+\s+(\w+)\s*\(/,  // Java/C#
        ];

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            for (const pattern of patterns) {
                const match = line.match(pattern);
                if (match) {
                    const name = match[1];
                    const blockCode = this.extractBlock(lines, i);
                    blocks.push(this.createCodeBlock(
                        'function',
                        name,
                        blockCode,
                        filePath,
                        i + 1,
                        i + blockCode.split('\n').length,
                        null
                    ));
                }
            }
        }

        return blocks;
    }

    private extractBlock(lines: string[], startIndex: number): string {
        const block: string[] = [];
        let braceCount = 0;
        let started = false;

        for (let i = startIndex; i < lines.length; i++) {
            const line = lines[i];
            block.push(line);

            for (const char of line) {
                if (char === '{') {
                    braceCount++;
                    started = true;
                } else if (char === '}') {
                    braceCount--;
                }
            }

            if (started && braceCount === 0) {
                break;
            }
        }

        return block.join('\n');
    }

    private createCodeBlock(
        type: CodeBlock['type'],
        name: string,
        code: string,
        filePath: string,
        startLine: number,
        endLine: number,
        ast: any
    ): CodeBlock {
        const tokens = this.tokenize(code);
        const hash = this.computeHash(tokens);

        return {
            type,
            name,
            code,
            filePath,
            startLine,
            endLine,
            tokens,
            ast,
            hash,
        };
    }

    private tokenize(code: string): string[] {
        // Simple tokenization - split by whitespace and operators
        return code
            .replace(/([{}();,=<>+\-*\/])/g, ' $1 ')
            .split(/\s+/)
            .filter((token) => token.length > 0);
    }

    private computeHash(tokens: string[]): string {
        // Create a normalized hash for similarity comparison
        const normalized = tokens.join('|').toLowerCase();
        return this.simpleHash(normalized);
    }

    private simpleHash(str: string): string {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = (hash << 5) - hash + char;
            hash = hash & hash;
        }
        return hash.toString(36);
    }

    private async findFiles(workspacePath: string): Promise<string[]> {
        const files: string[] = [];
        
        const processDirectory = (dir: string) => {
            const items = fs.readdirSync(dir);
            
            for (const item of items) {
                const fullPath = path.join(dir, item);
                
                // Check exclude patterns
                if (this.shouldExclude(fullPath)) {
                    continue;
                }

                const stat = fs.statSync(fullPath);
                
                if (stat.isDirectory()) {
                    processDirectory(fullPath);
                } else if (stat.isFile()) {
                    const ext = path.extname(fullPath);
                    if (this.includeExtensions.includes(ext)) {
                        files.push(fullPath);
                    }
                }
            }
        };

        processDirectory(workspacePath);
        return files;
    }

    private shouldExclude(filePath: string): boolean {
        const normalizedPath = filePath.replace(/\\/g, '/');
        
        return this.excludePatterns.some((pattern) => {
            const regex = this.globToRegex(pattern);
            return regex.test(normalizedPath);
        });
    }

    private globToRegex(glob: string): RegExp {
        const escaped = glob
            .replace(/\./g, '\\.')
            .replace(/\*\*/g, '.*')
            .replace(/\*/g, '[^/]*')
            .replace(/\?/g, '.');
        return new RegExp(escaped);
    }

    private getConfig<T>(key: string): T {
        return vscode.workspace
            .getConfiguration('duplicateDetector')
            .get<T>(key) as T;
    }
}
