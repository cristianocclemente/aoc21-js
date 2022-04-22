const mySolution = require('./my-solution');

test('small example input', () => {
    expect(mySolution("./12-passage-pathing/example-input-a.in")).toBe(10);
});

test('medium example input', () => {
    expect(mySolution("./12-passage-pathing/example-input-b.in")).toBe(19);
});

test('large example input', () => {
    expect(mySolution("./12-passage-pathing/example-input-c.in")).toBe(226);
});

test('my input', () => {
    expect(mySolution("./12-passage-pathing/my-input.in")).toBe(3510);
});