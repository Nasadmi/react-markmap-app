export function save(data: string) {
  const json = data;
  localStorage.setItem("json", json);
}
