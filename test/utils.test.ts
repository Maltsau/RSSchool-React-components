import { pathHasParam, findAnyParam, replacePathParam } from '../utils/utils';

test('path param presense detection test', () => {
  expect(pathHasParam(['1', '2', '3', '4'], 'details')).toBe(false);
  expect(pathHasParam(['1', '2', '3', '4'], 'page')).toBe(false);
  expect(pathHasParam(['1', '2', '3', '4'], 'search')).toBe(false);
  expect(pathHasParam(['search=1', 'page=1', 'details=1'], 'details')).toBe(
    true
  );
  expect(pathHasParam(['search=1', 'page=1', 'details=1'], 'search')).toBe(
    true
  );
  expect(pathHasParam(['search=1', 'page=1', 'details=1'], 'page')).toBe(true);
});

test('path param finding test', () => {
  expect(findAnyParam(['search=1', 'page=1', 'details=1'], 'details')).toBe(
    '1'
  );
  expect(findAnyParam(['search=1', 'page=1', 'details=1'], 'search')).toBe('1');
  expect(findAnyParam(['search=1', 'page=1', 'details=1'], 'page')).toBe('1');
  expect(findAnyParam(['page=1', 'details=1'], 'search')).toBe('');
  expect(findAnyParam(['search=1', 'page=1'], 'details')).toBe('');
});

test('path params change test', () => {
  expect(replacePathParam('/search=1/page=1/details=1', 'search', '1')).toBe(
    '/1/page=1/details=1'
  );
  expect(replacePathParam('/search=1/page=1/details=1', 'details', '1')).toBe(
    '/search=1/page=1/1'
  );
  expect(replacePathParam('/search=1/page=1', 'details', '1')).toBe(
    '/search=1/page=1'
  );
});
