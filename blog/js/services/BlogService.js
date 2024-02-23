import { BlogImage, BlogJournal, BlogPost, BlogVideo, datesDictionary } from "../models/BlogModels.js";
import { blogPosts, blogImages, blogVideos, blogJournal } from "../services/XLSXReaderService.js";

// TODO : Render BLogs

const posts = [...blogPosts].filter((post) => post.active);


let currentGalleryStartIndex = 0;
let currentVideosStartIndex = 0;

renderRecentPosts(posts);
renderFeaturedPosts(posts);
renderCarouselPosts(posts);
renderBlogGallery([...blogImages]);
renderBlogVideos([...blogVideos]);
renderBlogJournal([...blogJournal]);
configurePostRedirect(posts);

document.querySelector('back-to-top > button')
  .addEventListener('click',() => {
    window.scrollTo({top: 0, behavior: "smooth"})
  });

/**
 * @param { BlogPost[] } posts  
 */
function renderRecentPosts(posts) {
  const recentPosts = [...posts].sort((a, b) => {
    var dateA = a.date.getTime();
    var dateB = b.date.getTime();
    return dateA > dateB ? 1 : -1;
  }).reverse();

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

  //console.log(pagesArray);

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

  });
}

/**
 * @param { BlogPost } post
 * @param { string } elementId
 */
function renderGridItem(post, elementId) {
  const element = document.getElementById(elementId);

  element.lastElementChild.firstElementChild.innerHTML =
  `${post.title.substring(0, 100)}`;

  element.firstElementChild.src = post.contents.find(
    (content) => content.type == "I"
  ).content;

  element.lastElementChild.lastElementChild.innerHTML =
    getFormattedDate(post.date)
    //post.contents
    //.find((content) => content.type == "P")
    //.content.substring(0, 100) + "...";

  // TODO: Append modal listener
  appendDialogListener(element, post);
}
/**
 *
 * @param { HTMLElement } element
 * @param { BlogPost } post
 */
function appendDialogListener(element, post) {

  element.addEventListener("click", () => showDetailedPost(post));
}

/**
 * @param { BlogPost } post
 */
function showDetailedPost({title, author, date, contents}) {

  const url = getUrlTitle(title);

  const returnBlogHomeEvent = (event) => {

    document.querySelectorAll('.blog-tabs-content')
      .forEach(content => {
        content.classList.add('inactive');
        if(content.id.includes('1')) content.classList.remove('inactive')
      })
  
      // console.log(window.location);
      history.pushState(null, 'Blog - GM Inmobiliaria', window.location.origin + '/blog/blog.html');
  
    window.removeEventListener('popstate', returnBlogHomeEvent)
  }


  history.pushState(null,title, '?post=' + url);

  window.addEventListener('popstate', returnBlogHomeEvent);

  document.querySelectorAll('.blog-tabs-selector')
    .item(0)
    .addEventListener('click', () => returnBlogHomeEvent())

  window.scrollTo({top: 390, behavior: "smooth"})

  console.log("clicked - " + title);
  
  document.querySelectorAll(".blog-tabs-content").forEach((content) => content.classList.add("inactive"));
  const content = document.getElementById("blog-tabs-content--5");
  content.classList.remove("inactive");

  content.firstElementChild.firstElementChild.firstElementChild.innerHTML = title;
  content.firstElementChild.firstElementChild.lastElementChild.innerHTML = `POR ${ author }, ${getFormattedDate(date)}`;
  
  content.firstElementChild.children.item(1).firstElementChild.src =
  contents.find(content => content.type == 'I').content;

  const blogText = content.firstElementChild.lastElementChild;

  const textContentHtmlStr = contents.map(({type, content, links}) => {

    const getAnchorHref = () => {

    }

    const getParagraphContent = (content, links) => {

      if(!content.includes('**')) return content;

      const splittedLinks = links.split('https').map(link => 'https' + link);
      splittedLinks.shift();

      const mutableContent = content.slice(0);

      // console.log(mutableContent.split('*'));
      const formattedContent = mutableContent.split('*').map((section, index, arr) => {


        if(index != 0 && index != arr.length - 1) {

          if(section.length == 0) return section

          if(arr[index - 1].length == 0 && arr[index + 1].length == 0) {
            return `<a target="_BLANK" href="${ splittedLinks.shift() }">${ section }</a>`
          }
        }
        return section
      }).join('')

      // console.log(formattedContent);
      // console.log(mutableContent);

      return formattedContent

    }

    if(type.toUpperCase() == 'S') return `<span>${ content }</span>`;
    if(type.toUpperCase() == 'ST') return `<h3>${ content }</h3>`;
    if(type.toUpperCase() == 'P') return `<p>${ getParagraphContent(content, links) }</p>`;
    return '';
  
  }).join('')
  blogText.innerHTML = textContentHtmlStr;


  const _recentPosts = [...posts].sort((a, b) => {
    var dateA = a.date.getTime();
    var dateB = b.date.getTime();
    return dateA > dateB ? 1 : -1;
  });

  const recentPosts = _recentPosts.splice(0,5)

  const recentPostHtmlStr = recentPosts.map(recentPost => {
    return `<a id="${ recentPost.id }" >${ recentPost.title }</a>`
  }).join('');

  document.querySelector('recent-posts').innerHTML = recentPostHtmlStr

  document.querySelectorAll('recent-posts > a')
    .forEach( a => {
      const post = posts.find(post => post.id == a.id);
      a.addEventListener('click', () => showDetailedPost(post));
    })

    // setInterval(() => {
    //   console.log(window.scrollY);

    // }, 2000)

    addEventListener("scroll", (event) => {

      if(window.scrollY < 1000) {
        document.querySelector('back-to-top > button').style.opacity = '0';
      } else {

        document.querySelector('back-to-top > button').style.opacity = '1';
      }

    });



  
}

