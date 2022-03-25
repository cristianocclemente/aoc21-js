const passagePathing1 = require('./MySolution1');

test('small example', () => {
    expect(passagePathing1("./12-passage-pathing/part-1/a-small.in")).toBe(10);
});

test('medium example', () => {
    expect(passagePathing1("./12-passage-pathing/part-1/b-medium.in")).toBe(19);
});

test('large example', () => {
    expect(passagePathing1("./12-passage-pathing/part-1/c-large.in")).toBe(226);
});