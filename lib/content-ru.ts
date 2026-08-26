/**
 * All user-facing copy lives here so components stay copy-agnostic.
 * Bio and contact details are still placeholder — swap in when available.
 */

export const nav = {
  brand: "Azed",
  cta: "Начать проект",
};

export const hero = {
  eyebrow: "Веб и мобильная разработка",
  headline: "Создаю продукты,\nкоторые работают быстро и точно",
  subheadline:
    "Проектирую и разрабатываю сайты и мобильные приложения — от первого прототипа до релиза в продакшен.",
  primaryCta: "Начать проект",
  scrollCue: "Листайте вниз",
};

export const about = {
  eyebrow: "Обо мне",
  heading: "Разработчик полного цикла",
  body: [
    "Я занимаюсь веб- и мобильной разработкой: проектирую архитектуру, пишу код и довожу продукт до релиза. Работаю как самостоятельно, так и в связке с дизайнерами и продуктовыми командами.",
    "Стек — React, Next.js, TypeScript, React Native, Node.js; для интерактивных интерфейсов использую Three.js и WebGL. Беру в работу проекты, где важны техническая точность и внимание к деталям: стартапы на старте, продуктовые команды, агентства, которым нужен сильный технический партнёр.",
  ],
  stack: [
    "React",
    "Next.js",
    "TypeScript",
    "React Native",
    "Node.js",
    "Three.js",
  ],
  stats: [
    { value: "6+", label: "лет опыта" },
    { value: "40+", label: "проектов запущено" },
    { value: "12", label: "технологий в стеке" },
  ],
};

export const projects = {
  eyebrow: "Проекты",
  heading: "Портфолио",
  subheading: "Избранные веб- и мобильные проекты последних лет.",
  items: [
    {
      title: "Viled.kz",
      description:
        "Интернет-магазин брендовой одежды и аксессуаров премиум- и люкс-сегмента: каталог, подборки коллекций и оформление заказов.",
      tags: ["E-commerce", "Web"],
      type: "web" as const,
      image: "/projects/viled.jpg",
      url: "https://viled.kz",
    },
    {
      title: "Zaman Bank",
      description:
        "Мобильное приложение исламского цифрового банка — участвовал в разработке онлайн-финансирования, карт и переводов.",
      tags: ["Mobile", "Fintech"],
      type: "mobile" as const,
      image: "/projects/zamanbank.jpg",
      url: "https://www.zamanbank.kz",
    },
    {
      title: "Qogamfin.kz",
      description:
        "Сайт социального проекта «Қарызсыз қоғам» по финансовой грамотности: видеокурсы, калькуляторы и заявки на юридическую помощь.",
      tags: ["Web", "EdTech"],
      type: "web" as const,
      image: "/projects/qogamfin.jpg",
      url: "https://qogamfin.kz",
    },
    {
      title: "Qogamfin App",
      description:
        "Мобильное приложение к платформе финансовой грамотности «Қарызсыз қоғам» — те же курсы и калькуляторы в мобильном формате.",
      tags: ["Mobile", "EdTech"],
      type: "mobile" as const,
      image: "/projects/qogamfin.jpg",
      url: "https://qogamfin.kz",
    },
  ],
};

export const contact = {
  eyebrow: "Контакты",
  heading: "Обсудим проект",
  body: "Расскажите коротко, что нужно сделать — отвечу в течение дня.",
  email: "agalimzhan928@gmail.com",
  telegram: "@yourhandle",
  form: {
    nameLabel: "Имя",
    namePlaceholder: "Как к вам обращаться",
    emailLabel: "Email",
    emailPlaceholder: "you@example.com",
    messageLabel: "Сообщение",
    messagePlaceholder: "Пара слов о проекте",
    submit: "Отправить",
  },
  footer: "© 2026 Azed. Все права защищены.",
};
