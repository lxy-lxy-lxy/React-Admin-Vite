import ProSearch from "@/components/ProSearch";
import { Form, Input } from "antd";

const Search = () => {
  return (
    <ProSearch
      formName="toolSearch"
      childNode={[
        {
          element: (
            <Form.Item label={global.t("搜索1")} name="search1">
              <Input />
            </Form.Item>
          ),
        },
        {
          element: (
            <Form.Item label={global.t("名称1")} name="name1">
              <Input />
            </Form.Item>
          ),
        },
        {
          element: (
            <Form.Item label={global.t("搜索2")} name="search2">
              <Input />
            </Form.Item>
          ),
        },
      ]}
    />
  );
};

export default Search;
