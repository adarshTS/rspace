const { expect } = require('@wdio/globals')
const LoginPage = require('../pageobjects/login.page')
const DashboardPage = require('../pageobjects/dashboard.page')

describe('Local App End-to-End', () => {
    it('should login, confirm modal, and logout', async () => {
        await LoginPage.open();

        await LoginPage.login('admin', 'admin123');

        // Wait for dashboard view to become active
        const dashboardNameEl = (await DashboardPage.userNameText.isDisplayed())
            ? DashboardPage.userNameText
            : DashboardPage.userNameLabel;
        await dashboardNameEl.waitForDisplayed({ timeout: 10000 });
        await expect(dashboardNameEl).toHaveText('Adarsh S');
        await expect(DashboardPage.onlineBadge).toBeExisting();
        const badgeText = await DashboardPage.onlineBadge.getText();
        expect(badgeText).toContain('Online');

        await DashboardPage.openModalBtn.click();
        await DashboardPage.modalTitle.waitForDisplayed({ timeout: 5000 });
        await expect(DashboardPage.modalTitle).toHaveText('Confirm Action');

        if (await DashboardPage.confirmBtn.isExisting()) {
            await DashboardPage.confirmBtn.click();
        } else if (await DashboardPage.confirmModalBtn.isExisting()) {
            await DashboardPage.confirmModalBtn.click();
        } else {
            await DashboardPage.confirmBtnByText.waitForClickable({ timeout: 5000 });
            await DashboardPage.confirmBtnByText.click();
        }

        // Open nav user menu then click Logout
        await DashboardPage.userMenuButton.waitForClickable({ timeout: 5000 });
        await DashboardPage.userMenuButton.click();

        await DashboardPage.userMenu.waitForDisplayed({ timeout: 5000 });
        await DashboardPage.logoutLink.waitForClickable({ timeout: 5000 });
        await DashboardPage.logoutLink.click();

        await DashboardPage.loggedOutHeading.waitForDisplayed({ timeout: 5000 });
        await expect(DashboardPage.loggedOutHeading).toHaveText('Logged Out');
    });
});

