import { html, LitElement } from "lit-element";
import { Slotify } from "@eightshapes/slotify";
import { EsdsIconViewaslist } from "@eightshapes/esds-icons";
import ScrollTrigger from "@terwanerik/scrolltrigger";

/**
 * @element esds-site-page-shell
 *
 * @slot content - Accepts miscellaneous content for the page shell
 * @slot nav - Accepts content for the off-canvas site-level nav
 * @slot header - Accepts content for the page header
 */

export class EsdsSitePageShell extends Slotify(LitElement) {
  static get properties() {
    return {
      /*
       * Deck in the page header
       * @type String
       */
      deck: { type: String },

      /*
       * Title in the page header
       * @type String
       */
      title: { type: String },
    };
  }

  constructor() {
    super();
    this.visibleNav = false;
    this.trigger = new ScrollTrigger({
      scroll: {
        sustain: 0,
      },
    });
    this.collapsedHeaderHeight = 90;
    this.collapsedTitleFontSize = 24;
    this.collapsedTitleOffset = 16;
    this.collapsedLocalNavOffset = 120;
  }

  toggleNav(e) {
    this.visibleNav = !this.visibleNav;
    this.requestUpdate();
  }

  selectAnimatableHeaderElements() {
    return {
      header: this.querySelector(".esds-site-page-shell__header"),
      headerInner: this.querySelector(".esds-site-page-shell__header-inner"),
      deck: this.querySelector(".esds-site-page-shell__deck"),
      title: this.querySelector(".esds-site-page-shell__title"),
      body: this.querySelector(".esds-site-page-shell__body"),
      localNav: this.querySelector(
        ".esds-site-component-layout-body__local-nav-inner"
      ),
    };
  }

  setCollapsedHeaderState() {
    const {
      headerInner,
      deck,
      title,
      body,
      localNav,
    } = this.selectAnimatableHeaderElements();
    if (deck) {
      deck.style.height = "0px";
      deck.style.opacity = 0;
    }

    if (title) {
      title.style.fontSize = `${this.collapsedTitleFontSize}px`;
      title.style.marginBottom = "0px";
      title.style.top = `-${this.collapsedTitleOffset}px`;
    }

    if (body) {
      body.style.top = `-${this.collapsedHeaderHeight}px`;
    }

    if (headerInner) {
      headerInner.style.height = `${this.collapsedHeaderHeight}px`;
      headerInner.style.paddingTop = "0px";
      headerInner.style.paddingBottom = "0px";
      headerInner.style.position = "fixed";
    }

    if (localNav) {
      localNav.style.marginTop = `-${this.collapsedLocalNavOffset}px`;
    }
  }

