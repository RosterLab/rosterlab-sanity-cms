import { usHubSpotFormOptions } from "../us-hubspot-form";

test("US hosted-form labels preserve CRM option values, selection, consent and required markers", () => {
  document.body.innerHTML = `<form>
    <label for="industry_dropdown-example"><span>Industry (Dropdown)</span><span class="required">*</span></label>
    <select name="industry_dropdown" id="industry_dropdown-example">
      <option value="[Healthcare] Aged Care" selected>[Healthcare] Aged Care</option>
      <option value="[Healthcare] Anaesthesia">[Healthcare] Anaesthesia</option>
      <option value="[Non-Healthcare] Call Centres">[Non-Healthcare] Call Centres</option>
      <option value="Critical care">[Healthcare] Critical Care &amp; Emergency</option>
    </select>
    <p class="consent">You may unsubscribe at any time.</p>
    <input type="submit" value="Download the Roster Template" />
  </form>`;
  const form = document.querySelector("form")!;
  const before = new FormData(form).get("industry_dropdown");
  const options = usHubSpotFormOptions("Download the Schedule Template");
  options.onFormReady({ 0: form });
  expect(
    Array.from(form.querySelectorAll("option")).map(
      (option) => option.textContent,
    ),
  ).toEqual([
    "[Healthcare] Senior Care",
    "[Healthcare] Anesthesia",
    "[Non-Healthcare] Call Centers",
    "[Healthcare] Critical Care & Emergency",
  ]);
  expect(new FormData(form).get("industry_dropdown")).toBe(before);
  expect(
    Array.from(form.querySelectorAll("option")).map((option) => option.value),
  ).toEqual([
    "[Healthcare] Aged Care",
    "[Healthcare] Anaesthesia",
    "[Non-Healthcare] Call Centres",
    "Critical care",
  ]);
  expect(form.querySelector("label")?.textContent).toBe("Industry*");
  expect(form.querySelector(".required")).not.toBeNull();
  expect(form.querySelector(".consent")?.textContent).toBe(
    "You may unsubscribe at any time.",
  );
  expect(
    form.querySelector<HTMLInputElement>('input[type="submit"]')?.value,
  ).toBe("Download the Schedule Template");
  options.onFormReady(form); // Also handles native forms and repeated readiness.
  expect(new FormData(form).get("industry_dropdown")).toBe(before);
});
