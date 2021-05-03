import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { beansCollection } from "../../firebase";
import firebase from "firebase/app";

export const descriptorValueEnum = Object.freeze({
  MIN: 0,
  MAX: 10,
  DEFAULT: 5,
});

export const descriptorNameEnum = Object.freeze({
  FLAVOR_LEVEL1_DESCRIPTORS: "flavorLevel1Descriptors",
  FLAVOR_LEVEL2_DESCRIPTORS: "flavorLevel2Descriptors",
  FLAVOR_LEVEL3_DESCRIPTORS: "flavorLevel3Descriptors",
  CLEAN_CUP: "cleanCup",
  MOUSE_FEEL1: "mouseFeel1",
  MOUSE_FEEL2: "mouseFeel2",
  MOUSE_FEEL3: "mouseFeel3",
  MOUSE_FEEL_DESCRIPTORS: "mouseFeelDescriptors",
  ACIDITY1: "acidity1",
  ACIDITY2: "acidity2",
  ACIDITY_DESCRIPTORS: "acidityDescriptors",
  SWEETNESS1: "sweetness1",
  SWEETNESS2: "sweetness2",
  SWEETNESS_DESCRIPTORS: "sweetnessDescriptors",
  AFTER_TASTE1: "afterTaste1",
  AFTER_TASTE2: "afterTaste2",
  AFTER_TASTE3: "afterTaste3",
  AFTER_TASTE_DESCRIPTORS: "afterTasteDescriptors",
  HARMONY_TOO_MUCH_DESCRIPTORS: "harmonyTooMuchDescriptors",
  HARMONY_POOR_DESCRIPTORS: "harmonyPoorDescriptors",
  OVERALL: "overall",
  PURCHASE_DATE: "purchaseDate",
  STORE: "store",
  COUNTRY: "country",
  FARM: "farm",
  REGION: "region",
  PROCESS: "process",
  GRIND: "grind",
  BREWING: "brewing",
  PICTURE_URL: "pictureURL",
});

const initialState = {
  [descriptorNameEnum.FLAVOR_LEVEL1_DESCRIPTORS]: [],
  [descriptorNameEnum.FLAVOR_LEVEL2_DESCRIPTORS]: [],
  [descriptorNameEnum.FLAVOR_LEVEL3_DESCRIPTORS]: [],
  [descriptorNameEnum.CLEAN_CUP]: descriptorValueEnum.DEFAULT,
  [descriptorNameEnum.MOUSE_FEEL1]: descriptorValueEnum.DEFAULT,
  [descriptorNameEnum.MOUSE_FEEL2]: descriptorValueEnum.DEFAULT,
  [descriptorNameEnum.MOUSE_FEEL3]: descriptorValueEnum.DEFAULT,
  [descriptorNameEnum.MOUSE_FEEL_DESCRIPTORS]: [],
  [descriptorNameEnum.ACIDITY1]: descriptorValueEnum.DEFAULT,
  [descriptorNameEnum.ACIDITY2]: descriptorValueEnum.DEFAULT,
  [descriptorNameEnum.ACIDITY_DESCRIPTORS]: [],
  [descriptorNameEnum.SWEETNESS1]: descriptorValueEnum.DEFAULT,
  [descriptorNameEnum.SWEETNESS2]: descriptorValueEnum.DEFAULT,
  [descriptorNameEnum.SWEETNESS_DESCRIPTORS]: [],
  [descriptorNameEnum.AFTER_TASTE1]: descriptorValueEnum.DEFAULT,
  [descriptorNameEnum.AFTER_TASTE2]: descriptorValueEnum.DEFAULT,
  [descriptorNameEnum.AFTER_TASTE3]: descriptorValueEnum.DEFAULT,
  [descriptorNameEnum.AFTER_TASTE_DESCRIPTORS]: [],
  [descriptorNameEnum.HARMONY_TOO_MUCH_DESCRIPTORS]: [],
  [descriptorNameEnum.HARMONY_POOR_DESCRIPTORS]: [],
  [descriptorNameEnum.OVERALL]: descriptorValueEnum.DEFAULT,
  [descriptorNameEnum.PURCHASE_DATE]: null,
  [descriptorNameEnum.STORE]: null,
  [descriptorNameEnum.COUNTRY]: null,
  [descriptorNameEnum.FARM]: null,
  [descriptorNameEnum.REGION]: null,
  [descriptorNameEnum.PROCESS]: null,
  [descriptorNameEnum.GRIND]: null,
  [descriptorNameEnum.BREWING]: null,
  [descriptorNameEnum.PICTURE_URL]: "",
};

const serialize = (bean) => {
  const serializedBean = {};
  Object.entries(bean).map(([key, value]) => {
    if (value instanceof Array) {
      serializedBean[key] = value.map((v) => v.name);
    } else {
      serializedBean[key] = String(value);
    }
  });
  return serializedBean;
};

export const saveNewBean = createAsyncThunk(
  "bean/saveNewBean",
  async (bean) => {
    const beanId = beansCollection.doc().id;
    beansCollection.doc(beanId).set({
      beanId: beanId,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      ...serialize(bean),
    });
  }
);

const beanSlice = createSlice({
  name: "bean",
  initialState,
  reducers: {
    descriptorUpdate: {
      reducer(state, action) {
        const { key, value } = action.payload;
        state[key] = value;
      },
      prepare(key, value) {
        return {
          payload: { key, value },
        };
      },
    },
  },
  extraReducers: (builder) => {
    builder.addCase(saveNewBean.fulfilled);
  },
});

export const { descriptorUpdate } = beanSlice.actions;

export const selectDescriptorByName = (state, name) => state.bean[name];

export default beanSlice.reducer;
