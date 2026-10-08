import type { ErrandSet, Place } from "./rules";

export interface Step {
  emoji: string;
  label: string;
}

export interface Task {
  title: string;
  steps: Step[]; // 3-4 steps, in an order nobody would argue about
}

export const PLACES: Record<Place, { emoji: string; name: string; x: number; y: number }> = {
  home: { emoji: "🏠", name: "Home", x: 70, y: 190 },
  market: { emoji: "🛒", name: "Market", x: 110, y: 60 },
  temple: { emoji: "🛕", name: "Temple", x: 330, y: 60 },
  pharmacy: { emoji: "💊", name: "Pharmacy", x: 210, y: 130 },
  bank: { emoji: "🏦", name: "Bank", x: 340, y: 195 },
};

// Rounds 1-2: steps of a familiar task.
export const TASKS: Task[] = [
  {
    title: "Making tea",
    steps: [
      { emoji: "🔥", label: "Boil water" },
      { emoji: "🍃", label: "Add tea leaves" },
      { emoji: "🥛", label: "Add milk" },
      { emoji: "☕", label: "Pour and drink" },
    ],
  },
  {
    title: "Temple visit",
    steps: [
      { emoji: "🌸", label: "Buy flowers" },
      { emoji: "👡", label: "Remove footwear" },
      { emoji: "🙏", label: "Offer prayers" },
      { emoji: "🍬", label: "Take prasad" },
    ],
  },
  {
    title: "Cooking rice",
    steps: [
      { emoji: "🍚", label: "Wash rice" },
      { emoji: "💧", label: "Add water" },
      { emoji: "♨️", label: "Cook in cooker" },
      { emoji: "🍛", label: "Serve rice" },
    ],
  },
  {
    title: "Morning bath and prayer",
    steps: [
      { emoji: "⏰", label: "Wake up" },
      { emoji: "🚿", label: "Take bath" },
      { emoji: "🪔", label: "Light the lamp" },
      { emoji: "🙏", label: "Say prayer" },
    ],
  },
  {
    title: "Bus to the market",
    steps: [
      { emoji: "🚏", label: "Wait at stop" },
      { emoji: "🚌", label: "Board the bus" },
      { emoji: "🎫", label: "Buy ticket" },
      { emoji: "🛒", label: "Get off at market" },
    ],
  },
  {
    title: "Drawing a kolam",
    steps: [
      { emoji: "🧹", label: "Sweep the doorstep" },
      { emoji: "💦", label: "Sprinkle water" },
      { emoji: "⚪", label: "Draw the kolam" },
    ],
  },
  {
    title: "Making chapati",
    steps: [
      { emoji: "🌾", label: "Knead the dough" },
      { emoji: "⚪", label: "Roll it flat" },
      { emoji: "🍳", label: "Cook on tawa" },
      { emoji: "🧈", label: "Add ghee" },
    ],
  },
  {
    title: "Watering the tulsi",
    steps: [
      { emoji: "🪣", label: "Fill the pot" },
      { emoji: "🌿", label: "Water the tulsi" },
      { emoji: "🙏", label: "Fold your hands" },
    ],
  },
  {
    title: "Taking medicine",
    steps: [
      { emoji: "🍽️", label: "Eat breakfast" },
      { emoji: "💊", label: "Take tablet with water" },
      { emoji: "📝", label: "Tick the chart" },
    ],
  },
  {
    title: "Packing a tiffin",
    steps: [
      { emoji: "🍛", label: "Cook the food" },
      { emoji: "🥡", label: "Fill the tiffin" },
      { emoji: "🔒", label: "Close the lid" },
      { emoji: "👜", label: "Put in bag" },
    ],
  },
  {
    title: "Washing clothes",
    steps: [
      { emoji: "🪣", label: "Soak in water" },
      { emoji: "🧼", label: "Scrub with soap" },
      { emoji: "☀️", label: "Dry in sun" },
      { emoji: "👕", label: "Fold the clothes" },
    ],
  },
  {
    title: "Calling family",
    steps: [
      { emoji: "📱", label: "Pick up phone" },
      { emoji: "🔢", label: "Dial the number" },
      { emoji: "🗣️", label: "Talk and listen" },
    ],
  },
];

