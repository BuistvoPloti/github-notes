module.exports = {
  preset: "ts-jest/presets/js-with-babel",
  roots: [
    "<rootDir>/src"
  ],
  testMatch: [
    "**/__tests__/**/*.+(ts|tsx|js)",
  ],
  transform: { "^.+\\.ts?$": "ts-jest" },
  transformIgnorePatterns: [
    "node_modules/(?!variables/.*)"
  ]
};
