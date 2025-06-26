# My IP Info Obsidian Plugin

This plugin for Obsidian fetches your public IP address and country information and inserts it into your notes.

## Features

- **Quick IP Lookup:** Get your IP address and country with a single command.
- **Seamless Integration:** The information is inserted directly into your active note at the cursor position.

## How to Use

1. **Install the plugin:**
   - Go to the releases page of this repository.
   - Download the latest release, which contains `main.js`, `manifest.json`, and `styles.css`.
   - In your Obsidian vault, go to `.obsidian/plugins/`.
   - Create a new folder named `myip-obsidian`.
   - Copy the downloaded `main.js`, `manifest.json`, and `styles.css` files into this new folder.
   - Restart Obsidian and enable the plugin in the settings.
2. **Fetch your IP info:**
   - Open a note in Obsidian.
   - Run the "Insert IP Info at Cursor" command from the command palette.
   - The plugin will fetch your IP information and insert it into the note.

## For Developers

This plugin is built with TypeScript.

- `main.ts`: The main entry point of the plugin.
- `manifest.json`: The plugin manifest.

### Build

To build the plugin, you'll need to have Node.js and npm installed.

1. Clone the repository.
2. Run `npm install` to install the dependencies.
3. Run `npm run build` to build the plugin.

This will create a `main.js` file in the project root, which you can then use to test the plugin in Obsidian.