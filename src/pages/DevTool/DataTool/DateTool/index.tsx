import { FC } from "react";
import type { DatePickerProps } from "antd";
import { DatePicker, Space, Card } from "antd";

const { RangePicker } = DatePicker;

const onChange: DatePickerProps["onChange"] = (date, dateString) => {
  console.log(date, dateString);
};

const DateTool: FC = () => (
  <Card>
    <Space direction="vertical">
      <DatePicker onChange={onChange} />
      <DatePicker onChange={onChange} picker="week" />
      <DatePicker onChange={onChange} picker="month" />
      <DatePicker onChange={onChange} picker="quarter" />
      <DatePicker onChange={onChange} picker="year" />
      <RangePicker />
      <RangePicker showTime />
      <RangePicker picker="week" />
      <RangePicker picker="month" />
      <RangePicker picker="quarter" />
      <RangePicker
        picker="year"
        id={{
          start: "startInput",
          end: "endInput",
        }}
        onFocus={(_, info) => {
          console.log("Focus:", info.range);
        }}
        onBlur={(_, info) => {
          console.log("Blur:", info.range);
        }}
      />
    </Space>
  </Card>
);
export default DateTool;
