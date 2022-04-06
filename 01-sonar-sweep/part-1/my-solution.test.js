const mySolution = require('./my-solution');

test('example input', () => {
    expect(mySolution("./01-sonar-sweep/example-input.in")).toBe(7);
});

test('my input', () => {
    expect(mySolution("./01-sonar-sweep/my-input.in")).toBe(1832);
});