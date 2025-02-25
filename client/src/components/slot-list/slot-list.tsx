import { SlotType } from "../../types/slot-types";
import SlotCard from "./slot-card/slot-card";

type SlotListProps = {
	slots: SlotType[];
	isAuth: boolean;
};

const SlotList: React.FC<SlotListProps> = ({ slots, isAuth }) => {
	return slots.map(slot => (
		<SlotCard key={slot.id} slot={slot} isAuth={isAuth} />
	));
};

export default SlotList;
