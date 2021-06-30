const add = (a, b) => a + b;

const user = (firstName, lastName) => ({
  firstName,
  lastName,
});

test('should return 4', () => {
  expect(add(2, 2)).toBe(4);
});

describe('positive scenario', () => {
  test('should return 6', () => {
    expect(add(3, 3)).toBe(6);
  });

  test('should return user', () => {
    const a = 0.1 + 0.2;

    expect(a).toBeCloseTo(0.3);
    // expect(obj.c).toBeNull();
    // expect(a).not.toBeDefined();
    // expect(user('yagnesh', 'modh')).toEqual({
    //   firstName: 'yagnesh',
    //   lastName: 'modh',
    // });
  });
});

describe('negative scenario', () => {
  it('should return 1', () => {
    expect(add(-1, 2)).toBe(1);
  });
});
