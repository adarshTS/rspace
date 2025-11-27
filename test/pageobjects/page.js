const { browser } = require('@wdio/globals')

/**
* main page object containing all methods, selectors and functionality
* that is shared across all page objects
*/
module.exports = class Page {
    /**
    * Opens a page by URL
    * @param url full URL to open
    */
    open (url) {
        return browser.url(url)
    }
}
