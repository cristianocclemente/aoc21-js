const mySolution = require('./my-solution');

test('example input', () => {
    expect(mySolution("./05-hydrotermal-venture/example-input.in")).toBe(5);
});

test('my input', () => {
    expect(mySolution("./05-hydrotermal-venture/my-input.in")).toBe(7438);
});