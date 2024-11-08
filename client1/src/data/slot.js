import slot1Image from "./images/bandits-slot.jfif";

class Slot {
  id;
  image;
  name;
  likesCount;

  constructor(slotDetails) {
    this.id = slotDetails.id;
    this.image = slotDetails.image;
    this.name = slotDetails.name;
    this.likesCount = slotDetails.likesCount;
  }
}

export let slotsPrototype = JSON.parse(localStorage.getItem("slots")) || [
  {
    id: 1,
    image: slot1Image,
    name: "Однорукие бандиты",
    likesCount: 0,
  },
  {
    id: 2,
    image: slot1Image,
    name: "Однорукие бандиты",
    likesCount: 0,
  },
  {
    id: 3,
    image: slot1Image,
    name: "Однорукие бандиты",
    likesCount: 0,
  },
  {
    id: 4,
    image: slot1Image,
    name: "Однорукие бандиты",
    likesCount: 0,
  },
  {
    id: 5,
    image: slot1Image,
    name: "Однорукие бандиты",
    likesCount: 0,
  },
  {
    id: 6,
    image: slot1Image,
    name: "Однорукие бандиты",
    likesCount: 0,
  },
  {
    id: 7,
    image: slot1Image,
    name: "Однорукие бандиты",
    likesCount: 0,
  },
  {
    id: 8,
    image: slot1Image,
    name: "Однорукие бандиты",
    likesCount: 0,
  },
];

slotsPrototype = slotsPrototype.map((slot) => new Slot(slot));
