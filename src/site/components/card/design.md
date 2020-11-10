---
title: Design
tags: card_tabs
permalink: false
---

## Use When

- Summarizing an object as an entry point into a more detailed display.
- Previewing summaries comparatively across one or more choices.
- Displaying a visual gallery or response to search inquiry. Also consider the [List Group](/components/list-group/) and [Data Table](/components/data-table/) components that can include thumbnail images.

### Don't Use When

- No detailed content or page is available. Instead, use an [image](/components/image/), [thumbnail](/components/thumbnail/) with [overlay](/components/overlay/), or custom component.
- Adjacent objects are considerably different conceptually, risking confusion.

## Behavior

<esds-do-dont>
  <esds-do
    caption="Limit to no more than two buttons in the action slot, with only one as a primary button."
    src="/images/card/do-dont/behavior-do-2.png"
  ></esds-do>
  <esds-dont
    caption="Include more than two buttons or more than one primary button in the action slot."
    src="/images/card/do-dont/behavior-dont-2.png"
  ></esds-dont>
</esds-do-dont>

<esds-do-dont>
  <esds-do
    caption="Disable card clickability when an actions slot is non-empty."
    src="/images/card/do-dont/behavior-do-3.png"
  ></esds-do>
  <esds-dont
    caption="Enable an entire card to be clickable when an actions slot is nonempty."
    src="/images/card/do-dont/behavior-dont-3.png"
  ></esds-dont>
</esds-do-dont>

## Content

<esds-do-dont>
  <esds-do
    caption="Limit metadata, title, and description to one, two and three lines, respectively."
    src="/images/card/do-dont/editorial-do-1.png"
  ></esds-do>
  <esds-dont
    caption="Include long text passages for metadata, title, or description fields."
    src="/images/card/do-dont/editorial-dont-1.png"
  ></esds-dont>
</esds-do-dont>

## Layout

Cards may be arranged in a variety of ways: horizontally, vertically, in a grid of rows and columns, or even as masonry.

<esds-do-dont>
  <esds-do
    caption="Maintain consistent height and width of all cards when arranged in a non-masonry grid."
    src="/images/card/do-dont/layout-do-1.png"
  ></esds-do>
  <esds-do
    caption="Layout cards in masonry arrangements, maintaining consistent vertical and horizontal gutters. (Not yet supported via code)"
    src="/images/card/do-dont/layout-do-2.png"
  ></esds-do>
</esds-do-dont>

