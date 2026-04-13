export type ConverterCategoryId =
  | "length"
  | "temperature"
  | "weight"
  | "currency";

export type ConverterUnit = {
  id: string;
  label: string;
  displayLabel: string;
  shortLabel: string;
  factor?: number;
};

export type ConverterCategory = {
  id: ConverterCategoryId;
  title: string;
  sectionLabel: string;
  defaultFromUnitId: string;
  defaultToUnitId: string;
  units: ConverterUnit[];
  convertToBase: (value: number, unitId: string) => number;
  convertFromBase: (value: number, unitId: string) => number;
};

type LinearCategoryConfig = {
  id: ConverterCategoryId;
  title: string;
  sectionLabel: string;
  defaultFromUnitId: string;
  defaultToUnitId: string;
  units: Array<ConverterUnit & { factor: number }>;
};

function createLinearCategory(
  config: LinearCategoryConfig,
): ConverterCategory {
  const factors = Object.fromEntries(
    config.units.map((unit) => [unit.id, unit.factor]),
  );

  return {
    ...config,
    convertToBase: (value, unitId) => value * factors[unitId],
    convertFromBase: (value, unitId) => value / factors[unitId],
  };
}

const temperatureCategory: ConverterCategory = {
  id: "temperature",
  title: "Temperature",
  sectionLabel: "TEMPERATURE CONVERSION",
  defaultFromUnitId: "celsius",
  defaultToUnitId: "fahrenheit",
  units: [
    {
      id: "celsius",
      label: "Celsius",
      displayLabel: "Celsius",
      shortLabel: "C",
    },
    {
      id: "fahrenheit",
      label: "Fahrenheit",
      displayLabel: "Fahrenheit",
      shortLabel: "F",
    },
    {
      id: "kelvin",
      label: "Kelvin",
      displayLabel: "Kelvin",
      shortLabel: "K",
    },
  ],
  convertToBase: (value, unitId) => {
    switch (unitId) {
      case "fahrenheit":
        return ((value - 32) * 5) / 9;
      case "kelvin":
        return value - 273.15;
      case "celsius":
      default:
        return value;
    }
  },
  convertFromBase: (value, unitId) => {
    switch (unitId) {
      case "fahrenheit":
        return (value * 9) / 5 + 32;
      case "kelvin":
        return value + 273.15;
      case "celsius":
      default:
        return value;
    }
  },
};

export const converterCategories: ConverterCategory[] = [
  createLinearCategory({
    id: "length",
    title: "Length",
    sectionLabel: "LENGTH CONVERSION",
    defaultFromUnitId: "meter",
    defaultToUnitId: "foot",
    units: [
      {
        id: "meter",
        label: "Meter",
        displayLabel: "Meters",
        shortLabel: "Meters",
        factor: 1,
      },
      {
        id: "foot",
        label: "Foot",
        displayLabel: "Feet",
        shortLabel: "Feet",
        factor: 0.3048,
      },
      {
        id: "inch",
        label: "Inch",
        displayLabel: "Inches",
        shortLabel: "Inches",
        factor: 0.0254,
      },
      {
        id: "centimeter",
        label: "Centimeter",
        displayLabel: "Centimeters",
        shortLabel: "Centimeters",
        factor: 0.01,
      },
      {
        id: "yard",
        label: "Yard",
        displayLabel: "Yards",
        shortLabel: "Yards",
        factor: 0.9144,
      },
      {
        id: "kilometer",
        label: "Kilometer",
        displayLabel: "Kilometers",
        shortLabel: "Kilometers",
        factor: 1000,
      },
      {
        id: "mile",
        label: "Mile",
        displayLabel: "Miles",
        shortLabel: "Miles",
        factor: 1609.344,
      },
    ],
  }),
  temperatureCategory,
  createLinearCategory({
    id: "weight",
    title: "Weight",
    sectionLabel: "WEIGHT CONVERSION",
    defaultFromUnitId: "kilogram",
    defaultToUnitId: "pound",
    units: [
      {
        id: "kilogram",
        label: "Kilogram",
        displayLabel: "Kilograms",
        shortLabel: "Kilograms",
        factor: 1,
      },
      {
        id: "gram",
        label: "Gram",
        displayLabel: "Grams",
        shortLabel: "Grams",
        factor: 0.001,
      },
      {
        id: "pound",
        label: "Pound",
        displayLabel: "Pounds",
        shortLabel: "Pounds",
        factor: 0.45359237,
      },
      {
        id: "ounce",
        label: "Ounce",
        displayLabel: "Ounces",
        shortLabel: "Ounces",
        factor: 0.028349523125,
      },
      {
        id: "stone",
        label: "Stone",
        displayLabel: "Stone",
        shortLabel: "Stone",
        factor: 6.35029318,
      },
    ],
  }),
  createLinearCategory({
    id: "currency",
    title: "Currency",
    sectionLabel: "CURRENCY CONVERSION",
    defaultFromUnitId: "usd",
    defaultToUnitId: "ngn",
    units: [
      {
        id: "usd",
        label: "US Dollar",
        displayLabel: "USD",
        shortLabel: "USD",
        factor: 1,
      },
      {
        id: "eur",
        label: "Euro",
        displayLabel: "EUR",
        shortLabel: "EUR",
        factor: 1.09,
      },
      {
        id: "gbp",
        label: "British Pound",
        displayLabel: "GBP",
        shortLabel: "GBP",
        factor: 1.28,
      },
      {
        id: "ngn",
        label: "Nigerian Naira",
        displayLabel: "NGN",
        shortLabel: "NGN",
        factor: 0.00063,
      },
      {
        id: "cad",
        label: "Canadian Dollar",
        displayLabel: "CAD",
        shortLabel: "CAD",
        factor: 0.73,
      },
      {
        id: "jpy",
        label: "Japanese Yen",
        displayLabel: "JPY",
        shortLabel: "JPY",
        factor: 0.0066,
      },
    ],
  }),
];

export function getCategoryById(categoryId: ConverterCategoryId) {
  return (
    converterCategories.find((category) => category.id === categoryId) ??
    converterCategories[0]
  );
}

export function getUnitById(category: ConverterCategory, unitId: string) {
  return category.units.find((unit) => unit.id === unitId) ?? category.units[0];
}

export function convertValue(
  category: ConverterCategory,
  fromUnitId: string,
  toUnitId: string,
  value: number,
) {
  const baseValue = category.convertToBase(value, fromUnitId);
  return category.convertFromBase(baseValue, toUnitId);
}
