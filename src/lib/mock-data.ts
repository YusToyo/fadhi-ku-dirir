export interface Debater {
  name: string;
  title: string;
  avatar: string;
  pollPercentage: number;
}

export interface Debate {
  id: string;
  topic: string;
  topicEn: string;
  category: string;
  debaters: [Debater, Debater];
  date: string;
  time: string;
  isLive: boolean;
  viewers: number;
  comments: Comment[];
  winner?: string;
  viewCount?: number;
  thumbnail?: string;
}

export interface Comment {
  id: string;
  user: string;
  text: string;
  time: string;
}

export const liveDebate: Debate = {
  id: "live-1",
  topic: "Ma Soomaaliya waxay u baahan tahay madaxweyne cusub?",
  topicEn: "Does Somalia need a new president?",
  category: "Siyaasad",
  debaters: [
    {
      name: "Cabdirashiid Xasan",
      title: "Falanqeeye Siyaasadeed",
      avatar: "CX",
      pollPercentage: 58,
    },
    {
      name: "Faadumo Cilmi",
      title: "Xoghayihii Hore",
      avatar: "FC",
      pollPercentage: 42,
    },
  ],
  date: "2026-03-30",
  time: "20:00",
  isLive: true,
  viewers: 12847,
  comments: [
    { id: "1", user: "Axmed_M", text: "Cabdirashiid si fiican ayuu uga hadlay mawduuca!", time: "2 daqiiqo" },
    { id: "2", user: "Hodan_S", text: "Faadumo xujjadeedu way xooggan tahay, dood adagna way soo bandhigtay!", time: "1 daqiiqo" },
    { id: "3", user: "Maxamed_C", text: "Mawduucan aad ayuu muhiim u yahay!", time: "45 ilbiriqsi" },
    { id: "4", user: "Sahra_N", text: "Dadka Soomaaliyeed waxay u baahan yihiin isbeddel dhab ah!", time: "30 ilbiriqsi" },
    { id: "5", user: "Cabdi_Y", text: "Dooddani waa mid aad u xiiso badan!", time: "15 ilbiriqsi" },
    { id: "6", user: "Amina_H", text: "Labaduba si fiican ayay uga hadlayaan doodda!", time: "5 ilbiriqsi" },
  ],
};

export const upcomingDebates: Debate[] = [
  {
    id: "upcoming-1",
    topic: "Waxbarashada Soomaaliya ma waxay ku filan tahay mustaqbalka dalka?",
    topicEn: "Is Somalia's education system sufficient for the future?",
    category: "Waxbarasho",
    debaters: [
      { name: "Nimco Daahir", title: "Macallimad & Aqoon Yahan Waxbarasho", avatar: "ND", pollPercentage: 0 },
      { name: "Yuusuf Cali", title: "Agaasimaha Hay'ad Waxbarasho", avatar: "YC", pollPercentage: 0 },
    ],
    date: "2026-04-02",
    time: "20:00",
    isLive: false,
    viewers: 0,
    comments: [],
  },
  {
    id: "upcoming-2",
    topic: "Dhaqaalaha dhijitaalka ah - fursad mise khatar ayuu u yahay Soomaaliya?",
    topicEn: "Digital economy - opportunity or threat?",
    category: "Dhaqaale",
    debaters: [
      { name: "Saciid Maxamed", title: "Ganacsade Teknooloji ah", avatar: "SM", pollPercentage: 0 },
      { name: "Halimo Warsame", title: "Khabiir Dhaqaale", avatar: "HW", pollPercentage: 0 },
    ],
    date: "2026-04-05",
    time: "19:00",
    isLive: false,
    viewers: 0,
    comments: [],
  },
  {
    id: "upcoming-3",
    topic: "Doorka haweenka ee hoggaaminta Soomaaliya: Maxaa la filan karaa?",
    topicEn: "The role of women in Somali leadership",
    category: "Bulshada",
    debaters: [
      { name: "Aamina Cabdi", title: "Xildhibaan Hore", avatar: "AC", pollPercentage: 0 },
      { name: "Maxamuud Faarax", title: "Bare Jaamacadeed", avatar: "MF", pollPercentage: 0 },
    ],
    date: "2026-04-08",
    time: "20:00",
    isLive: false,
    viewers: 0,
    comments: [],
  },
];

