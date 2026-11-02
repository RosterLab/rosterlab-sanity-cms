import {
  assignVariant,
  getModalState,
  shouldShowModal,
  updateModalState,
  trackPageView,
  markDemoBooked,
} from "./user-behavior-tracker";

beforeEach(() => {
  localStorage.clear();
  sessionStorage.clear();
  window.history.replaceState({}, "", "/");
});
afterEach(() => jest.restoreAllMocks());

test.each([
  [0, "A"],
  [0.49, "A"],
  [0.5, "B"],
  [0.99, "B"],
])(
  "splits new visitors between the two active variants (random=%s)",
  (random, expected) => {
    jest.spyOn(Math, "random").mockReturnValue(random as number);
    expect(assignVariant()).toBe(expected);
  },
);

test("ignores retired variants in saved history and cycles active variants", () => {
  localStorage.setItem(
    "rl_user_behavior",
    JSON.stringify({ isReturningVisitor: true }),
  );
  localStorage.setItem(
    "rl_modal_state",
    JSON.stringify({
      variant: "D",
      variantsShown: ["A", "B", "C", "D"],
      totalShown: 2,
    }),
  );
  expect(getModalState()).toMatchObject({
    variant: "D",
    variantsShown: ["A", "B", "C", "D"],
    totalShown: 2,
  });
  expect(assignVariant()).toBe("A");
  expect(assignVariant()).toBe("B");
});

test.each(["C", "D"])("ignores the retired %s URL override", (variant) => {
  window.history.replaceState({}, "", `/?modal_variant=${variant}`);
  jest.spyOn(Math, "random").mockReturnValue(0);
  expect(assignVariant()).toBe("A");
});

function makeEligible() {
  localStorage.setItem(
    "rl_user_behavior",
    JSON.stringify({
      hasVisitedHighIntent: true,
      highIntentTimeSpent: 60,
    }),
  );
}

function nextSession() {
  sessionStorage.clear();
}

test("keeps the three-day cooldown and blocks another popup in the same session", () => {
  makeEligible();
  expect(shouldShowModal()).toBe(true);
  assignVariant();
  expect(shouldShowModal()).toBe(false);
  nextSession();
  const now = Date.now();
  updateModalState({
    dismissedAt: new Date(now - 3 * 86400000 + 10000).toISOString(),
  });
  expect(shouldShowModal()).toBe(false);
  updateModalState({ dismissedAt: new Date(now - 3 * 86400000).toISOString() });
  expect(shouldShowModal()).toBe(true);
});

test("allows only two lifetime impressions, even after the monthly period expires", () => {
  makeEligible();
  assignVariant();
  nextSession();
  expect(shouldShowModal()).toBe(true);
  assignVariant();
  nextSession();
  expect(shouldShowModal()).toBe(false);
  updateModalState({
    periodStartDate: new Date(Date.now() - 31 * 86400000).toISOString(),
  });
  expect(getModalState()).toMatchObject({
    totalShown: 0,
    lifetimeTotalShown: 2,
  });
  expect(shouldShowModal()).toBe(false);
  // The reset must persist the lifetime counter before the next read.
  expect(getModalState().lifetimeTotalShown).toBe(2);
});

test("blocks the monthly limit independently of the lifetime counter", () => {
  makeEligible();
  updateModalState({
    totalShown: 2,
    periodStartDate: new Date().toISOString(),
  });
  expect(shouldShowModal()).toBe(false);
});

test("migrates old impression history before resetting an expired period", () => {
  makeEligible();
  localStorage.setItem(
    "rl_modal_state",
    JSON.stringify({
      variantsShown: ["C", "D"],
      totalShown: 0,
      periodStartDate: new Date(Date.now() - 31 * 86400000).toISOString(),
    }),
  );
  expect(shouldShowModal()).toBe(false);
  expect(getModalState().lifetimeTotalShown).toBe(2);
});

test.each([
  "/case-studies/how-plastics-department-used-roster-simulation-to-cut-in-costs",
  "/us/case-studies/how-plastics-department-used-schedule-simulation-to-cut-in-costs",
])(
  "reading the featured case study directly suppresses its popup: %s",
  (path) => {
    trackPageView(path);
    expect(getModalState().caseStudyViewed).toBe(true);
    window.history.replaceState({}, "", "/");
    jest.spyOn(Math, "random").mockReturnValue(0.99);
    expect(assignVariant()).toBe("A");
  },
);

test.each(["/case-studies/other-article", "/us/case-studies/other-article"])(
  "never promotes the case study while reading an article on %s",
  (path) => {
    window.history.replaceState({}, "", `${path}?modal_variant=B`);
    jest.spyOn(Math, "random").mockReturnValue(0.99);
    expect(assignVariant()).toBe("A");
  },
);

test("a case study click suppresses its popup but allows demo booking after cooldown", () => {
  makeEligible();
  window.history.replaceState({}, "", "/?modal_variant=B");
  expect(assignVariant()).toBe("B");
  updateModalState({
    caseStudyViewed: true,
    dismissedAt: new Date().toISOString(),
  });
  nextSession();
  expect(shouldShowModal()).toBe(false);
  updateModalState({
    dismissedAt: new Date(Date.now() - 3 * 86400000).toISOString(),
  });
  expect(shouldShowModal()).toBe(true);
  expect(assignVariant()).toBe("A");
});

test("demo bookings still suppress both popup variants", () => {
  makeEligible();
  markDemoBooked();
  expect(shouldShowModal()).toBe(false);
});

test("URL overrides count toward the shared lifetime and session limits", () => {
  makeEligible();
  window.history.replaceState({}, "", "/?modal_variant=B");
  expect(assignVariant()).toBe("B");
  expect(getModalState()).toMatchObject({
    totalShown: 1,
    lifetimeTotalShown: 1,
  });
  expect(shouldShowModal()).toBe(false);
});

test.each([
  "/book-a-demo",
  "/us/book-a-demo",
  "/book-a-demo/",
  "/us/book-a-demo/",
])("suppresses popup eligibility on %s", (path) => {
  makeEligible();
  window.history.replaceState({}, "", path);
  expect(shouldShowModal()).toBe(false);
});
