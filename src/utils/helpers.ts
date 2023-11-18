export function serializeIntoQuery(data: any) {
  if (Object.entries(data).length == 0) return "";

  const query = [];
  for (let p in data) {
    if (data.hasOwnProperty(p)) {
      query.push(encodeURIComponent(p) + "=" + encodeURIComponent(data[p]));
    }
  }

  return "?" + query.join("&");
}
