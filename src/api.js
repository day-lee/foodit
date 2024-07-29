async function getResponse({
  order = "calorie",
  cursor = "",
  limit = 10,
  search = "",
}) {
  const res = await fetch(
    `http://learn.codeit.kr/1908/foods?order=${order}&cursor=${cursor}&limit=${limit}&search=${search}`
  );
  const body = await res.json();
  return body;
}

export default getResponse;
