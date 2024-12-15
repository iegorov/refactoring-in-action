import fs from 'fs';
import path from 'path';

export function getSlides() {
  const slidesDir = path.resolve(__dirname, 'slides');

  // Проверка на существование директории slides
  if (!fs.existsSync(slidesDir)) {
    console.log(`Directory ${slidesDir} does not exist. No slides to load.`);
    return [];
  }

  const slidesContent = [];

  function readSlides(dir) {
    const files = fs.readdirSync(dir);
    files.forEach((file) => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      if (stat.isDirectory()) {
        readSlides(filePath);
      } else if (stat.isFile()) {
        slidesContent.push(fs.readFileSync(filePath, 'utf-8'));
      }
    });
  }

  readSlides(slidesDir);
  return slidesContent;
}
