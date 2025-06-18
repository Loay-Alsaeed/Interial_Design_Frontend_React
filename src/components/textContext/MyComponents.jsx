import { useDesigns } from "../../context/DesignContext";

function MyComponents() {
  const { designs, loading } = useDesigns();

  if (loading) return <p>جاري التحميل...</p>;

  console.log(designs);

  return (
    <div>
      {designs.map((design) => (
        <div>

        <p key={design._id}>{design.title}</p>
        <p key={design._id}>{design._id}</p>
        </div>

      ))}
    </div>
  );
}
export default MyComponents;
