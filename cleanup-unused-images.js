// List of images that are actually used in the codebase
const usedImages = [
  '/images/Education.webp',
  '/images/aged care/pexels-matthiaszomer-339620.jpg',
  '/images/airports.webp',
  '/images/app-store-badge.svg',
  '/images/call center.webp',
  '/images/collage bank/Collage 2.jpg',
  '/images/collage bank/collage 3.jpg',
  '/images/collage bank/collage 5.jpg',
  '/images/doctors.svg',
  '/images/favicon.png',
  '/images/generating.webp',
  '/images/google-play-badge.png',
  '/images/hospitality.webp',
  '/images/icu/pexels-shvetsa-4483340.jpg',
  '/images/illustration/A day off-pana.svg',
  '/images/illustration/Business ethics-pana-2.svg',
  '/images/illustration/Chatting-pana.svg',
  '/images/illustration/Choose-pana.svg',
  '/images/illustration/Coins-rafiki.svg',
  '/images/illustration/Computer troubleshooting-pana-2.svg',
  '/images/illustration/Customer relationship management-pana.svg',
  '/images/illustration/Doctor.svg',
  '/images/illustration/Events-pana.svg',
  '/images/illustration/Folder-pana.svg',
  '/images/illustration/Light bulb-pana.svg',
  '/images/illustration/Manage money-pana.svg',
  '/images/illustration/Manufacturing Process-pana.svg',
  '/images/illustration/Mobile inbox-pana.svg',
  '/images/illustration/Programmer-pana-2.svg',
  '/images/illustration/Push notifications-pana-2 copy.svg',
  '/images/illustration/Push notifications-pana-2.svg',
  '/images/illustration/Rocket research-pana.svg',
  '/images/illustration/Share-link-pana.svg',
  '/images/illustration/Team-pana.svg',
  '/images/illustration/Timeline-pana.svg',
  '/images/illustration/Transfer files-pana.svg',
  '/images/illustration/Version control-pana.svg',
  '/images/illustration/Work life balance-pana.svg',
  '/images/illustration/aged-care.svg',
  '/images/illustration/auto-roster.svg',
  '/images/illustration/ed-icu.svg',
  '/images/illustration/radiology.svg',
  '/images/illustration/schedule calendar-pana.svg',
  '/images/illustration/team checklist-pana.svg',
  '/images/illustration/test2.svg',
  '/images/illustration/test5 copy.svg',
  '/images/illustration/test5.svg',
  '/images/illustration/time flies-pana.svg',
  '/images/logistics.webp',
  '/images/logos/western.png',
  '/images/logos/whanganui.png',
  '/images/numbers.png',
  '/images/radiology/accuray-5VkNa1LrS8A-unsplash.jpg',
  '/images/rosterlab-logo.png',
  '/images/swirl.webp',
  '/images/team/Headshot daniel.jpg',
  '/images/team/Headshot isaac.jpg',
  '/images/team/Sunny Headshot.jpg',
  '/images/team/rosterlab team photo.jpg',
  '/images/transportation.webp',
  '/images/why choose us/partnership.jpeg'
];

// Convert to Set for easier comparison
const usedImagesSet = new Set(usedImages.map(img => img.replace('/images/', '')));

// List of all images found
const allImages = `
/aged care/pexels-olly-3768131.jpg
/appView.png
/bannerTemplate-simple.png
/bannerTemplate.png
/bartender.webp
/benefit1.svg
/benefit2.svg
/benefit3.svg
/blue-paper.webp
/calendar.webp
/collage bank/collage 1.jpg
/collage bank/collage 4.jpg
/collage bank/collage 6.jpg
/collage bank/collage 7.jpg
/collage bank/collage 8.jpg
/customer.webp
/devices/test 1.png
/devices/test 2.png
/digital-scheduling-hero.png
/doctor-computer.webp
/empower-your-team.png
/ensure-safer-and-fair-rosters.png
/founders.webp
/foundersSitting.webp
/four-doctors.webp
/free product/Free digital product.png
/general-specialty.webp
/green-paper.webp
/illustration/Events-pana copy.svg
/illustration/smaller-team.webp
/illustration/test3.svg
/illustration/test5 copy 2.svg
/illustration/test6.svg
/intro-img.webp
/keyboard-type.webp
/logo_banner.png
/logo_banner.webp
/logo_colored.png
/logo_colored_white_bg.png
/logo_white.png
/logos/bupa.png
/logos/dargaville.png
/logos/kensington.png
/logos/peticare.png
/logos/peticare.svg
/logos/rosterlab-color-favicon-rotated.svg
/logos/rosterlab-color-favicon.svg
/logos/spectrum.png
/logos/tech4s.png
/medal.webp
/mockBlogThumbnail.webp
/mockCompanyLogos.webp
/nurse-specialty.webp
/optimise-your-workforce-with-ai.png
/peticare.png
/rad.png
/radiology/accuray-MFSEP2g4YS0-unsplash.jpg
/reclaim-precious-time.png
/rosterlab designs/accessible.webp
/rosterlab designs/aged_care_3.webp
/rosterlab designs/aged_care_4.webp
/rosterlab designs/generating-1.webp
/rosterlab designs/radiology_2.webp
/rosterlab designs/radiology_3.webp
/rosterlab designs/radiology_4.webp
/rules.svg
/rules.webp
/schedge.png
/speech-bubble.png
/stats.svg
/stats.webp
/timesheet.png
/two-doctors.webp
`.trim().split('\n').filter(Boolean);

console.log('UNUSED IMAGES TO DELETE:\n');
console.log(allImages.join('\n'));
console.log('\nTotal unused images:', allImages.length);