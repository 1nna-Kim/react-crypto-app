import { Layout, Spin } from "antd";

import { useContext } from "react";
import { CryptoContext } from "../../context/crypto-context";
import { AppHeader } from "./AppHeader";
import { AppSider } from "./AppSider";
import { AppContent } from "./AppContent";

export function AppLayout() {
  const { loading } = useContext(CryptoContext);

  if (loading) return <Spin fullscreen />;

  return (
    <Layout>
      <AppHeader />
      <Layout>
        <AppSider />
        <AppContent />
      </Layout>
    </Layout>
  );
}
