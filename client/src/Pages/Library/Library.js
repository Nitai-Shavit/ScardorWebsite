import { useContext, useEffect, useState } from "react";
import configData from "../../config.json";
import useArray from "../../Hooks/useArray";
import ApiHandler from "../../Hooks/ApiHandler";
import Category from "./Category";
import "./Library.css";
import { AuthContext } from "../../Components/GlobalStates/Authstate";
import useToggle from "../../Hooks/useToggle";
import { Modal } from "../../SubComponents/Modal/Modal";
import AddNewCategoryModal from "./AddArticleModal";

export default function Library() {

  const { authState } = useContext(AuthContext);
  const { data, loading, error, setOp } = ApiHandler();
  const categories = useArray();
  const filteredCategories = useArray();
  const [articles, setArticles] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setError] = useState(null);
  const [open, setOpen] = useToggle();

  const backgroundImage = `${configData.SERVER_URL}/assets/backgrounds/Limina.png`;

  const MAX_CATEGORY_LENGTH = 2; // only relevant to Recent,Favorites,Search results

  useEffect(() => {
    setOp("/api/article");
  }, []);

  const sortToCategories = () => {
    let catarray = [];

    if (searchTerm) {
      const searchResults = articles.filter((article) =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      catarray.push({ title: "Search Results", content: searchResults });
      articles.forEach((item) => {
        if (item.category.toLowerCase().includes(searchTerm.toLowerCase())) {
          let index = catarray.findIndex(
            (category) => category.title === item.category
          );
          if (index !== -1) {
            catarray[index].content.push(item);
          } else {
            catarray.push({ title: item.category, content: [item] });
          }
        }
      });
    } else {
      catarray = [
        { title: "Favorites", content: [] },
        { title: "Recent", content: [] },
      ];
      articles.forEach((item) => {
        let index = catarray.findIndex(
          (category) => category.title === item.category
        );
        if (index !== -1) {
          catarray[index].content.push(item);
        } else {
          catarray.push({ title: item.category, content: [item] });
        }
      });
      catarray.find((cat) => cat.title === "Favorites").content = articles
        .sort((a, b) => b.entries - a.entries)
        .slice(0, MAX_CATEGORY_LENGTH);
      catarray.find((cat) => cat.title === "Recent").content = articles
        .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
        .slice(0, MAX_CATEGORY_LENGTH);
    }
    filteredCategories.set(catarray);
  };

  useEffect(() => {
    if (articles) {
      sortToCategories();
    }
  }, [articles, searchTerm]);

  useEffect(() => {
    if (!loading)
      if (error) {
        setError(error.message);
      } else {
        setArticles(data?.articles);
        categories.set(data?.tags);
      }
  }, [loading]);

  if (error) {
    return <div>Error: {error + "\n" + errorMessage}</div>;
  }
  if (articles === null) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <div className="searchbar">
        <input
          type="search"
          placeholder="search"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            sortToCategories();
          }}
        />
        {authState.username && <button onClick={setOpen}>+</button>}
        <Modal open={open} onClose={setOpen}>
          <AddNewCategoryModal categories={categories.array} />
        </Modal>
      </div>
      <div className="library-wrapper">
        {filteredCategories.array?.map((category, index) => {
          return (
            <Category
              key={index}
              title={category.title}
              content={category.content}
              backgroundImage={backgroundImage}
            />
          );
        })}
      </div>
    </>
  );
}
