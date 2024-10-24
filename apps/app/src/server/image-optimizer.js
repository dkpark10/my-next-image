/**
 * @param {string|null|undefined} str
 * @returns {Map<string, string>}
 */
function parseCacheControl(str) {
  const map = new Map();
  if (!str) {
    return map;
  }
  for (let directive of str.split(',')) {
    let [key, value] = directive.trim().split('=', 2)
    key = key.toLowerCase();
    if (value) {
      value = value.toLowerCase();
    }
    map.set(key, value);
  }
  return map;
}

/**
 * @param {string|null|undefined} str
 * @returns {number}
 */
export function getMaxAge(str) {
  const map = parseCacheControl(str);
  if (map) {
    let age = map.get('s-maxage') || map.get('max-age') || '';
    if (age.startsWith('"') && age.endsWith('"')) {
      age = age.slice(1, -1);
    }
    const n = parseInt(age, 10);
    if (!isNaN(n)) {
      return n;
    }
  }
  return 0;
}
