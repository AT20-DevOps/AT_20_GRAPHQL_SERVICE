const { sum } = require('../sum/sum');

describe("Sum", () => {
    it ("sum two numbers", () => {
        expect(sum(1, 1)).toEqual(2);
    });
});
