# Booru Tag Blocker

Block booru tags on the front-end with persistence and UI management.

## Features

- **Front-End Tag Filtering** - Hide unwanted content without server-side filtering
- **Customizable Blocklist** - Add, remove, and manage blocked tags
- **Multiple Block Actions** - Hide completely or blur content
- **Persistent Settings** - Blocklist saved via Tampermonkey storage
- **Multi-Site Support** - Works on Rule34, Gelbooru, Danbooru, E621, and more
- **Visual Management UI** - Easy-to-use interface for managing blocked tags
- **Partial Matching** - Block tags containing specific words
- **Default Blocklist** - Comes pre-configured with common blocked tags

## Supported Sites

- Rule34
- Gelbooru
- Danbooru
- E621
- Safebooru
- TBIB
- Xbooru
- Realbooru

## Installation

1. Install a userscript manager:
   - [Tampermonkey](https://www.tampermonkey.net/) (Chrome, Firefox, Safari, Edge)
   - [Violentmonkey](https://violentmonkey.github.io/) (Chrome, Firefox, Edge)

2. Click here to install: [tag-blocker.user.js](https://github.com/ferret-terref/ferret-userscripts/raw/refs/heads/main/booru/tag-blocker.user.js)

3. Your userscript manager will prompt you to install - click "Install"

## Usage

### Basic Blocking

The script automatically blocks content based on your blocklist:
- Posts containing blocked tags are hidden or blurred on list pages
- Individual post pages show a warning when viewing blocked content

### Managing the Blocklist

1. Click the Tampermonkey icon in your browser
2. Select "Tag Blocker Settings" from the menu
3. In the settings dialog you can:
   - Add new tags to block
   - Remove tags from the blocklist
   - Toggle the blocker on/off
   - Change the blocking action (hide vs blur)

### Block Actions

- **Hide** - Completely removes posts with blocked tags from view
- **Blur** - Keeps posts visible but applies a blur filter (click to reveal)

### Default Blocklist

The script comes with a default blocklist containing common tags. You can:
- Keep the defaults
- Remove any you don't need
- Add your own custom tags

## Configuration

Access settings through your userscript manager menu:

1. **Add Tags**: Enter new tags to block (comma-separated or one per line)
2. **Remove Tags**: Delete tags from your blocklist
3. **Block Action**: Choose between "Hide" and "Blur"
4. **Enable/Disable**: Toggle the entire blocker on/off

## Tips

- **Case Insensitive**: Tag matching is case-insensitive (`NSFW` = `nsfw`)
- **Partial Matching**: Some tags use partial matching (e.g., `gore` blocks `gory`, `gorefest`)
- **Site-Specific**: Blocklist applies to all supported sites
- **Performance**: Hiding is faster than blurring for large lists

## Troubleshooting

**Posts not being blocked?**
- Check that the blocker is enabled in settings
- Verify the exact tag name used on the site
- Some sites may use different tag formats

**Blur not working?**
- Ensure your browser supports CSS blur filters
- Try switching to "Hide" mode instead
- Check browser console for any errors

**Settings not saving?**
- Verify your userscript manager has granted `GM_getValue`/`GM_setValue` permissions
- Try reinstalling the script
- Check that cookies/storage aren't being blocked

**Too many/few posts blocked?**
- Review your blocklist for overly broad tags
- Use more specific tags for finer control
- Consider using "Blur" instead of "Hide" for edge cases

## Privacy

All filtering happens client-side in your browser. No data is sent to external servers.

## License

MIT License - see [LICENSE](../LICENSE) file for details

## Author

Created by ferret-terref
