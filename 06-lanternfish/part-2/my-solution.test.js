const mySolution = require('./my-solution');

test('example input', () => {
    expect(mySolution("./06-lanternfish/example-input.in")).toBe(26984457539);
});

test('my input', () => {
    expect(mySolution("./06-lanternfish/my-input.in")).toBe(1631647919273);
});