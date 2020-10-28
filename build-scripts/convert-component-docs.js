const fs = require("fs");
const path = require("path");
const buttonDocs = require("@eightshapes/esds-button/documentation/esds-button-docs.json");
const cardDocs = require("@eightshapes/esds-card/documentation/esds-card-docs.json");
const dataTableDocs = require("@eightshapes/esds-data-table/documentation/esds-data-table-docs.json");
const iconDocs = require("@eightshapes/esds-icon/documentation/esds-icon-docs.json");
const listGroupDocs = require("@eightshapes/esds-list-group/documentation/esds-list-group-docs.json");
const proseDocs = require("@eightshapes/esds-prose/documentation/esds-prose-docs.json");
const tabsDocs = require("@eightshapes/esds-tabs/documentation/esds-tabs-docs.json");
const thumbnailDocs = require("@eightshapes/esds-thumbnail/documentation/esds-thumbnail-docs.json");

const codeColumnNames = ["name", "attribute"];
const columnOrder = ["name", "attribute", "type", "default", "description"];

const convertDocsToTableFormat = (jsDoc, docType) => {
  let docs = jsDoc.tags[0][docType];

  if (docs === undefined) {
    return {};
  } else {
    const docs = jsDoc.tags[0][docType].sort((a, b) =>
      a.name < b.name ? -1 : 1
    );

    // Iterate over all the docs and aggregate all headers into one set
    let headers = new Set();
    let sortedHeaders = [];
    let unsortedHeaders = [];
    docs.forEach((p) => {
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

    let rows = docs.map((pRow) => {
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

    headers = headers.map((h) => {
      const capitalizedHeader = h.replace(/^\w/, (c) => c.toUpperCase());
      return codeColumnNames.includes(h)
        ? { text: capitalizedHeader, code: true }
        : capitalizedHeader;
    });

    return {
      headers,
      rows,
    };
  }
};

const componentMap = {
  button: buttonDocs,
  card: cardDocs,
  dataTable: dataTableDocs,
  icon: iconDocs,
  listGroup: listGroupDocs,
  prose: proseDocs,
  tabs: tabsDocs,
  thumbnail: thumbnailDocs,
};

let componentProps = {};

for (const componentName in componentMap) {
  componentProps[componentName] = {
    props: convertDocsToTableFormat(componentMap[componentName], "properties"),
    slots: convertDocsToTableFormat(componentMap[componentName], "slots"),
  };
}

if (!fs.existsSync("src/_data")) {
  fs.mkdirSync("src/_data");
}

fs.writeFileSync(
  path.join("src", "_data", "componentDocs.json"),
  JSON.stringify(componentProps)
);
