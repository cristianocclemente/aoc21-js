const mySolution = require('./my-solution');

test('example input', () => {
    expect(mySolution("./07-the-treachery-of-whales/example-input.in")).toBe(37);
});

test('my input', () => {
    expect(mySolution("./07-the-treachery-of-whales/my-input.in")).toBe(343605);
});