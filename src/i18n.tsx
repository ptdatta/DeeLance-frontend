// import i18n from "i18next";
// import { initReactI18next } from "react-i18next";
// import LanguageDetector from "i18next-browser-languagedetector";
// import Backend from "i18next-locize-backend";
// import LastUsed from "locize-lastused";
// import { locizePlugin } from "locize";

// const isProduction = import.meta.env.NODE_ENV === "production";

// const PROJECT_ID = import.meta.env.VITE_LOCIZE_PROJECTID;
// const API_KEY = import.meta.env.VITE_LOCIZE_API_KEY;

// if (!isProduction) {
//   i18n.use(LastUsed);
// }

// i18n
//   .use(locizePlugin)
//   .use(Backend)
//   .use(LanguageDetector)
//   .use(initReactI18next)
//   .init({
//     debug: false,
//     fallbackLng: "en",
//     defaultNS: "en",

//     backend: {
//       projectId: PROJECT_ID,
//       apiKey: API_KEY,
//       allowedAddOrUpdateHosts: [
//         "test.host",
//         "127.0.0.1",
//         "http://localhost:3000/",
//         "localhost",
//       ],
//     },
//     locizeLastUsed: {
//       projectId: PROJECT_ID,
//       apiKey: API_KEY,
//     },
//     saveMissing: false,
//     updateMissing: false,
//   });

// export default i18n;
