import * as vscode from 'vscode';
import { DuplicateGroup } from '../detector/duplicateDetector';
import * as path from 'path';

export class ResultsProvider implements vscode.TreeDataProvider<ResultItem> {
    private _onDidChangeTreeData: vscode.EventEmitter<ResultItem | undefined | null | void> = 
        new vscode.EventEmitter<ResultItem | undefined | null | void>();
    readonly onDidChangeTreeData: vscode.Event<ResultItem | undefined | null | void> = 
        this._onDidChangeTreeData.event;

    private results: DuplicateGroup[] = [];

    constructor() {}

    updateResults(results: DuplicateGroup[]): void {
        this.results = results;
        this._onDidChangeTreeData.fire();
    }

    getResults(): DuplicateGroup[] {
        return this.results;
    }

    refresh(): void {
        this._onDidChangeTreeData.fire();
    }

    getTreeItem(element: ResultItem): vscode.TreeItem {
        return element;
    }

    getChildren(element?: ResultItem): Thenable<ResultItem[]> {
        if (!element) {
            // Root level - show duplicate groups
            return Promise.resolve(
                this.results.map((group, index) => {
                    const item = new ResultItem(
                        `Duplicate Group ${index + 1} (${group.blocks.length} instances)`,
                        vscode.TreeItemCollapsibleState.Collapsed,
                        'group',
                        group
                    );
                    item.description = `${(group.similarity * 100).toFixed(0)}% similar`;
                    item.tooltip = this.getGroupTooltip(group);
                    return item;
                })
            );
        } else if (element.contextValue === 'group') {
            // Show code blocks in the group
            const group = element.data as DuplicateGroup;
            return Promise.resolve(
                group.blocks.map(block => {
                    const fileName = path.basename(block.filePath);
                    const item = new ResultItem(
                        `${fileName}:${block.startLine}-${block.endLine}`,
                        vscode.TreeItemCollapsibleState.None,
                        'block',
                        block
                    );
                    item.description = `${block.type}: ${block.name}`;
                    item.tooltip = this.getBlockTooltip(block);
                    item.command = {
                        command: 'vscode.open',
                        title: 'Open File',
                        arguments: [
                            vscode.Uri.file(block.filePath),
                            {
                                selection: new vscode.Range(
                                    block.startLine - 1,
                                    0,
                                    block.endLine - 1,
                                    0
                                ),
                            },
                        ],
                    };
                    return item;
                })
            );
        }

        return Promise.resolve([]);
    }

    private getGroupTooltip(group: DuplicateGroup): string {
        const blocks = group.blocks;
        const locations = blocks.map(b => 
            `${path.basename(b.filePath)}:${b.startLine}`
        ).join(', ');
        
        return `Duplicate code found in:\n${locations}\n\nSimilarity: ${(group.similarity * 100).toFixed(1)}%`;
    }

    private getBlockTooltip(block: any): string {
        return `File: ${block.filePath}\nLines: ${block.startLine}-${block.endLine}\nType: ${block.type}\nName: ${block.name}\nTokens: ${block.tokens.length}`;
    }
}

export class ResultItem extends vscode.TreeItem {
    constructor(
        public readonly label: string,
        public readonly collapsibleState: vscode.TreeItemCollapsibleState,
        public readonly contextValue: string,
        public readonly data?: any
    ) {
        super(label, collapsibleState);
    }
}
