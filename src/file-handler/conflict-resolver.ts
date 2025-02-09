import path from "path";
import { FileHandler } from "./file-handler";

export class ConflictResolver {
	private fileHandler: FileHandler;

	constructor() {
		this.fileHandler = new FileHandler();
	}

	public async resolveConflict(
		srcPath: string,
		destPath: string,
	): Promise<string> {
		let newFilePath = path.join(destPath, path.basename(srcPath));
		let counter = 1;

		while (await this.fileHandler.fileExists(newFilePath)) {
			newFilePath = path.join(
				destPath,
				`${path.basename(srcPath, path.extname(srcPath))}-${counter}${path.extname(srcPath)}`,
			);
			counter++;
		}

		return newFilePath;
	}
}
