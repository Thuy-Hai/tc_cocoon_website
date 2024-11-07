import { remote } from 'webdriverio';

let browser: WebdriverIO.Browser | undefined;

export const initBrowser = async () => {
  if (!browser) {
    browser = await remote({
      capabilities: {
        browserName: 'chrome',
        'goog:chromeOptions': {
          args: process.env.CI ? ['headless', 'disable-gpu'] : []
        }
      }
    });
  }
  return browser;
};
