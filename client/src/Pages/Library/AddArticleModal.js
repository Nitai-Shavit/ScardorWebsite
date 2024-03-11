import { useEffect, useState } from "react";
import Autocomplete from "../../SubComponents/Autocomplete/Autocomplete";
import "./AddArticleModal.css";
import ApiHandler from "../../Hooks/ApiHandler";

export default function AddArticleModal({ currArt = {}, categories = [] }) {
  const [article, setArticle] = useState(currArt);
  const [newTag, setnewTag] = useState("");
  const { data, loading, error, setOp, } = ApiHandler();

  useEffect(() => {
  }, [data]);

  const handleChange = (e) => {
    setArticle((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const addLink = () => {
    if (article.title === "") alert("Please write down the title");
    else if (article.tags?.length === 0) alert("Please add some categories");
    else if (article.link === "") alert("Please write down the link");
    else {
      const art = { ...article };
      art.category = art.tags[0];
      setOp("/api/article", "POST", art);
    }
  };

  return (
    <div className="article-modal-paper">
      <div className="article-modal-wrapper">
        <input
          name="title"
          value={article.title}
          onChange={handleChange}
          placeholder="title..."
        />
        <div className="tags">
          <div className="tags-input">
            <Autocomplete
              value={newTag}
              set={(e, value) => {
                setnewTag(value);
              }}
              options={categories || []}
              placeholder="categories..."
              style={{ width: "70%" }}
            />
            <button
              onClick={() => {
                let lowerTags =
                  article.tags?.map((item) => item.toLowerCase()) || [];
                if (newTag && !lowerTags.includes(newTag.toLowerCase()))
                  setArticle({
                    ...article,
                    tags: [...(article?.tags || []), newTag],
                  });
                setnewTag("");
              }}
            >
              +
            </button>
          </div>
          <div className="tags-list">
            {article?.tags?.map((item, index) => (
              <div key={index} className="tag">
                <span>{item}</span>
                <button
                  onClick={() =>
                    setArticle({
                      ...article,
                      tags: [
                        ...article.tags.slice(0, index),
                        ...article.tags.slice(index + 1, article.tags.length),
                      ],
                    })
                  }
                >
                  x
                </button>
              </div>
            ))}
          </div>
        </div>
        <input
          name="link"
          value={article.link}
          onChange={handleChange}
          placeholder="link..."
        />
        <button className="submit" onClick={addLink}>
          Add
        </button>
      </div>
    </div>
  );
}
