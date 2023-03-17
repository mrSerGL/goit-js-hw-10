export default class NewsBoxApiService {
  constructor() {
    this.whatToLookFor = '';
  }
  fetchArticles(whatToLookFor) {
    const apiRequestOption = {
      headers: {
        Authorization: '66d6286bb5fe47b4aee06cc789798941',
      },
    };

    const searchParams = new URLSearchParams({
      q: this.whatToLookFor,
      sortBy: 'publishedAt',
      pageSize: 20,
    });

    return fetch(
      `https://newsapi.org/v2/everything?${searchParams}`,
      apiRequestOption
    )
      .then(response => response.json())
      .then(({ articles }) => {
        // renderArticles(articles);
        return articles;
      })
      .catch(error => {
        console.error(error);
        alert(error);
      });
  }

  get query() {
    return this.whatToLookFor;
  }

  set query(newQuery) {
    this.whatToLookFor = newQuery;
  }
}
