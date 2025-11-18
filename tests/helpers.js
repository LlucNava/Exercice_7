// Note! install module csv-parse:
// npm install csv-parse

import { parse } from 'csv-parse/sync';

export const isCSV = (data) => {
  try {
    parse(data, { columns: false, skip_empty_lines: true });
    return true;
  } catch (err) {
    return false;
  }
};
