import { beansCollection, userBeansCollection } from "../../firebase";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

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
  ROAST: "roast",
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
  [descriptorNameEnum.ROAST]: null,
  [descriptorNameEnum.PICTURE_URL]: "",
};

export const saveNewBean = createAsyncThunk(
  "bean/saveNewBean",
  async (newBean) => {
    const snapshot = await beansCollection
      .where(
        descriptorNameEnum.COUNTRY,
        "==",
        newBean[descriptorNameEnum.COUNTRY]
      )
      .where(
        descriptorNameEnum.REGION,
        "==",
        newBean[descriptorNameEnum.REGION]
      )
      .where(descriptorNameEnum.FARM, "==", newBean[descriptorNameEnum.FARM])
      .where(
        descriptorNameEnum.PROCESS,
        "==",
        newBean[descriptorNameEnum.PROCESS]
      )
      .where(descriptorNameEnum.GRIND, "==", newBean[descriptorNameEnum.GRIND])
      .where(descriptorNameEnum.ROAST, "==", newBean[descriptorNameEnum.ROAST])
      .get();
    let beanId = null;
    if (snapshot.empty) {
      beanId = beansCollection.doc().id;
    } else {
      snapshot.forEach((doc) => {
        beanId = doc.id;
      });
    }
    const bean = {
      id: beanId,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      shopId: "",
      [descriptorNameEnum.COUNTRY]: newBean[descriptorNameEnum.COUNTRY],
      [descriptorNameEnum.REGION]: newBean[descriptorNameEnum.REGION],
      [descriptorNameEnum.FARM]: newBean[descriptorNameEnum.FARM],
      [descriptorNameEnum.PROCESS]: newBean[descriptorNameEnum.PROCESS],
      [descriptorNameEnum.GRIND]: newBean[descriptorNameEnum.GRIND],
      [descriptorNameEnum.ROAST]: newBean[descriptorNameEnum.ROAST],
    };
    if (snapshot.empty) {
      console.log("update bean");
      beansCollection.doc(beanId).set(bean);
    }
    const userBeanId = userBeansCollection.doc().id;
    const userBean = {
      id: userBeanId,
      beanId: beanId,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      [descriptorNameEnum.PURCHASE_DATE]:
        newBean[descriptorNameEnum.PURCHASE_DATE],
      [descriptorNameEnum.FLAVOR_LEVEL1_DESCRIPTORS]:
        newBean[descriptorNameEnum.FLAVOR_LEVEL1_DESCRIPTORS],
      [descriptorNameEnum.FLAVOR_LEVEL2_DESCRIPTORS]:
        newBean[descriptorNameEnum.FLAVOR_LEVEL2_DESCRIPTORS],
      [descriptorNameEnum.FLAVOR_LEVEL3_DESCRIPTORS]:
        newBean[descriptorNameEnum.FLAVOR_LEVEL3_DESCRIPTORS],
      [descriptorNameEnum.MOUSE_FEEL1]: newBean[descriptorNameEnum.MOUSE_FEEL1],
      [descriptorNameEnum.MOUSE_FEEL2]: newBean[descriptorNameEnum.MOUSE_FEEL2],
      [descriptorNameEnum.MOUSE_FEEL3]: newBean[descriptorNameEnum.MOUSE_FEEL3],
      [descriptorNameEnum.MOUSE_FEEL_DESCRIPTORS]:
        newBean[descriptorNameEnum.MOUSE_FEEL_DESCRIPTORS],
      [descriptorNameEnum.ACIDITY1]: newBean[descriptorNameEnum.ACIDITY1],
      [descriptorNameEnum.ACIDITY2]: newBean[descriptorNameEnum.ACIDITY2],
      [descriptorNameEnum.ACIDITY_DESCRIPTORS]:
        newBean[descriptorNameEnum.ACIDITY_DESCRIPTORS],
      [descriptorNameEnum.SWEETNESS1]: newBean[descriptorNameEnum.SWEETNESS1],
      [descriptorNameEnum.SWEETNESS2]: newBean[descriptorNameEnum.SWEETNESS2],
      [descriptorNameEnum.SWEETNESS_DESCRIPTORS]:
        newBean[descriptorNameEnum.SWEETNESS_DESCRIPTORS],
      [descriptorNameEnum.AFTER_TASTE1]:
        newBean[descriptorNameEnum.AFTER_TASTE1],
      [descriptorNameEnum.AFTER_TASTE2]:
        newBean[descriptorNameEnum.AFTER_TASTE2],
      [descriptorNameEnum.AFTER_TASTE3]:
        newBean[descriptorNameEnum.AFTER_TASTE3],
      [descriptorNameEnum.AFTER_TASTE_DESCRIPTORS]:
        newBean[descriptorNameEnum.AFTER_TASTE_DESCRIPTORS],
      [descriptorNameEnum.HARMONY_TOO_MUCH_DESCRIPTORS]:
        newBean[descriptorNameEnum.HARMONY_TOO_MUCH_DESCRIPTORS],
      [descriptorNameEnum.HARMONY_POOR_DESCRIPTORS]:
        newBean[descriptorNameEnum.HARMONY_POOR_DESCRIPTORS],
      [descriptorNameEnum.BREWING]: newBean[descriptorNameEnum.BREWING],
      [descriptorNameEnum.OVERALL]: newBean[descriptorNameEnum.OVERALL],
      [descriptorNameEnum.PICTURE_URL]: newBean[descriptorNameEnum.PICTURE_URL],
    };
    userBeansCollection.doc(userBeanId).set(userBean);
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
