---
  title: Accessibility
  tags: card_tabs
  permalink: false
---

## Accessibility considerations

### Focus

When the `href` attribute is used on a card, the entire card becomes a single, focusable action. The `tab` key will set focus and `enter` will navigate to the `href`'s location.

<esds-rendered-example label="href attribute (single focus target)">
  <esds-card style="width: 350px" img-src="/images/card/New Zealand Mount Cook.png" title="View the latest release" description="We've moved mountains with our latest changes." href="http://example.com"></esds-card>
</esds-rendered-example>

When individual actions are added via the `actions` slot on the card, the card itself will not be focusable. Instead the `tab` key will set focus on each individual action.
<esds-rendered-example label="Two actions (multiple focus targets)">
<esds-card style="width: 350px" img-src="/images/card/Interlaken Dusk.png" title="Release details" description="Learn more about the release details or download the latest design assets">
<esds-button slot="actions" size="small" variant="secondary">View Release Details</esds-button>
<esds-button slot="actions" size="small" variant="secondary">Download Design Assets</esds-button>
</esds-card>
</esds-rendered-example>

### Screen reader behavior

Visually, the card's image precedes its text content, but in the rendered markup this is not the case. The text content comes first and the image is set to `role="presentation"` to denote its secondary role as a supporting visual for the content.

When a screen reader focuses the card, the card's title will be read.

<esds-rendered-example>
<esds-card style="width: 350px" href="http://example.com/v4" title="Release details" description="Learn more about the release details or download the latest design assets" img-src="/images/landscape.png">
</esds-card>
</esds-rendered-example>
