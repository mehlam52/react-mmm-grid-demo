import { Box, Rating, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import MyGrid, { MMMGridColumnProps } from "react-mmm-grid";
import { code } from "./code";
import { CopyBlock } from "react-code-blocks";

const products = [
  {
    name: "Ice Cream",
    price: 10,
    id: 1,
  },
  {
    name: "Candy",
    price: 5,
    id: 2,
  },
  {
    name: "Cake",
    price: 20,
    id: 3,
  },
  {
    name: "Chocolate",
    price: 15,
    id: 4,
  },
  {
    name: "Lollipop",
    price: 2,
    id: 5,
  },
];

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function App() {
  const columns: MMMGridColumnProps[] = [
    {
      name: "name",
      title: "First Name",
      minWidth: 150,
    },
    {
      name: "lastName",
      title: "Last Name",
      minWidth: 150,
    },
    {
      name: "age",
      title: "Age",
      columnType: "numeric",
      minWidth: 80,
      decimals: 1,
    },
    {
      name: "gender",
      title: "Gender",
      type: "select",
      minWidth: 100,
      selectOptions: () => [
        { label: "Male", value: "male" },
        { label: "Female", value: "female" },
      ],
    },
    {
      name: "email",
      title: "Email",
      minWidth: 120,
    },
    {
      name: "city",
      title: "City",
      minWidth: 120,
      type: "select",
      selectType: "async",
      selectOptions: () => [
        { label: "Banglore", value: "Banglore" },
        { label: "Mumbai", value: "Mumbai" },
        { label: "Nasik", value: "Nasik" },
        { label: "Pune", value: "Pune" },
        { label: "Delhi", value: "Delhi" },
        { label: "Chennai", value: "Chennai" },
        { label: "Hyderabad", value: "Hyderabad" },
        { label: "Kolkata", value: "Kolkata" },
      ],
    },
    // {
    //   name: "rating",
    //   title: "Rating",
    //   minWidth: 150,
    //   render: (row: any, rowIndex: number) => (
    //     <Rating
    //       name="simple-controlled"
    //       value={row.rating || 0}
    //       onChange={(event, newValue) => {
    //         handleGridChange(rowIndex, "rating", newValue);
    //       }}
    //     />
    //   ),
    // },
    {
      name: "avatar",
      title: "Avatar",
      minWidth: 150,
      render: (row: any, rowIndex: number) => {
        // const colors = ["red", "green", "blue", "orange", "purple"];
        // const color = colors[Math.floor(Math.random() * colors.length)];
        return (
          <div>
            <div
              style={{
                display: row.name ? "flex" : "none",
                width: 35,
                height: 35,
                borderRadius: 25,
                backgroundColor: "blue",
                justifyContent: "center",
                alignItems: "center",
                margin: "auto",
                fontSize: 16,
                color: "white",
              }}
            >
              {row.name?.charAt(0).toUpperCase()}
              {row.lastName?.charAt(0).toUpperCase()}
            </div>
          </div>
        );
      },
    },
  ];

  const columns2: MMMGridColumnProps[] = [
    {
      name: "product",
      title: "Product",
      type: "select",
      selectType: "async",
      minWidth: 150,
      selectOptions: () =>
        products.map((x) => ({ label: x.name, value: x.name })),
    },
    {
      name: "price",
      title: "Price",
      columnType: "numeric",
      decimals: 2,
      minWidth: 100,
    },
    {
      name: "quantity",
      title: "Quantity",
      columnType: "numeric",
      decimals: 0,
      minWidth: 80,
    },
    {
      name: "total",
      title: "Total",
      columnType: "numeric",
      decimals: 2,
      disabled: () => true,
    },
  ];

  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const [rows, setRows] = useState([{}, {}]);
  const [activeGridRow, setActiveGridRow] = useState<any>();

  const [rows2, setRows2] = useState([{}, {}]);

  const handleGridChange = async (
    rowIndex: number,
    name: string,
    value: any,
    inputType?: "select" | "text"
  ) => {
    const temp: any = structuredClone(rows);

    let val = value;
    if (inputType === "select") {
      val = value?.label;
    }
    temp[rowIndex] = { ...temp[rowIndex], [name]: val };

    if (rowIndex >= temp.length - 2) {
      temp.push({});
    }

    setRows(temp);
  };

  const handleRowsDelete = (indexes: number[]) => {
    let temp = structuredClone(rows);
    for (let i = 0; i < indexes.length; i++) {
      temp[indexes[i]] = {};
    }
    temp = temp.filter((x: any) => x.name);
    temp.push({});
    temp.push({});

    setRows(temp);
  };

  const handleGridChange2 = async (
    rowIndex: number,
    name: string,
    value: any,
    inputType?: "select" | "text"
  ) => {
    const temp: any = structuredClone(rows2);

    if (name == "product") {
      const product = products.find((x) => x.name == value.label);
      temp[rowIndex].product = value.label;
      temp[rowIndex].price = product?.price;
    } else if (name == "quantity") {
      const price = temp[rowIndex].price || 0;
      const quantity = value;

      temp[rowIndex].quantity = quantity;
      temp[rowIndex].total = price * quantity;
    } else if (name == "price") {
      const price = value;
      const quantity = temp[rowIndex].quantity || 0;

      temp[rowIndex].price = price;
      temp[rowIndex].total = price * quantity;
    } else {
      let val = value;
      if (inputType === "select") {
        val = value?.label;
      }
      temp[rowIndex] = { ...temp[rowIndex], [name]: val };
    }

    if (rowIndex >= temp.length - 2) {
      temp.push({});
    }

    setRows2(temp);
  };

  const handleRowsDelete2 = (indexes: number[]) => {
    let temp = structuredClone(rows2);
    for (let i = 0; i < indexes.length; i++) {
      temp[indexes[i]] = {};
    }
    temp = temp.filter((x: any) => x.name);
    temp.push({});
    temp.push({});

    setRows2(temp);
  };

  return (
    <div style={{ width: "100%" }}>
      <h1 style={{ textAlign: "center", color: "gray" }}>
        <u>MMM Grid Demo</u>
      </h1>

      <Box sx={{ borderBottom: 1, borderColor: "divider", width: "100%" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Demo" {...a11yProps(0)} />
          <Tab label="Code" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <div style={{ width: "100%" }}>
        <CustomTabPanel value={value} index={0}>
          <h2 style={{ color: "gray" }}>Grid 1</h2>
          <MyGrid
            columns={columns}
            rows={rows}
            height={200}
            handleChange={handleGridChange}
            deleteRows
            handleDelete={handleRowsDelete}
            setActiveGridRow={setActiveGridRow}
            idPrefix="grid1" // should be unique for each grid in the same page
          />
          <div style={{ marginTop: 7, textAlign: "center", color: "blue" }}>
            <b>Active row first name : {activeGridRow?.name}</b>
          </div>

          <br />
          <br />
          <h2 style={{ color: "gray" }}>Grid 2</h2>
          <MyGrid
            columns={columns2}
            rows={rows2}
            height={200}
            handleChange={handleGridChange2}
            deleteRows
            handleDelete={handleRowsDelete2}
            idPrefix="grid2" // should be unique for each grid in the same page
          />
          <div style={{ marginTop: 7, textAlign: "center", color: "blue" }}>
            <b>
              Total :{" "}
              {rows2
                .reduce((acc: any, x: any) => acc + (x.total || 0), 0)
                .toFixed(2)}
            </b>
          </div>
          <br />
          <br />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          {/* code  */}
          <div
            style={{ padding: 10, backgroundColor: "#f9f9f9", width: "100%" }}
          >
            {/* <pre>{code}</pre> */}
            <CopyBlock text={code} language={"tsx"} showLineNumbers={true} />
          </div>
        </CustomTabPanel>
      </div>
    </div>
  );
}

export default App;
