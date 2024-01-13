import { BlogPost } from "../models/BlogModels.js";

let fileURL = null;
if (window.location.href.includes("github")) {
  fileURL =
    "https://edcan-dev.github.io/planigrupo-edcan-dev/data/blog_layout.xlsx";
} else {
  fileURL = "../../../data/blog_layout.xlsx";
}

let xlsx = null;

await fetch(fileURL)
  .then(response => response.blob())
  .then(blob => xlsx = blob);
  
const _blogPosts = [];

 await readXlsxFile(xlsx).then(async function(rows) {
  
  rows.shift();


  const numberOfPost = rows.filter(row => row[5] == 'T').length;

  //console.log('{ POST NUMBER } - ' + numberOfPost);

  let currentPost;

  for (let index = 0; index < rows.length; index++) {
    const row = rows[index];

    if(row[5] == null) {
      _blogPosts.push(currentPost);
      currentPost = undefined;
      continue;
    }

    if(row[5] == 'T') {

      currentPost = new BlogPost();

      currentPost.title = row[6]

      currentPost.date.setDate(row[1]);
      currentPost.date.setMonth(row[2] - 1);
      currentPost.date.setFullYear(row[3]);

      currentPost.author = row[4];

    } else {

      const currentContent = {
        type: row[5],
        content: row[6]
      }
      currentPost.contents.push(currentContent)
    }

  }

})
export const blogPosts = _blogPosts;