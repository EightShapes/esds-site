import "@eightshapes/esds-example-code-pair/dist/esds-example-code-pair-web-component.js";
import "@eightshapes/esds-rendered-example/dist/esds-rendered-example-web-component.js";
import "@eightshapes/esds-code-snippet/dist/esds-code-snippet-web-component.js";
import "@eightshapes/esds-do-dont/dist/esds-do-dont-web-component.js";
import "@eightshapes/esds-icon/dist/esds-icon-web-component.js";
import "@eightshapes/esds-image-with-caption/dist/esds-image-with-caption-web-component.js";
import "@eightshapes/esds-button/dist/esds-button-web-component.js";
import "@eightshapes/esds-data-table/dist/esds-data-table-web-component.js";
import "@eightshapes/esds-card/dist/esds-card-web-component.js";
import "@eightshapes/esds-tabs/dist/esds-tabs-web-component.js";
import "@eightshapes/esds-list-group/dist/esds-list-group-web-component.js";
import "../site-components/page-shell/PageShell.js";

// LOCAL NAV LAYOUT AND BEHAVIOR
if (document.body.classList.contains("local-nav-layout")) {
  let localNavScrollMonitoring = false;

  const localNavElement = document.querySelector(
    ".esds-site-component-layout-body__local-nav-inner"
  );

  const localNavContainer = document.querySelector(
    ".esds-site-component-layout-body__local-nav"
  );

  // // Remove selected highlighting from all nav items
  const resetLocalNavSelected = () => {
    const listItems = Array.from(
      document.querySelectorAll(
        ".esds-site-component-layout-body__local-nav esds-list-item"
      )
    );
    listItems.forEach((li) => (li.selected = false));
  };

  // Listen for local nav clicks
  localNavElement.addEventListener("click", (e) => {
    const pageShell = document.querySelector("esds-site-page-shell");
    const link = e.target.closest(".esds-list-item__link");
    const listItem = e.target.closest("esds-list-item");

    pageShell.setCollapsedHeaderState();

    if (listItem) {
      resetLocalNavSelected();
      listItem.selected = true;
    }

    if (link) {
      const targetId = link.getAttribute("href");
      const target = document.getElementById(targetId.replace("#", ""));
      e.preventDefault();

      const headerOffset = 90;

      const scrollPosition =
        target.getBoundingClientRect().top - headerOffset + window.pageYOffset; // fixed header height
      window.scroll({
        top: scrollPosition,
        left: 0,
        behavior: "smooth",
      });
    }
  });

  // After the tab content has loaded
  const tabs = document.querySelector("esds-tabs");
  tabs.addEventListener("esds-tabs-tab-changed", () => {
    localNavPositionMap = {};
    const currentTabId = tabs.currentTabId;
    const windowHeight = window.innerHeight;
    const headerElements = Array.from(
      document.querySelectorAll(
        `#${currentTabId} .esds-site-component-layout-body__tab > h2, #${currentTabId} .esds-site-component-layout-body__tab > h3`
      )
    );

    // Dynamically build local nav based on tab content
    localNavElement.innerHTML = `
      <esds-list-group size="small" selected-indicators header="Contents">
        ${headerElements
          .map((he, index, headers) => {
            // create a section ID
            let headerId = he.getAttribute("id");
            if (headerId === null) {
              let calculatedHeaderId = he.textContent
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/(^-|-$)/g, "");

              let headerCounter = 0;
              headerId = calculatedHeaderId;
              while (
                headerCounter < 10 &&
                document.getElementById(headerId) !== null
              ) {
                headerId = `${calculatedHeaderId}--${headerCounter}`;
                headerCounter++;
              }

              he.setAttribute("id", headerId);
            }

            if (he.tagName === "H2") {
              return `<esds-list-item href="#${headerId}" ${
                index === 0 ? "selected" : ""
              }>${he.textContent}</esds-list-item>`;
            } else {
              return `<esds-list-item nested href="#${headerId}" ${
                index === 0 ? "selected" : ""
              }>${he.textContent}</esds-list-item>`;
            }
          })
          .join("")}
      </esds-list-group>
    `;

    localNavScrollMonitoring = true;
  });
}
