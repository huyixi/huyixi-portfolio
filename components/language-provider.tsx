"use client";

import type React from "react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const translations = {
  en: {
    dock: {
      home: "Home",
      about: "About",
      apps: "Apps",
      blog: "Blog",
      languageButtonLabel: "中文",
      languageButtonAria: "Switch to Chinese",
    },
    header: {
      location: "HANGZHOU, CN • {{time}}",
      unavailable: "Seeking opportunities",
      shortcut: {
        beforeKey: "PRESS ",
        afterKey: " TO BOOK A CALL",
      },
    },
    projectsGrid: {
      boardTitle: "huyixi's Board",
      stickyNotes: {
        mood: {
          title: "MY MOOD",
          content:
            "Specialized in crafting digital product, mobile apps, and websites",
        },
        experience: {
          title: "EXPERIENCE",
          content:
            "Crafted an outstanding digital product experiences in last 4 years",
        },
      },
      projects: {
        apps: {
          title: "MY APPS",
          description: "THIS PROJECT IS LOCKED",
        },
        blog: {
          title: "MY BLOG",
          description: "THIS PROJECT IS LOCKED",
        },
        sellday: {
          title: "SELLDAY • SHOPPING",
          description: "INSTANT TRANSACTION MAKER",
        },
      },
    },
    projectCard: {
      label: "PROJECT",
    },
    moodBoard: {
      title: "My Mood",
      primary:
        "Specialized in crafting digital product, mobile apps, and websites",
      secondary:
        "Crafted an outstanding digital product experiences in last 4 years",
    },
    aboutHero: {
      title: "Hi, I'm huyixi",
      subtitle:
        "EXPERIENCED DIGITAL PRODUCT DESIGNER WITH 4+ YEARS CREATING USER-CENTERED DIGITAL SOLUTIONS. PASSIONATE TO DO AN EXPERIMENT TO CRAFT UNFORGETTABLE PRODUCT EXPERIENCES AND INTERFACES.",
    },
    experienceTimeline: {
      heading: "EXPERIENCES",
      download: "DOWNLOAD CV",
      items: [
        {
          company: "HUB.XYZ",
          role: "PRODUCT & BRAND DESIGNER",
          period: "24 - O",
        },
        {
          company: "ITSAVIRUS",
          role: "PRODUCT DESIGNER",
          period: "22 - 24",
        },
        {
          company: "BOXYLABS",
          role: "PRODUCT & NFT DESIGNER",
          period: "21 - 22",
        },
      ],
    },
  },
  zh: {
    dock: {
      home: "主页",
      about: "关于",
      apps: "应用",
      blog: "博客",
      languageButtonLabel: "EN",
      languageButtonAria: "切换到英文",
    },
    header: {
      location: "中国杭州 • {{time}}",
      unavailable: "正在寻找新机会",
      shortcut: {
        beforeKey: "按 ",
        afterKey: " 键预约通话",
      },
    },
    projectsGrid: {
      boardTitle: "huyixi 的灵感板",
      stickyNotes: {
        mood: {
          title: "我的灵感",
          content: "专注于打造数字产品、移动应用与网站",
        },
        experience: {
          title: "经历",
          content: "过去 4 年持续打磨出色的数字产品体验",
        },
      },
      projects: {
        apps: {
          title: "我的应用",
          description: "该项目暂未开放",
        },
        blog: {
          title: "我的博客",
          description: "该项目暂未开放",
        },
        sellday: {
          title: "SELLDAY • 购物",
          description: "即时交易体验",
        },
      },
    },
    projectCard: {
      label: "项目",
    },
    moodBoard: {
      title: "我的灵感",
      primary: "专注于打造数字产品、移动应用与网站",
      secondary: "在过去四年里打造出色的数字化体验",
    },
    aboutHero: {
      title: "你好，我是 huyixi",
      subtitle:
        "拥有 4 年以上数字产品设计经验，擅长通过实验探索打造令人难忘的产品体验与界面。",
    },
    experienceTimeline: {
      heading: "工作经历",
      download: "下载简历",
      items: [
        {
          company: "HUB.XYZ",
          role: "产品与品牌设计师",
          period: "24 - O",
        },
        {
          company: "ITSAVIRUS",
          role: "产品设计师",
          period: "22 - 24",
        },
        {
          company: "BOXYLABS",
          role: "产品与 NFT 设计师",
          period: "21 - 22",
        },
      ],
    },
  },
} as const;

type Translations = typeof translations;
type Language = keyof Translations;

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  toggleLanguage: () => void;
  t: (key: string, variables?: Record<string, string | number>) => string;
  dictionary: Translations[Language];
};

const LanguageContext = createContext<LanguageContextValue | undefined>(
  undefined,
);

const STORAGE_KEY = "huyixi-language";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  useEffect(() => {
    const storedLanguage = window.localStorage.getItem(STORAGE_KEY);
    if (storedLanguage === "en" || storedLanguage === "zh") {
      setLanguage(storedLanguage);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, language);
  }, [language]);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const toggleLanguage = useCallback(() => {
    setLanguage((prev) => (prev === "en" ? "zh" : "en"));
  }, []);

  const translate = useCallback(
    (key: string, variables?: Record<string, string | number>) => {
      const segments = key.split(".");
      let result: unknown = translations[language];

      for (const segment of segments) {
        if (
          result &&
          typeof result === "object" &&
          segment in (result as Record<string, unknown>)
        ) {
          result = (result as Record<string, unknown>)[segment];
        } else {
          return key;
        }
      }

      if (typeof result !== "string") {
        return key;
      }

      if (!variables) {
        return result;
      }

      return Object.entries(variables).reduce(
        (acc, [token, value]) =>
          acc.replace(new RegExp(`{{${token}}}`, "g"), String(value)),
        result,
      );
    },
    [language],
  );

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      toggleLanguage,
      t: translate,
      dictionary: translations[language],
    }),
    [language, translate],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }

  return context;
}
