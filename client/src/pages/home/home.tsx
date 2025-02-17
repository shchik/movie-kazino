import axios from "axios";
import React from "react";
import SlotList from "../../components/slot-list/slot-list.js";
import { TGenre, TSlot } from "../../types/types.js";
import AuthForm from "../../widgets/auth/auth.js";
import Footer from "../../widgets/footer/footer.js";
import Header from "../../widgets/header/header.js";
import Sidebar from "../../widgets/sidebar/sidebar.js";
import s from "./home.module.scss";

const Home: React.FC = () => {
	const [slots, setSlots] = React.useState<TSlot[]>([]);
	const [searchSlots, setSearchSlots] = React.useState<TSlot[]>([]);
	const [isLoading, setIsLoading] = React.useState(true);

	const [isLogin, setIsLogin] = React.useState(true);
	const [isLoginVisible, setIsLoginVisible] = React.useState(false);

	const [genres, setGenres] = React.useState<TGenre[]>([]);
	const [searchValue, setSearchValue] = React.useState<string>("");
	const [selectedGenre, setSelectedGenre] = React.useState<string>("");

	const onChangeSearchValue = (value: string): void => {
		setSearchValue(value);
	};

	const handleLabelClick = (genre: string): void => {
		if (selectedGenre === genre) {
			setSelectedGenre("");
		} else {
			setSelectedGenre(genre);
		}
	};

	React.useEffect(() => {
		const readFromApi = async () => {
			try {
				const response = await axios.get(
					"https://672cf6a5fd8979715640e6bc.mockapi.io/slots"
				);
				const slotsData: TSlot[] = response.data;
				setSlots(slotsData);
				setSearchSlots(slotsData);

				const response1 = await axios.get(
					"https://672cf6a5fd8979715640e6bc.mockapi.io/genres"
				);
				const genresData: TGenre[] = response1.data;

				genresData.forEach(genre => {
					genre.count = slotsData.reduce((count, slot) => {
						return (
							count + (slot.categories.includes(genre.id) ? 1 : 0)
						);
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

	React.useEffect(() => {
		setSearchSlots(
			slots.filter(slot =>
				slot.name.toLowerCase().includes(searchValue.toLowerCase())
			)
		);
	}, [searchValue]);

	React.useEffect(() => {
		if (selectedGenre === "") {
			setSearchSlots(slots);
			return;
		}
		setSearchSlots(
			slots.filter(slot => {
				return slot.categories.includes(selectedGenre);
			})
		);
	}, [selectedGenre]);

	const handleLoginToggle = (): void => {
		setIsLoginVisible(!isLoginVisible);
		setIsLogin(true);
	};

	const handleIsLogin = (): void => {
		setIsLoginVisible(!isLoginVisible);
		setIsLogin(false);
	};

	return (
		<>
			{isLoading ? (
				<div className="text-center font-bold text-xl">Loading...</div>
			) : (
				<div className={s.home}>
					<Header
						onLoginClick={handleLoginToggle}
						isLogin={handleIsLogin}
					/>
					<main className={s.home__container}>
						<Sidebar
							genres={genres}
							selectedGenre={selectedGenre}
							handleLabelClick={handleLabelClick}
							onChangeSearchValue={onChangeSearchValue}
						/>
						<div className={s["home__slot-view"]}>
							<SlotList
								slots={searchSlots}
								setSlots={setSlots}
								onLoginClick={handleIsLogin}
							/>
						</div>
					</main>
					<Footer />
					{isLoginVisible && (
						<AuthForm
							onLoginClick={handleLoginToggle}
							isLoginned={isLogin}
						/>
					)}
					{isLoginVisible && <div className="overlay"></div>}
				</div>
			)}
		</>
	);
};

export default Home;
