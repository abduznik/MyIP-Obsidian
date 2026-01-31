import { Plugin, MarkdownView, Notice, requestUrl } from "obsidian";
import type { MyIPResponse } from "./src/types";

export default class MyIPPlugin extends Plugin {
  async onload() {
    this.addCommand({
      id: "insert-ip-info-inline",
      name: "Insert IP Info at Cursor",
      callback: async () => {
        try {
          // Use requestUrl which provides better error handling
          const response = await requestUrl({
            url: "https://api.myip.com",
            method: "GET",
            throw: false, // Don't throw on non-2xx, we'll handle it
          });

          // Check for HTTP errors
          if (response.status < 200 || response.status >= 300) {
            new Notice(`IP service returned an error (HTTP ${response.status}).`);
            console.error("HTTP error:", response.status, response.text);
            return;
          }

          // Parse and validate response
          let data: MyIPResponse;
          try {
            data = JSON.parse(response.text);
          } catch (parseError) {
            new Notice("Failed to parse IP service response.");
            console.error("JSON parse error:", parseError);
            return;
          }

          // Validate required fields exist
          if (!data.ip || !data.country || !data.cc) {
            new Notice("IP service returned incomplete data.");
            console.error("Incomplete response:", data);
            return;
          }

          const html = `
<div class="ip-info-box">
  <div><strong>IP Address:</strong> ${data.ip}</div>
  <div><strong>Country:</strong> ${data.country} (${data.cc})</div>
</div>
          `.trim();

          const mdView = this.app.workspace.getActiveViewOfType(MarkdownView);
          if (mdView && mdView.editor) {
            mdView.editor.replaceSelection(html);
            new Notice("IP info inserted.");
          } else {
            new Notice("No active Markdown editor found.");
          }
        } catch (err) {
          // Handle network/connection errors
          console.error("Failed to fetch IP info:", err);
          
          if (err instanceof Error) {
            if (err.message.includes("net::ERR") || err.message.includes("Failed to fetch")) {
              new Notice("Network error: Unable to reach IP service. Check your internet connection.");
            } else {
              new Notice(`Failed to fetch IP info: ${err.message}`);
            }
          } else {
            new Notice("An unexpected error occurred while fetching IP info.");
          }
        }
      },
    });
  }
}
