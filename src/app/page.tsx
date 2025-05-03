import { HomepageComponent } from "@/components/homepage-component";
import { MovieSection } from "@/components/movie-section";
import {
  fetchPopularMovies,
  fetchPopularTV,
  fetchTopRatedMovies,
  fetchTopRatedTV,
  fetchTrendingMovies,
  fetchUpcomingMovies,
} from "@/libs/tmdb";

export default async function HomePage() {
  const [popular, topRated, upcoming, trending, popularTV, topRatedTV] =
    await Promise.all([
      fetchPopularMovies(),
      fetchTopRatedMovies(),
      fetchUpcomingMovies(),
      fetchTrendingMovies(),
      fetchPopularTV(),
      fetchTopRatedTV(),
    ]);
  return (
    <div className="p-4 md:p-8">
      <div className="container mx-auto">
        <MovieSection
          title="🔥 Popular Movies"
          movies={popular || []}
          sortParam="popular"
        />
        <MovieSection
          title="⭐ Top Rated Movies"
          movies={topRated || []}
          sortParam="top_rated"
        />
        <MovieSection
          title="🎬 Upcoming Movies"
          movies={upcoming || []}
          sortParam="upcoming"
        />
        <MovieSection
          title="📈 Trending Movies"
          movies={trending || []}
          sortParam="trending"
        />
        <MovieSection
          title="📺 Popular TV Shows"
          movies={popularTV || []}
          sortParam="tv_popular"
        />
        <MovieSection
          title="🏆 Top Rated TV Shows"
          movies={topRatedTV || []}
          sortParam="tv_top_rated"
        />
      </div>
    </div>
  );
}