// Rounds 3-4: three errands and one rule. The day starts at 9 AM and each
// errand takes an hour, so the slots are 9, 10 and 11 AM and the last ends at 12.
export const ERRAND_SETS: ErrandSet[] = [
  {
    errands: [
      { id: "medicine", label: "Buy medicine", place: "pharmacy" },
      { id: "vegetables", label: "Buy vegetables", place: "market" },
      { id: "temple", label: "Visit temple", place: "temple" },
    ],
    rule: {
      kind: "closes", errand: "medicine", hour: 11, icon: "💊",
      text: "Pharmacy closes 11 AM",
      hint: "The pharmacy closes at 11 AM. Go there earlier.",
    },
  },
  {
    errands: [
      { id: "cash", label: "Take out cash", place: "bank" },
      { id: "milk", label: "Buy milk", place: "market" },
      { id: "tea", label: "Make tea", place: "home" },
    ],
    rule: {
      kind: "before", first: "milk", then: "tea", icon: "🥛",
      text: "Buy milk before making tea",
      hint: "You need milk for tea. Buy the milk first.",
    },
  },
  {
    errands: [
      { id: "pension", label: "Collect pension", place: "bank" },
      { id: "flowers", label: "Buy flowers", place: "market" },
      { id: "medicine", label: "Buy BP tablets", place: "pharmacy" },
    ],
    rule: {
      kind: "opens", errand: "pension", hour: 10, icon: "🏦",
      text: "Bank opens 10 AM",
      hint: "The bank opens at 10 AM. Go there later.",
    },
  },
  {
    errands: [
      { id: "flowers", label: "Buy flowers", place: "market" },
      { id: "pooja", label: "Offer flowers", place: "temple" },
      { id: "drops", label: "Collect eye drops", place: "pharmacy" },
    ],
    rule: {
      kind: "before", first: "flowers", then: "pooja", icon: "🌸",
      text: "Buy flowers before the temple",
      hint: "You need flowers for the temple. Buy them first.",
    },
  },
  {
    errands: [
      { id: "darshan", label: "Morning darshan", place: "temple" },
      { id: "curd", label: "Buy curd", place: "market" },
      { id: "medicine", label: "Buy medicine", place: "pharmacy" },
    ],
    rule: {
      kind: "closes", errand: "darshan", hour: 10, icon: "🛕",
      text: "Temple closes 10 AM",
      hint: "The temple closes at 10 AM. Go there first.",
    },
  },
  {
    errands: [
      { id: "passbook", label: "Update passbook", place: "bank" },
      { id: "fruits", label: "Buy fruits", place: "market" },
      { id: "temple", label: "Visit temple", place: "temple" },
    ],
    rule: {
      kind: "opens", errand: "passbook", hour: 11, icon: "🏦",
      text: "Bank opens 11 AM",
      hint: "The bank opens at 11 AM. Go there last.",
    },
  },
  {
    errands: [
      { id: "vegetables", label: "Buy vegetables", place: "market" },
      { id: "sambar", label: "Cook sambar", place: "home" },
      { id: "syrup", label: "Buy cough syrup", place: "pharmacy" },
    ],
    rule: {
      kind: "before", first: "vegetables", then: "sambar", icon: "🥕",
      text: "Buy vegetables before cooking",
      hint: "You need vegetables for sambar. Buy them first.",
    },
  },
  {
    errands: [
      { id: "bill", label: "Pay electricity bill", place: "bank" },
      { id: "sweets", label: "Buy sweets", place: "market" },
      { id: "temple", label: "Visit temple", place: "temple" },
    ],
    rule: {
      kind: "closes", errand: "sweets", hour: 11, icon: "🍬",
      text: "Sweet shop closes 11 AM",
      hint: "The sweet shop closes at 11 AM. Go there earlier.",
    },
  },
  {
    errands: [
      { id: "coconut", label: "Buy coconut", place: "market" },
      { id: "break", label: "Break coconut", place: "temple" },
      { id: "cash", label: "Take out cash", place: "bank" },
    ],
    rule: {
      kind: "before", first: "coconut", then: "break", icon: "🥥",
      text: "Buy coconut before the temple",
      hint: "You need the coconut at the temple. Buy it first.",
    },
  },
  {
    errands: [
      { id: "cash", label: "Take out cash", place: "bank" },
      { id: "rice", label: "Buy rice", place: "market" },
      { id: "temple", label: "Visit temple", place: "temple" },
    ],
    rule: {
      kind: "opens", errand: "cash", hour: 10, icon: "🏦",
      text: "Bank opens 10 AM",
      hint: "The bank opens at 10 AM. Go there later.",
    },
  },
];
