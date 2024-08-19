/* eslint-disable no-param-reassign */

import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

import type { CardProps } from "@/components/body/main-body/card/card.type";

interface CardsState {
  cards: CardProps[];
  filteredCards: CardProps[];
}

const initialState: CardsState = {
  cards: [],
  filteredCards: [],
};

const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    setCards(state, action: PayloadAction<CardProps[]>) {
      state.cards = action.payload;
    },
    setFilteredCards(state, action: PayloadAction<CardProps[]>) {
      state.filteredCards = action.payload;
    },
  },
});

export const { setCards, setFilteredCards } = cardsSlice.actions;

export default cardsSlice.reducer;
