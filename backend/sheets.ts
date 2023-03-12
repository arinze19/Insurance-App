// import express from 'express';
// import { GoogleSpreadsheet } from 'google-spreadsheet';
// import credentials from './secrets.json';

// const app = express();

// app.get('/sheets', async (req, res) => {
//   try {
//     const doc = new GoogleSpreadsheet(
//       '1yr0tl0u-pn-hMbpVZ9u69Vtxtj8jMbDTgDAmXQKZb1s'
//     );

//     await doc.useServiceAccountAuth(credentials);
//     await doc.loadInfo();
//     const sheet = doc.sheetsByIndex[0];
//     const data = await sheet.getRows();

//     data.forEach((item) => {
//       console.log(`Timestamp: ${item.timestamp}`);
//       console.log(`Type: ${item.type}`);
//       console.log(`Path: ${item.path}`);
//       console.log(`ErrorCode: ${item.error_code}`);
//       console.log(`-----------------------------`);
//     });

//     await sheet.addRows([
//       {
//         timestamp: new Date().toISOString(),
//         type: 'CustomError',
//         path: '/customer/09/family',
//         error_code: 500,
//       },
//       {
//         title: new Date().toISOString(),
//         type: 'CustomError',
//         path: '/customer/09/family',
//         error_code: 500,
//       },
//     ]);

//     res.status(200).send('hello world');
//   } catch (error) {
//     res.status(500).send('something went wrong');
//   }
// });

// app.listen(4000, () => console.log('app now listening on port 4000'));
