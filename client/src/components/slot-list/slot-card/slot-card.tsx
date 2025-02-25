import React from "react";
import { Link } from "react-router-dom";
import { SlotType } from "../../../types/slot-types";
import Button from "../../../UI/Button";
import favoritesImage from "./images/favorites-icon.png";
import infoImage from "./images/info-icon.png";
import likeImage from "./images/like-icon.png";
import s from "./slot-card.module.scss";

type SlotCardProps = {
	slot: SlotType;
	isAuth: boolean;
};

const SlotCard: React.FC<SlotCardProps> = ({ slot, isAuth }) => {
	const link = `/slotPage?id=${slot.id}`;
	return (
		<div className={s.slot} key={slot.id}>
			<img src={slot.image} alt="hello" className={s.slot__image}></img>
			<p className={s.slot__title}>{slot.title}</p>
			<Button className={s["slot__play-button"]}>
				{isAuth ? <Link to={link}>Играть</Link> : "Играть"}
			</Button>

			<a>
				<img src={infoImage} alt="hello" className={s.slot__info}></img>
			</a>
			<div className={s.slot__likes}>
				<img
					src={likeImage}
					alt="hello"
					className={s["slot__likes-icon"]}
					data-slot-id={slot.id}
				></img>
				<span className={s["slot__likes-count"]}>0</span>
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
