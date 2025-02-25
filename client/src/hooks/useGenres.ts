import { useQuery } from "@tanstack/react-query";
import React from "react";
import { GenreService } from "../services/genre.service";
import { GenreType } from "../types/genre-types";

export function useGenres() {
	const [genres, setGenres] = React.useState<GenreType[]>([]);

	const { data, isLoading } = useQuery({
		queryKey: ["get genres"],
		queryFn: async () => await GenreService.getAllGenres(),
	});

	React.useEffect(() => {
		if (data) setGenres(data);
	}, [data]);

	return { genres, setGenres, genresLoading: isLoading };
}
