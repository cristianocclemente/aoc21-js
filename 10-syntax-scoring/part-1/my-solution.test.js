const mySolution = require('./my-solution');

test('example input', () => {
    expect(mySolution("./10-syntax-scoring/example-input.in")).toBe(26397);
});

test('my input', () => {
    expect(mySolution("./10-syntax-scoring/my-input.in")).toBe(415953);
});