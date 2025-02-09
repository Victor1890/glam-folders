import { mkdir, rename, stat } from "fs/promises";

export class FileHandler {
	public async renameFile(srcPath: string, destPath: string): Promise<void> {
		await rename(srcPath, destPath);
	}

	public async createDirectory(directory: string): Promise<void> {
		await mkdir(directory);
	}

	public async folderExists(directory: string): Promise<boolean> {
		try {
			const fileStat = await stat(directory);
			return fileStat.isDirectory();
		} catch (error) {
			return false;
		}
	}

	public async fileExists(filePath: string): Promise<boolean> {
		try {
			const fileStat = await stat(filePath);
			return fileStat.isFile();
		} catch (error) {
			return false;
		}
	}
}
