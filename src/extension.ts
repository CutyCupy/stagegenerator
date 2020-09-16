// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "stagegenerator" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let stage = vscode.commands.registerCommand('stagegenerator.generateStage', () => {
		const editor = vscode.window.activeTextEditor;

		if (editor) {
			const selection = editor.selection;
			const input = vscode.window.createInputBox();
			input.title = "Stage Name";
			input.show();

			input.onDidAccept(() => {
				input.dispose();
				editor.edit(editBuilder => {
					input.value = input.value.charAt(0).toUpperCase() + input.value.slice(1);

					let shortVersion = "";

					for (const char of input.value) {
						if (char == char.toUpperCase()) {
							shortVersion += char.toLowerCase();
						}
					}
					if (!input.value.endsWith("Stage")) {
						input.value += "Stage";
					}
					editBuilder.replace(selection, getStageText(shortVersion, input.value));
				});
			});

		}
	});

	let converter = vscode.commands.registerCommand('stagegenerator.generateConverter', () => {
		const editor = vscode.window.activeTextEditor;

		if (editor) {
			const selection = editor.selection;
			const input = vscode.window.createInputBox();
			input.title = "Converter Name";
			input.show();

			input.onDidAccept(() => {
				input.dispose();
				editor.edit(editBuilder => {
					input.value = input.value.charAt(0).toUpperCase() + input.value.slice(1);

					let shortVersion = "";

					for (const char of input.value) {
						if (char == char.toUpperCase()) {
							shortVersion += char.toLowerCase();
						}
					}
					if (!input.value.endsWith("Converter")) {
						input.value += "Converter";
					}
					editBuilder.replace(selection, getConverterText(shortVersion, input.value));
				});
			});

		}
	});

	context.subscriptions.push(stage);
	context.subscriptions.push(converter);
}

function getStageText(short: string, long: string): string {
	return `type ${long} struct {
	ID syncore.StageID
}
	
func (${short} *${long}) GetID() syncore.StageID {
	return ${short}.ID
}

func (${short} *${long}) GetDependencies() []syncore.StageDependency {
	return []syncore.StageDependency{}
}

func (${short} *${long}) Exec(ctx *syncore.StageContext) error {
	
	return nil
}`
}

function getConverterText(short: string, long: string): string {
	return `type ${long} struct {
	ID syncore.ConverterID
}
	
func (${short} *${long}) GetID() syncore.ConverterID {
	return ${short}.ID
}

func (${short} *${long}) GetFilledTables() []string {
	return []string{}
}

func (${short} *${long}) Convert(ctx *syncore.ConverterContext) error {
	
	return nil
}`
}
// this method is called when your extension is deactivated
export function deactivate() { }
