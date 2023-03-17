import '../css/newsbox.scss';
import moment from 'moment';

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
    <button class="load-more-btn" hidden>More</button>
  </section>
</section>
`;
const sectionNewsBox = document.querySelector('.newsbox');
sectionNewsBox.innerHTML = markup;

// елементи DOM
const refs = {
  search: document.querySelector('.news-app .search'),
  articles: document.querySelector('.news-app .articles'),
  input: document.querySelector('.search__field'),
};

// слухачі
refs.search.addEventListener('submit', getArticles);
refs.input.addEventListener('input', updateSearchParams);

// опциї запросу даніх
const apiRequestOption = {
  headers: {
    Authorization: '66d6286bb5fe47b4aee06cc789798941',
  },
};

// значення та парамети пошуку
let whatToLookFor;

function updateSearchParams() {
  whatToLookFor = refs.input.value;
}

// відправка і повернення даних
function getArticles(event) {
  event.preventDefault();

  const searchParams = new URLSearchParams({
    q: whatToLookFor,
    sortBy: 'publishedAt',
    pageSize: 10,
  });

  fetch(`https://newsapi.org/v2/everything?${searchParams}`, apiRequestOption)
    .then(response => response.json())
    .then(articles => {
        // console.log(articles.articles);
        
      renderArticles(articles);
    })
    .catch(error => {
      console.error(error);
      alert(error);
    });
}

function renderArticles(articles) {
    console.log(articles.articles);
    const markup = articles.articles
    .map(({ author, title, publishedAt, urlToImage, url, content, description
    }) => {
      return `
        <article class="article">
          <h2 class="article__title">${title}</h2>
          <div class="article__publish-date">
              ${moment(publishedAt).format ('l')}
          </div>
          <div class="article__author">
              ${author}
          </div>
          <figure class="article__image">
              <img src="${urlToImage}" alt="article-image">
          </figure>
          <div class="article__content">
             ${description             }
             <a href="${url}" target="_blank">read more</a>
          </div>
         <div class="article__time-for-reading">
             //{{timeForReading}} for reading
         </div>
         </article>
      `;
    })
    .join('');

  refs.articles.innerHTML = markup;
}
