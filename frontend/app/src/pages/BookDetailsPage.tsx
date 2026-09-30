import { useParams } from "react-router";

export default function BookDetailsPage() {
  const params = useParams();

  return (
    <div>
      <h1>Book Details page</h1>
      <h2>Book id: {params.id}</h2>
    </div>
  );
}
