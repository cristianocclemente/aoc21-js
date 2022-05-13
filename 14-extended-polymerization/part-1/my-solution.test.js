const {
    parseInputFile,
    formulaToListOfPairs,
    listOfPairsToFormula,
    pairToElementToPairToPairs,
    pairInsertionStep,
    pairInsertionNSteps,
    formulaToElementToFrequency,
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

test('formula to list of pairs function', () => {
    expect(formulaToListOfPairs("ABC")).toStrictEqual(["AB", "BC"]);
});

test('list of pairs to formula function', () => {
    expect(listOfPairsToFormula(["AB", "BC"])).toBe("ABC");
});

test('pair to element to pair to pairs function', () => {
    expect(pairToElementToPairToPairs({"AB": "C"})).toStrictEqual({"AB": ["AC", "CB"]});
});

test('pair insertion step function', () => {
    expect(pairInsertionStep("AC", {"AC": "B"})).toBe("ABC");
});

test('pair insertion N steps function', () => {
    expect(pairInsertionNSteps("AE", {"AE": "C", "AC": "B", "CE": "D"}, 2)).toBe("ABCDE");
});

test('formula to element to frequency function', () => {
    expect(formulaToElementToFrequency("AABBBC")).toStrictEqual({"A": 2, "B": 3, "C": 1});
});

test('quantity of the most common element function', () => {
    expect(quantityMostCommonElement("AABBBC")).toBe(3);
});

test('quantity of the least common element function', () => {
    expect(quantityLeastCommonElement("AABBBC")).toBe(1);
});

test('example input', () => {
    expect(mySolution("./14-extended-polymerization/example-input.in")).toBe(1588);
});

test('my input', () => {
    expect(mySolution("./14-extended-polymerization/my-input.in")).toBe(3306);
});