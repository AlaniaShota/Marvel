import md5 from "md5";
import { create } from "zustand";

export const useStore = create((set) => ({
  characterData: [],
  comicsData: {},
  selectedComic: null,
  searchResults: [],
  fetchCharacterData: async (publicKey, privateKey) => {
    const generateHash = (timeStamp) => md5(timeStamp + privateKey + publicKey);
    const timeStamp = new Date().getTime();
    const hash = generateHash(timeStamp);
    const url = `https://gateway.marvel.com:443/v1/public/characters?apikey=${publicKey}&hash=${hash}&ts=${timeStamp}&limit=100`;

    try {
      const response = await fetch(url);
      const result = await response.json();
      set({ characterData: result.data.results });
    } catch (error) {
      console.error("Error while getting default character data:", error);
    }
  },
  fetchComicData: async (characterId, publicKey, privateKey) => {
    const generateHash = (timeStamp) => md5(timeStamp + privateKey + publicKey);
    const timeStamp = new Date().getTime();
    const hash = generateHash(timeStamp);
    const url = `https://gateway.marvel.com:443/v1/public/characters/${characterId}/comics?apikey=${publicKey}&hash=${hash}&ts=${timeStamp}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (
        data &&
        data.data &&
        data.data.results &&
        data.data.results.length > 0
      ) {
        set((state) => ({
          comicsData: {
            ...state.comicsData,
            [characterId]: data.data.results,
          },
          // selectedComic: data.data.results[0],
        }));
      } else {
        console.log("Данные не найдены");
      }
    } catch (error) {
      console.error("Ошибка при получении данных о комиксе", error);
    }
  },
  fetchSearchCharacterData: async (publicKey, privateKey, characterName) => {
    const generateHash = (timeStamp) => md5(timeStamp + privateKey + publicKey);
    const timeStamp = new Date().getTime();
    const hash = generateHash(timeStamp);
    const url = `https://gateway.marvel.com:443/v1/public/characters?apikey=${publicKey}&hash=${hash}&ts=${timeStamp}&nameStartsWith=${characterName}&limit=100`;

    try {
      const response = await fetch(url);
      const result = await response.json();
      set({ searchResults: result.data.results });
    } catch (error) {
      console.error("Error while getting search character data:", error);
    }
  },
  selectedComic: {
    title: "",
    prices: [{ price: 0 }],
    thumbnail: {
      path: "",
      extension: "",
    },
    isInWishlist: false,
  },
  wishlist: [],
  setSelectedComic: (comic, characterId) =>
    set((state) => ({
      selectedComic: {
        ...comic,
        selectedComicId: characterId,
        isInWishlist: state.wishlist.some((item) => item.title === comic.title),
      },
    })),
  addToWishlist: (comic) =>
    set((state) => ({
      wishlist: [
        ...state.wishlist,
        { comic, quantity: 1 }, // Начальное количество 1
      ],
    })),
  removeFromWishlist: (comicToRemove) =>
    set((state) => ({
      wishlist: state.wishlist.filter(
        (item) => item.comic.id !== comicToRemove.id // Удаляем комикс из wishlist
      ),
    })),
  updateQuantity: (comicId, quantity) =>
    set((state) => ({
      wishlist: state.wishlist.map(
        (item) => (item.comic.id === comicId ? { ...item, quantity } : item) // Обновляем количество для выбранного комикса
      ),
    })),
}));
