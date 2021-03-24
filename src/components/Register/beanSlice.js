import { createSlice } from "@reduxjs/toolkit";

export const descriptorEnum = Object.freeze({
  FLAVOR_LEVEL1_DESCRIPTORS: "flavorLevel1Descriptors",
  FLAVOR_LEVEL2_DESCRIPTORS: "flavorLevel2Descriptors",
  FLAVOR_LEVEL3_DESCRIPTORS: "flavorLevel3Descriptors",
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
  DATE: "date",
  STORE: "store",
  COUNTRY: "country",
  FARM: "farm",
  REGION: "region",
  PROCESS: "process",
  GRIND: "grind",
  BREWING: "brewing",
});

const initialState = {
  [descriptorEnum.FLAVOR_LEVEL1_DESCRIPTORS]: [],
  [descriptorEnum.FLAVOR_LEVEL2_DESCRIPTORS]: [],
  [descriptorEnum.FLAVOR_LEVEL3_DESCRIPTORS]: [],
  [descriptorEnum.MOUSE_FEEL1]: null,
  [descriptorEnum.MOUSE_FEEL2]: null,
  [descriptorEnum.MOUSE_FEEL3]: null,
  [descriptorEnum.MOUSE_FEEL_DESCRIPTORS]: [],
  [descriptorEnum.ACIDITY1]: null,
  [descriptorEnum.ACIDITY2]: null,
  [descriptorEnum.ACIDITY_DESCRIPTORS]: [],
  [descriptorEnum.SWEETNESS1]: null,
  [descriptorEnum.SWEETNESS2]: null,
  [descriptorEnum.SWEETNESS_DESCRIPTORS]: [],
  [descriptorEnum.AFTER_TASTE1]: null,
  [descriptorEnum.AFTER_TASTE2]: null,
  [descriptorEnum.AFTER_TASTE3]: null,
  [descriptorEnum.AFTER_TASTE_DESCRIPTORS]: [],
  [descriptorEnum.HARMONY_TOO_MUCH_DESCRIPTORS]: [],
  [descriptorEnum.HARMONY_POOR_DESCRIPTORS]: [],
  [descriptorEnum.OVERALL]: null,
  [descriptorEnum.DATE]: null,
  [descriptorEnum.STORE]: null,
  [descriptorEnum.COUNTRY]: null,
  [descriptorEnum.FARM]: null,
  [descriptorEnum.REGION]: null,
  [descriptorEnum.PROCESS]: null,
  [descriptorEnum.GRIND]: null,
  [descriptorEnum.BREWING]: null,
};

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
});

export const { descriptorUpdate } = beanSlice.actions;

export const selectDescriptorByName = (state, name) => state.bean[name];

export default beanSlice.reducer;
