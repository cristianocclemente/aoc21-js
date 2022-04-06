const mySolution = require('./my-solution');

test('example input', () => {
    expect(mySolution("./02-dive/example-input.in")).toBe(900);
});

test('my input', () => {
    expect(mySolution("./02-dive/my-input.in")).toBe(1599311480);
});