---
  title: Code API
  tags: card_tabs
  permalink: false
---

## Install

Install the esds-card package from NPM:
<esds-code-snippet>
npm install @eightshapes/esds-card
</esds-code-snippet>

## Props

<esds-data-table headers='{{ componentDocs.card.props.headers | dump }}' rows='{{ componentDocs.card.props.rows | dump }}'></esds-data-table>

<esds-do-dont>
  <esds-do caption="Use the href attribute when the entire card is actionable">
    <esds-card style=" margin: 16px 0;max-width: 300px; min-height: 340px;" href="http://example.com" title="Visit example.com" description="For all your placeholder and example needs." img-src="/images/card/Florence.png"></esds-card>
  </esds-do>
  <esds-dont caption="Don't use the href attribute when the card contains separate actions">
    <esds-card style=" margin: 16px 0;max-width: 300px; min-height: 340px;" title="Our Newsletter is pretty great" img-src="/images/card/Helsinki.png">
      <esds-button slot="actions" href="http://example.com" variant="secondary" size="small">Subscribe</esds-button>
      <esds-button slot="actions" href="http://example.com" variant="secondary" size="small">Learn more</esds-button>
    </esds-card>
  </esds-dont>
</esds-do-dont>

## Slots

<esds-data-table headers='{{ componentDocs.card.slots.headers | dump }}' rows='{{ componentDocs.card.slots.rows | dump }}'></esds-data-table>

### Actions slot

More than one action can be added to the card by assigning `slot="actions"` to multiple child elements.

<esds-example-code-pair source='<esds-card
  img-src="/images/card/Interlaken Dusk.png" title="Beautiful Mountains" description="A wonderful place to visit.">
      <esds-button slot="actions" variant="secondary" size="small">Learn More</esds-button>
      <esds-button slot="actions" variant="secondary" size="small">Take Another Action</esds-button>
    </esds-card>'></esds-example-code-pair>

### Content slot

<esds-example-code-pair source='<esds-card img-src="/images/card/Wanaka.png" style="width: 300px;" title="Peaceful Lake">
      <div slot="content">
        <h4>Any content you want to pass into a card</h4>
        <p>Can be passed in via the content slot.</p>
        <ul>
          <li>Even</li>
          <li>Unordered</li>
          <li>Lists</li>
        </ul>
      </div>
    </esds-card>'></esds-example-code-pair>
