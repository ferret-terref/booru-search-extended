# Stash Gallery URL Opener

Add open buttons to gallery URLs in Stash for quick access to external gallery sources.

## Features

- **One-Click Access** - Open gallery URLs directly from Stash with a single click
- **Visual Buttons** - Convenient "Open" buttons appear next to URL input fields
- **Edit Mode Integration** - Works seamlessly in gallery edit mode
- **Multiple URLs** - Handles galleries with multiple URLs

## Installation

1. Install a userscript manager:
   - [Tampermonkey](https://www.tampermonkey.net/) (Chrome, Firefox, Safari, Edge)
   - [Violentmonkey](https://violentmonkey.github.io/) (Chrome, Firefox, Edge)

2. Click here to install: [stash-gallery-url-opener.user.js](https://github.com/ferret-terref/ferret-userscripts/raw/refs/heads/main/stash/stash-gallery-url-opener.user.js)

3. Your userscript manager will prompt you to install - click "Install"

## Usage

1. Open a gallery in Stash
2. Navigate to the gallery edit page
3. The "URLs" field will show "Open" buttons next to each URL
4. Click "Open" to visit the URL in a new tab

## Configuration

The script is designed to work with Stash running on `localhost:9999`. If your Stash instance uses a different port, you'll need to update the `@match` directive in the script.

## Requirements

- Stash instance running locally or accessible via network
- Gallery URLs must be properly formatted

## Troubleshooting

**Buttons not appearing?**
- Verify you're on a gallery edit page (URL should contain `/galleries/`)
- Check that the gallery has URLs in the URLs field
- Try refreshing the page

**Buttons not working?**
- Check browser console for errors
- Verify URLs are valid and properly formatted
- Ensure your userscript manager is enabled

## License

MIT License - see [LICENSE](../LICENSE) file for details

## Author

Created by ferret-terref
