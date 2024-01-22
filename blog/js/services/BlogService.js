import { BlogPost, datesDictionary } from "../models/BlogModels.js";
import { blogPosts } from "../services/XLSXReaderService.js";

// TODO : Render BLogs

const posts = [...blogPosts].filter((post) => post.active);

renderRecentPosts(posts);
renderFeaturedPosts(posts);

/**
 * @param { BlogPost[] } posts
 */
function renderRecentPosts(posts) {

  const recentPosts = [...posts].sort((a,b) => {
    var dateA = a.date.getTime();
    var dateB = b.date.getTime();
    return dateA > dateB ? 1 : -1; 
  });

  const recentElements = document.querySelectorAll('blog-recent-item');

  recentElements.forEach((el, index) => {
    renderGridItem(recentPosts[index], el.id)
  })

}

/**
 * @param {BlogPost[]} posts 
 */
function renderFeaturedPosts(posts) {  

  const featuredElements = document.querySelectorAll('blog-featured-grid-item');

  let currentFeatured = [...posts].splice(0,2);
  let currentStartedIndex = 0;

  featuredElements.forEach((el, index) => {
    renderGridItem(currentFeatured[index], el.id);
  });


  // Arrows Event Listeners
  document.querySelectorAll('blog-featured-grid-arrows > svg').forEach((arrow, arrowIndex) => {
    arrow.addEventListener('click', (ev) => {

      removeDialogListener(
        document.querySelectorAll('blog-featured-grid-item')
      );

      if(arrowIndex == 0) {
        console.log('prev' + currentStartedIndex);

        if(currentStartedIndex == 0) {
          currentStartedIndex = posts.length - 2
        } else {

          currentStartedIndex--;
        }
        
        currentFeatured = [...posts].splice(currentStartedIndex,2);        
        
      } else {

        if(currentStartedIndex == posts.length - 2) {
          currentFeatured = [
            posts[0],
            posts[1]
          ]
          currentStartedIndex = 0;
        } else {
          
          currentStartedIndex++;
          //console.log('next ' + currentStartedIndex);
          currentFeatured = [...posts].splice(currentStartedIndex,2);
        }
        
      }
      
      featuredElements.forEach((el, index) => {
        renderGridItem(currentFeatured[index], el.id);
      });

    })
  })

}

/**
 * @param { BlogPost } post 
 * @param { string } elementId 
 */
function renderGridItem(post, elementId) {

  const element = document.getElementById(elementId);

  element.lastElementChild.lastElementChild.innerHTML = 
  `${ getFormattedDate(post.date)} | ${ post.title.substring(0, 50)}...`;

  element.firstElementChild.src = post.contents.find(content => content.type == 'I').content

  element.lastElementChild.firstElementChild.innerHTML = post.contents.find(content => content.type == 'P').content.substring(0,80) + '...';


  // TODO: Append modal listener
  appendDialogListener(element, post.id);
}
/**
 * 
 * @param { HTMLElement } element 
 * @param { number } postId 
 */
function appendDialogListener(element, postId) {
  element.addEventListener('click', showModalDialog
  );
}
function showModalDialog() {
  console.log('clicked');
}
/**
 * 
 * @param { NodeList } elements
 */
function removeDialogListener(elements) {
  elements.forEach(element => element.removeEventListener('click', showModalDialog))
}

/**
 * @param { Date } date 
 */
function getFormattedDate(date) {
  return `${ datesDictionary[date.getMonth() + 1].substring(0,3)} ${date.getDate()}, ${date.getFullYear()}`
}
