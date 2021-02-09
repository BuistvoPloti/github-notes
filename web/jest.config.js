module.exports = {
  preset: "ts-jest/presets/js-with-babel",
  testEnvironment: "jsdom",
  roots: [
    "./"
  ],
  testMatch: [
    "**/__tests__/**/*.+(ts|tsx|js)",
  ],
  transform: { "^.+\\.ts?$": "ts-jest" },
  transformIgnorePatterns: [
    "node_modules/(?!variables/.*)"
  ],
  moduleNameMapper: {
    ".+\\.(css|styl|less|sass|scss|png|jpg|gif|ttf)$": "jest-transform-stub"
  }
};