const _blogImages = [...blogImages];
/**
 * 
 * @param { BlogImage[] } blogImages 
 * @param { number } currentIndex
 */
function renderBlogGallery(blogImages, currentIndex = 0) {

  const renderByClick = (imageIndex) => {
    renderBlogGallery([..._blogImages], imageIndex)
  }

  const currentImages = blogImages.splice(currentIndex, 4);
  // console.log(currentImages);

  document.querySelector('blog-gallery-grid > img').src = currentImages[0].url;
  document.querySelector('blog-gallery-grid > img').setAttribute('image-index', currentIndex)
  
  document.querySelectorAll('blog-gallery-selector-imgs > img')
    .forEach((img, index) => {
      
      img.src = currentImages[index + 1].url;
      img.alt = currentImages[index + 1].title;
      img.setAttribute('image-index', currentIndex + index + 1)
      img.addEventListener('click', () => renderByClick(currentIndex + index + 1));

    })

}
/**
 * 
 * @param { BlogVideo[] } blogVideo 
 * @param { number } currentIndex
 */
function renderBlogVideos(blogVideo, currentIndex = 0) {

  const currentVideos = blogVideo.splice(currentIndex, 4);

  // console.log(currentVideos);

  document.querySelector('blog-videos-grid').innerHTML = currentVideos[0].iFrame;

  document.querySelector('blog-videos-title > h4').innerHTML = currentVideos[0].title;

  let innerSelectorContent = '';

  for(let  i = 1; i < currentVideos.length; i++) { 
    innerSelectorContent += currentVideos[i].iFrame;
  }

  // console.log(innerSelectorContent);
  /* document.querySelector('blog-videos-selector-imgs').innerHTML = innerSelectorContent; */

}

/**
 * @param { BlogJournal[] } blogJournals
 */
function renderBlogJournal(blogJournals) {

  // console.log(blogJournals);
  const blogJournalList = document.querySelector('blog-journal-list');
  blogJournalList.innerHTML = '';

  const listItemsHtml = blogJournals
    .map(journal => `
      <blog-journal-list-item>
        <blog-journal-list-item-text>
          <h3>${ journal.title }</h3>
          <p>${ journal.description }</p>
          <a href="${ journal.link }" target="_BLANK">${ journal.buttonText }</a>
        </blog-journal-list-item-text>
      </blog-journal-list-item>`
    ).join('');
    blogJournalList.innerHTML = listItemsHtml;

}

document.querySelectorAll('.blog-tabs-selector')
  .forEach( selector => selector.addEventListener('click', () => {

    // console.log(selector);

    if(selector.id != 'blog-tabs-selector--3') {
      document.querySelector('blog-videos-grid').innerHTML = '';

    } else {
      renderBlogVideos([...blogVideos]);
    }

  }))


document.querySelector('#prev-image')
  .addEventListener('click', () => {
    if(currentGalleryStartIndex == 0) return;
    currentGalleryStartIndex--;
    renderBlogGallery([...blogImages], currentGalleryStartIndex);
  })

document.querySelector('#next-image')
  .addEventListener('click', () => {
    currentGalleryStartIndex++;
    renderBlogGallery([...blogImages], currentGalleryStartIndex);
  })


document.querySelector('#next-video')
  .addEventListener('click', () => {
    currentVideosStartIndex++;
    renderBlogVideos([...blogVideos], currentVideosStartIndex);
  })

document.querySelector('#prev-video')
  .addEventListener('click', () => {
    if(currentVideosStartIndex == 0) return;
    currentVideosStartIndex--;
    renderBlogVideos([...blogVideos], currentVideosStartIndex);
  })




/**
 *
 * @param { NodeList } elements
 */
function removeDialogListener(elements) {
  elements.forEach((element) =>
    element.removeEventListener("click", showDetailedPost)
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

/**
 * 
 * @param { string } title 
 * @returns 
 */
function getUrlTitle(title) {

  const aRegex = new RegExp('á', 'g');
  const eRegex = new RegExp('é', 'g');
  const iRegex = new RegExp('í', 'g');
  const oRegex = new RegExp('ó', 'g');
  const uRegex = new RegExp('ú', 'g');

  return title
    .toLowerCase()
    .replace('?','')
    .replace('¿','')
    .replace(aRegex,'a')
    .replace(eRegex,'e')
    .replace(iRegex,'i')
    .replace(oRegex,'o')
    .replace(uRegex,'u')
    .split(' ')
    .join('-');
}

/**
 * 
 * @param { BlogPost[] } blogPosts
 */
function configurePostRedirect(blogPosts) {

  const urlSearchParams = new URLSearchParams(window.location.search);
  if(urlSearchParams.get('post')) {

    const post = blogPosts.find(post => post.url == urlSearchParams.get('post'));

    console.log(post);
    showDetailedPost(post);
  }
}