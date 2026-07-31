import fs from "fs";
import path from "path";

const clientDir = path.resolve(process.cwd(), "dist/client");

if (!fs.existsSync(clientDir)) {
  fs.mkdirSync(clientDir, { recursive: true });
}

const assetsDir = path.join(clientDir, "assets");
let jsFile = "";
let cssFile = "";

if (fs.existsSync(assetsDir)) {
  const files = fs.readdirSync(assetsDir);
  jsFile = files.find((f) => f.startsWith("index-") && f.endsWith(".js")) || "";
  cssFile = files.find((f) => f.startsWith("styles-") && f.endsWith(".css")) || "";
}

const htmlContent = `<!DOCTYPE html>
<html lang="pt">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CD Aves · Clube Desportivo das Aves</title>
  ${cssFile ? `<link rel="stylesheet" href="/assets/${cssFile}">` : ""}
</head>
<body class="bg-background text-foreground antialiased">
  <div id="root"></div>
  ${jsFile ? `<script type="module" src="/assets/${jsFile}"></script>` : ""}
</body>
</html>`;

fs.writeFileSync(path.join(clientDir, "index.html"), htmlContent, "utf-8");
console.log("✔ Created dist/client/index.html successfully for Vercel deployment!");
