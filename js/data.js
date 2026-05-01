// ─────────────────────────────────────────────────────────────────────────────
//  data.js  –  Вэбсайтын бүх статик өгөгдөл
// ─────────────────────────────────────────────────────────────────────────────

const UNIVERSITIES = [
  {
    id: 'mit',
    logo: 'MIT',
    name: 'Массачусетсын Технологийн Институт',
    nameEn: 'Massachusetts Institute of Technology',
    location: 'Кембриж, МА, АНУ',
    region: 'usa',
    type: 'Хувийн',
    rank: 1,
    rankLabel: 'ДЭЛХИЙД #1',
    image: '../uni_images/mit.jpg',
    tuition: '$57,986/жил',
    tuitionUSD: 57986,
    tuitionCategory: 'very-high',
    deadline: '2026.01.01',
    deadlineLabel: '2026 оны 1-р сарын 1',
    tags: ['STEM', 'Судалгаа'],
    hasScholarship: true,
    programs: ['engineering', 'computer-science', 'mathematics', 'economics'],
    programLabels: ['Инженерчлэл', 'Компьютерийн ухаан', 'Физик', 'Математик', 'Эдийн засаг'],
    acceptanceRate: '3.9%',
    requirements: ['SAT 1500+', 'TOEFL 90+', 'GPA 3.9+', '2 Тодорхойлох захидал'],
    website: 'https://mit.edu'
  },
  {
    id: 'oxford',
    logo: 'Oxford',
    name: 'Оксфордын Их Сургууль',
    nameEn: 'University of Oxford',
    location: 'Оксфорд, Их Британи',
    region: 'uk',
    type: 'Улсын',
    rank: 2,
    rankLabel: 'ДЭЛХИЙД #2',
    image: '../uni_images/oxford.jpg',
    tuition: '£26,770/жил',
    tuitionUSD: 33800,
    tuitionCategory: 'high',
    deadline: '2025.10.15',
    deadlineLabel: '2025 оны 10-р сарын 15',
    tags: ['Судалгаа', 'Хүмүүнлэг'],
    hasScholarship: false,
    programs: ['law', 'arts-humanities', 'natural-sciences'],
    programLabels: ['Хүмүүнлэг', 'Байгалийн шинжлэх ухаан', 'Хууль эрх зүй', 'Анагаах ухаан'],
    acceptanceRate: '17%',
    requirements: ['IELTS 7.0+', 'A-levels AAA', 'Ярилцлага', '2 Зөвлөмжийн захидал'],
    website: 'https://ox.ac.uk'
  },
  {
    id: 'eth',
    logo: 'ETH',
    name: 'Цюрихийн Техникийн Их Сургууль',
    nameEn: 'ETH Zurich',
    location: 'Цюрих, Швейцарь',
    region: 'europe',
    type: 'Улсын',
    rank: 7,
    rankLabel: 'ДЭЛХИЙД #7',
    image: '../uni_images/eth.jpg',
    tuition: 'CHF 730/жил',
    tuitionUSD: 810,
    tuitionCategory: 'low',
    deadline: '2025.12.15',
    deadlineLabel: '2025 оны 12-р сарын 15',
    tags: ['STEM', 'Хямд төлбөр'],
    hasScholarship: false,
    programs: ['engineering', 'computer-science', 'natural-sciences', 'mathematics'],
    programLabels: ['Инженерчлэл', 'Компьютерийн шинжлэх ухаан', 'Байгалийн шинжлэх ухаан', 'Математик'],
    acceptanceRate: '27%',
    requirements: ['TOEFL 95+ / IELTS 7.0+', 'Бакалаврын диплом', 'GPA 5.0/6.0'],
    website: 'https://ethz.ch'
  },
  {
    id: 'nus',
    logo: 'NUS',
    name: 'Сингапурын Үндэсний Их Сургууль',
    nameEn: 'National University of Singapore',
    location: 'Сингапур',
    region: 'asia',
    type: 'Улсын',
    rank: 8,
    rankLabel: 'ДЭЛХИЙД #8',
    image: '../uni_images/nus.jpg',
    tuition: 'SGD 17,550/жил',
    tuitionUSD: 13000,
    tuitionCategory: 'mid',
    deadline: '2026.03.01',
    deadlineLabel: '2026 оны 3-р сарын 1',
    tags: ['Ази', 'Бизнес'],
    hasScholarship: false,
    programs: ['business', 'engineering', 'computer-science'],
    programLabels: ['Бизнес', 'Инженерчлэл', 'Компьютерийн шинжлэх ухаан', 'Нийгмийн шинжлэх ухаан'],
    acceptanceRate: '18%',
    requirements: ['IELTS 6.5+', 'SAT 1400+ / A-levels', 'Зөвлөмжийн захидал'],
    website: 'https://nus.edu.sg'
  },
  {
    id: 'pku',
    logo: 'PKU',
    name: 'Бээжингийн Их Сургууль',
    nameEn: 'Peking University',
    location: 'Бээжин, Хятад',
    region: 'china',
    type: 'Улсын',
    rank: 17,
    rankLabel: 'ДЭЛХИЙД #17',
    image: '../uni_images/pku.jpg',
    tuition: '¥26,000/жил',
    tuitionUSD: 3600,
    tuitionCategory: 'low',
    deadline: '2026.04.30',
    deadlineLabel: '2026 оны 4-р сарын 30',
    tags: ['Ази', 'Судалгаа'],
    hasScholarship: false,
    programs: ['natural-sciences', 'economics', 'arts-humanities'],
    programLabels: ['Байгалийн шинжлэх ухаан', 'Эдийн засаг', 'Хүмүүнлэг', 'Хятад хэл'],
    acceptanceRate: '16%',
    requirements: ['HSK 5+', 'Аттестат / Диплом', 'Урам зоригийн захидал'],
    website: 'https://english.pku.edu.cn'
  },
  {
    id: 'utokyo',
    logo: 'UT',
    name: 'Токиогийн Их Сургууль',
    nameEn: 'University of Tokyo',
    location: 'Токио, Япон',
    region: 'japan',
    type: 'Улсын',
    rank: 28,
    rankLabel: 'ДЭЛХИЙД #28',
    image: '../uni_images/pku.jpg',
    tuition: '¥535,800/жил',
    tuitionUSD: 3700,
    tuitionCategory: 'low',
    deadline: '2026.02.28',
    deadlineLabel: '2026 оны 2-р сарын 28',
    tags: ['STEM', 'Судалгаа'],
    hasScholarship: false,
    programs: ['engineering', 'natural-sciences', 'mathematics', 'computer-science'],
    programLabels: ['Инженерчлэл', 'Байгалийн шинжлэх ухаан', 'Математик', 'Компьютерийн ухаан'],
    acceptanceRate: '34%',
    requirements: ['JLPT N2+ / IELTS 6.5+', 'MEXT тэтгэлэг / Суурин бичиг', 'Судалгааны санал'],
    website: 'https://u-tokyo.ac.jp/en'
  },
  {
    id: 'kaist',
    logo: 'KAIST',
    name: 'Кореа Дэвшилтэт Шинжлэх Ухааны Хүрээлэн',
    nameEn: 'Korea Advanced Institute of Science and Technology',
    location: 'Даежон, Өмнөд Солонгос',
    region: 'korea',
    type: 'Улсын',
    rank: 47,
    rankLabel: 'ДЭЛХИЙД #47',
    image: '../uni_images/kaist.jpg',
    tuition: '$0/жил',
    tuitionUSD: 0,
    tuitionCategory: 'free',
    deadline: '2026.01.15',
    deadlineLabel: '2026 оны 1-р сарын 15',
    tags: ['STEM', 'Тэтгэлэгт'],
    hasScholarship: true,
    programs: ['engineering', 'computer-science', 'mathematics', 'natural-sciences'],
    programLabels: ['Инженерчлэл', 'Компьютерийн ухаан', 'Физик', 'Биологи'],
    acceptanceRate: '28%',
    requirements: ['TOEFL 83+ / IELTS 6.5+', 'GPA 3.0/4.5+', 'Судалгааны санал'],
    website: 'https://kaist.ac.kr/en'
  },
  {
    id: 'umelbourne',
    logo: 'UoM',
    name: 'Мельбурны Их Сургууль',
    nameEn: 'University of Melbourne',
    location: 'Мельбурн, Австрали',
    region: 'australia',
    type: 'Улсын',
    rank: 33,
    rankLabel: 'ДЭЛХИЙД #33',
    image: '../uni_images/umelbourne.jpg',
    tuition: 'AUD 43,000/жил',
    tuitionUSD: 28000,
    tuitionCategory: 'high',
    deadline: '2025.11.30',
    deadlineLabel: '2025 оны 11-р сарын 30',
    tags: ['Судалгаа', 'Бизнес'],
    hasScholarship: true,
    programs: ['business', 'law', 'arts-humanities', 'natural-sciences'],
    programLabels: ['Бизнес', 'Хууль', 'Урлаг', 'Байгалийн шинжлэх ухаан'],
    acceptanceRate: '35%',
    requirements: ['IELTS 6.5+', 'Аттестат GPA 85%+', 'Өргөдлийн захидал'],
    website: 'https://unimelb.edu.au'
  }
];

