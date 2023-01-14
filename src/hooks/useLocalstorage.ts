import { useState } from "react";

export const useLocalStorage = <ValueType>(
  keyName: string,
  defaultValue: ValueType
): [ValueType, (v: ValueType) => void] => {
  const [storedValue, setStoredValue] = useState<ValueType>(() => {
    try {
      const value = window.localStorage.getItem(keyName);

      if (value) {
        return JSON.parse(value);
      } else {
        window.localStorage.setItem(keyName, JSON.stringify(defaultValue));
        return defaultValue;
      }
    } catch (err) {
      return defaultValue;
    }
  });

  const setValue = (newValue: ValueType) => {
    window.localStorage.setItem(keyName, JSON.stringify(newValue));
    setStoredValue(newValue);
  };

  return [storedValue, setValue];
};
