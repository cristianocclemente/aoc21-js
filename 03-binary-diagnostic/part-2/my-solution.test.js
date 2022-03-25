const { parseInputFile, myAlgorithm } = require('./my-solution');

test('a.in', () => {
    const bNumbers = parseInputFile("./03-binary-diagnostic/part-2/a.in")
    expect(myAlgorithm(bNumbers)).toBe(230);
});