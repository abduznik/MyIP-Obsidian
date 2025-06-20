"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const obsidian_1 = require("obsidian");
class MyIPPlugin extends obsidian_1.Plugin {
    onload() {
        return __awaiter(this, void 0, void 0, function* () {
            this.addCommand({
                id: "insert-ip-info-inline",
                name: "Insert IP Info at Cursor",
                callback: () => __awaiter(this, void 0, void 0, function* () {
                    try {
                        const res = yield (0, obsidian_1.request)({
                            url: "https://api.myip.com",
                            method: "GET",
                        });
                        const data = JSON.parse(res);
                        const html = `
          
<div class="ip-info-box">
  <div><strong>IP Address:</strong> ${data.ip}</div>
  <div><strong>Country:</strong> ${data.country} (${data.cc})</div>
</div>
          `.trim();
                        const mdView = this.app.workspace.getActiveViewOfType(obsidian_1.MarkdownView);
                        if (mdView && mdView.editor) {
                            mdView.editor.replaceSelection(html);
                            new obsidian_1.Notice("IP info inserted.");
                        }
                        else {
                            new obsidian_1.Notice("No active Markdown editor found.");
                        }
                    }
                    catch (err) {
                        console.error("Failed to fetch IP info:", err);
                        new obsidian_1.Notice("Error fetching IP info.");
                    }
                }),
            });
        });
    }
}
exports.default = MyIPPlugin;
