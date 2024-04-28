import React, { useMemo } from "react";

type Props = {
  value: string;
  valueLength: number;
  onChange: (value: string) => void;
};

export default function OTPInput({ value, valueLength, onChange }: Props) {
  const valueItems = useMemo(() => {
    const valueArray = value.split("");
    const items: Array<string> = [];

    for (let i = 0; i < valueLength; i++) {
      const char = valueArray[i];

      if (char !== undefined && new RegExp(/^\d+$/).test(char)) {
        items.push(char);
      } else {
        items.push("");
      }
    }

    return items;
  }, [value, valueLength]);

  const inputOnChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    idx: number,
  ) => {
    const target = e.target;
    let targetValue = target.value;
    const isTargetvalueDigit = new RegExp(/^\d+$/).test(targetValue);

    if (!new RegExp(/^\d+$/).test(targetValue) && targetValue !== "") {
      return;
    }

    targetValue = isTargetvalueDigit ? targetValue : " ";

    const newValue =
      value.substring(0, idx) + targetValue + value.substring(idx + 1);

    onChange(newValue);

    if (!isTargetvalueDigit) {
      return;
    }

    const nextElementSibling =
      target.nextElementSibling as HTMLInputElement | null;

    if (nextElementSibling) {
      nextElementSibling.focus();
    }
  };

  const inputOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;

    if (e.key !== "Backspace" || target.value !== "") {
      return;
    }

    const prevElementSibling =
      target.previousElementSibling as HTMLInputElement | null;

    if (prevElementSibling) {
      prevElementSibling.focus();
    }
  };
  return (
    <div className="flex items-center justify-center space-x-2">
      {valueItems.map((digit, idx) => (
        <input
          key={idx}
          type="text"
          inputMode="numeric"
          pattern="\d{1}"
          maxLength={8}
          value={digit}
          onChange={(e) => inputOnChange(e, idx)}
          onKeyDown={inputOnKeyDown}
          className="spin-button-none h-12 w-12 rounded border-2 border-gray-400 bg-transparent text-center text-xl font-semibold text-gray-400 outline-none transition focus:border-gray-700 focus:text-gray-700"
        />
      ))}
    </div>
  );
}
