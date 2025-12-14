// ==UserScript==
// @name         Booru Downloader
// @version      2.1
// @description  Press Ctrl+S on an image page to save it with configurable download modes
// @author       ferret-terref
// @license      MIT
// @homepageURL  https://github.com/ferret-terref/ferret-userscripts
// @updateURL    https://github.com/ferret-terref/ferret-userscripts/raw/refs/heads/main/booru/booru-downloader.js
// @downloadURL  https://github.com/ferret-terref/ferret-userscripts/raw/refs/heads/main/booru/booru-downloader.js
// @match        https://rule34.xxx/index.php?page=post*
// @match        https://danbooru.donmai.us/posts/*?q=*
// @match        https://danbooru.donmai.us/posts/*
// @match        https://e621.net/posts/*
// @match        https://gelbooru.com/index.php?page=post&s=view*
// @match        https://rule34.us/index.php?r=posts/view&id=*
// @match        https://boards.4channel.org/*
// @match        https://boards.4chan.org/*
// @match        https://yande.re/post/show*
// @include      /.*booru.*\/index\.php\?page=post&s=view&id=.*/
// @grant        GM_download
// @grant        GM_xmlhttpRequest
// ==/UserScript==

(function () {
  'use strict';

  // CSS using Tag Builder's design system
  const MENU_CSS = `
    :root {
      --tqb-bg-primary: #1e293b;
      --tqb-bg-secondary: #0f172a;
      --tqb-bg-tertiary: #374151;
      --tqb-bg-input: #1f2937;
      --tqb-bg-hover: #4b5563;
      --tqb-text-primary: #f8fafc;
      --tqb-text-secondary: #9ca3af;
      --tqb-text-tertiary: #6b7280;
      --tqb-accent-blue: #60a5fa;
      --tqb-accent-blue-dark: #1e40af;
      --tqb-border-color: #374151;
      --tqb-radius-sm: .3rem;
      --tqb-radius-md: .5rem;
      --tqb-radius-lg: .8rem;
      --tqb-font-sm: .8rem;
      --tqb-font-md: .9rem;
      --tqb-font-lg: 1.1rem;
      --tqb-spacing-sm: .3rem;
      --tqb-spacing-md: .5rem;
      --tqb-spacing-lg: 1rem;
    }

    /* Floating settings button */
    .ct-stats-button { position: fixed; bottom: 20px; right: 20px; background: var(--tqb-accent-blue); color: white; border: none; border-radius: 50%; width: 60px; height: 60px; font-size: 1.5rem; cursor: pointer; box-shadow: 0 4px 12px rgba(96, 165, 250, 0.4); z-index: 99999; transition: all 0.3s; display: flex; align-items: center; justify-content: center; }
    .ct-stats-button:hover { transform: translateY(-2px) scale(1.05); box-shadow: 0 6px 16px rgba(96, 165, 250, 0.6); background: var(--tqb-accent-blue-dark); }
    .ct-stats-button:active { transform: translateY(0) scale(0.98); }

    /* Modal */
    .tqb-modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.7); display: none; align-items: center; justify-content: center; z-index: 10000; }
    .tqb-modal { background: var(--tqb-bg-primary); color: var(--tqb-text-primary); border-radius: var(--tqb-radius-lg); padding: var(--tqb-spacing-lg); max-width: 600px; width: 90%; max-height: 80vh; overflow-y: auto; position: relative; }
    .tqb-modal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--tqb-spacing-lg); border-bottom: 1px solid var(--tqb-border-color); padding-bottom: var(--tqb-spacing-lg); background: transparent; }
    .tqb-modal-title { margin: 0; font-size: var(--tqb-font-lg); font-weight: 600; color: var(--tqb-text-primary); background: transparent; }
    .tqb-modal-close { background: var(--tqb-text-tertiary); color: white; border: none; border-radius: var(--tqb-radius-sm); padding: var(--tqb-spacing-sm); cursor: pointer; font-size: var(--tqb-font-lg); width: 2rem; height: 2rem; display: flex; align-items: center; justify-content: center; }
    .tqb-modal-close:hover { background: var(--tqb-bg-hover); }
    .tqb-modal-content { background: transparent; }

    .ct-section { margin-bottom: var(--tqb-spacing-lg); background: transparent; }
    .ct-section:last-child { margin-bottom: 0; }
    .ct-section-title { color: var(--tqb-accent-blue); margin-top: 0; margin-bottom: var(--tqb-spacing-md); font-size: var(--tqb-font-md); background: transparent; }

    /* Toggle switch styles */
    .tqb-shortcut-item { display: flex; justify-content: space-between; align-items: center; padding: var(--tqb-spacing-md); margin-bottom: var(--tqb-spacing-sm); background: var(--tqb-bg-secondary); border-radius: var(--tqb-radius-sm); }
    .tqb-setting-label { color: var(--tqb-text-primary); font-size: var(--tqb-font-md); min-width: 200px; }
    .tqb-setting-toggle-container { display: flex; align-items: center; gap: var(--tqb-spacing-md); min-width: 200px; }
    .tqb-setting-text { color: var(--tqb-text-secondary); font-size: var(--tqb-font-sm); }
    .tqb-toggle-wrapper { display: inline-flex; align-items: center; cursor: pointer; position: relative; width: 40px; height: 20px; }
    .tqb-toggle-track { position: absolute; top: 0; left: 0; right: 0; bottom: 0; background-color: var(--tqb-bg-tertiary); border-radius: 20px; transition: 0.3s; }
    .tqb-toggle-thumb { position: absolute; height: 14px; width: 14px; left: 3px; bottom: 3px; background-color: white; border-radius: 50%; transition: 0.3s; }
    .tqb-toggle-wrapper input:checked + .tqb-toggle-track { background-color: var(--tqb-accent-blue); }
    .tqb-toggle-wrapper input:checked ~ .tqb-toggle-thumb { transform: translateX(20px); }

    /* Hotkey input */
    .bd-hotkey-input { background: var(--tqb-bg-input); color: var(--tqb-text-primary); border: 1px solid var(--tqb-border-color); border-radius: var(--tqb-radius-sm); padding: var(--tqb-spacing-sm) var(--tqb-spacing-md); font-size: var(--tqb-font-md); min-width: 150px; cursor: pointer; text-align: center; transition: all 0.2s; }
    .bd-hotkey-input:focus { outline: none; border-color: var(--tqb-accent-blue); box-shadow: 0 0 0 2px rgba(96, 165, 250, 0.2); }
    .bd-hotkey-input::placeholder { color: var(--tqb-text-tertiary); }

    /* Toast notifications */
    .tqb-toast-container { position: fixed; bottom: 20px; right: 20px; z-index: 100000; display: flex; flex-direction: column; gap: var(--tqb-spacing-sm); pointer-events: none; }
    .tqb-toast { background: var(--tqb-bg-primary); color: var(--tqb-text-primary); padding: var(--tqb-spacing-md) var(--tqb-spacing-lg); border-radius: var(--tqb-radius-md); box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3); display: flex; align-items: center; gap: var(--tqb-spacing-md); min-width: 250px; max-width: 400px; pointer-events: auto; animation: tqb-toast-slide-in 0.3s ease-out; border-left: 3px solid var(--tqb-accent-blue); }
    .tqb-toast.tqb-toast-error { border-left-color: #ef4444; }
    .tqb-toast.tqb-toast-success { border-left-color: #10b981; }
    .tqb-toast-icon { font-size: 1.2rem; flex-shrink: 0; }
    .tqb-toast-message { flex: 1; font-size: var(--tqb-font-md); }
    @keyframes tqb-toast-slide-in {
      from { transform: translateX(400px); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
    @keyframes tqb-toast-slide-out {
      from { transform: translateX(0); opacity: 1; }
      to { transform: translateX(400px); opacity: 0; }
    }
    .tqb-toast.tqb-toast-hiding { animation: tqb-toast-slide-out 0.3s ease-out forwards; }
  `;

  // Inject CSS
  const styleEl = document.createElement('style');
  styleEl.textContent = MENU_CSS;
  document.head.appendChild(styleEl);

  // Toast notification system
  let toastContainer = null;

  function getToastContainer() {
    if (!toastContainer) {
      toastContainer = document.createElement('div');
      toastContainer.className = 'tqb-toast-container';
      document.body.appendChild(toastContainer);
    }
    return toastContainer;
  }

  function showToast(message, type = 'info', duration = 3000) {
    if (!getShowToasts()) return; // Don't show if disabled

    const container = getToastContainer();
    const toast = document.createElement('div');
    toast.className = `tqb-toast tqb-toast-${type}`;

    const icon = type === 'error' ? '❌' : type === 'success' ? '✅' : 'ℹ️';

    toast.innerHTML = `
      <span class="tqb-toast-icon">${icon}</span>
      <span class="tqb-toast-message">${message}</span>
    `;

    container.appendChild(toast);

    // Auto-remove after duration
    setTimeout(() => {
      toast.classList.add('tqb-toast-hiding');
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 300); // Match animation duration
    }, duration);
  } // Site configuration for different booru sites
  const SITE_CONFIGS = {
    'rule34.xxx': {
      name: 'Rule34',
      downloadXPath: "//a[contains(., 'Original image')]"
    },
    'gelbooru.com': {
      name: 'Gelbooru',
      downloadXPath: "//a[contains(., 'Original image')]"
    },
    'danbooru.donmai.us': {
      name: 'Danbooru',
      downloadXPath: "//a[contains(., 'Download')]"
    },
    'e621.net': {
      name: 'E621',
      downloadXPath: "//a[contains(., 'Download')]"
    },
    'rule34.us': {
      name: 'Rule34US',
      downloadXPath: "//a[contains(., 'Original')]"
    },
    'yande.re': {
      name: 'Yandere',
      downloadXPath: "//a[@id='png']"
    },
    'boards.4chan.org': {
      name: '4chan',
      downloadXPath: "//a[contains(@class, 'gal-name')]",
      customFileNameHandler: true
    },
    'boards.4channel.org': {
      name: '4channel',
      downloadXPath: "//a[contains(@class, 'gal-name')]",
      customFileNameHandler: true
    },
    'realbooru.com': {
      name: 'Realbooru',
      downloadXPath: "//a[contains(., 'Original')]"
    }
  };

  /**
   * Get configuration for the current booru site
   * @returns {Object|null} Site configuration object or null if unsupported
   */
  function getCurrentSiteConfig() {
    const hostname = window.location.hostname;
    let config = SITE_CONFIGS[hostname];

    // Fallback: Generic booru handler for any site with 'booru' in the name
    if (!config && hostname.includes('booru')) {
      config = {
        name: 'Generic Booru',
        downloadXPath: "//a[contains(., 'Original image')]",
        isGeneric: true
      };
    }

    if (!config) {
      console.warn(`Booru Downloader: Unsupported site ${hostname}`);
      return null;
    }

    return {
      ...config,
      hostname
    };
  }

  // Site handler using config
  class SiteHandler {
    constructor(config) {
      this.config = config;
    }

    // Public
    async saveItem() {
      // Get the link
      const _link = this._getPageLink();
      let _name = this._getFileName(_link);

      try {
        await this._download(_link, _name);
      } catch (e) {
        console.error(`[${this.config.name}] Download error:`, e);
      }
    }

    _getPageLink() {
      // Lookup via xpath
      const _evaluated = document.evaluate(this.config.downloadXPath, document, null, XPathResult.ANY_TYPE, null);

      // Assert exists
      if (_evaluated == null) {
        throw new Error('Download button not found.');
      }

      // Get element and return href
      const _element = _evaluated.iterateNext();
      return _element.href;
    }

    _getFileName(link) {
      // Custom handler for 4chan sites
      if (this.config.customFileNameHandler) {
        return this._get4chanFileName();
      }

      // Split url into individual pieces by '/';
      const _split = link.split('/');

      // Get the last piece of the url (should be the file name)
      const _dirtyName = _split[_split.length - 1];

      // Remove query parameter and return
      const _cleanName = _dirtyName.split('?')[0];
      return _cleanName;
    }

    _get4chanFileName() {
      // 4chan specific handler
      const _evaluated = document.evaluate(this.config.downloadXPath, document, null, XPathResult.ANY_TYPE, null);
      const _element = _evaluated.iterateNext();
      let _name = _element.innerText;

      if (_name.startsWith('file.'))
        _name = _name.replace('file.', `file_${Date.now()}.`);
      if (_name.length < 15)
        _name = _name.replace('.', `_${Date.now()}.`);

      return _name;
    }

    async _download(link, name) {
      showToast(`Downloading: ${name}`, 'info', 2000);

      const isUserCancelled = (error) => {
        return error.message.includes('canceled by the user') ||
          error.message.includes('cancelled by the user');
      };

      await this._tryGMDownload(link, name)
        .catch(gmError => {
          if (isUserCancelled(gmError)) throw gmError;
          console.warn("GM_download failed, trying fetch fallback:", gmError);
          return this._fallbackDownload(link, name);
        })
        .catch(fetchError => {
          if (isUserCancelled(fetchError)) throw fetchError;
          console.warn("Fetch fallback failed, trying XHR fallback:", fetchError);
          return this._xhrFallbackDownload(link, name);
        })
        .catch(xhrError => {
          if (isUserCancelled(xhrError)) throw xhrError;
          console.warn("XHR fallback failed, trying final fallback:", xhrError);
          return this._directLinkFallback(link, name);
        })
        .catch(finalError => {
          if (isUserCancelled(finalError)) {
            console.log("Download canceled by user");
            return;
          }
          console.error("All download methods failed:", finalError);
          showToast(`Download failed: ${finalError.message}`, 'error', 5000);
          throw finalError;
        });
    }

    _tryGMDownload(link, name) {
      return new Promise((resolve, reject) => {
        try {
          GM_download({
            url: link,
            name: name,
            onload: () => {
              console.log("GM_download succeeded.");
              showToast(`Downloaded: ${name}`, 'success', 3000);
              resolve();
            },
            onerror: (err) => {
              const errorMsg = err.error || err.details || 'Unknown error';
              reject(new Error(`GM_download error: ${errorMsg}`));
            }
          });
        } catch (e) {
          reject(new Error(`GM_download unavailable: ${e.message}`));
        }
      });
    }

    async _fallbackDownload(link, name) {
      console.log("Using fetch-based fallback download for:", name);

      // Fetch the file as a blob
      const response = await fetch(link);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);

      // Create and trigger download
      const anchor = document.createElement('a');
      anchor.href = blobUrl;
      anchor.download = name;
      anchor.style.display = 'none';
      document.body.appendChild(anchor);
      anchor.click();

      // Cleanup
      document.body.removeChild(anchor);
      setTimeout(() => URL.revokeObjectURL(blobUrl), 100);

      showToast(`Download started: ${name}`, 'success', 3000);
    }

    _xhrFallbackDownload(link, name) {
      console.log("Using GM_xmlhttpRequest fallback for:", name);

      return new Promise((resolve, reject) => {
        if (typeof GM_xmlhttpRequest === 'undefined') {
          reject(new Error('GM_xmlhttpRequest not available'));
          return;
        }

        GM_xmlhttpRequest({
          method: 'GET',
          url: link,
          responseType: 'blob',
          onload: (response) => {
            try {
              const blobUrl = URL.createObjectURL(response.response);

              const anchor = document.createElement('a');
              anchor.href = blobUrl;
              anchor.download = name;
              anchor.style.display = 'none';
              document.body.appendChild(anchor);
              anchor.click();
              document.body.removeChild(anchor);

              setTimeout(() => URL.revokeObjectURL(blobUrl), 100);

              showToast(`Download started: ${name}`, 'success', 3000);
              resolve();
            } catch (error) {
              reject(new Error(`XHR blob processing failed: ${error.message}`));
            }
          },
          onerror: (error) => {
            reject(new Error(`XHR request failed: ${error.error || 'Unknown error'}`));
          },
          ontimeout: () => {
            reject(new Error('XHR request timed out'));
          }
        });
      });
    }

    _directLinkFallback(link, name) {
      console.log("Using direct link fallback (opening in new tab):", name);

      // Try simple anchor download first
      const anchor = document.createElement('a');
      anchor.href = link;
      anchor.download = name;
      anchor.target = '_blank';
      anchor.rel = 'noopener noreferrer';
      anchor.style.display = 'none';
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);

      showToast(`Opening download link in new tab - save manually if needed`, 'info', 5000);
    }
  }

  // Get the handler for the current page
  function getSiteHandler() {
    const config = getCurrentSiteConfig();
    return config ? new SiteHandler(config) : null;
  }

  // Add key listener
  document.addEventListener('keydown', _onKeyDown);

  // Settings
  const DOWNLOAD_MODE_KEY = 'booru_downloader_mode';
  const HOTKEY_KEY = 'booru_downloader_hotkey';
  const SHOW_TOASTS_KEY = 'booru_downloader_show_toasts';

  function getDownloadMode() {
    return localStorage.getItem(DOWNLOAD_MODE_KEY) || 'browser';
  }

  function setDownloadMode(mode) {
    localStorage.setItem(DOWNLOAD_MODE_KEY, mode);
  }

  function getHotkey() {
    return localStorage.getItem(HOTKEY_KEY) || 'Ctrl+S';
  }

  function setHotkey(hotkey) {
    localStorage.setItem(HOTKEY_KEY, hotkey);
  }

  function getShowToasts() {
    const stored = localStorage.getItem(SHOW_TOASTS_KEY);
    return stored !== null ? stored === 'true' : true; // Default to true
  }

  function setShowToasts(enabled) {
    localStorage.setItem(SHOW_TOASTS_KEY, enabled.toString());
  }

  // Convert key event to readable hotkey string
  function eventToHotkeyString(e) {
    const parts = [];
    if (e.ctrlKey) parts.push('Ctrl');
    if (e.altKey) parts.push('Alt');
    if (e.shiftKey) parts.push('Shift');

    // Normalize key name
    let key = e.key;
    if (key === ' ') key = 'Space';
    else if (key.length === 1) key = key.toUpperCase();

    parts.push(key);
    return parts.join('+');
  }

  // Check if event matches stored hotkey
  function eventMatchesHotkey(e, hotkeyString) {
    const currentCombo = eventToHotkeyString(e);
    return currentCombo === hotkeyString;
  }

  // Create hotkey input field with key capture
  function createHotkeyInput(id) {
    const input = document.createElement('input');
    input.type = 'text';
    input.id = id;
    input.className = 'bd-hotkey-input';
    input.readOnly = true;
    input.placeholder = 'Press any key...';
    input.value = getHotkey();

    input.addEventListener('keydown', (e) => {
      e.preventDefault();
      e.stopPropagation();

      // Ignore modifier-only presses
      if (['Control', 'Alt', 'Shift', 'Meta'].includes(e.key)) {
        return;
      }

      const hotkeyString = eventToHotkeyString(e);
      input.value = hotkeyString;
      setHotkey(hotkeyString);
      console.log(`Download hotkey changed to: ${hotkeyString}`);
      input.blur();
    });

    input.addEventListener('focus', () => {
      input.placeholder = 'Press any key...';
      input.select();
    });

    input.addEventListener('blur', () => {
      if (!input.value) {
        input.value = getHotkey();
      }
      input.placeholder = 'Click to change...';
    });

    return input;
  }

  // Initialize modal and button when DOM is ready
  function initializeUI() {
    // Check if Tag Builder is present
    const tagBuilderPreferences = document.querySelector('#tqb-help-modal .tqb-help-content');

    if (tagBuilderPreferences) {
      // Tag Builder is present - add our settings to its preferences modal
      console.log('Booru Downloader: Integrating with Tag Builder preferences');

      // Find the keyboard shortcuts section to insert before it
      const keyboardSection = tagBuilderPreferences.querySelector('.tqb-section-title-spaced');
      if (keyboardSection) {
        const downloadSettingHTML = `
          <h4 class="tqb-section-title-spaced">⬇️ Download Settings <i>(ferret booru downloader)</i></h4>
          <div class="tqb-shortcut-item">
            <span class="tqb-setting-label">📥 Download Mode</span>
            <div class="tqb-setting-toggle-container">
              <span class="tqb-setting-text">Browser</span>
              <label class="tqb-toggle-wrapper">
                <input type="checkbox" id="bd-download-mode-toggle" style="opacity:0;width:0;height:0;">
                <span class="tqb-toggle-track"></span>
                <span class="tqb-toggle-thumb"></span>
              </label>
              <span class="tqb-setting-text">Manager</span>
            </div>
          </div>
          <div class="tqb-shortcut-item">
            <span class="tqb-setting-label">⌨️ Download Hotkey</span>
            <div id="bd-hotkey-container"></div>
          </div>
          <div class="tqb-shortcut-item">
            <span class="tqb-setting-label">💬 Show Notifications</span>
            <div class="tqb-setting-toggle-container">
              <span class="tqb-setting-text">Hidden</span>
              <label class="tqb-toggle-wrapper">
                <input type="checkbox" id="bd-show-toasts-toggle" style="opacity:0;width:0;height:0;">
                <span class="tqb-toggle-track"></span>
                <span class="tqb-toggle-thumb"></span>
              </label>
              <span class="tqb-setting-text">Visible</span>
            </div>
          </div>
        `;

        // Insert before the keyboard shortcuts section
        keyboardSection.insertAdjacentHTML('beforebegin', downloadSettingHTML);

        // Setup the toggle
        const downloadModeToggle = document.querySelector('#bd-download-mode-toggle');
        if (downloadModeToggle) {
          const currentMode = getDownloadMode();
          downloadModeToggle.checked = currentMode === 'manager';

          downloadModeToggle.addEventListener('change', (e) => {
            const mode = e.target.checked ? 'manager' : 'browser';
            setDownloadMode(mode);
            console.log(`Download mode changed to: ${mode}`);
          });
        }

        // Setup the hotkey input
        const hotkeyContainer = document.querySelector('#bd-hotkey-container');
        if (hotkeyContainer) {
          const hotkeyInput = createHotkeyInput('bd-hotkey-input-tb');
          hotkeyContainer.appendChild(hotkeyInput);
        }

        // Setup the show toasts toggle
        const showToastsToggle = document.querySelector('#bd-show-toasts-toggle');
        if (showToastsToggle) {
          showToastsToggle.checked = getShowToasts();

          showToastsToggle.addEventListener('change', (e) => {
            setShowToasts(e.target.checked);
            console.log(`Show toasts changed to: ${e.target.checked}`);
          });
        }
      }

      return; // Don't create standalone UI
    }

    // No Tag Builder - create standalone preferences modal
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'tqb-modal-overlay';
    modalOverlay.innerHTML = `
      <div class="tqb-modal">
        <div class="tqb-modal-header">
          <h3 class="tqb-modal-title">⚙️ Booru Downloader Settings</h3>
          <button class="tqb-modal-close" aria-label="Close modal">✕</button>
        </div>
        <div class="tqb-modal-content">
          <div class="ct-section">
            <h4 class="ct-section-title">⬇️ Download Settings</h4>
            <div class="tqb-shortcut-item">
              <span class="tqb-setting-label">📥 Download Mode</span>
              <div class="tqb-setting-toggle-container">
                <span class="tqb-setting-text">Browser</span>
                <label class="tqb-toggle-wrapper">
                  <input type="checkbox" id="bd-download-mode-toggle" style="opacity:0;width:0;height:0;">
                  <span class="tqb-toggle-track"></span>
                  <span class="tqb-toggle-thumb"></span>
                </label>
                <span class="tqb-setting-text">Manager</span>
              </div>
            </div>
            <div class="tqb-shortcut-item">
              <span class="tqb-setting-label">⌨️ Download Hotkey</span>
              <div id="bd-hotkey-container"></div>
            </div>
            <div class="tqb-shortcut-item">
              <span class="tqb-setting-label">💬 Show Notifications</span>
              <div class="tqb-setting-toggle-container">
                <span class="tqb-setting-text">Hidden</span>
                <label class="tqb-toggle-wrapper">
                  <input type="checkbox" id="bd-show-toasts-toggle" style="opacity:0;width:0;height:0;">
                  <span class="tqb-toggle-track"></span>
                  <span class="tqb-toggle-thumb"></span>
                </label>
                <span class="tqb-setting-text">Visible</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    const closeBtn = modalOverlay.querySelector('.tqb-modal-close');
    const downloadModeToggle = modalOverlay.querySelector('#bd-download-mode-toggle');

    // Load current setting
    const currentMode = getDownloadMode();
    downloadModeToggle.checked = currentMode === 'manager';

    // Save setting when changed
    downloadModeToggle.addEventListener('change', (e) => {
      const mode = e.target.checked ? 'manager' : 'browser';
      setDownloadMode(mode);
      console.log(`Download mode changed to: ${mode}`);
    });

    // Setup the hotkey input
    const hotkeyContainer = modalOverlay.querySelector('#bd-hotkey-container');
    if (hotkeyContainer) {
      const hotkeyInput = createHotkeyInput('bd-hotkey-input-standalone');
      hotkeyContainer.appendChild(hotkeyInput);
    }

    // Setup the show toasts toggle
    const showToastsToggle = modalOverlay.querySelector('#bd-show-toasts-toggle');
    if (showToastsToggle) {
      showToastsToggle.checked = getShowToasts();

      showToastsToggle.addEventListener('change', (e) => {
        setShowToasts(e.target.checked);
        console.log(`Show toasts changed to: ${e.target.checked}`);
      });
    }

    closeBtn.addEventListener('click', () => modalOverlay.style.display = 'none');
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) modalOverlay.style.display = 'none';
    });

    document.body.appendChild(modalOverlay);

    // Create floating settings button
    const settingsButton = document.createElement('button');
    settingsButton.className = 'ct-stats-button';
    settingsButton.innerHTML = '⚙️';
    settingsButton.title = 'Booru Downloader Settings';
    settingsButton.setAttribute('aria-label', 'Open Booru Downloader Settings');
    settingsButton.addEventListener('click', () => modalOverlay.style.display = 'flex');
    document.body.appendChild(settingsButton);
  }

  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeUI);
  } else {
    initializeUI();
  }

  function _onKeyDown(e) {
    console.log(`Key pressed: ${e.key}, combo: ${eventToHotkeyString(e)}`);
    if (_isValidKeyCombo(e)) {
      // Stops the browser from trying to save the page itself (bad)
      e.preventDefault();

      // Get handler
      const handler = getSiteHandler();

      // Guard
      // Not throwing an exception to prevent script crashing
      if (handler == null) {
        showToast('Unsupported site for downloading', 'error', 3000);
        return;
      }

      // Execute
      handler.saveItem().catch(err => {
        console.error('Error saving item:', err);
        showToast(`Error: ${err.message}`, 'error', 4000);
      });
    }
  }

  function _isValidKeyCombo(e) {
    const hotkey = getHotkey();
    return eventMatchesHotkey(e, hotkey);
  }

})();