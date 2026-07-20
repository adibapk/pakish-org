export function uiAvatar(name: string, size = 256): string {
  const encodedName = name.trim().replace(/\s+/g, "+");
  return `https://ui-avatars.com/api/?name=${encodedName}&background=118C4F&color=fff&size=${size}`;
}
