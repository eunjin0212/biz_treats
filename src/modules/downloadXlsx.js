import { utils, writeFile } from 'xlsx';

/**
 * 
 * @param {{[header: string]: string | number}[]} rows 
 * @param {string} title 
 */

const downloadXlsx = (rows, title = '엑셀 양식 샘플.xlsx') => {
  const worksheet = utils.json_to_sheet(rows);
  const workbook = utils.book_new();
  utils.book_append_sheet(workbook, worksheet, title);
  writeFile(workbook, title);
};

export default downloadXlsx
