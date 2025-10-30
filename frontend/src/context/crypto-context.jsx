import { useEffect, useState, createContext, useContext } from "react";
import { fakeFetchAssets, fakeFetchCrypto } from "../api";
import { percentDifference } from "../utils";

export const CryptoContext = createContext({
  assets: [],
  crypto: [],
  loading: false,
});

function CryptoContextProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [crypto, setCrypto] = useState([]);
  const [assets, setAssets] = useState([]);

  function mapAssets(assets, result) {
    return assets.map((asset) => {
      const coin = result.find((c) => c.id === asset.id);

      return {
        grow: asset.price < coin.price,
        growPercent: percentDifference(asset.price, coin.price),
        totalAmount: asset.amount * coin.price,
        totalProfit: asset.amount * coin.price - asset.amount * asset.price,
        name: coin.name,
        ...asset,
      };
    });
  }

  useEffect(() => {
    async function preload() {
      setLoading(true);

      const { result } = await fakeFetchCrypto();
      const assets = await fakeFetchAssets();

      setCrypto(result);

      setAssets(mapAssets(assets, result));
      setLoading(false);
    }

    preload();
  }, []);

  function addAsset(newAsset) {
    setAssets((prev) => mapAssets([...prev, newAsset], crypto));
  }

  return (
    <CryptoContext.Provider
      value={{
        loading,
        crypto,
        assets,
        // @ts-ignore
        addAsset,
      }}
    >
      {children}
    </CryptoContext.Provider>
  );
}

export default CryptoContextProvider;

export function useCrypto() {
  return useContext(CryptoContext);
}
