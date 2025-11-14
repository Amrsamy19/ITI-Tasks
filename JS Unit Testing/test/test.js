const { expect, assert, should } = require("chai");
const { describe, it } = require("mocha");

const {
  capitalizeFirstLetter,
  generateEvenNumbers,
  removeDuplicates,
} = require("../index");

describe("Capitalize First Letter: ", () => {
  it("should return a string when a valid string is given", () => {
    expect(capitalizeFirstLetter("test")).to.be.a("string");
  });
  it("should return 'Hello' when 'hello' is given", () => {
    expect(capitalizeFirstLetter("hello")).to.equal("Hello");
  });
  it("should return 'Java' when 'JAVA' is given", () => {
    expect(capitalizeFirstLetter("JAVA")).to.equal("Java");
  });
  it("should throw TypeError when a number is given", () => {
    expect(() => capitalizeFirstLetter(12)).to.throw(
      TypeError,
      "parameter should be string"
    );
  });
  it("pending test case for future implementation");
});

describe("Generate Even Numbers: ", () => {
  it("should return an array", () => {
    expect(generateEvenNumbers(3)).to.be.an("array");
  });
  it("should return [2, 4, 6, 8] when 4 is given", () => {
    expect(generateEvenNumbers(4)).to.deep.equal([2, 4, 6, 8]);
  });
  it("should return an array of length 4 when 4 is given", () => {
    expect(generateEvenNumbers(4)).to.have.lengthOf(4);
  });
  it("should throw TypeError when a string is given", () => {
    expect(() => generateEvenNumbers("3")).to.throw(
      TypeError,
      "parameter should be number"
    );
  });
  it("should delay test execution by 3 seconds", function (done) {
    this.timeout(5000);
    setTimeout(() => {
      expect(generateEvenNumbers(2)).to.deep.equal([2, 4]);
      done();
    }, 3000);
  });
  it("should return [2, 4] when 2 is given (using should)", () => {
    should();
    generateEvenNumbers(2).should.deep.equal([2, 4]);
  });
  it("should return [2, 4, 6] when 3 is given (using assert)", () => {
    assert.deepEqual(generateEvenNumbers(3), [2, 4, 6]);
  });
});

describe("Remove Duplicates: ", () => {
  it("should return an array with no duplicates", () => {
    expect(
      removeDuplicates(["apple", "banana", "apple", "orange"])
    ).to.deep.equal(["apple", "banana", "orange"]);
  });
  it("should preserve the order of first occurrence", () => {
    expect(removeDuplicates([1, 2, 1, 3, 2])).to.deep.equal([1, 2, 3]);
  });
  it("should throw TypeError when a non-array is given", () => {
    expect(() => removeDuplicates("not an array")).to.throw(
      TypeError,
      "parameter should be array"
    );
  });
  it.skip("skipped test case for future implementation", function (done) {
    this.timeout(5000);
    setTimeout(() => {
      // Pending implementation
      done();
    }, 5000);
  });
});
