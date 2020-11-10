---
title: Overview
tags: card_tabs
permalink: false
---

## Anatomy

Cards can be configured individually and arranged collectively to meet different thematic, messaging, and user goals.

<esds-image-with-caption src="/images/card/Anatomy.png"></esds-image-with-caption>

## Elements

### Default

Always include a [thumbnail](/components/thumbnail/) and succinct, clear title of the object.

<esds-example-code-pair>
  <esds-card 
    title="Wanaka" 
    img-src="/images/card/Wanaka.png"
    style="width: 320px" 
  ></esds-card>
</esds-example-code-pair>

By default, an entire Card block is interactive and linked to a destination via the `href` attribute. Omit this property when including one or more actions in the `actions` slot.

### Description

Optionally include a longer description to elaborate on the object's meaning or context.

<esds-example-code-pair hidden-code preformatted>
  <esds-card
    title="Wanaka"
    description="The most photogenic tree in New Zealand if not the world."
    img-src="/images/card/Wanaka.png"
    style="width: 320px" 
  ></esds-card>
</esds-example-code-pair>

### Metadata

Include metadata to distinguish card types, include a date / time stamp, or other relevant and brief context.

<esds-example-code-pair hidden-code >
  <esds-card
    title="Design System Intermediaries"
    description="Relating to the Distributors, Translators, and Themers In Between." 
    metadata="Feb 11, 2018 • 8 min read"
    img-src="/images/card/medium.png"
    style="width: 320px" 
  ></esds-card>
</esds-example-code-pair>

## Slots

Card slots for content and actions enable flexible displays to suit the needs of specific experiences. All slotted content must use existing system UI components and/or content styled with the system's visual style.

### Content area

Customize additional content in the `content` slot, such as pricing, metadata, and other indicators.

<esds-example-code-pair hidden-code >
  <esds-card 
    title="Peaceful Lake"
    img-src="/images/card/Wanaka.png" 
    style="width: 300px;" 
    >
    <div slot="content">
      <h4>Any content you want to pass into a card</h4>
      <p>Can be passed in via the content slot.</p>
      <ul>
        <li>Even</li>
        <li>Unordered</li>
        <li>Lists</li>
      </ul>
    </div>
  </esds-card>
</esds-example-code-pair>

### Action area

Include actions in the `actions` slot, such as one or more buttons or icon buttons.

<esds-example-code-pair hidden-code>
  <esds-card 
    title="Wanaka" 
    size="small" 
    img-src="/images/card/Wanaka.png"
    style="width: 320px;"
    >
    <div slot="actions">
      <esds-button text="Action 1" size="small" variant="primary"></esds-button>
      <esds-button text="Action 2" size="small" variant="outline"></esds-button>
    </div>
  </esds-card>
</esds-example-code-pair>

## Size

Match the size of adjacent elements when presenting a `small`, `medium` (default), or `large` card.

### Small

<esds-example-code-pair hidden-code>
  <esds-card 
    size="small" 
    title="Wanaka" 
    img-src="/images/card/Wanaka.png"
    style="width: 260px" 
  ></esds-card>
</esds-example-code-pair>

### Medium

<esds-example-code-pair hidden-code>
  <esds-card 
    style="width: 320px" 
    size="medium" 
    title="Wanaka" 
    img-src="/images/card/Wanaka.png"
  ></esds-card>
</esds-example-code-pair>

### Large

<esds-example-code-pair hidden-code>
  <esds-card 
    style="width: 380px" 
    size="large" 
    title="Wanaka" 
    img-src="/images/card/Wanaka.png"
  ></esds-card>
</esds-example-code-pair>
