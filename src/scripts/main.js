import "@eightshapes/esds-example-code-pair/dist/esds-example-code-pair-web-component.js";
import "@eightshapes/esds-page-navigation/dist/esds-page-navigation-web-component.js";
import "@eightshapes/esds-rendered-example/dist/esds-rendered-example-web-component.js";
import "@eightshapes/esds-icon/dist/esds-icon-web-component.js";
import "@eightshapes/esds-card/dist/esds-card-web-component.js";
import "@eightshapes/esds-tabs/dist/esds-tabs-web-component.js";
import "@eightshapes/esds-list-group/dist/esds-list-group-web-component.js";
import "../site-components/page-shell/PageShell.js";
const scrollMonitor = require("scrollmonitor");

// DECK MONITOR

// LOCAL NAV LAYOUT AND BEHAVIOR
if (document.body.classList.contains("local-nav-layout")) {
  let localNavScrollMonitoring = false;

  const localNavElement = document.querySelector(
    ".esds-site-component-layout-body__local-nav-inner"
  );

  const localNavContainer = document.querySelector(
    ".esds-site-component-layout-body__local-nav"
  );
  const localNavWatcher = scrollMonitor.create(localNavContainer, 100);

  // Listen for local nav clicks
  const resetLocalNavSelected = () => {
    const listItems = Array.from(
      document.querySelectorAll(
        ".esds-site-component-layout-body__local-nav esds-list-item"
      )
    );
    listItems.forEach((li) => (li.selected = false));
  };

  localNavElement.addEventListener("click", (e) => {
    const link = e.target.closest(".esds-list-item__link");
    const listItem = e.target.closest("esds-list-item");

    if (listItem) {
      localNavScrollMonitoring = false;
      resetLocalNavSelected();
      listItem.selected = true;
    }

    if (link) {
      const targetId = link.getAttribute("href");
      const target = document.getElementById(targetId.replace("#", ""));
      e.preventDefault();

      const pageShell = document.querySelector("esds-site-page-shell");
      const headerOffset = pageShell.classList.contains(
        "esds-site-page-shell--fixed-header"
      )
        ? 90
        : 315;

      const scrollPosition =
        target.getBoundingClientRect().top - headerOffset + window.pageYOffset; // fixed header height
      window.scroll({
        top: scrollPosition,
        left: 0,
        behavior: "smooth",
      });

      window.setTimeout(() => {
        localNavScrollMonitoring = true;
      }, 500);
    }
  });

  const tabs = document.querySelector("esds-tabs");
  // When a tab is clicked
  tabs.addEventListener("click", (e) => {
    // If a tab element is clicked
    if (e.target.closest(".esds-tabs__tab")) {
      localNavScrollMonitoring = false;
      // Scroll back to the top of the content
      window.scroll({
        top: 60,
        left: 0,
      });

      window.setTimeout(() => {
        localNavScrollMonitoring = true;
      }, 500);
    }
  });

  // After the tab content has loaded
  tabs.addEventListener("esds-tabs-tab-changed", () => {
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
          .map((he, index) => {
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

            var myElement = document.getElementById(headerId);

            const offset = windowHeight - 180;
            var elementWatcher = scrollMonitor.create(myElement, {
              top: 140,
              bottom: offset,
            });

            elementWatcher.partiallyExitViewport(function () {
              const listItem = document.querySelector(
                `esds-list-item[href="#${headerId}"]`
              );
              if (listItem && localNavScrollMonitoring) {
                resetLocalNavSelected();
                listItem.selected = true;
              }
            });

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
