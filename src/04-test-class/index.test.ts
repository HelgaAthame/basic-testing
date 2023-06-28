// Uncomment the code below and write your tests
import { InsufficientFundsError, SynchronizationFailedError, TransferFailedError, getBankAccount } from '.';

const money = 50;

describe('BankAccount', () => {
  test('should create account with initial balance', async () => {
    const account = getBankAccount(50);
    expect(account).toBeTruthy();
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const account = getBankAccount(money);
    const withdrawMore = account.withdraw.bind(account, money * 2);
    expect(withdrawMore).toThrow(InsufficientFundsError);
    expect(withdrawMore).toThrow(`Insufficient funds: cannot withdraw more than ${money}`);
  });

  test('should throw error when transferring more than balance', () => {
    const account1 = getBankAccount(money);
    const account2 = getBankAccount(money);
    const trancferBinded = account1.transfer.bind(account1, money * 2, account2);
    expect(trancferBinded).toThrow(Error);
  });

  test('should throw error when transferring to the same account', () => {
    const account = getBankAccount(money);
    const trancferBinded = account.transfer.bind(account, money / 2, account);
    expect(trancferBinded).toThrow(TransferFailedError);
    expect(trancferBinded).toThrow('Transfer failed');
  });

  test('should deposit money', () => {
    const account = getBankAccount(money);
    expect(account.deposit).toBeTruthy();
    expect(account.deposit(money)).toHaveProperty('_balance');
    expect(account.deposit(money)).toMatchObject({"_balance": 150});
  });

  test('should withdraw money', () => {
    const account = getBankAccount(money * 5);
    expect(account.withdraw).toBeTruthy();
    expect(account.withdraw(money)).toHaveProperty('_balance');
    expect(account.withdraw(money)).toMatchObject({"_balance": 150});
  });

  test('should transfer money', () => {
    const account1 = getBankAccount(money);
    const account2 = getBankAccount(money);
    expect(account1.transfer(money, account2)).toMatchObject({"_balance": 0});
    expect(account2).toMatchObject({"_balance": 100})
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const account = getBankAccount(money * 5);
    const balance = await account.fetchBalance();
    const requestFailed: boolean = balance === null;
    if (requestFailed) {
      expect(balance).toBeNull();
    } else {
      expect(typeof balance).toBe('number');
    }
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const account = getBankAccount(money * 5);
    jest.spyOn(account, 'fetchBalance').mockResolvedValueOnce(money * 20);
    await account.synchronizeBalance();
    expect(account.getBalance()).toEqual(money * 20);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const account = getBankAccount(money * 5);
    jest.spyOn(account, 'fetchBalance').mockResolvedValueOnce(null);
    await expect(account.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
