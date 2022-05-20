const {
    parseInputFile,
    toPairToFrequency,
    toPairToPairs,
    pairInsertionStep,
    pairInsertionNSteps,
    toElementToFrequency,
    quantityMostCommonElement,
    quantityLeastCommonElement,
    mySolution
  } = require('./my-solution');

test('parse input file function', () => {
    const {template, pairToElement} = parseInputFile("./14-extended-polymerization/example-input.in")
    expect(template).toBe("NNCB");
    expect(pairToElement).toStrictEqual({
        "CH":"B",
        "HH":"N",
        "CB":"H",
        "NH":"C",
        "HB":"C",
        "HC":"B",
        "HN":"C",
        "NN":"C",
        "BH":"H",
        "NC":"B",
        "NB":"B",
        "BN":"B",
        "BB":"N",
        "BC":"B",
        "CC":"N",
        "CN":"C",
});
});

test('formula to pair to frequency function', () => {
    expect(toPairToFrequency("ABC")).toStrictEqual({"AB": 1, "BC": 1});
});

test('pair to element to pair to pairs function', () => {
    expect(toPairToPairs({"AB": "C"})).toStrictEqual({"AB": ["AC", "CB"]});
});

test('pair insertion step function', () => {
    expect(pairInsertionStep({"AB": 1, "CB": 2}, {"AB": ["AX", "XB"], "CB": ["CX", "XB"]})).toStrictEqual({"AX": 1, "XB": 3, "CX": 2});
});

test('pair insertion N steps function', () => {
    expect(pairInsertionNSteps("AE", {"AE": "C", "AC": "B", "CE": "D"}, 2)).toStrictEqual({"AB": 1, "BC": 1, "CD": 1, "DE": 1});
});

test('pair to frequency and template to element to frequency function', () => {
    expect(toElementToFrequency({"AB": 2, "BC": 1, "CA": 1, "BA": 1}, "AA")).toStrictEqual({"A": 3, "B": 2, "C": 1});
});

test('quantity of the most common element function', () => {
    expect(quantityMostCommonElement({"AB": 2, "BC": 1, "CA": 1, "BA": 1}, "AA")).toBe(3);
});

test('quantity of the least common element function', () => {
    expect(quantityLeastCommonElement({"AB": 2, "BC": 1, "CA": 1, "BA": 1}, "AA")).toBe(1);
});

test('example input for the first part', () => {
    expect(mySolution("./14-extended-polymerization/example-input.in", 10)).toBe(1588);
});

test('my input for the first part', () => {
    expect(mySolution("./14-extended-polymerization/my-input.in", 10)).toBe(3306);
});

test('example input for the second part', () => {
    expect(mySolution("./14-extended-polymerization/example-input.in", 40)).toBe(2188189693529);
});

test('my input for the second part', () => {
    expect(mySolution("./14-extended-polymerization/my-input.in", 40)).toBe(3760312702877);
});