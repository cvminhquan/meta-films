import { MovieDetailProvider } from "@/components/provider/movie-detail-context";
import { getMovieDetail } from "@/libs/phimapi";

export default async function MovieIdLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    id: string;
  };
}) {
  const movieDetail = await getMovieDetail(params.id);

  return (
    <MovieDetailProvider value={movieDetail}>
      {children}
    </MovieDetailProvider>
  );
} 
