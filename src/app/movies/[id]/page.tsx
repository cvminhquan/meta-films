import { useParams } from 'next/navigation';
export default function MovieDetail() {
  const { id } = useParams();
  return <iframe src={`https://www.2embed.org/embed/${id}`} width="100%" height="600" />;
}