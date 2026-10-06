export interface Step {
  emoji: string;
  label: string;
}

export interface Sequence {
  title: string;
  steps: Step[]; // in the correct order
}

// Generic rounds. Each sequence must have at least as many steps as the
// largest level's card count, in an order nobody would argue about.
export const SEQUENCES: Sequence[] = [
  {
    title: "Morning routine",
    steps: [
      { emoji: "⏰", label: "Wake up" },
      { emoji: "🪥", label: "Brush teeth" },
      { emoji: "🍳", label: "Eat breakfast" },
      { emoji: "🚶", label: "Morning walk" },
    ],
  },
  {
    title: "Cooking lunch",
    steps: [
      { emoji: "🛒", label: "Buy vegetables" },
      { emoji: "🚰", label: "Wash vegetables" },
      { emoji: "🍲", label: "Cook food" },
      { emoji: "🍽️", label: "Eat lunch" },
    ],
  },
  {
    title: "Making tea",
    steps: [
      { emoji: "🔥", label: "Boil water" },
      { emoji: "🍃", label: "Add tea leaves" },
      { emoji: "🥛", label: "Add milk" },
      { emoji: "☕", label: "Drink tea" },
    ],
  },
  {
    title: "Temple visit",
    steps: [
      { emoji: "🚿", label: "Take a bath" },
      { emoji: "🌸", label: "Buy flowers" },
      { emoji: "🛕", label: "Go to temple" },
      { emoji: "🙏", label: "Offer prayers" },
    ],
  },
  {
    title: "Bus ride",
    steps: [
      { emoji: "🚶", label: "Walk to stop" },
      { emoji: "🚏", label: "Wait for bus" },
      { emoji: "🚌", label: "Ride the bus" },
      { emoji: "🏠", label: "Reach home" },
    ],
  },
  {
    title: "Bedtime",
    steps: [
      { emoji: "🍛", label: "Eat dinner" },
      { emoji: "🪥", label: "Brush teeth" },
      { emoji: "💡", label: "Switch off lights" },
      { emoji: "🛏️", label: "Go to sleep" },
    ],
  },
  {
    title: "Washing clothes",
    steps: [
      { emoji: "🧺", label: "Collect clothes" },
      { emoji: "🧼", label: "Wash clothes" },
      { emoji: "☀️", label: "Dry in sun" },
      { emoji: "👕", label: "Fold clothes" },
    ],
  },
  {
    title: "Phone call",
    steps: [
      { emoji: "📱", label: "Pick up phone" },
      { emoji: "🔢", label: "Dial number" },
      { emoji: "🗣️", label: "Talk to family" },
      { emoji: "📴", label: "Hang up" },
    ],
  },
  {
    title: "Gardening",
    steps: [
      { emoji: "⛏️", label: "Dig the soil" },
      { emoji: "🌱", label: "Plant seed" },
      { emoji: "💧", label: "Water plant" },
      { emoji: "🌻", label: "Flower blooms" },
    ],
  },
  {
    title: "Doctor visit",
    steps: [
      { emoji: "🚕", label: "Go to clinic" },
      { emoji: "🩺", label: "See doctor" },
      { emoji: "💊", label: "Buy medicine" },
      { emoji: "🏠", label: "Return home" },
    ],
  },
  {
    title: "Sending a letter",
    steps: [
      { emoji: "✍️", label: "Write letter" },
      { emoji: "✉️", label: "Seal envelope" },
      { emoji: "📮", label: "Post letter" },
      { emoji: "📬", label: "Letter arrives" },
    ],
  },
  {
    title: "Market shopping",
    steps: [
      { emoji: "📝", label: "Write a list" },
      { emoji: "🛒", label: "Go to market" },
      { emoji: "💵", label: "Pay money" },
      { emoji: "🛍️", label: "Carry bags home" },
    ],
  },
  {
    title: "Birthday party",
    steps: [
      { emoji: "🎈", label: "Decorate house" },
      { emoji: "👪", label: "Guests arrive" },
      { emoji: "🎂", label: "Cut the cake" },
      { emoji: "🎁", label: "Open gifts" },
    ],
  },
  {
    title: "Cooking rice",
    steps: [
      { emoji: "🍚", label: "Wash rice" },
      { emoji: "💧", label: "Add water" },
      { emoji: "🔥", label: "Cook rice" },
      { emoji: "🍛", label: "Serve rice" },
    ],
  },
];
