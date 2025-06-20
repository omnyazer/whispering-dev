export default {
  transform: {
    "^.+\\.js$": "babel-jest"
  },
  testEnvironment: "node",
  clearMocks: true,
  collectCoverage: true,
};
