import { html, LitElement } from "lit-element";
import { ifDefined } from "lit-html/directives/if-defined";
import { unsafeHTML } from "lit-html/directives/unsafe-html";
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
      // /*
      //  * Text description rendered below the title
      //  * @type String
      //  */
      // description: { type: String },
      // /*
      //  * Destination when card is clicked
      //  * @type String
      //  */
      // href: { type: String },
      // /*
      //  * Image crop behavior
      //  * @type {'fill'|'contain'|'cover'|'none'|'scale-down'}
      //  */
      // imgCropType: { type: String, attribute: "img-crop-type" },
      // /*
      //  * Relative path to the image displayed on the card
      //  * @type String
      //  */
      // imgSrc: { type: String, attribute: "img-src" },
      // /*
      //  * Metadata text displayed on the card
      //  * @type String
      //  */
      // metadata: { type: String },
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
      toggle: {
        callback: {
          visible(something, other) {
            console.log(something, other);
          },
        },
      },
    });
    // // Prop Defaults
    // this.imgCropType = "cover";
    // EsdsThumbnail.define("esds-card"); // Defines <esds-card-thumbnail>
  }

  toggleNav(e) {
    this.visibleNav = !this.visibleNav;
    this.requestUpdate();
  }

  firstUpdated() {
    // const headerInner = this.querySelector(
    //   ".esds-site-page-shell__header-inner"
    // );
    // let headerWatcher = scrollMonitor.create(header);

    // const headerContent = this.querySelector(
    //   ".esds-site-page-shell__header-content"
    // );

    // // headerContent.style.width = `${headerContent.offsetWidth}px`;

    // headerWatcher.stateChange(() => {
    //   if (headerWatcher.isAboveViewport) {
    //     this.classList.add("esds-site-page-shell--fixed-header");
    //   }

    //   if (headerWatcher.isFullyInViewport) {
    //     this.classList.remove("esds-site-page-shell--fixed-header");
    //   }
    // });

    const header = this.querySelector(".esds-site-page-shell__header");
    const headerInner = this.querySelector(
      ".esds-site-page-shell__header-inner"
    );
    const deck = this.querySelector(".esds-site-page-shell__deck");
    const title = this.querySelector(".esds-site-page-shell__title");
    const body = this.querySelector(".esds-site-page-shell__body");

    const tabsHolder = this.querySelector(
      ".esds-site-page-shell__tabsholder-inner"
    );
    const tabSet = this.querySelector(".esds-tabs__tablist");

    // Move tabs to tabsHolder in Inner Header
    tabsHolder.appendChild(tabSet);

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
    header.style.height = `${initialHeaderHeight}px`;
    deck.style.height = `${initialDeckHeight}px`;

    const collapsedHeaderHeight = 90;
    const collapsedTitleFontSize = 24;
    const collapsedTitleOffset = 16;
    const heightDiff = initialHeaderHeight - collapsedHeaderHeight;
    const tickHeight = heightDiff / collapsedHeaderHeight;
    const deckTickHeight = initialDeckHeight / collapsedHeaderHeight;
    const tickTitleFontSize =
      (initialTitleFontSize - collapsedTitleFontSize) / collapsedHeaderHeight;
    const tickTitleMargin = initialTitleMargin / collapsedHeaderHeight;
    const tickHeaderPadding = initialInnerHeaderPadding / collapsedHeaderHeight;
    const tickOpacity = 1 / collapsedHeaderHeight;
    const tickTitleOffset = collapsedTitleOffset / collapsedHeaderHeight;

    // diff = 383
    // tick = 383 / 90 == 4.25
    // 0    473
    // 1    473 - 4.25 == 468.76
    // -90  90
    this.trigger.add(header, {
      toggle: {
        callback: {
          visible: (scrollingHeader) => {
            const rect = scrollingHeader.element.getBoundingClientRect();
            const position = rect.y;
            if (position < 0) {
              headerInner.style.position = "fixed";
            } else {
              headerInner.style.position = "relative";
            }

            if (position <= -collapsedHeaderHeight) {
              headerInner.style.height = `${collapsedHeaderHeight}px`;
              deck.style.height = "0px";
              deck.style.opacity = 0;
              title.style.fontSize = `${collapsedTitleFontSize}px`;
              title.style.marginBottom = "0px";
              title.style.top = `-${collapsedTitleOffset}px`;
              body.style.top = `-${heightDiff}px`;
              headerInner.style.paddingTop = "0px";
              headerInner.style.paddingBottom = "0px";
            } else if (position <= 0) {
              const newHeaderHeight = Math.min(
                initialHeaderHeight - tickHeight * Math.abs(position),
                initialHeaderHeight
              );

              const newDeckHeight = Math.min(
                initialDeckHeight - deckTickHeight * Math.abs(position),
                initialDeckHeight
              );

              const newDeckOpacity = Math.min(
                1 - tickOpacity * Math.abs(position),
                1
              );

              const newTitleFontSize = Math.min(
                initialTitleFontSize - tickTitleFontSize * Math.abs(position),
                initialTitleFontSize
              );

              const newTitleOffset = Math.min(
                0 - tickTitleOffset * Math.abs(position),
                0
              );

              const newTitleMargin = Math.min(
                initialTitleMargin - tickTitleMargin * Math.abs(position),
                initialTitleMargin
              );

              const newBodyTop = Math.min(
                0 - tickHeight * Math.abs(position),
                0
              );

              const newHeaderPadding = Math.min(
                initialInnerHeaderPadding -
                  tickHeaderPadding * Math.abs(position),
                0
              );

              headerInner.style.height = `${newHeaderHeight}px`;
              deck.style.height = `${newDeckHeight}px`;
              deck.style.opacity = newDeckOpacity;
              title.style.fontSize = `${newTitleFontSize}px`;
              title.style.marginBottom = `${newTitleMargin}px`;
              title.style.top = `${newTitleOffset}px`;
              body.style.top = `${newBodyTop}px`;
              headerInner.style.paddingTop = `${newHeaderPadding}px`;
              headerInner.style.paddingBottom = `${newHeaderPadding}px`;
            }
          },
        },
      },
    });
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
            <div class="esds-site-page-shell__tabsholder"><div class="esds-site-page-shell__tabsholder-inner"></div></div>
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
