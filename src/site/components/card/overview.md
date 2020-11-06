---
title: Overview
tags: card_tabs
permalink: false
---

## Anatomy

Cards can be configured individually and arranged collectively to meet different thematic, messaging, and user goals.

<esds-image-with-caption src="/images/card/Anatomy.png"></esds-image-with-caption>

## Elements

### Thumbnail & Title 

Always include a [thumbnail](/components/thumbnail/) and title.

<esds-example-code-pair source='<esds-card title="Wanaka" img-src="/images/card/Wanaka.png"></esds-card>'></esds-example-code-pair>

### Description

Optionally include a description to elaborate on the object's meaning or context.

<esds-example-code-pair hidden-code source='<esds-card title="Wanaka" description="The most photogenic tree in New Zealand if not the world." img-src="/images/card/Wanaka.png"></esds-card>'></esds-example-code-pair>

### Metadata

Include metadata to distinguish card types, include a date / time stamp, or other relevant and brief context.

<esds-example-code-pair hidden-code source='<esds-card title="Design System Intermediaries" description="Relating to the Distributors, Translators, and Themers In Between." metadata="Feb 11, 2018 • 8 min read" img-src="/images/card/medium.png"></esds-card>'></esds-example-code-pair>

## Slots

Card slots for content and actions enable flexible displays to suit the needs of specific experiences. All slotted content must use existing system UI components and/or content styled with the system's visual style.

### Content area

Customize additional content in the `content-area` slot, such as pricing, metadata, and other indicators.

### Action area

Include actions in the `action-area` slot, such as one or more [buttons] or [icon buttons].

<esds-example-code-pair hidden-code source='<esds-card title="Example Card on Doc Site"></esds-card>'>
<esds-rendered-example label="default">
  <esds-card title="Content" img-src="/images/card/Vernazza.png"></esds-card>
</esds-rendered-example>
</esds-example-code-pair>

## Size

Match the size of adjacent elements when presenting a `small`, `medium` (default), or `large` card.

### Small

<esds-example-code-pair source='<esds-card size="small" title="Wanaka" img-src="/images/card/Wanaka.png"></esds-card>'></esds-example-code-pair>

### Medium

<esds-example-code-pair source='<esds-card size="medium" title="Wanaka" img-src="/images/card/Wanaka.png"></esds-card>'></esds-example-code-pair>

### Large

<esds-example-code-pair source='<esds-card size="large" title="Wanaka" img-src="/images/card/Wanaka.png"></esds-card>'></esds-example-code-pair>