// ─────────────────────────────────────────────────────────────────────────────

const SCHOLARSHIPS = [
  {
    id: 'gates-cambridge',
    logo: 'UoC',
    name: 'Гейтс Кембрижийн Тэтгэлэг',
    provider: 'Кембрижийн Их Сургууль',
    country: 'uk',
    funding: 'full',
    fundingLabel: 'БҮТЭН САНХҮҮЖИЛТ',
    fundingType: 'Бүтэн Тэтгэлэг',
    level: 'Магистр, Доктор',
    deadline: '2025 оны 10-р сар 12',
    amount: 'Бүрэн санхүүжилт',
    description: 'Gates Cambridge Scholarship нь дэлхийн аль ч оронд суурьших оюутнуудад Кембрижид магистр, докторын зэрэг олгох боломжийг бүтэн санхүүжилтээр дэмждэг олон улсын өрсөлдөөнт тэтгэлэг.',
    requirements: [
      'Академик амжилт өндөр (GPA 3.5+)',
      'Манлайлах чадварын нотолгоо',
      'Нийгэмд хувь нэмэр оруулах хүсэл',
      'IELTS 7.5+ / TOEFL 110+'
    ],
    covers: ['Сургалтын төлбөр', 'Амьжиргааны зардал', 'Тэтгэмж', 'Онгоцны тийз'],
    tags: ['Бүтэн санхүүжилт', 'Магистр, Доктор'],
    applyLink: 'https://www.gatescambridge.org'
  },
  {
    id: 'mext',
    logo: 'MEXT',
    name: 'MEXT Тэтгэлэг',
    provider: 'Японы Засгийн Газрын Тэтгэлэг',
    country: 'japan',
    funding: 'full',
    fundingLabel: 'БҮТЭН САНХҮҮЖИЛТ',
    fundingType: 'Бүтэн Тэтгэлэг',
    level: 'Бакалавр',
    deadline: '2025 оны 6-р сар 15',
    amount: 'Бүрэн санхүүжилт',
    description: 'Японы Боловсрол, соёл, спорт, шинжлэх ухааны яамнаас олгодог MEXT тэтгэлэг нь Япон дахь их сургуульд суралцах хүсэлтэй гадаадын оюутнуудад зориулсан Японы засгийн газрын хөтөлбөр.',
    requirements: [
      '17–25 насны',
      'Дундаж оноо 3.0/4.0+',
      'JLPT N2 эсвэл Японоор заах сургуульд суралцах',
      'Эрүүл мэндийн шалгалт'
    ],
    covers: ['Сургалтын төлбөр', 'Тэтгэмж (¥117,000/сар)', 'Онгоцны тийз', 'Хэлний сургалт'],
    tags: ['Бүтэн санхүүжилт', 'Бакалавр'],
    applyLink: 'https://www.studyinjapan.go.jp'
  },
  {
    id: 'chevening',
    logo: 'FCO',
    name: 'Chevening Тэтгэлэг',
    provider: 'Их Британийн Засгийн Газар',
    country: 'uk',
    funding: 'full',
    fundingLabel: 'БҮТЭН САНХҮҮЖИЛТ',
    fundingType: 'Бүтэн Тэтгэлэг',
    level: 'Магистр',
    deadline: '2025 оны 11-р сар 5',
    amount: 'Бүрэн санхүүжилт',
    description: 'Chevening нь Их Британийн засгийн газрын олон улсын тэтгэлгийн хөтөлбөр бөгөөд ирээдүйн дэлхийн удирдагчид болох боломжтой, манлайлах чадвар бүхий хүмүүст Британийн аль ч их сургуульд магистрын зэрэг эзэмших боломж олгодог.',
    requirements: [
      '2+ жилийн ажлын туршлага',
      'IELTS 6.5+',
      'Манлайллын потенциал',
      'Монгол улсын иргэн'
    ],
    covers: ['Сургалтын төлбөр', 'Амьжиргааны зардал', 'Онгоцны тийз', 'Визийн зардал'],
    tags: ['Бүтэн санхүүжилт', 'Магистр'],
    applyLink: 'https://www.chevening.org'
  },
  {
    id: 'daad',
    logo: 'DAAD',
    name: 'DAAD Тэтгэлэг',
    provider: 'Германы Академик Солилцооны Алба',
    country: 'europe',
    funding: 'full',
    fundingLabel: 'БҮТЭН САНХҮҮЖИЛТ',
    fundingType: 'Бүтэн Тэтгэлэг',
    level: 'Магистр, Доктор',
    deadline: '2025 оны 10-р сар 15',
    amount: 'Бүрэн санхүүжилт',
    description: 'DAAD нь гадаадын оюутнуудад Германы шилдэг их сургуулиудад суралцах боломж олгодог тэтгэлгийн байгуулага. Германы засгийн газрын дэмжлэгтэйгээр жил бүр олон мянган тэтгэлэг олгодог.',
    requirements: [
      'Сайн сурлагын амжилт (GPA 3.0+)',
      'Герман эсвэл Англи хэлний мэдлэг',
      'Урам зоригийн захидал',
      '2 Зөвлөмжийн захидал'
    ],
    covers: ['Тэтгэмж (€861/сар)', 'Эрүүл мэндийн даатгал', 'Онгоцны тийз', 'Судалгааны зардал'],
    tags: ['Бүтэн санхүүжилт', 'Магистр, Доктор'],
    applyLink: 'https://www.daad.de'
  },
  {
    id: 'gks',
    logo: 'NIIED',
    name: 'Солонгосын Засгийн Газрын Тэтгэлэг (GKS)',
    provider: 'Солонгосын Боловсролын яам (NIIED)',
    country: 'korea',
    funding: 'full',
    fundingLabel: 'БҮТЭН САНХҮҮЖИЛТ',
    fundingType: 'Бүтэн Тэтгэлэг',
    level: 'Бакалавр, Магистр, Доктор',
    deadline: '2026 оны 3-р сар 1',
    amount: 'Бүрэн санхүүжилт',
    description: 'GKS (Глобал Корея Стипенди) нь Солонгос Улсын засгийн газраас гадаадын оюутнуудад бакалавр, магистр, докторын боловсрол эзэмшүүлэх зорилгоор олгодог бүтэн санхүүжилтийн тэтгэлэг.',
    requirements: [
      '25 хүртэлх нас (бакалавр)',
      'GPA 2.64/4.0+',
      'Эрүүл мэндийн шаардлага',
      'Солонгос хэлний бичиг баримт'
    ],
    covers: ['Сургалтын төлбөр', 'Тэтгэмж (900,000–1,000,000 вон/сар)', 'Онгоцны тийз', 'Эрүүл мэндийн даатгал', 'Хэлний сургалт'],
    tags: ['Бүтэн санхүүжилт', 'Бакалавр, Магистр, Доктор'],
    applyLink: 'https://www.studyinkorea.go.kr'
  },
  {
    id: 'csc',
    logo: 'CSC',
    name: 'Хятадын Засгийн Газрын Тэтгэлэг (CSC)',
    provider: 'China Scholarship Council',
    country: 'china',
    funding: 'full',
    fundingLabel: 'БҮТЭН САНХҮҮЖИЛТ',
    fundingType: 'Бүтэн Тэтгэлэг',
    level: 'Бакалавр, Магистр, Доктор',
    deadline: '2026 оны 4-р сар 30',
    amount: 'Бүрэн санхүүжилт',
    description: 'CSC тэтгэлэг нь Хятадын засгийн газрын Хятадын Тэтгэлгийн Зөвлөлөөс гадаадын оюутнуудад зориулсан бүтэн санхүүжилтийн тэтгэлэг бөгөөд Хятадын шилдэг их сургуулиудад суралцах боломж олгодог.',
    requirements: [
      '35 хүртэлх нас (магистр)',
      'HSK 4+ (Хятадаар заах хувьд)',
      'Эрүүл мэндийн шаардлага',
      'Сургуулийн зөвлөмжийн захидал'
    ],
    covers: ['Сургалтын төлбөр', 'Тэтгэмж (2,500–3,500 юань/сар)', 'Орон сууц', 'Эрүүл мэндийн даатгал'],
    tags: ['Бүтэн санхүүжилт', 'Бакалавр, Магистр, Доктор'],
    applyLink: 'https://www.campuschina.org'
  },
  {
    id: 'fulbright',
    logo: 'IIE',
    name: 'Fulbright Тэтгэлэг',
    provider: 'АНУ-ын Засгийн Газар',
    country: 'usa',
    funding: 'full',
    fundingLabel: 'БҮТЭН САНХҮҮЖИЛТ',
    fundingType: 'Бүтэн Тэтгэлэг',
    level: 'Магистр, Доктор',
    deadline: '2025 оны 9-р сар 15',
    amount: 'Бүрэн санхүүжилт',
    description: 'Fulbright Program нь АНУ-ын засгийн газрын хамгийн нэр хүндтэй олон улсын боловсрол солилцооны хөтөлбөр бөгөөд магистр болон докторын түвшинд суралцах бүрэн санхүүжилт олгодог.',
    requirements: [
      'TOEFL 79+ / IELTS 6.5+',
      'GPA 3.3+',
      'Манлайллын туршлага',
      'Судалгааны зорилго'
    ],
    covers: ['Сургалтын төлбөр', 'Амьжиргааны зардал', 'Эрүүл мэндийн даатгал', 'Онгоцны тийз'],
    tags: ['Бүтэн санхүүжилт', 'Магистр, Доктор'],
    applyLink: 'https://foreign.fulbrightonline.org'
  },
  {
    id: 'australia-awards',
    logo: 'DFAT',
    name: 'Australia Awards Тэтгэлэг',
    provider: 'Австралийн Засгийн Газар',
    country: 'australia',
    funding: 'full',
    fundingLabel: 'БҮТЭН САНХҮҮЖИЛТ',
    fundingType: 'Бүтэн Тэтгэлэг',
    level: 'Магистр, Доктор',
    deadline: '2025 оны 7-р сар 1',
    amount: 'Бүрэн санхүүжилт',
    description: 'Australia Awards нь Монгол улсын иргэдэд Австралийн их сургуулиудад магистр, докторын зэрэг эзэмших боломж олгодог Австралийн засгийн газрын хөтөлбөр.',
    requirements: [
      'IELTS 6.5+',
      'Бакалаврын зэрэг',
      '2+ жилийн ажлын туршлага',
      'Монгол улсын иргэн'
    ],
    covers: ['Сургалтын төлбөр', 'Амьжиргааны зардал', 'Онгоцны тийз', 'Эрүүл мэндийн даатгал'],
    tags: ['Бүтэн санхүүжилт', 'Магистр, Доктор'],
    applyLink: 'https://www.australiaawards.gov.au'
  }
];

