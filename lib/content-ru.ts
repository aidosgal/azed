/**
 * All user-facing copy lives here so components stay copy-agnostic.
 * Content is placeholder/plausible for now — swap in real project data,
 * bio and contact details when available.
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
      title: "Nimbus Finance",
      description:
        "Веб-платформа для управления личными финансами: аналитика расходов в реальном времени и кастомные дашборды.",
      tags: ["Next.js", "TypeScript", "PostgreSQL"],
      type: "web" as const,
    },
    {
      title: "Orbit Health",
      description:
        "Мобильное приложение для трекинга здоровья с синхронизацией носимых устройств и персональными рекомендациями.",
      tags: ["React Native", "Node.js", "HealthKit"],
      type: "mobile" as const,
    },
    {
      title: "Ferro CRM",
      description:
        "CRM-система для производственных компаний: управление заказами, складом и клиентской базой в одном интерфейсе.",
      tags: ["React", "Node.js", "Redis"],
      type: "web" as const,
    },
    {
      title: "Loop Delivery",
      description:
        "Приложение доставки с live-трекингом курьера на карте и оптимизацией маршрутов в реальном времени.",
      tags: ["React Native", "MapBox", "WebSocket"],
      type: "mobile" as const,
    },
    {
      title: "Studio Alloy",
      description:
        "Сайт-визитка для дизайн-студии с 3D-элементами и покадровой анимацией, синхронизированной со скроллом.",
      tags: ["Next.js", "Three.js", "GSAP"],
      type: "web" as const,
    },
    {
      title: "Pulse Fitness",
      description:
        "Кроссплатформенное приложение для тренировок с видео-программами и офлайн-режимом.",
      tags: ["React Native", "TypeScript", "SQLite"],
      type: "mobile" as const,
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
