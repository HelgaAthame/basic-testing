// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

const testURL = '/posts/1';
const data = {
  someField: 'someValue',
  otherField: 12345,
  thirdField: true,
};

jest.mock('axios', () => {
  return {
    create: jest.fn(),
  };
});

/*jest.mock('lodash/throttle', () => ({
  default: jest.fn(fn => fn),
  __esModule: true
}))*/

//axios.create({ baseURL: baseUrl });

describe('throttledGetDataFromApi', () => {
  test('should create instance with provided base url', async () => {
    const createSpy = jest.spyOn(axios, 'create');
    /*(axios.create as jest.MockedFunction<typeof axios.get>).mockResolvedValue(data);
    await throttledGetDataFromApi(testURL);
    expect(axios.get).toHaveBeenCalledWith(testURL);*/
    //jest.runAllTimers();
    console.dir(createSpy.mock);
    expect(createSpy.mock.calls).toEqual(1);
    expect(createSpy.mock.results[0]?.value.defaults).toBe(data);
  });

  test('should perform request to correct provided url', async () => {
    const createSpy = jest.spyOn(axios, 'create');
    await throttledGetDataFromApi(testURL);
    jest.runAllTimers();
    console.log(createSpy.mock);
    expect(createSpy.mock.calls).toEqual(1);
    expect(createSpy.mock.results[0]?.value.defaults).toBe(data);
// check for createSpy.mock.calls and createSpy.mock.results[0]?.value.defaults;
    /*axios.get = jest.fn().mockResolvedValue(data);
    await throttledGetDataFromApi(testURL);
    expect(axios.get).toHaveBeenCalledWith(testURL);*/
  });

  test('should return response data', async () => {
    const createSpy = jest.spyOn(axios, 'create');
    await throttledGetDataFromApi(testURL);
    jest.runAllTimers();
    console.log(createSpy.mock);
    expect(createSpy.mock.calls).toEqual(1);
    expect(createSpy.mock.results[0]?.value.defaults).toBe(data);
  });
});
