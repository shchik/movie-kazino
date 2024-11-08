import "./mainPage.css";
import React from "react";
import Header from "../components/header/header.jsx";
import Main from "../components/main/main.jsx";
import Footer from "../components/footer/footer.jsx";
import Login from "../components/login/login.jsx";
import axios from "axios";

function MainPage() {
  const [slots, setSlots] = React.useState([]);
  const [searchSlots, setSearchSlots] = React.useState([]);
  const [genres, setGenres] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const [isLogin, setIsLogin] = React.useState(true);
  const [isLoginVisible, setIsLoginVisible] = React.useState(false);

  const [searchValue, setSearchValue] = React.useState("");

  React.useEffect(() => {
    const readFromApi = async () => {
      try {
        const response = await axios.get(
          "https://672cf6a5fd8979715640e6bc.mockapi.io/slots"
        );
        const slotsData = response.data;
        setSlots(slotsData);
        setSearchSlots(slotsData);

        const response1 = await axios.get(
          "https://672cf6a5fd8979715640e6bc.mockapi.io/genres"
        );
        const genresData = response1.data;

        genresData.forEach((genre) => {
          genre.count = slotsData.reduce((count, slot) => {
            return count + (slot.categories.includes(genre.id) ? 1 : 0);
          }, 0);
        });

        setGenres(genresData);
      } catch (err) {
        console.log(err);
        alert("Не удалось считать с апи!");
      } finally {
        setIsLoading(false);
      }
    };
    readFromApi();
  }, []);

  const onChangeSearchValue = (value) => {
    setSearchValue(value);
    console.log(searchValue);
  };

  React.useEffect(() => {
    setSearchSlots(
      slots.filter((slot) =>
        slot.name.toLowerCase().includes(searchValue.toLowerCase())
      )
    );
    console.log(searchSlots);
  }, [searchValue]);

  const handleLoginToggle = () => {
    setIsLoginVisible(!isLoginVisible);
    setIsLogin(true);
  };

  const handleIsLogin = () => {
    setIsLoginVisible(!isLoginVisible);
    setIsLogin(false);
  };

  return (
    <>
      {isLoading ? (
        <div className="text-center font-bold text-xl">Loading...</div>
      ) : (
        <div className="main-page">
          <Header onLoginClick={handleLoginToggle} isLogin={handleIsLogin} />
          <Main
            slots={searchSlots}
            setSlots={setSearchSlots}
            genres={genres}
            searchValue={searchValue}
            onChangeSearchValue={onChangeSearchValue}
          />
          <Footer />
          {isLoginVisible && (
            <Login onLoginClick={handleLoginToggle} isLoginned={isLogin} />
          )}
          {isLoginVisible && <div className="overlay"></div>}
        </div>
      )}
    </>
  );
}

export default MainPage;
