import { useParams } from "react-router-dom";

export default function Analytics() {
  const { id } = useParams();
  return <h1>Analytics for URL {id}</h1>;
}
