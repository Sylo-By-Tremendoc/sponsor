import type { Conversation } from "@/types/message";

const now = (mins = 0) => new Date(Date.now() - mins * 60 * 1000).toISOString();

export const mockConversations: Conversation[] = [
  {
    id: "1",
    name: "Dr. William Benz",
    email: "williams.benz@gmail.com",
    avatarColor: "bg-green-400",
    unread: 2,
    lastMessage: "Please keep me updated",
    messages: [
      { id: "m1", fromMe: false, text: "Hello support", createdAt: now(60) },
      {
        id: "m2",
        fromMe: false,
        text: "Please I've been having issues with my account lately...",
        createdAt: now(55),
      },
      {
        id: "m3",
        fromMe: true,
        text: "Hi there, good evening, please what can I help you with?",
        createdAt: now(50),
      },
    ],
  },
  {
    id: "2",
    name: "Dr. Yung Smith",
    email: "yung.smith@clinic.com",
    avatarColor: "bg-purple-400",
    unread: 0,
    lastMessage: "Thanks doctor",
    messages: [
      { id: "m4", fromMe: false, text: "Thanks doctor", createdAt: now(120) },
      { id: "m5", fromMe: true, text: "You're welcome!", createdAt: now(115) },
    ],
  },
  {
    id: "3",
    name: "Prof. Dr. Samuel Elija",
    email: "samuel.elija@hospital.com",
    avatarColor: "bg-yellow-400",
    unread: 1,
    lastMessage: "My account keeps logging me out",
    messages: [
      {
        id: "m6",
        fromMe: false,
        text: "My account keeps logging me out",
        createdAt: now(500),
      },
    ],
  },
  {
    id: "4",
    name: "Dr. Angela Martins",
    email: "angela.martins@cityhospital.org",
    avatarColor: "bg-blue-400",
    unread: 3,
    lastMessage: "Need urgent feedback",
    messages: [
      {
        id: "m7",
        fromMe: false,
        text: "Good afternoon, I tried accessing my dashboard for the lab results but it keeps loading indefinitely.",
        createdAt: now(10),
      },
      {
        id: "m8",
        fromMe: false,
        text: "I urgently need those results to complete my patient reports for today. Please what is happening?",
        createdAt: now(8),
      },
      {
        id: "m9",
        fromMe: true,
        text: "Hi Dr. Angela, I'm checking it now. Please hold on.",
        createdAt: now(5),
      },
    ],
  },

  {
    id: "5",
    name: "Dr. Kelvin Chukwu",
    email: "kelvin.chukwu@teachinghospital.ng",
    avatarColor: "bg-red-400",
    unread: 0,
    lastMessage: "Alright thanks",
    messages: [
      {
        id: "m10",
        fromMe: false,
        text: "Is there a limit to how many patient files I can upload at once?",
        createdAt: now(300),
      },
      {
        id: "m11",
        fromMe: true,
        text: "Not at all! You can upload as many as needed.",
        createdAt: now(295),
      },
      { id: "m12", fromMe: false, text: "Alright thanks", createdAt: now(290) },
    ],
  },

  {
    id: "6",
    name: "Nurse Clara Benson",
    email: "clara.benson@nursesunited.com",
    avatarColor: "bg-pink-400",
    unread: 1,
    lastMessage: "Everything crashes when I click save",
    messages: [
      {
        id: "m13",
        fromMe: false,
        text: "Everything crashes when I click save. I tried three times now. The form closes and I lose all entries.",
        createdAt: now(30),
      },
    ],
  },

  {
    id: "7",
    name: "Dr. Miriam Okocha",
    email: "miriam.okocha@federalmedical.ng",
    avatarColor: "bg-rose-400",
    unread: 4,
    lastMessage: "Please keep me updated",
    messages: [
      {
        id: "m100",
        fromMe: false,
        text: "Good morning. Please I'm having a very serious issue with the patient record system.",
        createdAt: now(210),
      },
      {
        id: "m101",
        fromMe: false,
        text: "Any time I create a new patient file, the system shows 'Saved successfully', but when I refresh, the record disappears completely.",
        createdAt: now(208),
      },
      {
        id: "m102",
        fromMe: false,
        text: "I have tested this with 6 different entries already today and all of them vanish immediately after refreshing.",
        createdAt: now(207),
      },
      {
        id: "m103",
        fromMe: true,
        text: "Good morning Dr. Miriam. I understand how frustrating that can be. Let me help you check this.",
        createdAt: now(204),
      },
      {
        id: "m104",
        fromMe: false,
        text: "Thank you. Also please note that this is affecting two of my colleagues as well, so it might be a widespread system issue.",
        createdAt: now(200),
      },
      {
        id: "m105",
        fromMe: true,
        text: "Understood. Can you confirm if you are on the latest app version?",
        createdAt: now(195),
      },
      {
        id: "m106",
        fromMe: false,
        text: "Yes I updated this morning. Version 4.2.1.",
        createdAt: now(192),
      },
      {
        id: "m107",
        fromMe: false,
        text: "Let me explain exactly what happens step by step so you can trace the problem.",
        createdAt: now(190),
      },
      {
        id: "m108",
        fromMe: false,
        text: "1. I click 'New Patient'.\n2. Fill all fields.\n3. Click save.\n4. System displays the green success banner.\n5. The moment I switch tabs or refresh, the record disappears.",
        createdAt: now(189),
      },
      {
        id: "m109",
        fromMe: true,
        text: "Thank you, this breakdown helps a lot.",
        createdAt: now(185),
      },
      {
        id: "m110",
        fromMe: false,
        text: "Also, I tried exporting the records to CSV, and the new entries do not appear there either.",
        createdAt: now(182),
      },
      {
        id: "m111",
        fromMe: true,
        text: "Okay. That means it’s not a caching issue — the save is failing silently. I’m escalating this immediately.",
        createdAt: now(180),
      },
      {
        id: "m112",
        fromMe: false,
        text: "Please do. We have several patients waiting to be attended to and I cannot proceed without proper documentation.",
        createdAt: now(178),
      },
      {
        id: "m113",
        fromMe: true,
        text: "We are on it. Please hold on while engineering checks the backend logs.",
        createdAt: now(175),
      },
      {
        id: "m114",
        fromMe: false,
        text: "Alright, thank you. Please keep me updated.",
        createdAt: now(172),
      },
    ],
  },

  {
    id: "8",
    name: "Dr. Olivia Hernandez",
    email: "olivia.hernandez@southridgeclinic.com",
    avatarColor: "bg-teal-400",
    unread: 5,
    lastMessage: "I wrote a full breakdown below",
    messages: [
      {
        id: "m15",
        fromMe: false,
        text: "Good morning. I noticed that after the most recent update, every time I try uploading an MRI scan, it gives a corrupted file error. I've attempted with different machines and even different browsers, and it still persists.",
        createdAt: now(18),
      },
      {
        id: "m16",
        fromMe: false,
        text: "I wrote a full breakdown below:\n1. Upload works on mobile app but fails on desktop.\n2. Same file uploads correctly to Google Drive, so it's not corrupted.\n3. Issue started after the latest system update.\n4. Affecting 4 other doctors in my department as well.",
        createdAt: now(15),
      },
    ],
  },

  {
    id: "9",
    name: "Dr. Patrick Mensah",
    email: "pmensah@accrahealth.org",
    avatarColor: "bg-amber-500",
    unread: 1,
    lastMessage: "That's exactly the issue",
    messages: [
      {
        id: "m200",
        fromMe: false,
        text: "Hello support, I need urgent assistance.",
        createdAt: now(400),
      },
      {
        id: "m201",
        fromMe: false,
        text: "I keep receiving an 'Unauthorized Access' error every time I try to approve lab results.",
        createdAt: now(398),
      },
      {
        id: "m202",
        fromMe: false,
        text: "This began right after I changed my password last night.",
        createdAt: now(397),
      },
      {
        id: "m203",
        fromMe: true,
        text: "Hello Doctor, I'm here to help. Do you still have access to the dashboard?",
        createdAt: now(395),
      },
      {
        id: "m204",
        fromMe: false,
        text: "Yes, I can open everything else, including patient lists and appointment schedules.",
        createdAt: now(394),
      },
      {
        id: "m205",
        fromMe: false,
        text: "But whenever I click 'Approve Result', the pop-up loads for a second then shows the error message.",
        createdAt: now(392),
      },
      {
        id: "m206",
        fromMe: true,
        text: "Understood. This sounds like a permissions sync issue.",
        createdAt: now(390),
      },
      {
        id: "m207",
        fromMe: false,
        text: "Exactly. And it's not just me — my resident doctor also experienced the same error this morning.",
        createdAt: now(388),
      },
      {
        id: "m208",
        fromMe: false,
        text: "Let me know if screenshots will help.",
        createdAt: now(387),
      },
      {
        id: "m209",
        fromMe: true,
        text: "Yes please, a screenshot will be helpful.",
        createdAt: now(385),
      },
      {
        id: "m210",
        fromMe: false,
        attachment: {
          name: "error_screenshot.png",
          size: 142000,
          type: "image/png",
        },
        createdAt: now(382),
      },
      {
        id: "m211",
        fromMe: true,
        text: "Thank you, I see the issue clearly.",
        createdAt: now(380),
      },
      {
        id: "m212",
        fromMe: false,
        text: "That's exactly the issue",
        createdAt: now(379),
      },
    ],
  },
  {
    id: "10",
    name: "Dr. Sophia Lee",
    email: "sophia.lee@globalhospital.com",
    avatarColor: "bg-cyan-500",
    unread: 2,
    lastMessage: "Sending now...",
    messages: [
      {
        id: "m20",
        fromMe: false,
        text: "Hi team, I need to send a very large video file of a surgery procedure for review. What’s the best way to upload this without compression?",
        createdAt: now(3),
      },
      {
        id: "m21",
        fromMe: false,
        text: "Sending now...",
        createdAt: now(2),
      },
    ],
  },

  {
    id: "11",
    name: "Dr. Veronica James",
    email: "vjames@lakesideclinic.com",
    avatarColor: "bg-green-500",
    unread: 2,
    lastMessage: "I appreciate the quick response",
    messages: [
      {
        id: "m300",
        fromMe: false,
        text: "Hi team, I'm reporting a recurring issue with the vitals update panel.",
        createdAt: now(120),
      },
      {
        id: "m301",
        fromMe: false,
        text: "Whenever I enter new vitals manually, the system reverts to the old values after 3–5 seconds.",
        createdAt: now(118),
      },
      {
        id: "m302",
        fromMe: false,
        text: "This happens both in Chrome and Firefox, and I have already cleared my cache.",
        createdAt: now(117),
      },
      {
        id: "m303",
        fromMe: false,
        text: "Here is a full description:\n\nIt looks like the system is fetching old vitals from the server AFTER I manually update them, overriding the new data. This makes it impossible to track real-time changes during ward rounds.",
        createdAt: now(116),
      },
      {
        id: "m304",
        fromMe: true,
        text: "Hi Dr. Veronica, thank you for the detailed report. This is serious — vitals cannot be overwritten incorrectly.",
        createdAt: now(114),
      },
      {
        id: "m305",
        fromMe: false,
        text: "Exactly. Yesterday, blood pressure auto-updated to a value from THREE hours earlier.",
        createdAt: now(112),
      },
      {
        id: "m306",
        fromMe: false,
        text: "This could lead to dangerous clinical decisions.",
        createdAt: now(110),
      },
      {
        id: "m307",
        fromMe: true,
        text: "I'm forwarding this to engineering now. We need to check the syncing logic urgently.",
        createdAt: now(108),
      },
      {
        id: "m308",
        fromMe: false,
        text: "Thank you. Please let me know when the fix is deployed.",
        createdAt: now(104),
      },
      {
        id: "m309",
        fromMe: false,
        text: "If possible, I can provide console logs from my browser.",
        createdAt: now(102),
      },
      {
        id: "m310",
        fromMe: true,
        text: "Yes please, share them here.",
        createdAt: now(100),
      },
      {
        id: "m311",
        fromMe: false,
        text: "Here are the logs:\n\n- GET /vitals returns outdated values\n- POST /vitals/update returns success\n- But system immediately triggers another GET which overwrites local state",
        createdAt: now(98),
      },
      {
        id: "m312",
        fromMe: true,
        text: "Perfect. That confirms it.",
        createdAt: now(95),
      },
      {
        id: "m313",
        fromMe: false,
        text: "I appreciate the quick response.",
        createdAt: now(93),
      },
    ],
  },
];

export const mockBeneficiaries = [
  {
    id: "01BN001",
    name: "Charles Omiwole",
    phone: "+2347067421332",
    email: "charles.omiwole@gmail.com",
  },
  {
    id: "01BN002",
    name: "Lina Kabenski",
    phone: "+2347012345678",
    email: "lina.kabenski@example.com",
  },
  {
    id: "01BN003",
    name: "John Doe",
    phone: "+2348012345678",
    email: "john.doe@example.com",
  },
  {
    id: "01BN004",
    name: "Jane Smith",
    phone: "+2348023456789",
    email: "jane.smith@example.com",
  },
  {
    id: "01BN005",
    name: "Mary Johnson",
    phone: "+2348034567890",
    email: "mary.johnson@example.com",
  },
];
