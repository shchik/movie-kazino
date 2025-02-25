import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { SlotImagesService } from "../services/slot-images.service";
import { ImagesResponseType, TImages } from "../types/types";

export function useImages(slotId: number) {
	const [images, setImages] = useState<TImages[]>([]);

	const { data, isLoading } = useQuery<ImagesResponseType[]>({
		queryKey: ["get images", slotId],
		queryFn: async () => await SlotImagesService.getImagesBySlotId(slotId),
		enabled: !!slotId,
	});

	useEffect(() => {
		if (data) {
			const newImages: TImages[] = [];
			data.forEach(el =>
				newImages.push({ image: el.image, value: el.value })
			);
			setImages(newImages);
		}
	}, [data]);

	return { images, isLoading };
}
