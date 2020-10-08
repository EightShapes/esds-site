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
const header = document.querySelector(".esds-site-page-shell__header");
console.log(header, header.offsetHeight);
header.style.height = `${header.offsetHeight}px`;
const headerInner = document.querySelector(
  ".esds-site-page-shell__header-inner"
);
let headerWatcher = scrollMonitor.create(header);

const headerContent = document.querySelector(
  ".esds-site-page-shell__header-content"
);

headerContent.style.width = `${headerContent.offsetWidth}px`;

headerWatcher.stateChange(function () {
  console.log("HEADER STATE CHANGE");
  if (headerWatcher.isAboveViewport) {
    document.body.classList.add("esds-site-page-shell--fixed-header");
  }

  if (headerWatcher.isFullyInViewport) {
    document.body.classList.remove("esds-site-page-shell--fixed-header");
  }
});

// LOCAL NAV LAYOUT
if (document.body.classList.contains("local-nav-layout")) {
  const tabs = document.querySelector("esds-tabs");
  const localNavElement = document.querySelector(
    ".esds-site-component-layout-body__local-nav-inner"
  );

  const localNavWrap = document.querySelector(
    ".esds-site-component-layout-body__local-nav-inner"
  );
  const elementWatcher = scrollMonitor.create(localNavWrap, 100);

  elementWatcher.stateChange(function () {
    if (elementWatcher.isAboveViewport) {
      localNavWrap.classList.add(
        "esds-site-component-layout-body__local-nav-inner--fixed"
      );
    }

    if (elementWatcher.isFullyInViewport) {
      localNavWrap.classList.remove(
        "esds-site-component-layout-body__local-nav-inner--fixed"
      );
    }
  });

  tabs.addEventListener("esds-tabs-tab-changed", () => {
    console.log("tab changed");
    const currentTabId = tabs.currentTabId;
    const headerElements = Array.from(
      document.querySelectorAll(
        `#${currentTabId} .esds-site-component-layout-body__tab > h2, #${currentTabId} .esds-site-component-layout-body__tab > h3`
      )
    );

    localNavElement.innerHTML = `
      <esds-list-group size="small" selected-indicators>
        ${headerElements
          .map((he) => {
            let calculatedHeaderId = he.textContent
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "-")
              .replace(/(^-|-$)/g, "");

            let headerCounter = 0;
            let headerId = calculatedHeaderId;
            while (
              headerCounter < 10 &&
              document.getElementById(headerId) !== null
            ) {
              console.log(headerId);
              headerId = `${calculatedHeaderId}--${headerCounter}`;
              headerCounter++;
            }

            he.setAttribute("id", headerId);

            var myElement = document.getElementById(headerId);

            var elementWatcher = scrollMonitor.create(myElement);

            elementWatcher.enterViewport(function () {
              // console.log("I have entered the viewport", headerId);
            });
            elementWatcher.exitViewport(function () {
              // console.log("I have left the viewport", headerId);
            });

            if (he.tagName === "H2") {
              return `<esds-list-item href="#${headerId}">${he.textContent}</esds-list-item>`;
            } else {
              return `<esds-list-item nested href="#${headerId}">${he.textContent}</esds-list-item>`;
            }
          })
          .join("")}
      </esds-list-group>
    `;
  });
}
