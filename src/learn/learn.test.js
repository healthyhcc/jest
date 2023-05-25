const { add, subtract, multip, division, object } = require("./learn");

test("1 add 1", () => {
  const sum = add(1, 1);
  expect(sum).toBe(2);
});

test("5 subtract 2", () => {
  expect(subtract(5, 2)).toBe(3);
});

test("2 multip 3", () => {
  expect(multip(2, 3)).toBe(6);
  expect(multip(2, 3)).not.toBe(5);
});

test("1 division 1", () => {
  expect(division(1, 1)).toBe(1);
  expect(division(1, 1)).not.toBe(0);
});

const obj = {
  name: 'cxk',
  hobby: '🏀',
}

test("object equal obj", () => {
  expect(object).not.toBe(obj);
  expect(object).toEqual(obj);
});