  firstUpdated() {
    this.moveTabsToHeader();

    const {
      header,
      headerInner,
      deck,
      title,
      body,
      localNav,
    } = this.selectAnimatableHeaderElements();

    const initialHeaderHeight = header.getBoundingClientRect().height;
    const initialDeckHeight = deck.getBoundingClientRect().height;
    let titleStyles = window.getComputedStyle(title);
    const initialTitleFontSize = parseFloat(
      titleStyles.getPropertyValue("font-size")
    );
    const initialTitleMargin = parseFloat(
      titleStyles.getPropertyValue("margin-bottom")
    );
    const initialInnerHeaderPadding = parseFloat(
      window.getComputedStyle(headerInner).getPropertyValue("padding-top")
    );

    // set the header's height so it can't be changed
    if (header) {
      header.style.height = `${initialHeaderHeight}px`;
    }

    if (deck) {
      deck.style.height = `${initialDeckHeight}px`;
    }

    const heightDiff = initialHeaderHeight - this.collapsedHeaderHeight;
    const tickHeight = heightDiff / this.collapsedHeaderHeight;
    const deckTickHeight = initialDeckHeight / this.collapsedHeaderHeight;
    const tickTitleFontSize =
      (initialTitleFontSize - this.collapsedTitleFontSize) /
      this.collapsedHeaderHeight;
    const tickTitleMargin = initialTitleMargin / this.collapsedHeaderHeight;
    const tickHeaderPadding =
      initialInnerHeaderPadding / this.collapsedHeaderHeight;
    const tickOpacity = 1 / this.collapsedHeaderHeight;
    const tickTitleOffset =
      this.collapsedTitleOffset / this.collapsedHeaderHeight;
    const tickLocalNavOffset =
      this.collapsedLocalNavOffset / this.collapsedHeaderHeight;

    this.trigger.add(header, {
      toggle: {
        callback: {
          visible: (scrollingHeader) => {
            const position = scrollingHeader.element.getBoundingClientRect().y;
            if (position <= 0 && position >= -this.collapsedHeaderHeight) {
              if (position < 0) {
                headerInner.style.position = "fixed";
              } else {
                headerInner.style.position = "relative";
              }

              if (position <= -this.collapsedHeaderHeight) {
                this.setCollapsedHeaderState();
              } else if (position <= 0) {
                const absPos = Math.abs(position);
                const newHeaderHeight = Math.min(
                  initialHeaderHeight - tickHeight * absPos,
                  initialHeaderHeight
                );

                const newDeckHeight = Math.min(
                  initialDeckHeight - deckTickHeight * absPos,
                  initialDeckHeight
                );

                const newDeckOpacity = Math.min(1 - tickOpacity * absPos, 1);

                const newTitleFontSize = Math.min(
                  initialTitleFontSize - tickTitleFontSize * absPos,
                  initialTitleFontSize
                );

                const newTitleOffset = Math.min(
                  0 - tickTitleOffset * absPos,
                  0
                );

                const newTitleMargin = Math.min(
                  initialTitleMargin - tickTitleMargin * absPos,
                  initialTitleMargin
                );

                const newBodyTop = Math.min(0 - 1 * absPos, 0);

                const newHeaderPadding = Math.min(
                  initialInnerHeaderPadding - tickHeaderPadding * absPos,
                  0
                );

                const newLocalNavOffset = Math.min(
                  0 - tickLocalNavOffset * absPos,
                  0
                );

                if (deck) {
                  deck.style.height = `${newDeckHeight}px`;
                  deck.style.opacity = newDeckOpacity;
                }

                if (title) {
                  title.style.fontSize = `${newTitleFontSize}px`;
                  title.style.marginBottom = `${newTitleMargin}px`;
                  title.style.top = `${newTitleOffset}px`;
                }

                if (body) {
                  body.style.top = `${newBodyTop}px`;
                }

                if (headerInner) {
                  headerInner.style.height = `${newHeaderHeight}px`;
                  headerInner.style.paddingTop = `${newHeaderPadding}px`;
                  headerInner.style.paddingBottom = `${newHeaderPadding}px`;
                }

                if (localNav) {
                  localNav.style.marginTop = `${newLocalNavOffset}px`;
                }
              }
            } else if (position <= 0) {
              this.setCollapsedHeaderState();
            }
          },
        },
      },
      scroll: {
        sustain: 0,
      },
    });
  }

  moveTabsToHeader() {
    const tabsHolder = this.querySelector(
      ".esds-site-page-shell__tabsholder-inner"
    );
    const tabSet = this.querySelector(".esds-tabs__tablist");
    if (tabSet) {
      // Move tabs to tabsHolder in Inner Header
      tabsHolder.appendChild(tabSet);

      // When a tab is clicked
      tabSet.addEventListener("click", (e) => {
        // If a tab element is clicked
        if (e.target.closest(".esds-tabs__tab")) {
          // Scroll back to the top of the content
          window.scroll({
            top: 90,
            left: 0,
          });
        }
      });
    }
  }

  renderHeader() {
    if (this.deck || this.title) {
      return html`
        <div class="esds-site-page-shell__header">
          <div class="esds-site-page-shell__header-inner">
            <div class="esds-site-page-shell__header-content">
              <h1 class="esds-site-page-shell__title">${this.title}</h1>
              <p class="esds-site-page-shell__deck">${this.deck}</p>
            </div>
            <div class="esds-site-page-shell__tabsholder"><div class="esds-site-page-shell__tabsholder-inner esds-tabs"></div></div>
          </div>
        </div>
      </div>
      `;
    }
  }

  render() {
    return html`
      <div
        class="esds-site-page-shell ${this.visibleNav
          ? "esds-site-page-shell--visible-nav"
          : ""}"
      >
        <div class="esds-site-page-shell__nav">
          <esds-button
            @click="${this.toggleNav}"
            class="esds-site-page-shell__nav-toggle"
            icon="${EsdsIconViewaslist}"
            size="small"
            variant="flat"
          ></esds-button>
          <div class="esds-site-page-shell__nav-inner">
            <s-slot name="nav"></s-slot>
          </div>
        </div>
        <div class="esds-site-page-shell__content">
          ${this.renderHeader()}
          <div class="esds-site-page-shell__body">
            <div class="esds-site-page-shell__body-inner">
              <s-slot></s-slot>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define("esds-site-page-shell", EsdsSitePageShell);
