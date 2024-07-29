import "./FoodList.css";

function formatDate(value) {
  const date = new Date(value);
  return `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}`;
}

function FoodListItem({ item, onDelete }) {
  const { id, calorie, content, createdAt, imgUrl, title } = item;

  return (
    <li className="FoodListItem" key={id}>
      <img src={imgUrl} alt={title} />
      <p>{title}</p>
      <p>{content}</p>
      <p>{calorie}</p>
    </li>
  );
}

function FoodList({ data }) {
  return (
    <>
      <div className="FoodList">
        {data.map((item) => (
          <FoodListItem key={item.id} item={item} />
        ))}
      </div>
    </>
  );
}

export default FoodList;
