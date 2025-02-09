import path from 'path';
import type { CLIOptions } from "@/cli/interface";
import { FILE_TYPE_MAP } from "@/config/constant";
import { ConflictResolver } from "@/file-handler/conflict-resolver";
import { FileHandler } from "@/file-handler/file-handler";
import { ReportGenerator } from "@/report/report-generator";
import { getFileTypes, getFileNameGroups, getFileDateGroups } from "@/utils/file.util";
import type { ISummary } from '@/report/interface';

export class FileOrganizer {

    private fileHandler: FileHandler;
    private conflictResolver: ConflictResolver;
    private reportGenerator: ReportGenerator;

    constructor() {
        this.fileHandler = new FileHandler();
        this.conflictResolver = new ConflictResolver();
        this.reportGenerator = new ReportGenerator();
    }

    public async organizeFiles(directory: string, options: CLIOptions) {
        // const fileType = await (options.name ? getFileNameGroups(directory, options) : getFileTypes(directory, options));

        let fileType: Record<string, string[]> = {};
        if(options.name) fileType = await getFileNameGroups(directory, options);
        else if(options.date) fileType = await getFileDateGroups(directory, options);
        else fileType = await getFileTypes(directory, options);

        const summary: ISummary[] = [];

        for(const [key, files] of Object.entries(fileType)) {
            
            const folderName = options.ext ? key : FILE_TYPE_MAP[key] || `others-${key.replace('.', '')}`;
            const folderPath = path.join(directory, folderName);

            if(!(await this.fileHandler.folderExists(folderPath))) {
                await this.fileHandler.createDirectory(folderPath);
            }

            let filesAdded = 0;

            for (const file of files) {
                let newFilePath = await this.conflictResolver.resolveConflict(path.join(directory, file), folderPath);
                await this.fileHandler.renameFile(path.join(directory, file), newFilePath);
                filesAdded++;
            }

            summary.push({ folder: folderName, filesAdded });
        }

        const totalFiles = Object.values(fileType).reduce((acc, files) => acc + files.length, 0);

        this.reportGenerator.generateReport(summary, directory, totalFiles);
    }
}