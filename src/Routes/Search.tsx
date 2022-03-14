import { useLocation } from "react-router-dom";

function Search() {
  const location = useLocation();
  // https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
  const keyword = new URLSearchParams(location.search).get("keyword");
  console.log(keyword);
  return null;
}

export default Search;
