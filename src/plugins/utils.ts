const useImage = (url: string): string => {
  return new URL(`/src/${url}`, import.meta.url).href;
};

export { useImage };

// import { defineComponent } from "vue";

// export default defineComponent({
//   data() {
//     return {
//       projName: "Vue.js and TypeScript: A complete tutorial with examples",
//     };
//   },

//   useImage(url: string): string {
//     return new URL(`/src/${url}`, import.meta.url).href;
//   },
// });
