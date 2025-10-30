import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { useCrypto } from "../context/crypto-context";

ChartJS.register(ArcElement, Tooltip, Legend);

export function PortfolioChart() {
  const { assets } = useCrypto();

  const data = {
    labels: assets.map((asset) => asset.name),
    // labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
      {
        label: "$ of Votes",
        data: assets.map((asset) => asset.totalAmount),
        // data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
      },
    ],
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        height: 400,
        marginBottom: "1rem",
      }}
    >
      <Pie data={data} />
    </div>
  );
}
