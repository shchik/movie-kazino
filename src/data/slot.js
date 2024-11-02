import slot1Image from "./images/bandits-slot.jfif";

class Slot {
  id;
  image;
  name;

  constructor(slotDetails) {
    this.id = slotDetails.id;
    this.image = slotDetails.image;
    this.name = slotDetails.name;
  }
}

export let slots = [
  {
    id: 1,
    image: slot1Image,
    name: "Однорукие бандиты",
  },
  {
    id: 2,
    image: slot1Image,
    name: "Однорукие бандиты",
  },
  {
    id: 3,
    image: slot1Image,
    name: "Однорукие бандиты",
  },
  {
    id: 4,
    image: slot1Image,
    name: "Однорукие бандиты",
  },
  {
    id: 5,
    image: slot1Image,
    name: "Однорукие бандиты",
  },
  {
    id: 6,
    image: slot1Image,
    name: "Однорукие бандиты",
  },
  {
    id: 7,
    image: slot1Image,
    name: "Однорукие бандиты",
  },
  {
    id: 8,
    image: slot1Image,
    name: "Однорукие бандиты",
  },
];

slots = slots.map((slot) => new Slot(slot));
