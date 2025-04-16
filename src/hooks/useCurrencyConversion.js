import { useEffect, useState } from "react";
import axios from "axios";

export default function useCurrencyConversion(moeda, moedaConversao, amount, setAmountTo) {
  const [conversionResult, setConversionResult] = useState("Carregando...");

  useEffect(() => {
    if (moeda && moedaConversao && amount) {
      axios
        .get(`https://api.coingecko.com/api/v3/simple/price`, {
          params: { ids: moeda, vs_currencies: moedaConversao },
        })
        .then((response) => {
          const conversion = amount * response.data[moeda][moedaConversao];
          if (setAmountTo) setAmountTo(conversion);

          // Moeda de conversão (fiat)
          const convertedFormatted = new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: moedaConversao.toUpperCase(),
            minimumFractionDigits: 2,
          }).format(conversion);
          setConversionResult(`${moeda.toUpperCase()} = ${convertedFormatted} ${moedaConversao.toUpperCase()}`);
        })
        .catch((error) => {
          console.error("Erro ao buscar a conversão:", error);
          setConversionResult("Aguarde alguns minutos e tente novamente.");
        });
    }
  }, [moeda, moedaConversao, amount, setAmountTo]);

  return conversionResult;
}
