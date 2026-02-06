import * as vscode from 'vscode';
import { CodeAnalyzer } from './analyzer/codeAnalyzer';
import { DuplicateDetector } from './detector/duplicateDetector';
import { RefactoringEngine } from './refactoring/refactoringEngine';
import { ResultsProvider } from './views/resultsProvider';
import { ReportGenerator } from './report/reportGenerator';

let analyzer: CodeAnalyzer;
let detector: DuplicateDetector;
let refactoringEngine: RefactoringEngine;
let resultsProvider: ResultsProvider;
let reportGenerator: ReportGenerator;

export function activate(context: vscode.ExtensionContext) {
    console.log('Duplicate Code Detector extension is now active');

    // Initialize components
    analyzer = new CodeAnalyzer();
    detector = new DuplicateDetector();
    refactoringEngine = new RefactoringEngine();
    resultsProvider = new ResultsProvider();
    reportGenerator = new ReportGenerator();

    // Register tree view
    vscode.window.registerTreeDataProvider(
        'duplicateDetectorResults',
        resultsProvider
    );

    // Register commands
    const scanWorkspaceCommand = vscode.commands.registerCommand(
        'duplicateDetector.scanWorkspace',
        async () => {
            await scanWorkspace();
        }
    );

    const scanMultipleReposCommand = vscode.commands.registerCommand(
        'duplicateDetector.scanMultipleRepos',
        async () => {
            await scanMultipleRepos();
        }
    );

    const findSimilarFunctionsCommand = vscode.commands.registerCommand(
        'duplicateDetector.findSimilarFunctions',
        async () => {
            await findSimilarFunctions();
        }
    );

    const suggestRefactoringCommand = vscode.commands.registerCommand(
        'duplicateDetector.suggestRefactoring',
        async () => {
            await suggestRefactoring();
        }
    );

    const detectUtilityReplacementsCommand = vscode.commands.registerCommand(
        'duplicateDetector.detectUtilityReplacements',
        async () => {
            await detectUtilityReplacements();
        }
    );

    const showReportCommand = vscode.commands.registerCommand(
        'duplicateDetector.showReport',
        async () => {
            await showReport();
        }
    );

    // Register event handlers
    if (getConfig<boolean>('scanOnSave')) {
        const onSaveHandler = vscode.workspace.onDidSaveTextDocument(
            async (document) => {
                await onDocumentSave(document);
            }
        );
        context.subscriptions.push(onSaveHandler);
    }

    context.subscriptions.push(
        scanWorkspaceCommand,
        scanMultipleReposCommand,
        findSimilarFunctionsCommand,
        suggestRefactoringCommand,
        detectUtilityReplacementsCommand,
        showReportCommand
    );
}

async function scanWorkspace() {
    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (!workspaceFolders) {
        vscode.window.showErrorMessage('No workspace folder open');
        return;
    }

    await vscode.window.withProgress(
        {
            location: vscode.ProgressLocation.Notification,
            title: 'Scanning workspace for duplicates...',
            cancellable: true,
        },
        async (progress, token) => {
            try {
                const results = await analyzer.analyzeWorkspace(
                    workspaceFolders[0].uri.fsPath,
                    progress,
                    token
                );
                
                const duplicates = detector.findDuplicates(results);
                resultsProvider.updateResults(duplicates);
                
                vscode.window.showInformationMessage(
                    `Found ${duplicates.length} duplicate code patterns`
                );
            } catch (error) {
                vscode.window.showErrorMessage(
                    `Error scanning workspace: ${error}`
                );
            }
        }
    );
}

