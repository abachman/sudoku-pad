const config = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["./__test__/jest-setup.ts"],
};

export default config;
