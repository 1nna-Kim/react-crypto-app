import { Layout, Typography } from "antd";
import { useCrypto } from "../../context/crypto-context";
import { PortfolioChart } from "../PortfolioChart";
import { AssetsTable } from "../AssetsTable";

const contentStyle = {
  textAlign: "center",
  minHeight: "calc(100vh - 60px)",
  color: "#fff",
  backgroundColor: "#001529",
  padding: "1rem",
};

export function AppContent() {
  const { crypto, assets } = useCrypto();

  const cryptoPriceMap = crypto.reduce((acc, c) => {
    acc[c.id] = c.price;
    return acc;
  }, {});

  return (
    <Layout.Content
      // @ts-ignore
      style={contentStyle}
    >
      <Typography.Title level={3} style={{ color: "#fff", textAlign: "left" }}>
        Portfolio:
        {assets
          .map((asset) => asset.amount * cryptoPriceMap[asset.id])
          .reduce((acc, amount) => (acc += amount), 0)
          .toFixed(2)}
        $
      </Typography.Title>
      <PortfolioChart />
      <AssetsTable />
    </Layout.Content>
  );
}
