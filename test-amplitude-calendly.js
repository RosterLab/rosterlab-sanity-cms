// Test script to verify Amplitude user ID is passed to Calendly
// Run this in the browser console on the book-a-demo page

// 1. Check if Amplitude is initialized and has a user ID
const checkAmplitudeUserId = () => {
  const userId =
    window.amplitude?.getInstance()?.getUserId?.() ||
    window.amplitude?.getUserId?.();
  console.log("Amplitude User ID:", userId || "No user ID found");
  return userId;
};

// 2. Check the Calendly iframe URL
const checkCalendlyUrl = () => {
  const iframe = document.querySelector('iframe[src*="calendly.com"]');
  if (iframe) {
    const url = new URL(iframe.src);
    const utmContent = url.searchParams.get("utm_content");
    console.log("Calendly iframe URL:", iframe.src);
    console.log("utm_content parameter:", utmContent);

    if (utmContent && utmContent.startsWith("amplitude_")) {
      console.log("✅ Amplitude user ID is being passed correctly!");
      console.log(
        "Extracted Amplitude ID:",
        utmContent.replace("amplitude_", ""),
      );
    } else {
      console.log("❌ utm_content does not contain Amplitude user ID");
    }
  } else {
    console.log(
      "Calendly iframe not found yet. Make sure the widget has loaded.",
    );
  }
};

// 3. Run all checks
console.log("=== Testing Amplitude + Calendly Integration ===");
const userId = checkAmplitudeUserId();
setTimeout(() => {
  checkCalendlyUrl();
}, 2000); // Wait for Calendly widget to load

// 4. Listen for URL changes in the Calendly iframe
const observeCalendly = () => {
  const observer = new MutationObserver(() => {
    const iframe = document.querySelector('iframe[src*="calendly.com"]');
    if (iframe && !window._calendlyObserved) {
      window._calendlyObserved = true;
      console.log("Calendly widget detected!");
      checkCalendlyUrl();
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
};

observeCalendly();
