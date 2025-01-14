import { Dropdown, Flex } from "antd";
import Button from "@components/Button";
import type { MenuProps } from "antd";

const items = [
  {
    key: "1",
    label: "1st item",
  },
  {
    key: "2",
    label: "2nd item",
  },
  {
    key: "3",
    label: "3rd item",
  },
];

const onMenuClick: MenuProps["onClick"] = (e) => {
  console.log("click", e);
};

const App = () => {
  return (
    <Flex vertical gap="small">
      <Flex gap="small" wrap>
        <Button type="primary">Primary</Button>
        <Button success>Success</Button>
        <Button warning>Warning</Button>
        <Button danger>Danger</Button>
      </Flex>
      <Flex gap="small" wrap>
        <Button type="primary" variant="outlined">
          Primary
        </Button>
        <Button success variant="outlined">
          Success
        </Button>
        <Button warning variant="outlined">
          Warning
        </Button>
        <Button danger variant="outlined">
          Danger
        </Button>
      </Flex>
      <Flex gap="small" wrap>
        <Button>Default Button</Button>
        <Button type="dashed">Dashed Button</Button>
        <Button type="text">Text Button</Button>
        <Button type="link">Link Button</Button>
        <div style={{ background: "grey" }}>
          <Button warning type="primary" ghost>
            Ghost
          </Button>
        </div>
        <Button type="primary" loading>
          Loading
        </Button>
        <Button type="primary" disabled>
          Disabled
        </Button>
      </Flex>
      <Flex gap="small" wrap>
        <Dropdown.Button
          menu={{
            items,
            onClick: onMenuClick,
          }}
        >
          Actions
        </Dropdown.Button>
      </Flex>
    </Flex>
  );
};

export default App;
