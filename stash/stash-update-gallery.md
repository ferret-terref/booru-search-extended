# Gallery → Stash Updater (Multi-Site)

Update galleries in Stash with metadata from nhentai, e-hentai, exhentai, and more. Automatically extracts title, tags, date, and other metadata to keep your Stash library organized.

## Features

- **Multi-Site Support** - Works with nhentai, nhentai.to, e-hentai, and exhentai
- **Complete Metadata** - Imports title, tags, date, studio/organization info
- **Artist & Character Tags** - Properly prefixes artist, character, parody, and other special tags
- **One-Click Updates** - Single button to update gallery in Stash
- **Stash Gallery ID** - Links galleries via URL parameter for easy tracking
- **Direct GraphQL Integration** - Communicates directly with Stash's API

## Supported Sites

- [nhentai.net](https://nhentai.net)
- [nhentai.to](https://nhentai.to)
- [e-hentai.org](https://e-hentai.org)
- [exhentai.org](https://exhentai.org)

## Installation

1. Install a userscript manager:
   - [Tampermonkey](https://www.tampermonkey.net/) (Chrome, Firefox, Safari, Edge)
   - [Violentmonkey](https://violentmonkey.github.io/) (Chrome, Firefox, Edge)

2. Click here to install: [stash-update-gallery.user.js](https://github.com/ferret-terref/ferret-userscripts/raw/refs/heads/main/stash/stash-update-gallery.user.js)

3. Your userscript manager will prompt you to install - click "Install"

## Setup

### Configure Stash API Settings

The script needs to communicate with your Stash instance. By default, it's configured for:

```javascript
const STASH_GRAPHQL_URL = 'http://localhost:9999/graphql';
const API_KEY = 'your-api-key-here';
```

**To get your API key:**
1. Open Stash settings
2. Navigate to Security → API Keys
3. Create a new API key or copy an existing one
4. Replace `API_KEY` in the script with your key

## Usage

### Basic Workflow

1. **In Stash**: Create a new gallery or find an existing one
2. **Get the gallery ID** from the URL (e.g., `/galleries/123`)
3. **Visit the source site** (e.g., nhentai) with the content you want to import
4. **Add Stash Gallery ID to URL**: Append `?stashGalleryId=123` to the URL
5. **Click "Update Stash Gallery"** button that appears on the page
6. **Return to Stash** to see the updated metadata

### Example

1. You have a gallery in Stash at `http://localhost:9999/galleries/456`
2. Visit nhentai gallery at `https://nhentai.net/g/123456/`
3. Modify URL to: `https://nhentai.net/g/123456/?stashGalleryId=456`
4. Click the floating "Update Stash Gallery" button
5. Metadata is automatically imported to gallery #456

## What Gets Updated

- **Title** - Gallery title from the source site
- **Date** - Upload or published date
- **Tags** - All tags, properly categorized:
  - Artist tags (prefixed with "Artist: ")
  - Character tags (prefixed with "Character: ")
  - Parody tags (prefixed with "Parody: ")
  - Language tags (prefixed with "Language: ")
  - Category tags (prefixed with "Category: ")
  - Regular content tags
- **Studio** - Group/circle information (if available)
- **URL** - Source URL is added to gallery URLs

## Site-Specific Notes

### nhentai & nhentai.to
- Extracts tags by section (Artists, Groups, Parodies, Characters, Tags, Languages, Categories)
- Properly formats tag prefixes
- Imports upload date

### e-hentai & exhentai
- Supports both sites with identical functionality
- Parses tag categories from the tag list
- Extracts posted date
- Handles uploader as studio information

## Troubleshooting

**Button not appearing?**
- Verify you added `?stashGalleryId=XXX` to the URL
- Check that you're on a supported site's gallery page
- Ensure your userscript manager is enabled

**Update failing?**
- Verify your Stash instance is running
- Check that the API key is correct
- Confirm the gallery ID exists in Stash
- Check browser console for error messages
- Verify the GraphQL URL is correct for your setup

**Tags not importing correctly?**
- Some sites may have different tag formats
- Check the browser console for parsing errors
- Tags may need manual review after import

**CORS errors?**
- Ensure Stash CORS settings allow requests from the source domains
- Check Stash security settings

## Advanced Configuration

### Custom Stash URL

If your Stash instance is on a different port or remote server:

```javascript
const STASH_GRAPHQL_URL = 'http://your-stash-server:port/graphql';
```

### Adding New Sites

The script is designed with a site configuration system. To add support for a new site:

1. Add a new configuration object in `SITE_CONFIGS`
2. Implement `getTags()`, `getTitle()`, `getDate()`, `getStudio()` functions
3. Add the site to the `@match` directive

## Security Note

The script requires your Stash API key. Keep this secure and don't share your modified script with others.

## License

MIT License - see [LICENSE](../LICENSE) file for details

## Author

Created by ferret-terref