// ─────────────────────────────────────────────────────────────────────────────

const EXAMS = {
  IELTS: {
    fullName: "Олон улсын англи хэлний шалгалтын систем",
    totalScore: "Band 0–9", registrationFee: "~$215–$270", validity: "2 жил",
    overview: "IELTS бол дээд боловсрол болон дэлхийн шилжилт хөдөлгөөний чиглэлээр дэлхийд хамгийн алдартай англи хэлний түвшин тогтоох шалгалт юм. 140 гаруй орны 10,000 гаруй байгууллага хүлээн зөвшөөрдөг бөгөөд энэ нь бодит амьдрал дээр үндэслэн сонсох, унших, бичих, ярих чадварыг шалгадаг.",
    commonRequirements: { "Бакалавр":"6.0","Магистр":"6.5","Шилдэг их сургуулиуд":"7.0","Элит хөтөлбөрүүд":"7.5" },
    format: [
      { section:"Сонсгол", duration:"30 мин", score:"Band 0–9" },
      { section:"Унших",   duration:"60 мин", score:"Band 0–9" },
      { section:"Бичих",   duration:"60 мин", score:"Band 0–9" },
      { section:"Ярих",    duration:"11–14 мин", score:"Band 0–9" }
    ],
    prepResources: [
      { name:"IELTS-ийн албан ёсны дадлага", type:"Албан ёсны", link:"https://www.ielts.org" },
      { name:"British Council Prep",         type:"Сайт",       link:"https://www.britishcouncil.org" },
      { name:"Cambridge IELTS Books",        type:"Ном",        link:"https://www.cambridge.org" }
    ],
    tips: [
      "Өдөр бүр янз бүрийн англи аялга сонсох дасгал хий.",
      "Унших хэсгийн үгсийн санг нэмэгдүүлэхийн тулд эрдэм шинжилгээний өгүүллүүдийг уншина уу.",
      "Долоо хоногт дор хаяж нэг 1-р даалгавар болон нэг 2-р даалгаврын эссэ бич.",
      "Өөрийнхөө яриаг бичиж аваад, чөлөөтэй, уялдаа холбоотой эсэхийг шалгаарай."
    ],
    upcomingDates: ["May 10, 2025","May 24, 2025","Jun 7, 2025","Jun 21, 2025"]
  },
  TOEFL: {
    fullName: "Гадаад хэлний англи хэлний шалгалт",
    totalScore: "0–120", registrationFee: "~$205–$260", validity: "2 жил",
    overview: "TOEFL iBT нь Хойд Америкийн их сургуулиудын хувьд хамгийн өргөнөөр хүлээн зөвшөөрөгдсөн англи хэлний шалгалт юм. Энэ нь академик англи хэлийг унших, сонсох, ярих, бичих гэсэн хэсгүүдээр бодит их сургуулийн даалгавруудыг тусгасан нэгдсэн форматаар хэмждэг.",
    commonRequirements: { "Бакалавр":"72","Магистр":"90","Шилдэг их сургуулиуд":"100","Элит хөтөлбөрүүд":"110" },
    format: [
      { section:"Унших",  duration:"54–72 мин", score:"0–30" },
      { section:"Сонсгол",duration:"41–57 мин", score:"0–30" },
      { section:"Ярих",   duration:"17 мин",    score:"0–30" },
      { section:"Бичих",  duration:"50 мин",    score:"0–30" }
    ],
    prepResources: [
      { name:"ETS Official TOEFL Prep", type:"Албан ёсны", link:"https://www.ets.org/toefl" },
      { name:"Magoosh TOEFL",           type:"Курс",       link:"https://magoosh.com/toefl" },
      { name:"TOEFL Official Guide",    type:"Ном",        link:"https://www.ets.org" }
    ],
    tips: [
      "Сонсох болон нэгтгэсэн даалгавруудын үеэр тэмдэглэл хөтлөх стратеги ашиглаарай.",
      "Бичих хэсэгт хурдан болон нарийвчлан бичих дасгал хий.",
      "Нэгтгэсэн яриа болон бичих даалгавруудтай танилц.",
      "Бүтэн урттай цагийн дасгалын шалгалтыг авахаар оролдоорой."
    ],
    upcomingDates: ["May 3, 2025","May 17, 2025","Jun 1, 2025","Jun 14, 2025"]
  },
  SAT: {
    fullName: "Scholastic Assessment Test",
    totalScore: "400–1600", registrationFee: "~$60–$103", validity: "Хугацаагүй (5 жил зөвлөмж)",
    overview: "SAT нь АНУ-ын коллежийн элсэлтийн анхан шатны шалгалт юм. Энэ нь коллежид бэлэн байх, амжилтанд хүрэхэд зайлшгүй шаардлагатай нотолгоонд суурилсан унших, бичих, математикийн чадварыг үнэлдэг.",
    commonRequirements: { "Нийгэмлэгийн коллеж":"900+","Улсын их сургууль":"1100+","Шилдэг их сургууль":"1350+","Ivy League":"1500+" },
    format: [
      { section:"Унших & Бичих (Module 1)", duration:"32 мин", score:"200–800" },
      { section:"Унших & Бичих (Module 2)", duration:"32 мин", score:"200–800" },
      { section:"Математик (Module 1)",     duration:"35 мин", score:"200–800" },
      { section:"Математик (Module 2)",     duration:"35 мин", score:"200–800" }
    ],
    prepResources: [
      { name:"Khan Academy SAT Prep",       type:"Үнэгүй курс", link:"https://www.khanacademy.org/sat" },
      { name:"College Board Official Prep", type:"Албан ёсны",  link:"https://www.collegeboard.org" },
      { name:"Princeton Review SAT",        type:"Ном",         link:"https://www.princetonreview.com" }
    ],
    tips: [
      "Khan Academy-ийн хувийн SAT дасгалыг PSAT онооны хамт ашигла.",
      "Хэцүү унших асуултанд урьдчилан сонгох процессыг тодорхойло.",
      "Тест нь зарим боловч бүхээ өгөхгүй тул үндсэн математикийн формулыг санаарай.",
      "Test day-д оролцохын тулд Bluebook апп дээр digital SAT дасгал хий."
    ],
    upcomingDates: ["May 3, 2025","Jun 7, 2025","Aug 23, 2025","Oct 4, 2025"]
  },
  HSK: {
    fullName: "Hànyǔ Shuǐpíng Kǎoshì (Хятад хэлний шалгалт)",
    totalScore: "HSK 1–6 (300 оноо тус бүр)", registrationFee: "~$30–$90 (түвшнээс хамаарна)", validity: "Хугацаагүй",
    overview: "HSK нь Хятадын засгийн газрын албан ёсны стандартчилсан шалгалт бөгөөд Хятад хэлний төрөлх хэл биш хүмүүст зориулсан Хятад хэлний түвшин тогтоох шалгалт юм. Энэ нь CEFR-тэй нийцсэн зургаан түвшинтэй (HSK 1-6) бөгөөд HSK 6 нь Хятад хэлний төрөлх хэлний чадварын түвшинг илэрхийлдэг.",
    commonRequirements: { "Үндсэн харилцаа":"HSK 2","Их сургуульд элсэх":"HSK 4","Магистрын хөтөлбөр":"HSK 5","Мэргэжлийн ашиглалт":"HSK 6" },
    format: [
      { section:"Сонсох",duration:"Түвшнээс хамаарна", score:"0–100" },
      { section:"Унших", duration:"Түвшнээс хамаарна", score:"0–100" },
      { section:"Бичих", duration:"Түвшнээс хамаарна", score:"0–100" }
    ],
    prepResources: [
      { name:"Hanban Official HSK",   type:"Албан ёсны", link:"http://www.chinesetest.cn" },
      { name:"HSK Online Practice",   type:"Сайт",       link:"https://www.hskonline.com" },
      { name:"Pleco Dictionary App",  type:"Апп",        link:"https://www.pleco.com" }
    ],
    tips: [
      "Хятад ханзыг гараар бичих өдөр тутмын зуршлыг бий болго.",
      "Үгсийн санг хадгалахын тулд Anki гэх мэт зайтай давталтын аппликейшнуудыг ашиглаарай.",
      "Сонсох чадвараа сайжруулахын тулд Хятадын телевизийн олон ангит кино үзээрэй.",
      "Яг тодорхой форматыг ойлгохын тулд өмнөх HSK шалгалтын материалуудаас эхэл."
    ],
    upcomingDates: ["Apr 27, 2025","May 25, 2025","Jun 22, 2025","Aug 24, 2025"]
  },
  TOPIK: {
    fullName: "Test of Proficiency in Korean",
    totalScore: "TOPIK I (200) / TOPIK II (300)", registrationFee: "~$40–$65", validity: "2 жил",
    overview: "TOPIK нь Хангын албан ёсны стандартчилсан хэлний чадварын шалгалт бөгөөд Нийгэмлэгийн олон улсын боловсролын институт (NIIED)-аас олгодог. Энэ нь Хангын университет руу орох болон Хангын дотоод ажиллагаанд шаардлагатай.",
    commonRequirements: { "Үндсэн элсэлт":"TOPIK I (Түвшин 2)","Бакалавр":"TOPIK II (Түвшин 3)","Магистр":"TOPIK II (Түвшин 4)","Мэргэжлийн ашиглалт":"TOPIK II (Түвшин 5–6)" },
    format: [
      { section:"TOPIK I – Сонсох", duration:"40 мин", score:"0–100" },
      { section:"TOPIK I – Унших", duration:"60 мин", score:"0–100" },
      { section:"TOPIK II – Сонсох", duration:"60 мин", score:"0–100" },
      { section:"TOPIK II – Бичих", duration:"50 мин", score:"0–100" }
    ],
    prepResources: [
      { name:"TOPIK Official Website",   type:"Албан ёсны", link:"https://www.topik.go.kr" },
      { name:"Talk To Me In Korean",     type:"Курс",       link:"https://talktomeinkorean.com" },
      { name:"TOPIK GUIDE",              type:"Сайт",       link:"https://www.topikguide.com" }
    ],
    tips: [
      "Сонсох чадвараа сайжруулахын тулд Солонгос мэдээ, подкаст сонсоорой.",
      "TOPIK II Уншлагын Солонгос сонины нийтлэлийг унших дадлага хий.",
      "Дүрмийн хэв маягийг түвшин тус бүрээр нь системтэйгээр сур (TOPIK 1–6).",
      "Шалгалтын хурдыг хянахын тулд өмнөх шалгалтын материалууддаа цаг гаргаарай."
    ],
    upcomingDates: ["Apr 12, 2025","May 25, 2025","Jul 20, 2025","Oct 19, 2025"]
  }
};

const EXAM_ICONS = { IELTS:"🇬🇧", TOEFL:"🇺🇸", SAT:"📐", HSK:"🇨🇳", TOPIK:"🇰🇷" };

const EXAM_DESCRIPTIONS = {
  IELTS: "Их Британи болон дэлхий даяарх англи хэл",
  TOEFL: "АНУ болон Канадын их сургуулиудад",
  SAT:   "АНУ-ын коллежийн элсэлт",
  HSK:   "Хятадын хэлний чадвар",
  TOPIK: "Солонгосын хэлний чадвар"
};

const EXAM_LIST_KEYS = ["IELTS", "TOEFL", "SAT", "HSK", "TOPIK"];
