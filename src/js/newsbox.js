import '../css/newsbox.scss';
import moment from 'moment';
import NewsBoxApiService from './service/newsbox-service';

const newsBoxApiService = new NewsBoxApiService();

// розмітка формі
const markup = `
<section class="news-app">
  <section class="header">
    <div class="header__wrapper">
      <a class="header__logo">
        <i class="fa-regular fa-newspaper"></i>
      </a>
      <div class="header__brand">News Box</div>
    </div>
  </section>

  <form class="search">
    <div class="search__wrapper">
      <input class="search__field" type="text" placeholder="What are you looking for?" name="search">
      <button class="search__btn" type="" submit>
        <span class="search__icon">
          <i class="fa-solid fa-magnifying-glass"></i>
          <i class="fa-solid fa-circle-notch"></i>
        </span>
      </button>
    </div>
  </form>

  <div class="articles">
    <article></article>
  </div>

  <section class="load-more">
    <button class="load-more__btn hidden_on">More</button>
  </section>
</section>
`;
const sectionNewsBox = document.querySelector('.newsbox');
sectionNewsBox.innerHTML = markup;

// елементи DOM
const refs = {
  searchForm: document.querySelector('.news-app .search'),
  articles: document.querySelector('.news-app .articles'),
  input: document.querySelector('.search__field'),
  moreButton: document.querySelector('.load-more__btn'),
};

// some defaults definitions
let firstPageOfArticles = [];
refs.moreButton.disabled = true;

// слухачі
refs.searchForm.addEventListener('submit', getArticles);
refs.moreButton.addEventListener('click', onLoadMore);

// відправка і повернення даних
function getArticles(event) {
  event.preventDefault();

  newsBoxApiService.query = event.currentTarget.elements.search.value;
  newsBoxApiService.pageParam = 1;
  firstPageOfArticles = [];

  newsBoxApiService
    .fetchArticles()

    .then(articles => {
      firstPageOfArticles = articles;
      toggleMoreButton(articles);
      renderArticles(articles);
      infinityLoading();
    });
}

//  button status
function toggleMoreButton(articles) {
  if (articles.length > 0) {
    refs.moreButton.classList.remove('hidden_on');
    refs.moreButton.disabled = false;
  } else {
    refs.moreButton.classList.add('hidden_on');
    refs.moreButton.disabled = true;
  }
}

// additional news
function onLoadMore() {
  refs.moreButton.classList.add('loading');

  newsBoxApiService.pageParam += 1;

  newsBoxApiService
    .fetchArticles(newsBoxApiService.whatToLookFor)
    .then(articles => {
      firstPageOfArticles = [...firstPageOfArticles, ...articles];
      renderArticles(firstPageOfArticles);
      // toggleMoreButton(articles);
    });
}

function renderArticles(articles) {
  console.log(articles);
  toggleMoreButton(articles);
  const markup = articles
    .map(
      ({
        author,
        title,
        publishedAt,
        urlToImage,
        url,
        content,
        description,
      }) => {
        return `
        <article class="article">
          <h2 class="article__title">${title}</h2>

          <div class="article__publish-date">
              ${moment(publishedAt).format('l')}
          </div>

          <div class="article__author">
              ${author}
          </div>

          <figure class="article__image">
              <img src="${urlToImage}" alt="article-image">
          </figure>

          <div class="article__content">
             ${description}
             <a href="${url}" target="_blank">read more</a>
             <span> ... time of reading average ${timeOfReading(
               content
             )} min.</span>
          </div>

         </article>
      `;
      }
    )
    .join('');

  refs.articles.innerHTML = markup;
}

function timeOfReading(content) {
  const start = content.indexOf('[');
  const end = content.indexOf(']');
  const result = Math.ceil(
    Number.parseInt(content.substring(start + 1, end)) / 1500
  );
  return result;
}

function infinityLoading() {
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      console.log(entry.isIntersecting);
      if (entry.isIntersecting) {
        onLoadMore();
      }
    }
  }, {});
  observer.observe(refs.moreButton);

  refs.moreButton.classList.add('hidden_on');
}
