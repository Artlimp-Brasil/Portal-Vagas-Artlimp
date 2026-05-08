export const onlyNumbers = (value: string) => value.replace(/\D/g, "");

export const formatPhone = (value: string) => {
  const numbers = onlyNumbers(value).slice(0, 11);

  if (numbers.length === 0) return "";
  if (numbers.length < 3) return `(${numbers}`;
  if (numbers.length < 7) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
  if (numbers.length < 11) {
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 6)}-${numbers.slice(6)}`;
  }

  return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7)}`;
};

export const formatCurrencyBRL = (value: string) => {
  const numbers = onlyNumbers(value);

  if (!numbers) return "";

  const amount = Number(numbers) / 100;

  return amount.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};