// store/slices/selectedConversationSlice.ts
import {
  SellerMessageProduct,
  SellerMessageUser,
} from "@/pages/messages/seller/SellerMessageContacts";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SelectedConversationState {
  receiver: SellerMessageUser | null;
  product: SellerMessageProduct | null;
}

const loadConversationFromStorage = (): SelectedConversationState => {
  try {
    const dataStr = localStorage.getItem("selectedConversation");
    return dataStr ? JSON.parse(dataStr) : { receiver: null, product: null };
  } catch {
    return { receiver: null, product: null };
  }
};

const initialState: SelectedConversationState = loadConversationFromStorage();

const selectedConversationSlice = createSlice({
  name: "selectedConversation",
  initialState,
  reducers: {
    setConversation: (
      state,
      action: PayloadAction<{
        receiver: SellerMessageUser;
        product: SellerMessageProduct;
      }>
    ) => {
      state.receiver = action.payload.receiver;
      state.product = action.payload.product;
      localStorage.setItem("selectedConversation", JSON.stringify(state));
    },

    clearConversation: (state) => {
      state.receiver = null;
      state.product = null;
      localStorage.removeItem("selectedConversation");
    },
  },
});

export const { setConversation, clearConversation } =
  selectedConversationSlice.actions;
export default selectedConversationSlice.reducer;
