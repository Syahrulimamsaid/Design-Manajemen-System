export function isText(text: string) {
  return /^[a-zA-Z\s]+$/.test(text);
}

export function isNumber(text: string) {
  return !isNaN(parseInt(text));
}

export function isString(text: string, chars: string) {
  const regex = new RegExp(`^[${chars}]+$`);

  return regex.test(text);
}
