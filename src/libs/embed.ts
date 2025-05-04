// libs/embed.ts
export const getRealEpisodeCount = async (
  id: number | string,
  season: number
) => {
  const res = await fetch(`https://2embed.cc/api/episodes/${id}?s=${season}`);
  console.log('res', res);
  const data = await res.json();
  return data?.length || 0;
};
