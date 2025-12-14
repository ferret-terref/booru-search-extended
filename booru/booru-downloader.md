# Booru Downloader

Press Ctrl+S on an image page to save it with configurable download modes.

## Features

- **Quick Download** - Press Ctrl+S on any booru image page to download
- **Configurable Filename Formats** - Choose from multiple naming patterns
- **Multiple Download Modes** - Original, Sample, or Both
- **Site Metadata Integration** - Automatically includes tags, artist, character info
- **Multi-Site Support** - Works on Rule34, Danbooru, E621, Gelbooru, and more
- **Persistent Settings** - Download preferences saved via Tampermonkey storage
- **Visual Settings Menu** - Easy-to-use configuration interface

## Supported Sites

- Rule34
- Danbooru
- E621
- Gelbooru
- Rule34.us
- 4chan/4channel
- Yande.re
- And any site matching `*booru*/index.php?page=post&s=view&id=*`

## Installation

1. Install a userscript manager:
   - [Tampermonkey](https://www.tampermonkey.net/) (Chrome, Firefox, Safari, Edge)
   - [Violentmonkey](https://violentmonkey.github.io/) (Chrome, Firefox, Edge)

2. Click here to install: [booru-downloader.js](https://github.com/ferret-terref/ferret-userscripts/raw/refs/heads/main/booru/booru-downloader.js)

3. Your userscript manager will prompt you to install - click "Install"

## Usage

### Basic Download

1. Navigate to any image post page on a supported booru site
2. Press `Ctrl+S` on your keyboard
3. The image will download according to your configured settings

### Configuration

1. On any supported booru page, click the Tampermonkey icon
2. Select "Booru Downloader Settings" from the menu
3. Configure your preferences:
   - **Download Mode**: Original, Sample, or Both
   - **Filename Format**: Choose from multiple naming patterns
   - **Tag Separator**: How tags are separated in filenames

### Download Modes

- **Original Only** - Downloads the full-resolution original image
- **Sample Only** - Downloads the smaller sample/preview image
- **Both** - Downloads both original and sample versions

### Filename Formats

The script offers several filename patterns that include metadata:

- **Format 1**: `id_tags_artist_character_copyright.ext`
- **Format 2**: `sitename_id_tags.ext`
- **Format 3**: `id_artist_character_tags.ext`
- And more...

Tags are automatically sanitized and shortened to create valid filenames.

## Configuration Menu

Access the settings menu through your userscript manager:

1. Click the Tampermonkey/Violentmonkey icon in your browser
2. Find "Booru Downloader Settings"
3. Click to open the configuration dialog
4. Make your changes and they'll be saved automatically

## Tips

- **Ctrl+S Shortcut**: Works seamlessly with the browser's default save shortcut
- **Metadata in Filenames**: Helps organize your downloads automatically
- **Tag Limits**: Filenames automatically truncate tag lists to avoid OS limits
- **Character Sanitization**: Special characters are removed to ensure compatibility

## Troubleshooting

**Download not starting?**
- Verify you're on a supported booru image post page (not the list/search page)
- Check that your browser allows downloads from the site
- Ensure your userscript manager has granted `GM_download` permission

**Filename issues?**
- Some OS have filename length limits (usually 255 characters)
- The script automatically truncates long filenames
- Special characters are sanitized automatically

**Settings not saving?**
- Ensure your userscript manager has granted `GM_getValue`/`GM_setValue` permissions
- Try reinstalling the script

## License

MIT License - see [LICENSE](../LICENSE) file for details

## Author

Created by ferret-terref
