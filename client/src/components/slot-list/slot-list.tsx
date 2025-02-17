import { SetStateAction } from "react";
import { TSlot } from "../../types/types";
import SlotCard from "./slot-card/slot-card";

type SlotListProps = {
	slots: TSlot[];
	setSlots: React.Dispatch<SetStateAction<TSlot[]>>;
	onLoginClick: () => void;
};

const SlotList: React.FC<SlotListProps> = ({
	slots,
	setSlots,
	onLoginClick,
}) => {
	function addLike(
		slotId: number,
		event: React.MouseEvent<HTMLImageElement, MouseEvent>
	): void {
		const likeCountElement = event.currentTarget
			.nextElementSibling as HTMLElement;

		if (likeCountElement.style.color === "lightgreen") {
			likeCountElement.style.color = "white";

			setSlots(s => {
				return slots.map(slot => {
					if (slot.id === slotId) {
						return { ...slot, likesCount: slot.likesCount - 1 };
					}
					return slot;
				});
			});
			return;
		}
		likeCountElement.style.color = "lightgreen"; //
		setSlots(s => {
			return slots.map(slot => {
				if (slot.id === slotId) {
					return { ...slot, likesCount: slot.likesCount + 1 };
				}
				return slot;
			});
		});
	}

	return slots.map(slot => (
		<SlotCard slot={slot} addLike={addLike} onLoginClick={onLoginClick} />
	));
};

export default SlotList;
