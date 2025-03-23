import path from 'path';

const ROOT_DIR = path.resolve(__dirname, '..');

const PATHS = {
  src: path.join(ROOT_DIR, 'src'),
  dist: path.join(ROOT_DIR, 'dist'),
  public: path.join(ROOT_DIR, 'public'),
  components: path.join(ROOT_DIR, 'src/components'),
  pages: path.join(ROOT_DIR, 'src/pages'),
  store: path.join(ROOT_DIR, 'src/store'),
  utils: path.join(ROOT_DIR, 'src/utils'),
  styles: path.join(ROOT_DIR, 'src/styles'),
  api: path.join(ROOT_DIR, 'src/api'),
};
export default PATHS;