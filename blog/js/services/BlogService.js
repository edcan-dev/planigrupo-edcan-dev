import { BlogPost, datesDictionary } from "../models/BlogModels.js";
import { blogPosts } from "../services/XLSXReaderService.js";

// TODO : Render BLogs

const posts = [...blogPosts].filter((post) => post.active);

renderRecentPosts(posts);
renderFeaturedPosts(posts);
renderCarouselPosts(posts);

/**
 * @param { BlogPost[] } posts
 */
function renderRecentPosts(posts) {
  const recentPosts = [...posts].sort((a, b) => {
    var dateA = a.date.getTime();
    var dateB = b.date.getTime();
    return dateA > dateB ? 1 : -1;
  });

  const recentElements = document.querySelectorAll("blog-recent-item");

  recentElements.forEach((el, index) => {
    renderGridItem(recentPosts[index], el.id);
  });
}

/**
 * @param {BlogPost[]} posts
 */
function renderFeaturedPosts(posts) {
  const featuredElements = document.querySelectorAll("blog-featured-grid-item");

  let currentFeatured = [...posts].splice(0, 2);
  let currentStartedIndex = 0;

  featuredElements.forEach((el, index) => {
    renderGridItem(currentFeatured[index], el.id);
  });

  // Arrows Event Listeners
  document
    .querySelectorAll("blog-featured-grid-arrows > svg")
    .forEach((arrow, arrowIndex) => {
      arrow.addEventListener("click", (ev) => {
        removeDialogListener(
          document.querySelectorAll("blog-featured-grid-item")
        );

        if (arrowIndex == 0) {
          console.log("prev" + currentStartedIndex);

          if (currentStartedIndex == 0) {
            currentStartedIndex = posts.length - 2;
          } else {
            currentStartedIndex--;
          }

          currentFeatured = [...posts].splice(currentStartedIndex, 2);
        } else {
          if (currentStartedIndex == posts.length - 2) {
            currentFeatured = [posts[0], posts[1]];
            currentStartedIndex = 0;
          } else {
            currentStartedIndex++;
            //console.log('next ' + currentStartedIndex);
            currentFeatured = [...posts].splice(currentStartedIndex, 2);
          }
        }

        featuredElements.forEach((el, index) => {
          renderGridItem(currentFeatured[index], el.id);
        });
      });
    });
}
/**
 *
 * @param { BlogPost[] } posts
 */
