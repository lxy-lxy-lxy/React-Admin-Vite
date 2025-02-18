import { Bar } from "@ant-design/plots";

interface DataType {
  labelName: string;
  value: number;
}

const data: DataType[] = [
  {
    labelName: "蓝领",
    value: 110,
  },
  {
    labelName: "白领",
    value: 220,
  },
  {
    labelName: "制造业蓝领",
    value: 330,
  },
  {
    labelName: "退休人员",
    value: 440,
  },
];

const Ranking = () => {
  const config = {
    data,
    xField: "labelName",
    yField: "value",
    paddingRight: 80,
    style: {
      maxWidth: 25,
    },
    markBackground: {
      label: {
        text: ({ originData }: { originData: DataType }) => {
          return `${(originData.value / 1000) * 100}% | ${originData.value}`;
        },
        position: "right",
        dx: 80,
        style: {
          fill: "#aaa",
          fillOpacity: 1,
          fontSize: 14,
        },
      },
      style: {
        fill: "#eee",
      },
    },
    scale: {
      y: {
        domain: [0, 1000],
      },
    },
    axis: {
      x: {
        tick: false,
        title: false,
      },
      y: {
        grid: false,
        tick: false,
        label: false,
        title: false,
      },
    },
    interaction: {
      elementHighlight: false,
    },
  };
  return <Bar {...config} />;
};

export default Ranking;
