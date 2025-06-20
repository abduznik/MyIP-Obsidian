import { Plugin, MarkdownView, Notice, request } from "obsidian";

export default class MyIPPlugin extends Plugin {
  async onload() {
    this.addCommand({
      id: "insert-ip-info-inline",
      name: "Insert IP Info at Cursor",
      callback: async () => {
        try {
          const res = await request({
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

          const mdView = this.app.workspace.getActiveViewOfType(MarkdownView);
          if (mdView && mdView.editor) {
            mdView.editor.replaceSelection(html);
            new Notice("IP info inserted.");
          } else {
            new Notice("No active Markdown editor found.");
          }
        } catch (err) {
          console.error("Failed to fetch IP info:", err);
          new Notice("Error fetching IP info.");
        }
      },
    });
  }
}
