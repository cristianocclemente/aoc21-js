const mySolution = require('./my-solution');

test('example input', () => {
    expect(mySolution("./02-dive/example-input.in")).toBe(150);
});

test('my input', () => {
    expect(mySolution("./02-dive/my-input.in")).toBe(2019945);
});