async function scanMultipleRepos() {
    const result = await vscode.window.showInputBox({
        prompt: 'Enter repository paths separated by commas',
        placeHolder: '/path/to/repo1, /path/to/repo2',
    });

    if (!result) {
        return;
    }

    const repoPaths = result.split(',').map((p) => p.trim());

    await vscode.window.withProgress(
        {
            location: vscode.ProgressLocation.Notification,
            title: 'Scanning multiple repositories...',
            cancellable: true,
        },
        async (progress, token) => {
            try {
                const allResults = [];
                for (const repoPath of repoPaths) {
                    progress.report({
                        message: `Scanning ${repoPath}...`,
                    });
                    const results = await analyzer.analyzeWorkspace(
                        repoPath,
                        progress,
                        token
                    );
                    allResults.push(...results);
                }

                const duplicates = detector.findDuplicatesAcrossRepos(allResults);
                resultsProvider.updateResults(duplicates);

                vscode.window.showInformationMessage(
                    `Found ${duplicates.length} duplicate patterns across repositories`
                );
            } catch (error) {
                vscode.window.showErrorMessage(
                    `Error scanning repositories: ${error}`
                );
            }
        }
    );
}

async function findSimilarFunctions() {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        vscode.window.showErrorMessage('No active editor');
        return;
    }

    const selection = editor.selection;
    const text = editor.document.getText(selection);

    if (!text) {
        vscode.window.showErrorMessage('No code selected');
        return;
    }

    await vscode.window.withProgress(
        {
            location: vscode.ProgressLocation.Notification,
            title: 'Finding similar code patterns...',
        },
        async (progress) => {
            try {
                const similar = await detector.findSimilarCode(
                    text,
                    editor.document.uri.fsPath
                );
                
                resultsProvider.updateResults(similar);
                
                vscode.window.showInformationMessage(
                    `Found ${similar.length} similar code patterns`
                );
            } catch (error) {
                vscode.window.showErrorMessage(
                    `Error finding similar code: ${error}`
                );
            }
        }
    );
}

async function suggestRefactoring() {
    const duplicates = resultsProvider.getResults();
    
    if (duplicates.length === 0) {
        vscode.window.showInformationMessage(
            'No duplicates found. Run a scan first.'
        );
        return;
    }

    const suggestions = refactoringEngine.generateSuggestions(duplicates);
    
    const panel = vscode.window.createWebviewPanel(
        'refactoringSuggestions',
        'Refactoring Suggestions',
        vscode.ViewColumn.One,
        {}
    );

    panel.webview.html = reportGenerator.generateRefactoringHtml(suggestions);
}

async function detectUtilityReplacements() {
    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (!workspaceFolders) {
        vscode.window.showErrorMessage('No workspace folder open');
        return;
    }

    await vscode.window.withProgress(
        {
            location: vscode.ProgressLocation.Notification,
            title: 'Detecting utility replacements...',
        },
        async (progress) => {
            try {
                const results = await analyzer.analyzeWorkspace(
                    workspaceFolders[0].uri.fsPath,
                    progress
                );
                
                const replacements = detector.detectUtilityReplacements(results);
                resultsProvider.updateResults(replacements);
                
                vscode.window.showInformationMessage(
                    `Found ${replacements.length} opportunities to use existing utilities`
                );
            } catch (error) {
                vscode.window.showErrorMessage(
                    `Error detecting replacements: ${error}`
                );
            }
        }
    );
}

async function showReport() {
    const duplicates = resultsProvider.getResults();
    
    const panel = vscode.window.createWebviewPanel(
        'duplicateReport',
        'Duplicate Code Analysis Report',
        vscode.ViewColumn.One,
        {}
    );

    panel.webview.html = reportGenerator.generateReportHtml(duplicates);
}

async function onDocumentSave(document: vscode.TextDocument) {
    const fileExt = document.fileName.substring(
        document.fileName.lastIndexOf('.')
    );
    const includeExtensions = getConfig<string[]>('includeExtensions');

    if (includeExtensions.includes(fileExt)) {
        // Perform incremental analysis
        const results = await analyzer.analyzeFile(document.uri.fsPath);
        const duplicates = detector.findDuplicates(results);
        
        if (duplicates.length > 0) {
            vscode.window.showWarningMessage(
                `Found ${duplicates.length} potential duplicates in saved file`
            );
        }
    }
}

function getConfig<T>(key: string): T {
    return vscode.workspace
        .getConfiguration('duplicateDetector')
        .get<T>(key) as T;
}

export function deactivate() {
    // Cleanup if needed
}
