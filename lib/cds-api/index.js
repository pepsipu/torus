import { GoogleSpreadsheet } from 'google-spreadsheet';


const doc = new GoogleSpreadsheet('1xZWXd0J-6D3dclTkZSGBs4--kXtRSZQOuSsm9ZSPodg', {
    apiKey: 'AIzaSyC5gLR53Ow2orsJRhqQg3bAk8f5xHgPIdk'
});

await doc.loadInfo();

const sheet = doc.sheetsByIndex[0];
const rows = await sheet.getRows();
console.log(rows);