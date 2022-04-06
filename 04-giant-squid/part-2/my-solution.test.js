const mySolution = require('./my-solution');

test('example input', () => {
    expect(mySolution("./04-giant-squid/example-input.in")).toBe(1924);
});

test('my input', () => {
    expect(mySolution("./04-giant-squid/my-input.in")).toBe(6256);
});