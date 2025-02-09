import type { CLIOptions } from '@/cli/interface';
import fs from 'fs/promises';
import path from 'path';

export async function getFileTypes(directory: string, options: CLIOptions): Promise<Record<string, string[]>> {

    const files = await fs.readdir(directory);
    const fileTypes: Record<string, string[]> = {};

    for(const file of files) {

        if(options.ignoreDotfiles && file.startsWith('.')) continue;

        const filePath = path.join(directory, file);
        const fileStat = await fs.stat(filePath);
    
        if(fileStat.isFile()) {
            const ext = path.extname(file).toLowerCase();
            if(!fileTypes[ext]) fileTypes[ext] = [];
            fileTypes[ext].push(file);
        }
    }

    return fileTypes;
}

export async function getFileNameGroups(directory: string, options: CLIOptions): Promise<Record<string, string[]>> {
    const files = await fs.readdir(directory);
    const fileGroups: Record<string, string[]> = {};

    for(const file of files) {

        if(options.ignoreDotfiles && file.startsWith('.')) continue;

        const filePath = path.join(directory, file);
        const fileStat = await fs.stat(filePath);
    
        if(fileStat.isFile()) {
            const baseFileName = path.basename(file).split('.')[0];
            if(!fileGroups[baseFileName]) fileGroups[baseFileName] = [];
            fileGroups[baseFileName].push(file);
        }
    }

    return fileGroups;
}

export async function getFileDateGroups(directory: string, options: CLIOptions): Promise<Record<string, string[]>> {
    const files = await fs.readdir(directory);
    const fileGroups: Record<string, string[]> = {};

    for(const file of files) {

        if(options.ignoreDotfiles && file.startsWith('.')) continue;

        const filePath = path.join(directory, file);
        const fileStat = await fs.stat(filePath);
    
        if(fileStat.isFile()) {
            const fileDate = fileStat.birthtime.toDateString();
            if(!fileGroups[fileDate]) fileGroups[fileDate] = [];
            fileGroups[fileDate].push(file);
        }
    }

    return fileGroups;
}