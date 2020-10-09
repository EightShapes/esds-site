import { html, LitElement } from "lit-element";
import { ifDefined } from "lit-html/directives/if-defined";
import { unsafeHTML } from "lit-html/directives/unsafe-html";
import { Slotify } from "@eightshapes/slotify";
import { EsdsIconViewaslist } from "@eightshapes/esds-icons";

/**
 * @element esds-site-page-shell
 *
 * @slot content - Accepts miscellaneous content for the page shell
 * @slot nav - Accepts content for the off-canvas site-level nav
 * @slot deck - Accepts content for the page deck
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
      // /*
      //  * Title text displayed on the card
      //  * @type String
      //  */
      // title: { type: String },
    };
  }

  constructor() {
    super();
    this.visibleNav = false;
    // // Prop Defaults
    // this.imgCropType = "cover";
    // EsdsThumbnail.define("esds-card"); // Defines <esds-card-thumbnail>
  }

  toggleNav(e) {
    this.visibleNav = !this.visibleNav;
    this.requestUpdate();
  }

  firstUpdated() {
    const header = this.querySelector(".esds-site-page-shell__header");
    header.style.height = `${header.offsetHeight}px`;
    const headerInner = this.querySelector(
      ".esds-site-page-shell__header-inner"
    );
    let headerWatcher = scrollMonitor.create(header);

    const headerContent = this.querySelector(
      ".esds-site-page-shell__header-content"
    );

    // headerContent.style.width = `${headerContent.offsetWidth}px`;

    headerWatcher.stateChange(() => {
      if (headerWatcher.isAboveViewport) {
        this.classList.add("esds-site-page-shell--fixed-header");
      }

      if (headerWatcher.isFullyInViewport) {
        this.classList.remove("esds-site-page-shell--fixed-header");
      }
    });
  }

  renderHeader() {
    if (this.hasSlotableContent("deck")) {
      return html` <div class="esds-site-page-shell__header">
        <s-slot name="deck"></s-slot>
      </div>`;
    } else {
      return html`<s-slot name="deck"></s-slot>`;
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
