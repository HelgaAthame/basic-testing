// Uncomment the code below and write your tests
import { throwError, throwCustomError, resolveValue, MyAwesomeError, rejectCustomError } from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    expect.assertions(1);
    return expect(resolveValue(5)).resolves.toBe(5);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    const testFunc = throwError.bind(null, 'some error message');
    expect(testFunc).toThrow(Error);
    expect(testFunc).toThrow('some error message');
  });

  test('should throw error with default message if message is not provided', () => {
    expect(throwError).toThrow(Error);
    expect(throwError).toThrow('Oops!');
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect(throwCustomError).toThrow(MyAwesomeError);
    expect(throwCustomError).toThrow('This is my awesome custom error!');
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    expect.assertions(1);
    return expect(rejectCustomError).rejects.toEqual(new MyAwesomeError);
  });
});
