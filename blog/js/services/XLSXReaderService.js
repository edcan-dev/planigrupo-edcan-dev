import { BlogImage, BlogPost, BlogVideo } from "../models/BlogModels.js";
const language = document.head.querySelector("[property~=language][content]").content;

const postFileName = language != 'english' ? 'blog_layout.xlsx' : 'ENG_blog_layout.xlsx';
const imagesVideosJournalFileName = language != 'english'
  ? 'blog_gallery_videos_journal.xlsx'
  : 'ENG_blog_gallery_videos_journal.xlsx';

let fileURL = null;
if (window.location.href.includes("github")) {
  fileURL =
    "https://edcan-dev.github.io/planigrupo-edcan-dev/data/blog_layout.xlsx";
} else {
  fileURL = `../../../data/${ postFileName }`;
}

let xlsx = null;

await fetch(fileURL)
  .then((response) => response.blob())
  .then((blob) => (xlsx = blob));

const _blogPosts = [];

try {
  for (let index = 1; true; index++) {
    await readXlsxFile(xlsx, { sheet: index }).then(async (rows) => {
      
      let currentPost = new BlogPost();

      for (let index = 0; index < rows.length; index++) {
        const row = rows[index];


        if (row[5] == "T") {

          currentPost.title = row[6]; 
          currentPost.id = row[0];         

          currentPost.active =  (row[7].toLowerCase() == 'sí' || row[7].toLowerCase() == 'si') ? true : false;
 
          currentPost.date.setDate(row[1]);
          currentPost.date.setMonth(row[2] - 1);
          currentPost.date.setFullYear(row[3]);
          currentPost.author = row[4];


        } else {
          const currentContent = {
            type: row[5],
            content: row[6],
          };
          
          currentPost.contents.push(currentContent);
        }
      }
      _blogPosts.push(currentPost);
    });
  }
} catch (e) {
  // console.log(e);
}


const _blogImages = [];
const _blogVideos = [];

let secondXlsx;
const secondFileURL = `./../../../data/${ imagesVideosJournalFileName }`;
await fetch(secondFileURL)
  .then((response) => response.blob())
  .then((blob) => (secondXlsx = blob));
  
// Images Sheet
await readXlsxFile(secondXlsx, { sheet: 1 }).then(async (rows) => {
  rows.shift();

  const IMAGES_PATH_PREFIX = 'https://planigrupo.mx/wp-content/uploads/planigrupo-org/sites/369/';

  for(let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const image = new BlogImage();
    image.title = row[0]
    image.url = IMAGES_PATH_PREFIX + row[1];
    _blogImages.push(image);
  }
});

// Videos Sheet
await readXlsxFile(secondXlsx, { sheet: 2 }).then(async (rows) => {
  rows.shift();

  for(let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const video = new BlogVideo();
    video.title = row[0]
    video.iFrame = row[1];
    _blogVideos.push(video);
  }
});

const blogPosts = _blogPosts;
const blogImages = [..._blogImages, ..._blogImages, ..._blogImages];
const blogVideos = [..._blogVideos, ..._blogVideos, ..._blogVideos];

export {
  blogPosts,
  blogImages,
  blogVideos
}