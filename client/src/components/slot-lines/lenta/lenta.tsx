import { TLenta } from "../../../types/types";
import s from "../slot-lines.module.scss";

type LentaProps = {
	nodeRef: React.RefObject<HTMLDivElement | null>;
	lenta: TLenta[];
	index: number;
};

const Lenta: React.FC<LentaProps> = ({ nodeRef, lenta, index }) => {
	return (
		<div className={s.lines__lenta} ref={nodeRef}>
			{lenta[index].images.map((itemList, ind) => (
				<img
					key={ind}
					className={s["lines__lenta-image"]}
					src={itemList?.image}
					alt="Hello"
				/>
			))}
		</div>
	);
};

export default Lenta;
