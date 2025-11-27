const { $, expect } = require('@wdio/globals')
const Page = require('./page');

class DashboardPage extends Page {
    // Text selector may fail remotely; provide stable CSS fallback
    get userNameText () { return $('=Adarsh S'); }
    get userNameLabel () { return $('#view-dashboard .profile .name'); }
    get dashboardView () { return $('#view-dashboard'); }
    get userNameXPath () { return $('//div[contains(@class,"name") and normalize-space()="Adarsh S"]'); }
    get onlineBadge () { return $('span.badge.success'); }

    get openModalBtn () { return $('#openModalBtn'); }
    get modalTitle () { return $('#modalTitle'); }
    get confirmBtn () { return $('#confirmBtn'); }
    get confirmModalBtn () { return $('#confirmModal'); }
    get confirmBtnByText () { return $('button=Confirm'); }

    // Nav user menu + logout (exact per index.html)
    get userMenuButton () { return $('#userMenuBtn'); }
    get userMenu () { return $('#userMenu'); }
    get logoutLink () { return $('[data-action="logout"]'); }

    get loggedOutHeading () { return $('h2=Logged Out'); }

    async waitForDashboardActive(timeout = 15000) {
        await browser.waitUntil(async () => {
            const cls = await this.dashboardView.getAttribute('class');
            return cls && cls.includes('active');
        }, { timeout, interval: 300, timeoutMsg: 'Dashboard view not active within timeout' });
    }
    async resolveUserNameElement() {
        if (await this.userNameText.isDisplayed()) return this.userNameText;
        if (await this.userNameLabel.isDisplayed()) return this.userNameLabel;
        if (await this.userNameXPath.isDisplayed()) return this.userNameXPath;
        return this.userNameLabel; // final attempt
    }
}

module.exports = new DashboardPage();
