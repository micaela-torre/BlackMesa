const cardsContainer = document.getElementById("container_news_cards");
const spiner = document.createElement("div");
spiner.classList.add("spiner");

fetch(
  "https://fakerapi.it/api/v1/custom?title=text&image=image&short_description=text&published_at=date_time&last_news=boolean&_quantity=100"
)
  .then((response) => response.json())
  .then((response) => {
    createCard(response.data), (loading = false);
  })
  .catch((e) => console.log(e));

function createCard(cards) {
  let lastNews = [...cards];
  lastNews.sort(
    (a, b) =>
      new Date(b.published_at.date).getTime() -
      new Date(a.published_at.date).getTime()
  );
  lastNews = lastNews.filter((news) => news.last_news === true);
  lastNews = lastNews.slice(0, 4);
  lastNews.forEach((card) => {
    const newCard = document.createElement("div");
    newCard.classList.add("new_card");
    const image = document.createElement("div");
    image.classList.add("image");
    const date = document.createElement("p");
    date.classList.add("time");
    const description = document.createElement("div");
    description.classList.add("newDescription");
    const newTitle = document.createElement("h4");
    newTitle.classList.add("new_title");
    const shortDescription = document.createElement("p");
    shortDescription.classList.add("description");
    image.style.backgroundImage = `url('${card.image}')`;
    const sortDate = getDate(card.published_at.date);
    date.textContent = sortDate;
    newTitle.textContent = card.title;
    shortDescription.textContent = card.short_description;
    newCard.appendChild(image);
    newCard.appendChild(description);
    image.appendChild(date);
    description.appendChild(newTitle);
    description.appendChild(shortDescription);
    cardsContainer.appendChild(newCard);
  });

  const preloader = document.getElementById("preloader");
  preloader.classList.add("d-none");

  new gridjs.Grid({
    columns: ["Name", "Description", "Date"],
    search: true,
    sort: true,
    pagination: true,
    fixedHeader: true,
    height: "500px",
    wide: true,
    data: cards.map((article) => [
      article.title,
      article.short_description,
      getDate(article.published_at.date, "onlyDate"),
    ]),
    style: {
      table: {
        width: "80%",
      },
      th: {
        "text-align": "center",
      },
      td: {
        "text-align": "center",
      },
    },
  }).render(document.getElementById("table_date"));
}

function getDate(date, onlyDate) {
  let newsDate = new Date(date);
  let day = newsDate.getDate();
  let month = newsDate.getMonth() + 1;
  let year = newsDate.getFullYear();
  let hours = newsDate.getHours();
  let minutes = newsDate.getMinutes();
  day < 10 && (day = "0" + day);
  hours < 10 && (hours = "0" + hours);
  month < 10 && (month = "0" + month);
  minutes < 10 && (minutes = "0" + minutes);
  if (onlyDate) {
    newsDate = ` ${day}/${month}/${year}`;
  } else {
    newsDate = ` ${day}/${month}/${year} ${hours}:${minutes}`;
  }
  return newsDate;
}
