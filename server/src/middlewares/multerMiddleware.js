import multer from 'multer';
import path from 'path';
import __dirname from '../../utils.js';

// AVATARS
const storageAvatars = multer.diskStorage({
    destination: (req, file, cb) => { cb(null, path.join(__dirname, './dist/files/avatars')) },
    filename: (req, file, cb) => { cb(null, req.uid + '-' + file.originalname) },
});
const uploadAvatars = multer({
    storage: storageAvatars,
    limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
});
export const multerAvatars = (req, res, next) => {
    uploadAvatars.single('avatar')(req, res, (err) => {
        if (err instanceof multer.MulterError && err.code === 'LIMIT_FILE_SIZE') {
            res.status(413).json({ message: 'The file exceeds the maximum allowed size (2MB)' });
        } else if (err) {
            next(err);
        }
        next();
    });
};

// DOCUMENTS
const storageDocs = multer.diskStorage({
    destination: (req, file, cb) => { cb(null, path.join(__dirname, './dist/files/documents')) },
    filename: (req, file, cb) => { cb(null, req.uid + '-' + file.originalname) },
});
const uploadDocs = multer({
    storage: storageDocs,
    limits: { fileSize: 25 * 1024 * 1024 }, // 25MB
});
export const multerDocs = (req, res, next) => {
    uploadDocs.single('document')(req, res, (err) => {
        if (err instanceof multer.MulterError && err.code === 'LIMIT_FILE_SIZE') {
            res.status(413).json({ message: 'The document exceeds the maximum allowed size (25MB)' });
        } else if (err) {
            next(err);
        }
        next();
    });
};

// PRODUCTS
const storageProducts = multer.diskStorage({
    destination: (req, file, cb) => { cb(null, path.join(__dirname, './dist/files/products')) },
    filename: (req, file, cb) => { cb(null, req.uid + '-' + file.originalname) },
});
const uploadProducts = multer({
    storage: storageProducts,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});
export const multerProducts = (req, res, next) => {
    uploadProducts.array('products_img')(req, res, (err) => {
        if (err instanceof multer.MulterError && err.code === 'LIMIT_FILE_SIZE') {
            res.status(413).json({ message: 'The document exceeds the maximum allowed size (5MB)' });
        } else if (err) {
            next(err);
        }
        next();
    });
};


// MulterError: Unexpected field
//     at wrappedFileFilter (/home/jorgecermeno/Downloads/boatpump-jsx/server/node_modules/multer/index.js:40:19)
//     at Multipart.<anonymous> (/home/jorgecermeno/Downloads/boatpump-jsx/server/node_modules/multer/lib/make-middleware.js:107:7)
//     at Multipart.emit (node:events:514:28)
//     at HeaderParser.cb (/home/jorgecermeno/Downloads/boatpump-jsx/server/node_modules/busboy/lib/types/multipart.js:358:14)
//     at HeaderParser.push (/home/jorgecermeno/Downloads/boatpump-jsx/server/node_modules/busboy/lib/types/multipart.js:162:20)
//     at SBMH.ssCb [as _cb] (/home/jorgecermeno/Downloads/boatpump-jsx/server/node_modules/busboy/lib/types/multipart.js:394:37)
//     at feed (/home/jorgecermeno/Downloads/boatpump-jsx/server/node_modules/streamsearch/lib/sbmh.js:219:14)
//     at SBMH.push (/home/jorgecermeno/Downloads/boatpump-jsx/server/node_modules/streamsearch/lib/sbmh.js:104:16)
//     at Multipart._write (/home/jorgecermeno/Downloads/boatpump-jsx/server/node_modules/busboy/lib/types/multipart.js:567:19)
//     at writeOrBuffer (node:internal/streams/writable:392:12) {
//   code: 'LIMIT_UNEXPECTED_FILE',
//   field: 'avatar',
//   storageErrors: []
// }