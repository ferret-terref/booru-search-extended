# Booru Search Extended

A powerful userscript that enhances tag searching on multiple booru image boards with an advanced tag builder interface.

Light Theme | Dark Theme
:-:|:-:|
<img width="280" height="595" alt="06_11_2025_21_44_12" src="https://github.com/user-attachments/assets/b044c480-6edb-46e2-991f-2487a7026c7b" /> | <img width="280" height="595" alt="06_11_2025_21_45_17" src="https://github.com/user-attachments/assets/9755caac-4c13-4bd7-b29f-20f6c1786901" />



## Features

- **Visual Tag Builder** - Build complex search queries using an intuitive tree-based UI
- **Toggle Tag Visibility** - Enable/disable individual tags (👁️/🙈) to test different search variations without deleting them
- **Multi-Site Support** - Works seamlessly across 7+ major booru sites
- **Advanced Query Operators** - Support for AND, OR, NOT, fuzzy search, and wildcards
- **Favorites System** - Save, search, sort, and manage your frequently used search queries with import/export
- **Drag & Drop** - Reorder tags easily with drag and drop functionality
- **Query Parsing** - Import existing search queries and edit them visually
- **Customizable Interface** - Light/dark themes, compact mode, auto-submit, and toggle preview visibility
- **Persistent Storage** - Your tags, favorites, and settings are saved per-site using localStorage
- **Keyboard Shortcuts** - Quick actions for power users

## Supported Sites

- Rule34
- Gelbooru
- Danbooru
- Safebooru
- TBIB
- Xbooru
- Realbooru

## Installation

1. Install a userscript manager:
   - [Tampermonkey](https://www.tampermonkey.net/) (Chrome, Firefox, Safari, Edge)
   - [Violentmonkey](https://violentmonkey.github.io/) (Chrome, Firefox, Edge)
   - [Greasemonkey](https://www.greasespot.net/) (Firefox)

2. Click here to install: [booru-search-extended.user.js](https://github.com/ferret-terref/booru-search-extended/raw/refs/heads/main/booru-search-extended.user.js)

3. Your userscript manager will prompt you to install - click "Install"

## Usage

### Basic Tag Building

1. Navigate to any supported booru site's search page
2. The tag builder will appear in the sidebar
3. Enter a tag name and click "Add" to add it to your query
4. Use the dropdown to select different operators (AND, OR, NOT, etc.)
5. Click "📤 Paste to input" to apply your query to the site's search

### Creating OR Groups

1. Select "OR group" from the dropdown
2. Enter multiple tags separated by spaces (e.g., `cat dog bird`)
3. This creates a group that matches any of those tags: `( cat ~ dog ~ bird )`

### Using Advanced Operators

- **NOT** - Exclude tags from results (adds `-` prefix)
- **FUZZY** - Approximate matching (adds `~` suffix)
- **WILDCARD** - Pattern matching (e.g., `cat*` matches `cat`, `catgirl`, etc.)

### Managing Favorites

1. Build a complex query you want to reuse
2. Click "💾 Save Current" and give it a name (auto-suggests based on your tags)
3. Access saved queries via "View All" or search them in the sidebar
4. Click any favorite to instantly load that query
5. Edit favorite names with the ✏️ button
6. Export/import favorites via the modal for backup or sharing

### Toggle Tag Visibility

- Click the 👁️ (eye) icon next to any tag to disable it temporarily
- Disabled tags show 🙈 and are greyed out with strikethrough
- Disabled tags are excluded from the generated query
- Perfect for testing search variations without deleting tags
- When an OR group is disabled, all child tags are also disabled

### Customizing the Interface

1. Click "⚙️ Preferences" to access settings
2. **Theme**: Toggle between dark and light modes
3. **Spacing**: Switch between regular and compact layouts
4. **Auto-Submit**: Automatically submit the search form when pasting tags
5. **Show Preview**: Toggle visibility of the query preview section

### Importing Existing Queries

1. Copy a complex query from the site's search box
2. Click "📋 Copy from input"
3. The query will be parsed and displayed in the tree view
4. Edit individual tags or reorder them as needed

### Drag and Drop Reordering

- Click and drag any tag to reorder it within the query
- Drop it on another tag to swap positions
- Useful for fine-tuning search priority

## Examples

### Example 1: Simple Multi-Tag Search

**Goal**: Find images with both `cat` and `sitting` tags

**Steps**:
1. Add tag: `cat`
2. Add tag: `sitting`
3. Result: `cat sitting`

### Example 2: OR Group Search

**Goal**: Find images with either `cat`, `dog`, or `bird`

**Steps**:
1. Select "OR group" from dropdown
2. Enter: `cat dog bird`
3. Result: `( cat ~ dog ~ bird )`

### Example 3: Complex Query with Exclusions

**Goal**: Find cats or dogs, but exclude anything with "sleeping"

**Steps**:
1. Create OR group: `cat dog`
2. Add NOT tag: `sleeping`
3. Result: `( cat ~ dog ) -sleeping`

### Example 4: Fuzzy Search with Wildcards

**Goal**: Find variations of "anime" and anything starting with "girl"

**Steps**:
1. Select "FUZZY" and add: `anime`
2. Select "WILDCARD" and add: `girl*`
3. Result: `anime~ girl*`

### Example 5: Testing Search Variations

**Goal**: Try different combinations without rebuilding the query

**Steps**:
1. Build query: `cat rating:safe -photo animated`
2. Click �️ on `animated` to disable it - tests without that tag
3. Click 👁️ on `rating:safe` to disable it - tests unrated content
4. Re-enable tags by clicking 🙈 to restore them
5. Find the perfect combination, then paste to search

## Keyboard Shortcuts

- **Enter** (in tag input) - Add tag to builder
- **Ctrl + Enter** - Paste tags to page search input
- **Ctrl + S** - Save current tags as favorite
- **Ctrl + Shift + X** - Copy tags from page input to builder
- **Escape** - Close any open modal

## Tips & Tricks

- **Quick Testing**: Use the 👁️ toggle to quickly test variations of your search without rebuilding
- **Organized Favorites**: Use descriptive names when saving - they're searchable and sortable
- **Drag Reordering**: Drag tags to reorder them for different search priorities
- **Import/Export**: Back up your favorites or share them between browsers
- **Auto-Submit**: Enable in preferences to automatically search when pasting tags
- **Hide Builder**: Use the toggle button at the top to hide/show the builder when not needed
- **Preview Section**: Toggle in preferences if you want more screen space
- **Per-Site Storage**: Each booru site has separate tags, favorites, and settings
- **Smart Name Suggestions**: When saving favorites, the name auto-suggests based on your tags

## Troubleshooting

**Builder not appearing?**
- Check that you're on a supported site
- Verify your userscript manager is enabled
- Try refreshing the page

**Tags not saving?**
- Check that localStorage is enabled in your browser
- Some privacy extensions may block storage
- Try disabling strict tracking protection for the site

**Favorites not importing?**
- Ensure the JSON file is valid and from a Booru Search Extended export
- Check the browser console for error messages

**Toggle visibility not working?**
- If a parent OR group is disabled, child tags cannot be enabled
- Re-enable the parent group first

## Contributing

Issues and pull requests are welcome! Please check the [issues page](https://github.com/ferret-terref/booru-search-extended/issues) before submitting.

## License

MIT License - see [LICENSE](LICENSE) file for details

## Credits

Created by ferret-terref
