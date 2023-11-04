import { defineStore } from "pinia";
import router from "../router";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: {
      name: "Viesturs",
      surname: "Kalcenaus",
      code: "IT21021",
      favorite_songs: localStorage.favorite_songs
        ? localStorage.favorite_songs.split(",")
        : [],
    },
    authenticated: localStorage.is_authenticated ?? false,
  }),
  getters: {
    is_authenticated() {
      if (localStorage.is_authenticated !== null) {
        return this.authenticated;
      } else {
        return localStorage.is_authenticated;
      }
    },
    getFavoriteSongs() {
      return this.user.favorite_songs;
    },
  },
  actions: {
    setUserData(name, surname, code) {
      this.user.name = name;
      this.user.surname = surname;
      this.user.code = code;
    },
    authenticate(email, password) {
      if (email === "viesturs.kalcenaus@va.lv" && password === "123456") {
        localStorage.is_authenticated = true;
        this.authenticated = true;
        router.push("/");
      }
    },
    logout() {
      localStorage.clear();
      this.authenticated = false;
      router.push("/login");
    },
    toggleFavorite(songId) {
      const songIndex = this.user.favorite_songs.indexOf(songId);
      if (songIndex < 0) {
        this.user.favorite_songs.push(songId);
      } else {
        this.user.favorite_songs.splice(songIndex, 1);
      }
      localStorage.favorite_songs = this.user.favorite_songs;
    },
  },
});
