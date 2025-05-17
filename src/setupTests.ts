// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import 'whatwg-fetch';

jest.mock('sweetalert2', () => ({
    fire: jest.fn(),
  }));

global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve([]),
    })
  ) as jest.Mock;
  