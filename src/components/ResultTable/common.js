import { Table } from "antd";

export default (selectedRowKeys, setSelectedRowKeys) => ({
  rowKey: "id",

  rowSelection: {
    selectedRowKeys: selectedRowKeys,
    onChange: (newSelectedRowKeys) => setSelectedRowKeys(newSelectedRowKeys),

    selections: [
      Table.SELECTION_ALL,
      {
        key: "odd",
        text: "Select Odd Row",
        onSelect: (changableRowKeys) => {
          const newSelectedRowKeys = changableRowKeys.filter((key, index) => {
            return index % 2 === 0;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
      {
        key: "even",
        text: "Select Even Row",
        onSelect: (changableRowKeys) => {
          const newSelectedRowKeys = changableRowKeys.filter((key, index) => {
            return index % 2 !== 0;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
      {
        key: "toggle_current_page",
        text: "Toggle Current Page",
        onSelect: (changableRowKeys) => {
          const keySet = new Set(selectedRowKeys);
          changableRowKeys.forEach((key, index) => {
            if (keySet.has(key)) {
              keySet.delete(key);
            } else {
              keySet.add(key);
            }
          });

          const keys = Array.from(keySet);
          setSelectedRowKeys(keys);
        },
      },
    ],
  },
});
