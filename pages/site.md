# Site.json File Specification

This is a very basic site structure specification used to generate some of the navigations pages and components of the website.

## Definitions

### Member

### Website

## Attributes

These are the keys to the object definition used to define the website. Not all of the attributes will be read by the application as they are dependent on the type of member. However, if they are, they must conform to this document.

### `name`

Name is one of the two required attributes for each member, along with type.

### `type`


### `children`

Children is used to define sub-members of the current member.

### `text`

Text is used tto override the string that the capitalization of the name results in. If a change is not required, this may be omitted.

### `url`

### `domain`

## Types

The types are the different kinds of members that the page can have. They are defined with the `type` attribute. The current list is tentative.

### `root`

### `directory`

### `html`

### `external`