import { useEffect, useState } from "react";
import axios from "axios";

export default function useCryptoList() {
  const [cryptoList, setCryptoList] = useState([]);
  
  useEffect(() => {
    const cacheKey = "cryptoListCache";
    const cacheExpiration = 5 * 60 * 1000; // 5 minutos de cache
    const cachedData = localStorage.getItem(cacheKey);
    const cachedTime = localStorage.getItem(`${cacheKey}_time`);

    if (cachedData && cachedTime && Date.now() - cachedTime < cacheExpiration) {
      setCryptoList(JSON.parse(cachedData));
      return;
    }

    axios.get("https://api.coingecko.com/api/v3/coins/markets", {
      params: {
        vs_currency: "usd",
        order: "market_cap_desc",
        per_page: 30,
        page: 1,
      },
    })
    .then((response) => {
      setCryptoList(response.data);
      localStorage.setItem(cacheKey, JSON.stringify(response.data));
      localStorage.setItem(`${cacheKey}_time`, Date.now());
    })
    .catch((error) => {
      console.error("Erro ao buscar os dados", error);
    });

  }, []);

  return cryptoList;
}
