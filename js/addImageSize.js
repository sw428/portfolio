// 実行コマンド　node addImageSize.js
const fs = require("fs");
const path = require("path");
const { imageSize } = require("image-size");

const ROOT_DIR = process.cwd();

// 対象にするHTMLファイル
const TARGET_EXTENSIONS = [".html"];

// サイズ取得対象の画像拡張子
const IMAGE_EXTENSIONS = [".png", ".jpg", ".jpeg", ".webp", ".gif", ".bmp"];

// 除外フォルダ
const IGNORE_DIRS = new Set(["node_modules", ".git", "dist", "build"]);

function walk(dir) {
	const entries = fs.readdirSync(dir, { withFileTypes: true });
	let files = [];

	for (const entry of entries) {
		const fullPath = path.join(dir, entry.name);

		if (entry.isDirectory()) {
			if (IGNORE_DIRS.has(entry.name)) continue;
			files = files.concat(walk(fullPath));
		} else {
			if (
				TARGET_EXTENSIONS.includes(
					path.extname(entry.name).toLowerCase()
				)
			) {
				files.push(fullPath);
			}
		}
	}

	return files;
}

function isLocalImage(src) {
	if (!src) return false;
	if (
		src.startsWith("http://") ||
		src.startsWith("https://") ||
		src.startsWith("//") ||
		src.startsWith("data:")
	) {
		return false;
	}

	const cleanSrc = src.split("?")[0].split("#")[0];
	const ext = path.extname(cleanSrc).toLowerCase();
	return IMAGE_EXTENSIONS.includes(ext);
}

function addOrReplaceSizeAttributes(imgTag, width, height) {
	let updated = imgTag;

	if (/width\s*=\s*["'][^"']*["']/i.test(updated)) {
		updated = updated.replace(
			/width\s*=\s*["'][^"']*["']/i,
			`width="${width}"`
		);
	} else {
		updated = updated.replace(/^<img\b/i, `<img width="${width}"`);
	}

	if (/height\s*=\s*["'][^"']*["']/i.test(updated)) {
		updated = updated.replace(
			/height\s*=\s*["'][^"']*["']/i,
			`height="${height}"`
		);
	} else {
		updated = updated.replace(/^<img\b[^>]*width="[^"]*"/i, (match) => {
			return `${match} height="${height}"`;
		});
	}

	return updated;
}

function processHtmlFile(htmlPath) {
	let html = fs.readFileSync(htmlPath, "utf8");
	let changed = false;

	const imgTagRegex = /<img\b[^>]*\bsrc\s*=\s*["']([^"']+)["'][^>]*>/gi;

	html = html.replace(imgTagRegex, (imgTag, src) => {
		if (!isLocalImage(src)) {
			console.log(`skip(remote or unsupported): ${src}`);
			return imgTag;
		}

		const cleanSrc = src.split("?")[0].split("#")[0];
		const imagePath = path.resolve(path.dirname(htmlPath), cleanSrc);

		if (!fs.existsSync(imagePath)) {
			console.log(`skip(not found): ${src}`);
			return imgTag;
		}

		try {
			const size = imageSize(imagePath);

			if (!size.width || !size.height) {
				console.log(`skip(no size): ${src}`);
				return imgTag;
			}

			const newTag = addOrReplaceSizeAttributes(
				imgTag,
				size.width,
				size.height
			);

			if (newTag !== imgTag) {
				changed = true;
				console.log(`updated: ${src} -> ${size.width}x${size.height}`);
			}

			return newTag;
		} catch (error) {
			console.log(`skip(error): ${src}`);
			return imgTag;
		}
	});

	if (changed) {
		fs.writeFileSync(htmlPath, html, "utf8");
		console.log(`saved: ${path.relative(ROOT_DIR, htmlPath)}`);
	}
}

const htmlFiles = walk(ROOT_DIR);

if (htmlFiles.length === 0) {
	console.log("HTMLファイルが見つかりませんでした。");
	process.exit(0);
}

for (const file of htmlFiles) {
	processHtmlFile(file);
}

console.log("done");
