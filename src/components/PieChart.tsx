import { Doughnut } from "react-chartjs-2"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"

ChartJS.register(ArcElement, Tooltip, Legend)

type PieChartProps = {
  data: any
  options?: any
}

const PieChart = ({ data, options }: PieChartProps) => {
  return <Doughnut data={data} options={options} />
}

export default PieChart
