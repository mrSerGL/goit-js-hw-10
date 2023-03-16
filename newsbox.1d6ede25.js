document.querySelector(".newsbox").innerHTML='\n<section class="news-app">\n  <section class="header">\n    <div class="header__wrapper">\n      <a class="header__logo">\n        <i class="fa-regular fa-newspaper"></i>\n      </a>\n      <div class="header__brand">News Box</div>\n    </div>\n  </section>\n\n  <form class="search">\n    <div class="search__wrapper">\n      <input class="search__field" type="text" placeholder="What are you looking for?" name="search">\n      <button class="search__btn" type="" submit>\n        <span class="search__icon">\n          <i class="fa-solid fa-magnifying-glass"></i>\n          <i class="fa-solid fa-circle-notch"></i>\n        </span>\n      </button>\n    </div>\n  </form>\n\n  <div class="articles">\n    <article></article>\n  </div>\n\n  <section class="load-more">\n    <button class="load-more-btn" hidden>More</button>\n  </section>\n</section>\n';const e={search:document.querySelector(".news-app .search"),articles:document.querySelector(".news-app .articles"),input:document.querySelector(".search__field")};e.search.addEventListener("submit",(function(s){s.preventDefault();const t=new URLSearchParams({q:a,sortBy:"publishedAt",pageSize:10});fetch(`https://newsapi.org/v2/everything?${t}`,n).then((e=>e.json())).then((n=>{!function(n){console.log(n);const a=n.map((({author:e,title:n,publishedAt:a,urlToImage:s,url:t,content:i})=>`\n        <article class="article">\n          <h2 class="article__title">${n}</h2>\n          <div class="article__publish-date">${a}</div>\n          <div class="article__author">${e}</div>\n          {{#if urlToImage}}\n          <figure class="article__image">\n            <img src="${s}" alt="article-image">\n          </figure>\n          {{/if}}\n          <div class="article__content">\n            {{#if text}}\n              ${i}\n            {{/if}}\n            <a href="${t}" target="_blank">read more</a>\n          </div>\n          {{#if timeForReading}}\n            <div class="article__time-for-reading">{{timeForReading}} for reading</div>\n          {{/if}} \n        </article>\n      `)).join("");e.articles.innerHTML=a}(n)})).catch((e=>{console.error(e)}))})),e.input.addEventListener("input",(function(){a=e.input.value}));const n={headers:{Authorization:"66d6286bb5fe47b4aee06cc789798941"}};let a;
//# sourceMappingURL=newsbox.1d6ede25.js.map