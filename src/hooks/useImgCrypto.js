import { useState, useEffect } from "react";

export default function useImgCrypto(moeda, cryptoList) {
    const [urlImg, setUrlImg] = useState("https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png?1696501400");

    useEffect(() => {
        if (!moeda || !cryptoList) return;

        const crypto = cryptoList.find(crypto => crypto.id === moeda);
        if (crypto && crypto.image) {
            setUrlImg(crypto.image);
        }
    }, [moeda, cryptoList]);

    return urlImg;
}
