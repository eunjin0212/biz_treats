import { read, utils } from 'xlsx';

function readFileAsync(fileData) {
    if (!fileData) {
        return null;
    }

    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (e) => {
            const { result } = e.target
            if (!result) {
                return null
            }

            resolve(result);
            return result
        };
        reader.readAsArrayBuffer(fileData);

        reader.onerror = (error) => {
            reject(error)
        };
    })
}

/**
 * 
 * @param {File} fileData 
 * @param {string[] | string} requiredColumn 
 * @returns Promise
 */
const excelToArray = (
    fileData, requiredColumn
) => new Promise((resolve, reject) => {
    const msg = 'Invalid file format. Please download your file try again.'
    readFileAsync(fileData)?.then((res) => {
        const data = new Uint8Array(res);
        const workbook = read(data, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        const sheetData = utils.sheet_to_json(workbook.Sheets[firstSheetName]);


        // NOTE: 엑셀이 빈 파일일 경우
        if (!sheetData.length) {
            reject(msg)
            return msg
        }

        // NOTE: 엑셀에 필수값이 안들어갔을 경우
        const isString = typeof requiredColumn === 'string'
        const checkRequiredColumn = () => sheetData.some((row) => isString
                ? Object.keys(row).includes(requiredColumn)
                : requiredColumn.some((col) => Object.keys(row).includes(col))
            )

        if (requiredColumn && !checkRequiredColumn()) {
            // const msg = `엑셀 파일에 [${requiredColumn.join(', ')}] 열제목을 필수 입력해야 합니다.`
            reject(msg)
            return msg
        }

        resolve(sheetData)
        return sheetData
    }).catch((error) => {
        // const msg = error.message.includes('password-protected') ? '파일이 암호화 되어있습니다.' : error.message
        reject(msg)
    })
})

export { excelToArray }
