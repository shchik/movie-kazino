import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { SlotService } from "../services/slot.service";
import { SlotType } from "../types/slot-types";

export function useSlots() {
	const [slots, setSlots] = useState<SlotType[]>([]);

	const { data, isLoading } = useQuery({
		queryKey: ["get slots"],
		queryFn: async () => await SlotService.getAllSlots(),
	});

	useEffect(() => {
		if (data) setSlots(data);
	}, [data]);

	return { slots, setSlots, slotsLoading: isLoading };
}
