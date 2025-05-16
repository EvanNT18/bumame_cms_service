import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { memoryStorage } from 'multer';

export const multerOptions: MulterOptions = {
  storage: memoryStorage(),
  fileFilter: (req, file, callback) => {
    // TODO: make validation more robust, non-image file disguised as image must be detected and rejected
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return callback(new Error('Only image files are allowed!'), false);
    }
    callback(null, true);
  },
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
};
