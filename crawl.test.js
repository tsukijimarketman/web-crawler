const {normalizeURL} = require('./crawl.js');
const {test, expect} = require('@jest/globals');

test('normalizeURL', () => {
  const input = 'https://www.arisprod.sscgic.com/home';
  const actual = normalizeURL(input);
  const expected = 'www.arisprod.sscgic.com/home';
  expect(actual).toEqual(expected);
});

test('normalizeURL strip', () => {
  const input = 'https://www.arisprod.sscgic.com/home/';
  const actual = normalizeURL(input);
  const expected = 'www.arisprod.sscgic.com/home';
  expect(actual).toEqual(expected);
});

test('normalizeURL capitals', () => {
  const input = 'https://www.ARISPROD.sscgic.com/home/';
  const actual = normalizeURL(input);
  const expected = 'www.arisprod.sscgic.com/home';
  expect(actual).toEqual(expected);
});