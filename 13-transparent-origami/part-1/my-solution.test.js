const mySolution = require('./my-solution');

test('example input', () => {
    expect(mySolution("./13-transparent-origami/example-input.in")).toBe(17);
});

test('my input', () => {
    expect(mySolution("./13-transparent-origami/my-input.in")).toBe(827);
});