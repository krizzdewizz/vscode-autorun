'use strict';

import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

interface Config {
    tasks?: boolean;
    launch?: 'debug' | 'run';
}

export function activate(context: vscode.ExtensionContext) {
    const all = [];

    const autorun: Config = vscode.workspace.getConfiguration('autorun') as any;
    if (autorun.tasks) {
        all.push(['.vscode/tasks.json', 'workbench.action.tasks.build']);
    }
    if (autorun.launch) {
        all.push(['.vscode/launch.json', autorun.launch === 'debug' ? 'workbench.action.debug.start' : 'workbench.action.debug.run'])
    }

    all.forEach(pair => {

        const absFile = path.join(vscode.workspace.rootPath, pair[0]);
        const cmd = pair[1];

        fs.exists(absFile, exists => {
            if (exists) {
                vscode.commands.executeCommand(cmd);
            }
        });
    });
}

export function deactivate() {

}