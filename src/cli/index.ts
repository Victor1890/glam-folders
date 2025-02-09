import path from "path";
import { FileOrganizer } from "@/organization/file-organizer";
import { Command } from "commander";
import { Logger } from "tslog";
import type { CLIOptions } from "./interface";

export class CLI {
	private program: Command;
	private logger: Logger<unknown>;
	private fileOrganizer: FileOrganizer;

	constructor() {
		this.program = new Command();
		this.logger = new Logger<unknown>({
			prettyLogTemplate: "{{logLevelName}}\t",
		});
		this.fileOrganizer = new FileOrganizer();
		this.configureCommands();
	}

	private configureCommands() {
		this.program
			.argument("[directory]", "Directory to  glam folder", ".")
			.description("Organize files in a directory based on their extensions")
			.option("--ext", "Use the file extensions as folder names")
			.option("--name", "Group files by starting name")
			.option("--date", "Group files by date created")
			.option("--ignore-dotfiles", "Ignore dotfiles", true)
			.action(async (dir: string, options: CLIOptions) => {
				try {
					const directory = path.resolve(dir || ".");
					await this.fileOrganizer.organizeFiles(directory, options);
				} catch (e) {
					const error = e as Error;
					this.logger.error(error.message, error.stack);
					process.exit(1);
				}
			});

		this.program
			.command("-h, --help")
			.description("Display help")
			.action(() => this.program.help());
	}

	public run() {
		this.program.parse(process.argv);
	}
}
