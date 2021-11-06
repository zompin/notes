import { browser } from 'webextension-polyfill-ts';
import { NAMES } from './constants';

export const getLocaleMessage = (name: string, content?: string | string[]) => (
  browser.i18n.getMessage(name, content)
);
