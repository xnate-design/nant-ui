import { resolve } from 'path';
import { getDirname } from './fsUtils.js';

export const dirname = getDirname(import.meta.url);

export const INIT_DIR = resolve(dirname, '../../../../template');
export const CONFIG_PATH = resolve(process.cwd(), '.nant/config.mts');

export const CLIENT_PATH = resolve(dirname, '../../', 'client');
export const APPEARANCE_KEY = 'nant-theme';
export const DEFAULT_THEME_DIR = resolve(CLIENT_PATH, 'theme-default');

export const CLI_PACKAGE_JSON = resolve(dirname, '../../../../package.json');
