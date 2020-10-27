const fs = require("fs");
const path = require("path");
const buttonDocs = require("@eightshapes/esds-button/documentation/esds-button-docs.json");
const cardDocs = require("@eightshapes/esds-card/documentation/esds-card-docs.json");
const dataTableDocs = require("@eightshapes/esds-data-table/documentation/esds-data-table-docs.json");
const iconDocs = require("@eightshapes/esds-icon/documentation/esds-icon-docs.json");
const listGroupDocs = require("@eightshapes/esds-list-group/documentation/esds-list-group-docs.json");
const tabsDocs = require("@eightshapes/esds-tabs/documentation/esds-tabs-docs.json");
const thumbnailDocs = require("@eightshapes/esds-thumbnail/documentation/esds-thumbnail-docs.json");

const codeColumnNames = ["name", "attribute"];
const columnOrder = ["name", "attribute", "type", "default", "description"];

const convertDocsToPropsTableFormat = (docs) => {
  const props = docs.tags[0].properties.sort((a, b) =>
    a.name < b.name ? -1 : 1
  );

  // Iterate over all the props and aggregate all headers into one set
  let headers = new Set();
  let sortedHeaders = [];
  let unsortedHeaders = [];
  props.forEach((p) => {
    const propHeaders = Object.keys(p);
    propHeaders.forEach((h) => {
      headers.add(h);
    });
  });

  // Convert the unique set into an array
  headers = Array.from(headers);

  // Sort the headers array based on columnOrder
  sortedHeaders = columnOrder.filter((h) => headers.includes(h));
  unsortedHeaders = headers.filter((h) => !columnOrder.includes(h));
  headers = [...sortedHeaders, ...unsortedHeaders];

  let rows = props.map((pRow) => {
    let rowArray = [];

    headers.forEach((h) => {
      let value = pRow[h];
      if (value === undefined) {
        value = "-";
      } else if (value.includes("|")) {
        value = `One of:<br/>${value.replace(/\|/g, "<br/>")}`;
      }
      rowArray.push(value);
    });
    return rowArray;
  });

  headers = headers.map((h) =>
    codeColumnNames.includes(h) ? { text: h, code: true } : h
  );

  return {
    headers,
    rows,
  };
};

const convertDocsToSlotsTableFormat = (docs) => {
  const slots = docs.tags[0].slots.sort((a, b) => (a.name < b.name ? -1 : 1));

  // Iterate over all the slots and aggregate all headers into one set
  let headers = new Set();
  let sortedHeaders = [];
  let unsortedHeaders = [];
  slots.forEach((p) => {
    const propHeaders = Object.keys(p);
    propHeaders.forEach((h) => {
      headers.add(h);
    });
  });

  // Convert the unique set into an array
  headers = Array.from(headers);

  // Sort the headers array based on columnOrder
  sortedHeaders = columnOrder.filter((h) => headers.includes(h));
  unsortedHeaders = headers.filter((h) => !columnOrder.includes(h));
  headers = [...sortedHeaders, ...unsortedHeaders];

  let rows = slots.map((pRow) => {
    let rowArray = [];

    headers.forEach((h) => {
      let value = pRow[h];
      if (value === undefined) {
        value = "-";
      } else if (value.includes("|")) {
        value = `One of:<br/>${value.replace(/\|/g, "<br/>")}`;
      }
      rowArray.push(value);
    });
    return rowArray;
  });

  headers = headers.map((h) =>
    codeColumnNames.includes(h) ? { text: h, code: true } : h
  );

  return {
    headers,
    rows,
  };
};

const componentProps = {
  button: {
    props: convertDocsToPropsTableFormat(buttonDocs),
  },
  card: {
    props: convertDocsToPropsTableFormat(cardDocs),
    slots: convertDocsToSlotsTableFormat(cardDocs),
  },
  dataTable: {
    props: convertDocsToPropsTableFormat(dataTableDocs),
  },
  icon: {
    props: convertDocsToPropsTableFormat(iconDocs),
  },
  listGroup: {
    props: convertDocsToPropsTableFormat(listGroupDocs),
  },
  tabs: {
    props: convertDocsToPropsTableFormat(tabsDocs),
  },
  thumbnail: {
    props: convertDocsToPropsTableFormat(thumbnailDocs),
  },
};

if (!fs.existsSync("src/_data")) {
  fs.mkdirSync("src/_data");
}

fs.writeFileSync(
  path.join("src", "_data", "componentDocs.json"),
  JSON.stringify(componentProps)
);
