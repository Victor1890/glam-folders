import type { ISummary } from "./interface";

export class ReportGenerator {
	public generateReport(
		summary: ISummary[],
		directory: string,
		totalFiles: number,
	): void {
		const lastDirectory = directory.split("/").pop();

		console.log(`\n🔍 Scanning directory...`);
		console.log(`📦 Found ${totalFiles} files`);
		console.log(`🎯 Organizing files by type...\n`);

		const categories = {
			images: { emoji: "📸", count: 0 },
			documents: { emoji: "📄", count: 0 },
			audio: { emoji: "🎵", count: 0 },
			video: { emoji: "🎬", count: 0 },
			archives: { emoji: "💾", count: 0 },
			compressed: { emoji: "🗜️", count: 0 },
			code: { emoji: "💻", count: 0 },
			data: { emoji: "📊", count: 0 },
			others: { emoji: "📂", count: 0 },
		};

		for (const { folder, filesAdded } of summary) {
			if (folder.includes("image")) {
				categories.images.count += filesAdded;
			} else if (folder.includes("document")) {
				categories.documents.count += filesAdded;
			} else if (folder.includes("audio")) {
				categories.audio.count += filesAdded;
			} else if (folder.includes("video")) {
				categories.video.count += filesAdded;
			} else if (
				folder.includes("archive") ||
				folder.includes("zip") ||
				folder.includes("rar")
			) {
				categories.archives.count += filesAdded;
			} else if (folder.includes("compressed")) {
				categories.compressed.count += filesAdded;
			} else if (folder.includes("data")) {
				categories.data.count += filesAdded;
			} else if (folder.includes("code")) {
				categories.code.count += filesAdded;
			} else {
				categories.others.count += filesAdded;
			}
		}

		console.log(`✨ Created categories:\n`);
		for (const [key, { emoji, count }] of Object.entries(categories)) {
			if (count > 0) {
				console.log(
					`   ${emoji} ${
						key.charAt(0).toUpperCase() + key.slice(1)
					} (${count} files)`,
				);
			}
		}
		console.log(
			`\n✅ All done! Your files are now organized in ${lastDirectory} with a total of ${totalFiles} files.\n`,
		);
	}
}
