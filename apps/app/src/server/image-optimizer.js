/**
 * @param {string|null|undefined} str - The cache control header value as a string, or null/undefined if not present.
 * @returns {number} - The maximum age in seconds if found, otherwise returns 0.
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
