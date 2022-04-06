const mySolution = require('./my-solution');

test('example input', () => {
    expect(mySolution("./09-smoke-basin/example-input.in")).toBe(15);
});

test('my input', () => {
    expect(mySolution("./09-smoke-basin/my-input.in")).toBe(530);
});