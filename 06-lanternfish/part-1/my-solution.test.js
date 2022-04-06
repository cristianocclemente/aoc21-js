const mySolution = require('./my-solution');

test('example input', () => {
    expect(mySolution("./06-lanternfish/example-input.in")).toBe(5934);
});

test('my input', () => {
    expect(mySolution("./06-lanternfish/my-input.in")).toBe(359999);
});