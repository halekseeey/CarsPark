export default function buildQuery(key: string, query: string[]) {
  return query.reduce<string>((acc, item) => acc + `&${key}=${item}`, "");
}
