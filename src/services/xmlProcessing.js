export default function xmlProcessing(object) {
  const parser = new DOMParser();

  const articleDate = object.ok.issueDate.slice(0, 10); // дата публикации
  const articleSourceText = object.ok.source.name; // источник
  const articleTitleText = object.ok.title.text; // заголовок статьи
  const articleAttributesObj = object.ok.attributes; // атрибуты, количество слов (нужно вытащить необходимую информацию)
  const xmlArticleBody = object.ok.content.markup; // тело статьи xml
  const articleUrl = object.ok.url; // ссылка на оригинал, может отсутствовать

  const parsedXmlArticleBody = parser.parseFromString(
    xmlArticleBody,
    "text/xml"
  );

  const ArticleBodySentenceArr =
    parsedXmlArticleBody.querySelectorAll("sentence");

  const regex = /(<([^>]+)>)/gi;
  let articleText = "";

  ArticleBodySentenceArr.forEach((element) => {
    articleText += element.textContent;
  });

  const articleBodyText = articleText.replace(regex, ""); // основной текст статьи

  return {
    publicationDate: articleDate,
    source: articleSourceText,
    title: articleTitleText,
    isTechNews: articleAttributesObj.isTechNews,
    isAnnouncement: articleAttributesObj.isAnnouncement,
    isDigest: articleAttributesObj.isDigest,
    articleBody: articleBodyText,
    url: articleUrl,
    wordCount: articleAttributesObj.wordCount,
  };
}
