'use strict';

import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

enum LaunchType {
    none, debug, run
}

interface Config {
    build?: boolean; // and if tasks.json present
    launch?: string; // and if launch.json present
}

function fileExists(file: string): Promise<boolean> {
    const abs = path.join(vscode.workspace.rootPath, file);
    return new Promise<boolean>(resolve => fs.exists(abs, exists => {
        if (exists) {
            resolve(true);
        }
    }));
}

export function activate(context: vscode.ExtensionContext) {

    const autorun: Config = vscode.workspace.getConfiguration('autorun') as any;
    if (autorun.build) {
        fileExists('.vscode/tasks.json').then(() => vscode.commands.executeCommand('workbench.action.tasks.build'));
    }

    const launch: LaunchType = LaunchType[autorun.launch];
    if (launch !== undefined && launch !== LaunchType.none) {
        const cmd = launch === LaunchType.debug ? 'workbench.action.debug.start' : 'workbench.action.debug.run';
        fileExists('.vscode/launch.json').then(() => vscode.commands.executeCommand(cmd));
    }
}

export function deactivate() {

}