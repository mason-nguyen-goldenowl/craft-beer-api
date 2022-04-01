import { extname } from 'path';

export const fileName = (req, file, callback) => {
  const name = file.originalname.split('.')[0];
  const ext = extname(file.originalname);
  const randomName = Array(6)
    .fill(null)
    .map(() => Math.round(Math.random() * 8).toString(8))
    .join('');
  callback(null, `${randomName}${ext}`);
};
