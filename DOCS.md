# Rule Forge Documentation

## Template

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8" />
		<title><!-- Tab title here --></title>
		<link rel="stylesheet" href="rule-forge.css" />
		<script type="text/javascript" src="rule-forge.js"></script>
	</head>
	<body>
		<div class="pages">
			<!-- Add pages here -->
		</div>
	</body>
</html>
```

## Pages

```html
<div class="pages">
	<div class="page">
		<!-- Add page content here -->
	</div>
</div>
```

### Page Sizes

Apply size to all pages by adding a size class:

```html
<div class="pages SIZE">
	<div class="page">
		<!-- Add page content here -->
	</div>
</div>
```

Apply size to individual pages by adding a size class:

```html
<div class="pages">
	<div class="page SIZE">
		<!-- Add page content here -->
	</div>
</div>
```

Page sizes:

| Class      | Size                            |
| ---------- | ------------------------------- |
| `full`     | Fit screen size                 |
| `letter`   | 8.5 in by 11 in                 |
| `a4`       | 210 mm by 297 mm                |
| `infinite` | Dynamically size to fit content |

Note: Letter is the default page size, if none is specified.

## Content Elements

### Text

Superscript:

```html
<sup>superscript text</sup>
```

Subscript:

```html
<sub>subscript text</sub>
```

Bold text:

```html
<b>bold text</b>
```

Italic text:

```html
<i>italic text</i>
```

Highlighted text:

```html
<mark>Highlithed text</mark>
```

### Paragraphs

```html
<p>Paragraph text here.</p>
```

Optional style classes:

| Class    | Style                 |
| -------- | --------------------- |
| `small`  | Make the text smaller |
| `large`  | Make the text larger  |
| `bold`   | Make the text bold    |
| `italic` | Make the text italic  |

### Headings

Titles:

```html
<h1 class="title">Title</h1>
<h2 class="subtitle">Subtitle</h2>
```

Alternative titles:

```html
<h2 class="title">Smaller Title</h2>
<h1 class="subtitle">Larger Subtitle</h1>
```

Standard headings:

```html
<h1>Heading 1</h1>
<h2>Heading 2</h2>
<h3>Heading 3</h3>
<h4>Heading 4</h4>
<h5>Heading 5</h5>
<h6>Heading 6</h6>
```

### Lists

Ordered list:

```html
<ol>
	<li>List item 1</li>
	<li>List item 2</li>
	<li>List item 3</li>
</ol>
```

Unordered list:

```html
<ul>
	<li>List item A</li>
	<li>List item B</li>
	<li>List item C</li>
</ul>
```

Nested lists:

```html
<ol>
	<li>List item 1</li>
	<ul>
		<li>List item 2A</li>
		<li>List item 2B</li>
		<li>List item 2C</li>
	</ul>
	<li>List item 3</li>
</ol>
```

List style classes (may be added to entire lists or individual list items):

| Class          | Style                       |
| -------------- | --------------------------- |
| `none`         | No prefix to list items     |
| `bullet`       | Bullets                     |
| `circle`       | Empty circles               |
| `square`       | Square bullets              |
| `arrow-open`   | Open arrow bullets          |
| `arrow-closed` |  Closed arrow bullets       |
| `decimal`      | Decimal numbers             |
| `zero-decimal` | Zero-padded decimal numbers |
| `lower-alpha`  | Lowercase letters           |
| `upper-alpha`  | Uppercase letters           |

### Links

```html
<a href="insert-link-url.com">Link text</a>
```

### Tables

```html
<table>
	<thead>
		<tr>
			<td>Heading Column 1</td>
			<td>Heading Column 2</td>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>Row 1, Column 1</td>
			<td>Row 1, Column 2</td>
		</tr>
		<tr>
			<td colspan="2">Row 2, Spans 2 columns</td>
		</tr>
	</tbody>
</table>
```

### Table of Contents

Add the following code (limit one) to auto-generate a table of contents from the document's headings:

```html
<div id="table-of-contents"></div>
```

### Articles

```html
<article>
	<!-- Content with a bordered outline -->
</article>
```

### Quotes

Inline quotes:

```html
<q>quote text</q>
```

Block quote:

```html
<blockquote>
	<q>Quote text</q>
	<cite>Quote citation</cite>
</blockquote>
```

Quote style classes

| Class    | Style                               |
| -------- | ----------------------------------- |
| `barred` | Adds a left border to a block quote |
| `center` | Center a block quote                |

### Code

```html
<code>
	<!-- Monospaced code/text -->
</code>
```

### Text Inputs

```html
<input type="text" placeholder="Placeholder Text" />
```

## Layout Elements

### Line Breaks

```html
<br />
```

### Horizontal Rules

```html
<hr />
<hr class="thin" />
<hr class="thick" />
```

### Columns

```html
<div class="columns-N">
	<!-- Content here will flow into N columns. -->
</div>
```

Replace N with the number of columns (limited to 1-12).

## Styling

### Text

The following styles can be applied to any element that contains text:

| Class        | Text Style                                       |
| ------------ | ------------------------------------------------ |
| `bold`       | Bold text                                        |
| `italic`     | Italic text                                      |
| `no-bold`    | Remove bold from text that's bold by default     |
| `no-italic`  | Remove italic from text that's italic by default |
| `uppercase`  | Uppercase all text                               |
| `lowercase`  | Lowercase all text                               |
| `capitalize` | Capitalize the first letter of each word         |
| `red`        | Rex text                                         |

### Alignment

Align text and other objects by adding the following classes:

| Class          | Alignment                   |
| -------------- | --------------------------- |
| `left`         | Left aligned                |
| `right`        | Right aligned               |
| `center`       | Center aligned (horizontal) |
| `middle`       | Middle aligned (vertical)   |
| `inline`       | Inline element              |
| `inline-block` | Inline-block element        |
| `block`        | Block element (full width)  |