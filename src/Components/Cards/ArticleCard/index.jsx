import React from "react";
import Button from "../../Button";

export default function ArticleCard({
  containerClass,
  publicationContainerClass,
  publicationDateClass,
  publicationSourceClass,
  titleClass,
  attributeClass,
  textClass,
  buttonContainerClass,
  buttonName,
  buttonClass,
  wordCountClass,
  articleObj,
}) {
  let attribute = "Новость";

  if (articleObj.isTechNews) {
    attribute = "Технические новости";
  } else if (articleObj.isAnnouncement) {
    attribute = "Анонсы и события";
  } else if (articleObj.isDigest) {
    attribute = "Сводки новостей";
  }

  return (
    <>
      <div className={containerClass}>
        <div className={publicationContainerClass}>
          <div className={publicationDateClass}>
            {articleObj.publicationDate}
          </div>
          <div className={publicationSourceClass}>{articleObj.source}</div>
        </div>
        <h2 className={titleClass}>{articleObj.title}</h2>
        <div className={attributeClass}>{attribute}</div>
        <div className={textClass}>{articleObj.articleBody}</div>
        <div className={buttonContainerClass}>
          <Button
            name={buttonName}
            className={buttonClass}
            onClick={() => {
              if (articleObj.url) {
                window.open(articleObj.url, "_blank");
              } else alert("Ссылка отсутствует");
            }}
          />
          <div className={wordCountClass}>
            {articleObj.wordCount + " слова"}
          </div>
        </div>
      </div>
    </>
  );
}
