const mySolution = require('./my-solution');

test('example input', () => {
    expect(mySolution("./08-seven-segment-search/example-input.in")).toBe(61229);
});

test('my input', () => {
    expect(mySolution("./08-seven-segment-search/my-input.in")).toBe(1004688);
});