import React from "react";
import SlotList from "../../components/slot-list/slot-list.js";
import { checkAuth } from "../../helpers/checkAuth.js";
import { useGenres } from "../../hooks/useGenres.js";
import { useSlots } from "../../hooks/useSlots.js";
import { SlotType } from "../../types/slot-types.js";
import AuthForm from "../../widgets/auth/auth.js";
import Footer from "../../widgets/footer/footer.js";
import Header from "../../widgets/header/header.js";
import Sidebar from "../../widgets/sidebar/sidebar.js";
import s from "./home.module.scss";

const Home: React.FC = () => {
	const [searchSlots, setSearchSlots] = React.useState<SlotType[]>([]);

	const [isAuth, setIsAuth] = React.useState<boolean>(false);
	const [isAuthFormVisible, setIsAuthFormVisible] = React.useState(false);

	const [searchValue, setSearchValue] = React.useState<string>("");
	const [selectedGenre, setSelectedGenre] = React.useState<string>("");

	const { genres, genresLoading } = useGenres();
	const { slots, slotsLoading } = useSlots();

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
		(async function () {
			setIsAuth(await checkAuth());
		})();
	}, []);

	React.useEffect(() => {
		if (slots) setSearchSlots(slots);
	}, [slots]);

	React.useEffect(() => {
		if (slots)
			setSearchSlots(
				slots.filter(slot =>
					slot.title.toLowerCase().includes(searchValue.toLowerCase())
				)
			);
	}, [searchValue]);

	React.useEffect(() => {
		if (selectedGenre === "") {
			setSearchSlots(slots!);
			return;
		}
		setSearchSlots(
			slots!.filter(slot => {
				return slot.categories.includes(selectedGenre);
			})
		);
	}, [selectedGenre]);

	return (
		<>
			{genresLoading || slotsLoading ? (
				<div className="text-center font-bold text-xl">Loading...</div>
			) : (
				<div className={s.home}>
					<Header
						setIsAuthFormVisible={setIsAuthFormVisible}
						isAuth={isAuth}
						setIsAuth={setIsAuth}
					/>
					<main className={s.home__container}>
						<Sidebar
							genres={genres ? genres : []}
							selectedGenre={selectedGenre}
							handleLabelClick={handleLabelClick}
							onChangeSearchValue={onChangeSearchValue}
						/>
						<div className={s["home__slot-view"]}>
							<SlotList slots={searchSlots} isAuth={isAuth} />
						</div>
					</main>
					<Footer />
					{isAuthFormVisible && (
						<AuthForm
							setIsAuthFormVisible={setIsAuthFormVisible}
							setIsAuth={setIsAuth}
						/>
					)}
					{isAuthFormVisible && (
						<div className={s.home__overlay}></div>
					)}
				</div>
			)}
		</>
	);
};

export default Home;
