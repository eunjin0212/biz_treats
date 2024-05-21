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

const excelToArray = (
    fileData, requiredColumn
) => new Promise((resolve, reject) => {
    readFileAsync(fileData)?.then((res) => {
        const data = new Uint8Array(res);
        const workbook = read(data, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        const sheetData = utils.sheet_to_json(workbook.Sheets[firstSheetName]);

        const isString = typeof requiredColumn === 'string'

        // NOTE: 엑셀이 빈 파일일 경우
        if (!sheetData.length) {
            const msg = '엑셀 파일에 데이터를 입력해주세요.'
            reject(msg)
            return msg
        }

        // NOTE: requiredColumn 자리에 어떠한 매개변수도 없으면 필수 헤더를 체크하지 않습니다.
        const checkRequiredColumn = () => requiredColumn === undefined
            ? true
            : sheetData.some((row) => isString
                ? Object.keys(row).includes(requiredColumn)
                : requiredColumn.some((r) => requiredColumn.includes(r))
            )

        if (requiredColumn && !checkRequiredColumn()) {
            const msg = `엑셀 파일에 [${requiredColumn.join(', ')}] 열제목을 필수 입력해야 합니다.`
            reject(msg)
            return msg
        }

        resolve(sheetData)
        return sheetData
    }).catch((error) => {
        const msg = error.message.includes('password-protected') ? '파일이 암호화 되어있습니다.' : error.message
        reject(msg)
    })
})

export { excelToArray }