function renderCarouselPosts(posts) {
  const currentCarouselItems = document.querySelectorAll(
    "blog-posts-carousel-grid-item"
  );

  const pagesArray = [];
  const readedPosts = [...posts];

  while (readedPosts.length > 0) {
    pagesArray.push(readedPosts.splice(0, 3));
  }

  currentCarouselItems.forEach((htmlElement, index) => {
    renderGridItem(pagesArray[0][index], htmlElement.id);
  });

  // for (let index = 2; index <= pagesArray.length; index++) {
  //   const blogPost = document.createElement("blog-posts-carousel-page");
  //   blogPost.id = `blog-posts-carousel--page--${index}`;
  //   blogPost.classList.add("blog-posts-carousel-page");
  //   blogPost.classList.add("inactive");

  //   blogPost.innerHTML = `
  //   <blog-posts-carousel-grid>
  //             <blog-posts-carousel-grid-item id="blog-posts-carousel-grid-item--1">
  //               <img
  //                 src=""
  //                 alt="Imagen de blog">
  //               <div class="text">
  //                 <p class="description">
  //                 </p>
  //                 <small class="date">
  //                 </small>
  //               </div>
  //             </blog-posts-carousel-grid-item>
  //             <blog-posts-carousel-grid-item id="blog-posts-carousel-grid-item--2">
  //               <img
  //                 src=""
  //                 alt="Imagen de blog">
  //               <div class="text">
  //                 <p class="description">
  //                 </p>
  //                 <small class="date">
  //                 </small>
  //               </div>
  //             </blog-posts-carousel-grid-item>
  //             <blog-posts-carousel-grid-item id="blog-posts-carousel-grid-item--3">
  //               <img
  //                 src=""
  //                 alt="Imagen de blog">
  //               <div class="text">
  //                 <p class="description"></p>
  //                 <small class="date"></small>
  //               </div>
  //             </blog-posts-carousel-grid-item>     
  //           </blog-posts-carousel-grid>
  //   `;

  //   document.querySelector("blog-posts-carousel").appendChild(blogPost);
  // }

  console.log(pagesArray);

  var pager = new ej.grids.Pager({
    pageSize: 3,
    pageCount: 5,
    totalRecordsCount: posts.length,
  });
  pager.appendTo("#Pager");

  pager.addEventListener("click", (ev) => {
    const newPage = ev.currentPage;
    let newPageElement = document.querySelector('#blog-posts-carousel-page--1')
    console.log(newPage);

    // document.querySelectorAll("blog-posts-carousel-page").forEach((page) => {
    //   page.classList.add("inactive");
    //   if (page.id.includes(newPage)) {
    //     page.classList.remove("inactive");
    //     newPageElement = page;
    //   }
    // });

    newPageElement.innerHTML = `
      <blog-posts-carousel-grid>
        <blog-posts-carousel-grid-item id="blog-posts-carousel-grid-item--1">
                <img
                  src=""
                  alt="Imagen de blog">
                <div class="text">
                  <p class="description">
                  </p>
                  <small class="date">
                  </small>
                </div>
              </blog-posts-carousel-grid-item>
              <blog-posts-carousel-grid-item id="blog-posts-carousel-grid-item--2">
                <img
                  src=""
                  alt="Imagen de blog">
                <div class="text">
                  <p class="description">
                  </p>
                  <small class="date">
                  </small>
                </div>
              </blog-posts-carousel-grid-item>
              <blog-posts-carousel-grid-item id="blog-posts-carousel-grid-item--3">
                
                <img
                  src="">
                <div class="text">
                  <p class="description"></p>
                  <small class="date"></small>
                </div>
              </blog-posts-carousel-grid-item>     
            </blog-posts-carousel-grid>
    `;

    const currentCarouselItems = document.querySelectorAll(
      "blog-posts-carousel-grid-item"
    );

    console.log(currentCarouselItems);

    currentCarouselItems.forEach((htmlElement, index) => {
      try {
        renderGridItem(pagesArray[newPage - 1][index], htmlElement.id);

      } catch (e) {
        htmlElement.style.display = 'none'
      }
    });

    // document.querySelectorAll('blog-posts-carousel-page')
    //   .forEach(page => {
    //     page.classList.add('inactive');
    //     if(page.id.includes(newPage)) {
    //       page.classList.remove('inactive')
    //       newPageElement = page;
    //     }
    //   })

    // console.log(newPageElement);

    // const currentCarouselItems = newPageElement.firstElementChild.children;

    // console.log(currentCarouselItems);

    // for (let index = 0; index < currentCarouselItems.length; index++) {
    //   const item = currentCarouselItems.item(index);
    //   renderGridItem(pagesArray[0][index], item.id)
    // }
  });
}

/**
 * @param { BlogPost } post
 * @param { string } elementId
 */
function renderGridItem(post, elementId) {
  const element = document.getElementById(elementId);

  element.lastElementChild.lastElementChild.innerHTML = `${getFormattedDate(
    post.date
  )} | ${post.title.substring(0, 50)}...`;

  element.firstElementChild.src = post.contents.find(
    (content) => content.type == "I"
  ).content;

  element.lastElementChild.firstElementChild.innerHTML =
    post.contents
      .find((content) => content.type == "P")
      .content.substring(0, 80) + "...";

  // TODO: Append modal listener
  appendDialogListener(element, post);
}
/**
 *
 * @param { HTMLElement } element
 * @param { number } postId
 */
function appendDialogListener(element, post) {
  element.addEventListener("click", () => showPostEntry(post));
}

/**
 * @param { BlogPost } post
 */
function showPostEntry(post) {
  console.log("clicked - " + post.title);

  document
    .querySelectorAll(".blog-tabs-content")
    .forEach((content) => content.classList.add("inactive"));
  document.getElementById("blog-tabs-content--5").classList.remove("inactive");

  console.log();
}
/**
 *
 * @param { NodeList } elements
 */
function removeDialogListener(elements) {
  elements.forEach((element) =>
    element.removeEventListener("click", showPostEntry)
  );
}

/**
 * @param { Date } date
 */
function getFormattedDate(date) {
  return `${datesDictionary[date.getMonth() + 1].substring(
    0,
    3
  )} ${date.getDate()}, ${date.getFullYear()}`;
}
