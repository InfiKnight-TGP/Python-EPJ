// Quiz questions types:

export type Quiz = {
  id: string;
  data: Question[];
  createdAt: Date;
};

export type Question = TextQuestion | ImageQuestion;

export type TextQuestion = {
  type: "text";
  question: string;
  answer: string;
};

export type ImageQuestion = {
  type: "image";
  question: string;
  options: {
    id: string;
    name: string;
    url: string;
  }[];
  answer: string;
};
