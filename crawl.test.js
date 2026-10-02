const {normalizeURL, getURLsFromHTML} = require('./crawl.js');
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

test('getURLsFromHTML absolute', () => {
  const input = `<!DOCTYPE html>
                <html lang="en">
                <head>
                  <meta charset="UTF-8" />
                  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                  <title>Document</title>
                </head>
                <body>
                  <a href="https://example.url.com">Hey</>
                </body>
                </html>`;
  const actual = getURLsFromHTML(input, 'https://www.arisprod.sscgic.com/index');
  const expected = ['example.url.com'];
  expect(actual).toEqual(expected);
});

test('getURLsFromHTML relative', () => {
  const input = `<!DOCTYPE html>
                <html lang="en">
                <head>
                  <meta charset="UTF-8" />
                  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                  <title>Document</title>
                </head>
                <body>
                  <a href="/game">Hey</>
                </body>
                </html>`;
  const actual = getURLsFromHTML(input, 'https://www.arisprod.sscgic.com');
  const expected = ['www.arisprod.sscgic.com/game'];
  expect(actual).toEqual(expected);
});

test('getURLsFromHTML relative and absolute', () => {
  const input = `<!DOCTYPE html>
                <html lang="en">
                <head>
                  <meta charset="UTF-8" />
                  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                  <title>Document</title>
                </head>
                <body>
                  <a href="/game">Hey</>
                  <a href="https://example.url.com">Hey</>
                </body>
                </html>`;
  const actual = getURLsFromHTML(input, 'https://www.arisprod.sscgic.com');
  const expected = ['www.arisprod.sscgic.com/game', 'example.url.com'];
  expect(actual).toEqual(expected);
});