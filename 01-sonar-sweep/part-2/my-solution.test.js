const { parseInputFile, myAlgorithm } = require('./my-solution');

test('a.in', () => {
    const numbers = parseInputFile("./01-sonar-sweep/part-2/a.in")
    expect(myAlgorithm(numbers)).toBe(5);
});