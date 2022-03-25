const { parseInputFile, myAlgorithm } = require('./my-solution');

test('a.in', () => {
    const numbers = parseInputFile("./02-dive/part-1/a.in")
    expect(myAlgorithm(numbers)).toBe(150);
});