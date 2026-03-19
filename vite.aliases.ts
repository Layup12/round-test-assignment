import path from 'node:path';

export const aliases = {
  '@': path.resolve(__dirname, 'src'),
  '@app': path.resolve(__dirname, 'src/app'),
  '@pages': path.resolve(__dirname, 'src/pages'),
  '@entities': path.resolve(__dirname, 'src/entities'),
  '@features': path.resolve(__dirname, 'src/features'),
  '@shared/lib': path.resolve(__dirname, 'src/shared/lib'),
  '@shared/ui': path.resolve(__dirname, 'src/shared/ui'),
};
