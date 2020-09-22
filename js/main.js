
const fetch = async () => {
  try {
    const http = axios.create({
      baseURL: 'https://sakestore-in-tokyo.web.app/',
      timeout: 30000,
    })
    const response = await http.get("data/osake.json")
    return response.data.osake
  } catch (e) {
    console.log(e)
    return null
  }
}

const getUrlQueries = () => {
  var queryStr = window.location.search.slice(1);  // 文頭?を除外
      queries = {};

  // クエリがない場合は空のオブジェクトを返す
  if (!queryStr) {
    return queries;
  }

  // クエリ文字列を & で分割して処理
  queryStr.split('&').forEach(function(queryStr) {
    // = で分割してkey,valueをオブジェクトに格納
    var queryArr = queryStr.split('=');
    queries[queryArr[0]] = queryArr[1];
  });

  return queries;
}


const setElementData = (id, data) => {
  const element = document.getElementById(id)
  element.textContent = data
}

const setElementImgData = (id, data) => {
  const element = document.getElementById(id)
  element.src = data
}

const setElementLinkData = (id, data) => {
  const element = document.getElementById(id)
  element.textContent = data
  element.href = data
}



const main = async () => {

  const response = await fetch()
  const query = getUrlQueries()

  const json = response[Number(query['id']) - 1]

  //  画面上に表示する
  setElementData("osake-title", json.title)
  setElementData("osake-summary", json.summary)
  setElementImgData("osake-img", `./img/osake/${query['id']}.jpg`)
  setElementData("sub_title", json.sub_title)
  setElementData("osake_taste", json.osake_taste)
  setElementData("osake_frequency", json.osake_frequency)
  setElementData("osake_rice", json.osake_rice)
  setElementData("alcohol", json.alcohol)
  setElementData("area", json.area)
  setElementData("osake_house", json.osake_house)
  setElementLinkData("osake_ual", json.osake_ual)
  setElementData("gluss_bottle", json.gluss_bottle)
  setElementData("price", json.price)
  setElementData("store", json.store)
}

main()