export const archivedDebates: Debate[] = [
  {
    id: "archive-1",
    topic: "Federaalismka Soomaaliya - ma shaqaynayaa mise waa caqabad?",
    topicEn: "Is Somalia's federalism working?",
    category: "Siyaasad",
    debaters: [
      { name: "Xasan Nuur", title: "Khabiir Dastuuriga", avatar: "XN", pollPercentage: 62 },
      { name: "Maryan Jaamac", title: "Siyaasi", avatar: "MJ", pollPercentage: 38 },
    ],
    date: "2026-03-25",
    time: "20:00",
    isLive: false,
    viewers: 0,
    viewCount: 45200,
    winner: "Xasan Nuur",
    comments: [],
  },
  {
    id: "archive-2",
    topic: "Caafimaadka maskaxda - miyaan ka aamusnaanaa weli?",
    topicEn: "Mental health - should we stop the silence?",
    category: "Caafimaad",
    debaters: [
      { name: "Dr. Sahra Yuusuf", title: "Dhakhtar Maskaxda", avatar: "SY", pollPercentage: 71 },
      { name: "Sheekh Cabdilaahi", title: "Culimaa", avatar: "SC", pollPercentage: 29 },
    ],
    date: "2026-03-20",
    time: "20:00",
    isLive: false,
    viewers: 0,
    viewCount: 67800,
    winner: "Dr. Sahra Yuusuf",
    comments: [],
  },
  {
    id: "archive-3",
    topic: "Qurbajoogta - ma waxay wax ka beddelayaan Soomaaliya mise...?",
    topicEn: "Diaspora - are they changing Somalia?",
    category: "Bulshada",
    debaters: [
      { name: "Cabdullaahi Xirsi", title: "Qurbajoog Dhaqdhaqaaqe ah", avatar: "CX", pollPercentage: 55 },
      { name: "Khadiija Noor", title: "Suxufi", avatar: "KN", pollPercentage: 45 },
    ],
    date: "2026-03-15",
    time: "19:00",
    isLive: false,
    viewers: 0,
    viewCount: 38400,
    winner: "Cabdullaahi Xirsi",
    comments: [],
  },
  {
    id: "archive-4",
    topic: "Al-Shabaab - sidee lagu xallin karaa dhibaatada?",
    topicEn: "Al-Shabaab - what is the solution?",
    category: "Amniga",
    debaters: [
      { name: "Jeneraal Cali Roble", title: "Taliye Hore", avatar: "CR", pollPercentage: 64 },
      { name: "Prof. Zamzam Axmed", title: "Khabiir Amni", avatar: "ZA", pollPercentage: 36 },
    ],
    date: "2026-03-10",
    time: "20:00",
    isLive: false,
    viewers: 0,
    viewCount: 89300,
    winner: "Jeneraal Cali Roble",
    comments: [],
  },
  {
    id: "archive-5",
    topic: "Biyaha badda Soomaaliya - yaa iska leh, muxuuna xaq u leeyahay?",
    topicEn: "Somalia's sea waters - who owns them?",
    category: "Sharciga",
    debaters: [
      { name: "Qaali Maxamed", title: "Qareen Caalami ah", avatar: "QM", pollPercentage: 59 },
      { name: "Ismaaciil Cumar", title: "Khabiir Arrimaha Badda", avatar: "IC", pollPercentage: 41 },
    ],
    date: "2026-03-05",
    time: "20:00",
    isLive: false,
    viewers: 0,
    viewCount: 52100,
    winner: "Qaali Maxamed",
    comments: [],
  },
  {
    id: "archive-6",
    topic: "Beeraha iyo xoolaha - ma mustaqbalka dhaqaalaha ayay saldhig u yihiin?",
    topicEn: "Agriculture and livestock - the economic future",
    category: "Dhaqaale",
    debaters: [
      { name: "Eng. Xaliimo Aden", title: "Khabiir Beeraha", avatar: "XA", pollPercentage: 48 },
      { name: "Cusmaan Diiriye", title: "Xoolo Dhaqato", avatar: "CD", pollPercentage: 52 },
    ],
    date: "2026-02-28",
    time: "19:00",
    isLive: false,
    viewers: 0,
    viewCount: 31200,
    winner: "Cusmaan Diiriye",
    comments: [],
  },
];

export const communityPollTopics = [
  { id: "1", topic: "Lacagta shilinka Soomaaliga - ma la beddeli karaa, maxaase lagu beddeli karaa?", topicEn: "Can the Somali shilling be reformed?", votes: 2340, percentage: 38 },
  { id: "2", topic: "Ciyaaraha iyo dhallinyarada Soomaaliyeed - maxaa u qabsoomay, maxaana loo qaban karaa?", topicEn: "Sports and Somali youth", votes: 1890, percentage: 31 },
  { id: "3", topic: "Deegaanka iyo isbeddelka cimilada - sidee looga hortagi karaa saameynta?", topicEn: "Environment and climate change", votes: 1200, percentage: 19 },
  { id: "4", topic: "Midowga Afrika - ma faa'iido ayuu u leeyahay Soomaaliya mise khasaare?", topicEn: "African Union - beneficial or harmful?", votes: 750, percentage: 12 },
];

export const categories = [
  "Dhammaan",
  "Siyaasad",
  "Dhaqaale",
  "Bulshada",
  "Caafimaad",
  "Waxbarasho",
  "Amniga",
  "Sharciga",
];
