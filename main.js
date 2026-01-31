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
                        // Use requestUrl which provides better error handling
                        const response = yield (0, obsidian_1.requestUrl)({
                            url: "https://api.myip.com",
                            method: "GET",
                            throw: false, // Don't throw on non-2xx, we'll handle it
                        });
                        // Check for HTTP errors
                        if (response.status < 200 || response.status >= 300) {
                            new obsidian_1.Notice(`IP service returned an error (HTTP ${response.status}).`);
                            console.error("HTTP error:", response.status, response.text);
                            return;
                        }
                        // Parse and validate response
                        let data;
                        try {
                            data = JSON.parse(response.text);
                        }
                        catch (parseError) {
                            new obsidian_1.Notice("Failed to parse IP service response.");
                            console.error("JSON parse error:", parseError);
                            return;
                        }
                        // Validate required fields exist
                        if (!data.ip || !data.country || !data.cc) {
                            new obsidian_1.Notice("IP service returned incomplete data.");
                            console.error("Incomplete response:", data);
                            return;
                        }
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
                        // Handle network/connection errors
                        console.error("Failed to fetch IP info:", err);
                        if (err instanceof Error) {
                            if (err.message.includes("net::ERR") || err.message.includes("Failed to fetch")) {
                                new obsidian_1.Notice("Network error: Unable to reach IP service. Check your internet connection.");
                            }
                            else {
                                new obsidian_1.Notice(`Failed to fetch IP info: ${err.message}`);
                            }
                        }
                        else {
                            new obsidian_1.Notice("An unexpected error occurred while fetching IP info.");
                        }
                    }
                }),
            });
        });
    }
}
exports.default = MyIPPlugin;
