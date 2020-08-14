import { listToTree } from "./index";

test("Say Hi Zak", () => {
  expect(listToTree("Zak")).toBe("Hi Zak");
});
