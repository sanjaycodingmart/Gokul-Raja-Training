import React, { Fragment } from "react";
import { useTable, usePagination } from "react-table";
import firebase from "../firebase.js";

import "./entrytable.css";

import makeData from "./makeData";

let items = [];
let filed = null;
const EditableCell = ({
  cell: { value: initialValue },
  row: { index },
  column: { id },
  updateMyData // This is a custom function that we supplied to our table instance
}) => {
  // We need to keep and update the state of the cell normally
  const [value, setValue] = React.useState(initialValue);

  const onChange = e => {
    setValue(e.target.value);
  };

  // We'll only update the external data when the input is blurred
  const onBlur = () => {
    updateMyData(index, id, value);
  };

  // If the initialValue is changed externall, sync it up with our state
  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return <input value={value} onChange={onChange} onBlur={onBlur} />;
};

// Set our editable cell renderer as the default Cell renderer
const defaultColumn = {
  Cell: EditableCell
};

// Be sure to pass our updateMyData and the skipPageReset option
function Table({ columns, data, updateMyData, skipPageReset }) {
  // For this example, we're using pagination to illustrate how to stop
  // the current page from resetting when our data changes
  // Otherwise, nothing is different here.
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      // use the skipPageReset option to disable page resetting temporarily
      autoResetPage: !skipPageReset,
      // updateMyData isn't part of the API, but
      // anything we put into these options will
      // automatically be available on the instance.
      // That way we can call this function from our
      // cell renderer!
      updateMyData
    },
    usePagination
  );

  // Render the UI for your table
  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

function EntryTable(props) {
  const columns = React.useMemo(
    () => [
      {
        Header: props.file,
        columns: props.titles
      }
      // {
      //   Header: 'Info',
      //   columns: [
      //     {
      //       Header: 'Age',
      //       accessor: 'age',
      //     },
      //     {
      //       Header: 'Department',
      //       accessor: 'department',
      //     },
      //     {
      //       Header: 'CGPA',
      //       accessor: 'cgpa',
      //     },
      //     {
      //       Header: 'Placed/Not',
      //       accessor: 'placed',
      //     },
      //   ],
      // },
    ],
    []
  );
  console.log(columns);

  const [data, setData] = React.useState(() =>
    makeData(props.row, props.respond)
  );
  const [originalData] = React.useState(data);
  const [skipPageReset, setSkipPageReset] = React.useState(false);
  const showData = () => {
   
    console.log(data);
    var filed = {};
    filed = JSON.stringify(data);
    let firebased = firebase.database().ref(props.user+"/files/");
    // let childIndex=Object.keys(firebased).length;
    firebased.child(props.file).set({
      filed
    });
  };
  // We need to keep the table from resetting the pageIndex when we
  // Update data. So we can keep track of that flag with a ref.

  // When our cell renderer calls updateMyData, we'll use
  // the rowIndex, columnId and new value to update the
  // original data
  const updateMyData = (rowIndex, columnId, value) => {
    // We also turn on the flag to not reset the page
    setSkipPageReset(true);
    setData(old =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...old[rowIndex],
            [columnId]: value
          };
        }
        return row;
      })
    );
  };

  // After data chagnes, we turn the flag back off
  // so that if data actually changes when we're not
  // editing it, the page is reset
  React.useEffect(() => {
    setSkipPageReset(false);
  }, [data]);

  // Let's add a data resetter/randomizer to help
  // illustrate that flow...
  const resetData = () => setData(originalData);

  return (
    <Fragment>
      <button onClick={showData} style={{ float: "left" }}>
        Save Table
      </button>
      <button onClick={resetData} style={{ float: "right" }}>
        Reset Table
      </button>

      <Table
        columns={columns}
        data={data}
        updateMyData={updateMyData}
        skipPageReset={skipPageReset}
      />
    </Fragment>
  );
}

export default EntryTable;
