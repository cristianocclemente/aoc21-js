const mySolution = require('./my-solution');

test('example input', () => {
    expect(mySolution("./03-binary-diagnostic/example-input.in")).toBe(230);
});

test('my input', () => {
    expect(mySolution("./03-binary-diagnostic/my-input.in")).toBe(4267809);
});