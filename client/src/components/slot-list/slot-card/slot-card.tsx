import React from "react";
import { Link } from "react-router-dom";
import { context } from "../../../context";
import { TSlot } from "../../../types/types";
import Button from "../../../UI/Button";
import favoritesImage from "./images/favorites-icon.png";
import infoImage from "./images/info-icon.png";
import likeImage from "./images/like-icon.png";
import s from "./slot-card.module.scss";

type SlotCardProps = {
	slot: TSlot;
	addLike: (
		slotId: number,
		event: React.MouseEvent<HTMLImageElement, MouseEvent>
	) => void;
	onLoginClick: () => void;
};

const SlotCard: React.FC<SlotCardProps> = ({ slot, addLike, onLoginClick }) => {
	const contextValue = React.useContext(context);

	return (
		<div className={s.slot} key={slot.id}>
			<img src={slot.image} alt="hello" className={s.slot__image}></img>
			<p className={s.slot__title}>{slot.name}</p>
			{contextValue.isAuth ? (
				<Button className={s["slot__play-button"]}>
					<Link to="/slotPage">Играть</Link>
				</Button>
			) : (
				<Button
					className={s["slot__play-button"]}
					onClick={onLoginClick}
				>
					Играть
				</Button>
			)}

			<a>
				<img src={infoImage} alt="hello" className={s.slot__info}></img>
			</a>
			<div className={s.slot__likes}>
				<img
					src={likeImage}
					alt="hello"
					className={s["slot__likes-icon"]}
					onClick={event => addLike(slot.id, event)}
					data-slot-id={slot.id}
				></img>
				<span className={s["slot__likes-count"]}>
					{slot.likesCount}
				</span>
			</div>
			<img
				src={favoritesImage}
				alt="hello"
				className={s.slot__favorite}
			></img>
		</div>
	);
};

export default SlotCard;
