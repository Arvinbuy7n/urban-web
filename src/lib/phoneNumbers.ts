export const PHONE_NUMBERS = ["88886583", "88882165", "95111009", "99007740"];

export function formatPhone(num: string) {
  return `${num.slice(0, 4)}-${num.slice(4)}`;
}

export function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
