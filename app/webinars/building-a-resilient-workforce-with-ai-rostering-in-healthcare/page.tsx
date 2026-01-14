import { Metadata } from "next";
import SiteLayout from "@/components/layout/SiteLayout";
import Container from "@/components/ui/Container";
import Accordion, { AccordionItem } from "@/components/ui/Accordion";
import Link from "next/link";
import { HiCalendar, HiClock, HiUserGroup } from "react-icons/hi";

export const metadata: Metadata = {
  title:
    "Building a Resilient Healthcare Workforce with AI Staff Rosters - Webinar",
  description:
    "Watch our webinar with Mike Peterson and Sunny Feng as they explore how AI-powered rostering can save hundreds of hours and build more resilient healthcare teams.",
  openGraph: {
    title:
      "Building a Resilient Healthcare Workforce with AI Staff Rosters | RosterLab",
    description:
      "Watch our webinar with Mike Peterson and Sunny Feng as they explore how AI-powered rostering can save hundreds of hours and build more resilient healthcare teams.",
    type: "video.other",
    url: "https://rosterlab.com/webinars/building-a-resilient-workforce-with-ai-rostering-in-healthcare",
    images: [
      {
        url: "/images/webinars/resilient-healthcare-thumbnail.png",
        width: 1200,
        height: 630,
        alt: "Building a Resilient Healthcare Workforce Webinar",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Building a Resilient Healthcare Workforce with AI Staff Rosters | RosterLab",
    description:
      "Watch our webinar with Mike Peterson and Sunny Feng as they explore how AI-powered rostering can save hundreds of hours and build more resilient healthcare teams.",
    images: ["/images/webinars/resilient-healthcare-thumbnail.png"],
  },
  alternates: {
    canonical:
      "https://rosterlab.com/webinars/building-a-resilient-workforce-with-ai-rostering-in-healthcare",
  },
};

// Transcript sections with actual webinar content
const transcriptSections: AccordionItem[] = [
  {
    id: "introduction",
    title: "Introduction & Welcome",
    content: `Mike Peterson is the Associate Clinical Manager for Radiology at Whanganui Hospital in New Zealand. With a background entirely in clinical work, Mike manages the day-to-day running of the department including rostering, leave compliance, committees, and numerous projects.

Before implementing RosterLab, the previous manager spent at least 40 hours (a full week's work) creating each 12-week roster using Excel spreadsheets. Mike knew he neither had the time nor the patience to commit to that every three months, which led him to search for a better solution.`,
  },
  {
    id: "old-system-challenges",
    title: "The Old System: Excel, OneDrive & Paper",
    content: `The previous rostering system at Whanganui Hospital was a patchwork of different tools:

• **Excel Spreadsheets**: Rosters were built manually in Excel and uploaded to OneDrive
• **Two-Factor Authentication**: Staff had to go through 2FA multiple times just to access their roster
• **Paper Diaries**: Most staff wrote their shifts in physical diaries, leading to errors and conflicts
• **Printed Rosters**: Some staff printed the Excel sheet and manually crossed out changes
• **Wall Planner**: Leave was manually written on an office wall planner
• **Hospital Kiosk**: A cumbersome system for managing leave applications
• **Handwritten Swap Forms**: A single paper sheet that floated around the department
• **Give-Away Board**: A whiteboard where staff wrote shifts they wanted to trade

The lack of a single source of truth meant constant confusion about start times, shift changes, and who was actually working when. Staff had to physically come to the office to check the wall planner before applying for leave.`,
  },
  {
    id: "department-complexity",
    title: "The Complexity of Radiology Rostering",
    content: `Whanganui Hospital's radiology department manages:

• **42 imaging staff** and 6 clerical staff
• **30 staff on shift rosters** providing 24/7 service
• **Three modalities**: CT, MRI, and General X-ray (~10 staff each)
• **10 part-time staff** with historical agreements on specific days and hours
• **Cross-trained staff**: Many staff skilled in multiple modalities (e.g., MRI and General)
• **Two MECAs** (union contracts): MRI contract and general contract with different rules

Key challenges included:
- Balancing multiple skill sets across different modalities
- Managing part-time peculiarities alongside service demands
- Ensuring 24/7 coverage across all imaging services
- Tracking preventative maintenance schedules for imaging systems
- Coordinating with engineers and physicists for equipment servicing

After the initial roster was published, staff would immediately begin making swaps, essentially undoing the week of work that went into creating it.`,
  },
  {
    id: "time-cost-analysis",
    title: "The True Cost: 170+ Hours Per Year",
    content: `When Mike analyzed the actual time spent on rostering, the numbers were staggering:

**Building Rosters:**
• 40 hours per 12-week roster
• 4+ rosters per year = **170+ hours annually**
• This is one highly skilled MRI radiographer's time - one of their most expensive staff members

**Managing Shift Swaps:**
• 425 shift swaps in a 12-month period
• Average 5 minutes per swap (translating handwriting, discussions, approvals)
• **35 hours per year** just on shift changes

**Total: 170+ hours annually** - and that's not counting leave management, the constant checking, and the time individual staff spent managing their own schedules.

The cost was three times more than RosterLab's annual subscription, even including Mike's time to use the platform. It was presented as a pure cost-saving measure and was approved immediately.`,
  },
  {
    id: "getting-approval",
    title: "Getting Approval & Addressing AI Concerns",
    content: `The business case was straightforward: The annual time cost (170 hours × hourly rate) was three times the cost of RosterLab's subscription, including Mike's time to use it.

**Hurdles faced in 2023:**
• **Data & Digital Team**: Concerned about AI as a "brand new thing" in 2023
• **Privacy Officer**: Worried about AI taking personal information from computers
• **General AI Fear**: Many people had concerns about AI technology

**What helped:**
• RosterLab being cloud-based (not installed on hospital infrastructure) eased IT concerns
• Once teams understood the product, privacy concerns disappeared
• Clear explanation of how the AI actually works
• Demonstrating it was a tool to assist, not replace, human decision-making

Mike notes: "By 2025, AI adoption has become much easier. Everyone uses ChatGPT now, people use AI trading bots, AI for music creation - AI is everywhere. I just happen to use it for rostering."`,
  },
  {
    id: "implementation-setup",
    title: "Implementation: 30+ Hours Well Spent",
    content: `**Initial Setup Time:**
• At least 30 hours total investment
• 10 hours on Teams calls with RosterLab's implementation expert Daniel Ge
• 20+ hours working independently on rules and configuration

**What the setup involved:**
• Translating complex rostering rules into the system
• Setting up patterns for night shifts, sleep days, and recovery time
• Configuring union contractual obligations (weekend frequency, pro-rata hours)
• Establishing fatigue management rules
• Creating individual arrangements for staff with special agreements

**Mike's Advice:**
"Put in as much time as you can possibly commit at the start. Get those rules right from the beginning. It'll save you tweaking time afterwards once you generate a roster."

**The Learning Curve:**
Initially, Mike spent time tweaking rosters after generation. However, as RosterLab's understanding of radiology rostering improved and they rolled it out to more departments, the process became significantly easier. Now, Mike barely has to do anything - the engineer handles most changes.`,
  },
  {
    id: "results-time-savings",
    title: "The Results: From 40 Hours to 4 Hours",
    content: `**Roster Generation:**
• **Before**: 40 hours per 12-week roster
• **After**: 4 hours total (40 minutes generation + 3 hours tweaking)
• **Time Saved**: 36 hours per roster × 4 rosters/year = **144 hours annually**

**Shift Swap Management:**
• **Before**: 5 minutes per swap × 425 swaps = 35 hours/year
• **After**: Automated through the app = **35 hours saved**

**Total Annual Savings: 179+ hours**

**What Changed:**
• One-click roster generation with AI optimization
• Staff can propose swaps directly through the app
• Auto-approval when swaps meet all rule requirements (being tested)
• No more handwritten forms or illegible notes
• No more searching for that floating swap sheet
• Calendar syncing means partners can subscribe to rosters

**Unexpected Benefits:**
• Scenario planning: Generated two complete rosters (with/without weekend expansion) while waiting for executive decision
• Service expansion: Used fake staff members to test different staffing combinations
• Better work-life balance: 150+ hours freed up for other projects and strategic work`,
  },
  {
    id: "operational-efficiency",
    title: "Operational Efficiency: One Source of Truth",
    content: `**Consolidated Systems:**
All the separate systems (Excel, OneDrive, wall planner, paper forms, handwritten boards) were replaced with a single platform accessible from anywhere.

**Multiple Views:**
• Personal app view for individual staff
• Shift view for clinical areas (set up on department computers)
• Admin overview showing entire department at once
• Machine/room availability calendar

**Communication Improvements:**
• Notes feature under every shift allocation
• Department-wide announcements
• Leave visibility for all staff
• No more conflicts or misunderstandings about start times
• Partner calendar syncing (rosters auto-populate to Gmail/Apple Calendar)

**Leave Management:**
• Staff can see how many people are already on leave before applying
• Real-time visibility prevents over-booking leave
• Automatic rule checking (e.g., max 3 people off at once)
• No need to physically check the office wall planner

**Equipment Scheduling:**
• All imaging systems tracked in RosterLab
• Preventative maintenance schedules visible
• Engineer bookings integrated into the system
• Better transparency across all units`,
  },
  {
    id: "staff-impact",
    title: "Staff Impact: Fairness, Flexibility & Satisfaction",
    content: `**Preference-Based Rostering:**
• Staff input preferences for future dates through the app
• AI balances service demands, skills, staffing, AND preferences
• **70-75% preference fulfillment rate** with current rules

**Improved Transparency:**
• Complete clarity on start times and shifts
• No more "my diary doesn't match the roster" problems
• One-click access from mobile devices
• Real-time updates when changes occur

**Shift Swapping Revolution:**
• Propose swaps directly in the app
• See who else is working that day
• System validates against all rules
• No manager intervention needed (with auto-approval)
• Removes managers from the equation when rules are met

**Better Work-Life Balance:**
• Partners can subscribe to staff rosters
• Easy calendar syncing
• Less time checking and double-checking schedules
• More advance notice and planning capability

**Compliance & Fairness:**
• Fatigue rules automatically enforced (sleep days after night shifts, minimum rest periods)
• Weekend duty rotation properly balanced
• Part-time pro-rata hours correctly calculated
• System alerts flag when manual changes violate rules (red/yellow/green flags)

The philosophy shift: From "you get what you're given" to "balanced preference optimization while meeting service demands."`,
  },
  {
    id: "advice-lessons-learned",
    title: "Key Advice & Lessons Learned",
    content: `**Mike's Top Advice:**
"If you're going to use RosterLab, put in as much time as you can possibly commit at the start. Get those rules right from the beginning. It'll save you tweaking time afterwards once you generate a roster. That's the biggest thing I can say. And then just enjoy all the other benefits that you get from it."

**What They Didn't Know They Were Missing:**
• At the time, they didn't realize what wasn't getting done
• Since implementing RosterLab, they've been able to tackle service expansions and numerous projects
• The freed-up time enabled strategic work that wasn't even considered before

**Critical Success Factors:**
• Strong initial time investment in rules setup
• Trust in the process and the technology
• Willingness to change established workflows
• Clear communication with staff about the change
• Working closely with RosterLab engineers during setup

**Scalability:**
From radiology, RosterLab has expanded to:
• Three wards at Whanganui Hospital
• Mental health teams
• Hospital schedulers (clerical teams)
• Multiple departments across different specialties

**The Reality Check:**
Mike is adamant: "If RosterLab disappeared, I'm not going back to Excel. I'm giving up rostering. I'm not doing it manually. No way."`,
  },
];

// Q&A sections from the live webinar
const qaSections: AccordionItem[] = [
  {
    id: "qa1",
    title: "How are teams actually using the product day-to-day?",
    content: `**Before Publishing:**
Staff think about what they need to do in the future and input their preferences into the app. The system achieves 70-75% preference fulfillment with the current rule setup.

**After Publishing:**
- Partners can subscribe to rosters, auto-populating their personal calendars (Gmail/Apple Calendar)
- Staff have one-click access via the mobile app
- Multiple viewing options: personal app view, shift view on department computers, admin overview
- Everything happens more efficiently with clear visibility across the team

The shift swapping is managed entirely through the app - staff can see who's working, propose swaps, and if both parties approve and no rules are violated, it updates automatically without manager involvement.`,
  },
  {
    id: "qa2",
    title: "Can you start with one group and expand to other teams?",
    content: `**Mike's Experience at Whanganui Hospital:**
Started with radiology, then expanded to:
- Three hospital wards
- Mental health teams
- Hospital schedulers (clerical teams)

The system works for different clinical teams as well as administrative teams. Each team can have completely different union rules, shift patterns, and requirements.

**Key Point:**
Union rules are described in natural language within the system. You can describe contract rules (e.g., "80 hours per two weeks"), fatigue rules, and make them shift-specific or team-specific. As long as you can describe it, the system can handle it.`,
  },
  {
    id: "qa3",
    title: "How long did it take to fully set up the rostering system?",
    content: `**Initial Setup:**
At least 30 hours of dedicated time:
- 10 hours on calls with RosterLab engineers
- 20+ hours working independently on configuration

**What Makes It Easier Now:**
When Mike started, RosterLab was still learning radiology rostering. Now they've implemented it across multiple radiology departments globally, so the process is much faster. Mike's advice: "I probably should have spent more time initially, but our service went through major changes anyway, so we ended up rebuilding the rules."

**Setup Complexity Varies:**
Some rosters are naturally easier to set up than others. It depends on the specialty and level of complexity in your rules and requirements.

**Mike's Recommendation:**
"Put in as much time as you can possibly commit at the start. Get those rules right from the beginning. It'll save you tweaking time afterwards."`,
  },
  {
    id: "qa4",
    title: "Does the system notify staff of available shifts?",
    content: `**Yes - Open Shift Distribution:**
When a shift gap is identified, managers can:
- Open the shift and distribute it to staff with the right skills
- Specify which staff should receive notifications (e.g., "CT staff but not opening/closing shift workers")
- Target notifications based on qualifications, availability, or other criteria

**If Staff Accept Then Change Their Mind:**
If someone accepts an open shift but later needs to reject it (due to life circumstances), they can reject it through the app. The shift automatically becomes available again for other eligible staff to pick up.

**Notifications:**
All eligible staff receive a notification ("Bing on their phone") when an open shift becomes available. They can see shift details and accept or decline directly through the app.`,
  },
  {
    id: "qa5",
    title: "How does the system help with leave planning?",
    content: `**For Staff:**
- See how many people are already on leave for any given day
- View a calendar showing leave numbers before applying
- Know the department rules (e.g., "max 3 people off at once before roster publishing")
- Plan leave more intelligently based on team availability
- No need to physically visit the office to check a wall planner

**For Managers:**
- Receive leave applications through the hospital's kiosk system
- Immediately check RosterLab to see who else has leave that period
- Approve or decline with full visibility of team coverage
- Mark the leave in RosterLab, which updates across all views instantly
- System validates leave against department rules

**Coming Soon:**
A leave planner in calendar view showing:
- Granular details of who's applying for what dates
- Clashing preferences or scheduled shifts
- FTE worth of approved leave per week
- Better planning tools for managers`,
  },
  {
    id: "qa6",
    title: "Can it integrate with payroll systems like UKG?",
    content: `**Current Status:**
RosterLab doesn't currently have a direct integration with UKG, but it's being actively explored.

**Workaround Available:**
You can export roster data from RosterLab and import it into UKG. This ensures all roster data is ready for payroll processing.

**Whanganui's Approach:**
They use manual time sheets where each staff member writes their own timesheet, gets manager approval, and it's automatically sent to payroll. This is separate from the rostering system.

**Note:** The export/import method provides a bridge until direct integration is available, ensuring roster swaps and final schedules flow to payroll systems.`,
  },
  {
    id: "qa7",
    title: "Has this been used for traveling staff across multiple locations?",
    content: `**Mike's Experience:**
Whanganui Hospital has two satellite radiology sites in rural areas, about two hours' drive away. They have fixed staff who work there, but when those staff are on leave, Whanganui staff travel to cover.

**How They Handle It:**
- Treat it like another room/location in the system
- Create shift types with different start times (e.g., "Taihape shift" with 10am start to account for 2-hour travel)
- Staff know that if rostered to that location, they start at the designated time
- No need to specify exact start times; staff understand the location-based timing

**Other Use Cases:**
RosterLab has been used for flying doctors who travel between multiple locations. The system can handle:
- Different locations with varying start times
- Travel time between sites
- Cross-location scheduling
- **Note:** Time zone differences aren't currently supported, but different locations with different shift times work well.`,
  },
  {
    id: "qa8",
    title: "What subscription model does RosterLab use?",
    content: `**Pricing Structure:**
- Cloud-based software hosted on AWS
- Subscription pricing available on the RosterLab website
- **Per staff on roster basis**: If you have 20 staff, it's [price] × 20 staff

**Why Per-Staff Pricing?**
As departments get bigger, the complexity increases significantly:
- More staff = more complex optimization problem for the AI
- More rules and interactions to consider
- Greater computational resources required
- The pricing reflects the added complexity

**ROI Consideration:**
At Whanganui, the cost of the subscription (including Mike's time to use it) was **one-third** of what they were spending on manual rostering time annually. The business case was straightforward and approved immediately.`,
  },
];

export default function WebinarDetailPage() {
  return (
    <SiteLayout>
      <div className="bg-gradient-to-b from-neutral-50 to-white py-16">
        <Container>
          {/* Hero Section */}
          <div className="max-w-4xl mx-auto mb-12">
            {/* Breadcrumb */}
            <div className="mb-6">
              <Link
                href="/webinars"
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                ← Back to Webinars
              </Link>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
              Building a Resilient Healthcare Workforce with AI Staff Rosters
            </h1>

            {/* Metadata */}
            <div className="flex flex-wrap gap-6 text-neutral-600 mb-8">
              <div className="flex items-center">
                <HiCalendar className="h-5 w-5 mr-2 text-primary-600" />
                <span>10th December 2025</span>
              </div>
              <div className="flex items-center">
                <HiClock className="h-5 w-5 mr-2 text-primary-600" />
                <span>60 minutes</span>
              </div>
              <div className="flex items-center">
                <HiUserGroup className="h-5 w-5 mr-2 text-primary-600" />
                <span>
                  Mike Peterson &{" "}
                  <Link
                    href="/authors/sunny-feng"
                    className="text-primary-600 hover:text-primary-700 hover:underline font-medium"
                  >
                    Sunny Feng
                  </Link>
                </span>
              </div>
            </div>

            {/* Video Embed */}
            <div className="relative w-full mb-12 rounded-lg overflow-hidden shadow-xl bg-neutral-900">
              <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src="https://www.youtube.com/embed/pR9cz62PXg8?si=ZgoU0pM7D5K6DgSK"
                  title="Building a Resilient Healthcare Workforce with AI Staff Rosters"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
            </div>

            {/* TLDR Summary */}
            <div className="bg-primary-50 border-l-4 border-primary-600 rounded-lg p-6 mb-12">
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                TL;DR Summary
              </h2>
              <p className="text-neutral-700 leading-relaxed mb-4">
                In this webinar, Mike Peterson (Associate Radiology Manager at
                Whanganui Hospital) discusses how automated AI scheduling
                transformed his department's workforce management alongside
                co-host Sunny Feng (Co-Founder of RosterLab).
              </p>
              <p className="text-neutral-700 leading-relaxed mb-4">
                <strong>Key takeaways:</strong>
              </p>
              <ul className="list-disc list-inside text-neutral-700 space-y-2">
                <li>
                  Reduced scheduling time from 40 hours to 4 hours per 12-week
                  roster (90% time savings)
                </li>
                <li>Saved 35 hours annually on shift swap management alone</li>
                <li>
                  Eliminated manual processes including Excel spreadsheets,
                  paper diaries, and wall planners
                </li>
                <li>
                  Improved staff satisfaction through transparent scheduling and
                  preference-based rostering
                </li>
                <li>
                  Consolidated multiple systems into one source of truth with
                  mobile access
                </li>
              </ul>
            </div>

            {/* Transcript Section */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-neutral-900 mb-6">
                Full Transcript
              </h2>
              <Accordion items={transcriptSections} />
            </div>

            {/* Q&A Section */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-neutral-900 mb-6">
                Questions & Answers
              </h2>
              <Accordion items={qaSections} />
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-8 md:p-12 text-center text-white shadow-xl">
              <h2 className="text-3xl font-bold mb-4">
                Ready to See RosterLab in Action?
              </h2>
              <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
                Book a discovery call with our team to learn how AI-powered
                workforce management can transform your healthcare operations
                and save you hundreds of hours.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/book-a-demo"
                  className="inline-block bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-neutral-50 transition-colors shadow-lg"
                >
                  Book a Discovery Call
                </Link>
                <Link
                  href="/contact"
                  className="inline-block bg-primary-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-800 transition-colors border border-white/20"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </SiteLayout>
  );
}
