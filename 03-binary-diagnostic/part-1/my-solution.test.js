const mySolution = require('./my-solution');

test('example input', () => {
    expect(mySolution("./03-binary-diagnostic/example-input.in")).toBe(198);
});

test('my input', () => {
    expect(mySolution("./03-binary-diagnostic/my-input.in")).toBe(3969000);
});