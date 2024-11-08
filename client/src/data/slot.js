import kriminalnoeChtivoImage from "./images/kriminalnoe-chtivo.jpg";
import lezdie2049 from "./images/lezvie-2049.jpg";
import fightClubImage from "./images/fight-club.jpg";
import forsajImage from "./images/forsaj.jpg";
import arthasImage from "./images/arthas.jpg";
import mostImage from "./images/most2.webp";
import rekviemImage from "./images/rekviem.jpg";
import otmenaTp from "./images/otmena-tp.jpg";
import harryPotterImage from "./images/harryPotter3.webp";
import ostrovImage from "./images/ostrov.jpg";

class Slot {
  id;
  image;
  name;
  likesCount;
  categories;

  constructor(slotDetails) {
    this.id = slotDetails.id;
    this.image = slotDetails.image;
    this.name = slotDetails.name;
    this.likesCount = slotDetails.likesCount;
    this.categories = slotDetails.categories;
  }
}

export let slotsPrototype = JSON.parse(localStorage.getItem("slots")) || [
  {
    id: 1,
    image: kriminalnoeChtivoImage,
    name: "Криминальный джекпот",
    likesCount: 0,
    categories: ["thriller", "kriminal"],
  },
  {
    id: 2,
    image: lezdie2049,
    name: "Бегущий по призыву 2026",
    likesCount: 0,
    categories: ["action", "fantasy"],
  },
  {
    id: 3,
    image: fightClubImage,
    name: "Банкротский клуб",
    likesCount: 0,
    categories: ["action", "thriller"],
  },
  {
    id: 4,
    image: forsajImage,
    name: "Последний деп",
    likesCount: 0,
    categories: ["action", "kriminal"],
  },
  {
    id: 5,
    image: arthasImage,
    name: "Arthas slot",
    likesCount: 0,
    categories: ["comedy"],
  },
  {
    id: 6,
    image: mostImage,
    name: "Мост к 14.1",
    likesCount: 0,
    categories: ["adventure", "drama"],
  },
  {
    id: 7,
    image: rekviemImage,
    name: "Реквием по индивидуалке",
    likesCount: 0,
    categories: ["horror", "drama"],
  },
  {
    id: 8,
    image: otmenaTp,
    name: "SeregaPirat slot",
    likesCount: 0,
    categories: ["comedy", "drama"],
  },
  {
    id: 9,
    image: harryPotterImage,
    name: "Гарри поттер и тайный слот",
    likesCount: 0,
    categories: ["fantasy", "adventure"],
  },
  {
    id: 10,
    image: ostrovImage,
    name: "Остров лудоманов",
    likesCount: 0,
    categories: ["horror", "thriller"],
  },
];

slotsPrototype = slotsPrototype.map((slot) => new Slot(slot));
