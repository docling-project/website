---
title: This is a test post
date: 10-02-2019
summary: This test post contains the same content as the template post and can be used for testing.
---

To add a new blog:

1. Copy the _template_ folder that contains this file.
2. Rename the new folder to the identifier (without spaces) of your post.
3. Edit the new file "post.md" with your post.
4. Add your images in the new folder.


## Markdown Syntax Examples

### Headings

You can use headings from level 1 to 6:

# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6

### Text Formatting

**Bold text** using `**bold**` or `__bold__`

*Italic text* using `*italic*` or `_italic_`

***Bold and italic*** using `***text***`

`Inline code` using backticks

H~2~O subscript using `~`

X^2^ superscript using `^`

==Highlighted text== using `==text==`

~~Delete me~~ using `~~text~~`

### Lists

#### Unordered Lists

- Item 1
- Item 2
  - Nested item 2.1
  - Nested item 2.2
- Item 3

#### Ordered Lists

1. First item
2. Second item
    1. Nested item 2.1
    2. Nested item 2.2
3. Third item

### Nested Lists with Different Types

1. First ordered item
    - Unordered sub-item
    - Another sub-item
2. Second ordered item
    1. Ordered sub-item
    2. Another ordered sub-item

### Links

[Link text](https://www.docling.ai)

[Link with title](https://www.docling.ai "Link Title")

### Images

![Alt text](/img/logo.svg)

![Alt text with title](/img/logo.svg "Image Title")

### Blockquotes

> This is a blockquote.
> It can span multiple lines.
>
> > Nested blockquotes are also possible.

### Code Blocks

#### Inline Code

Use `code` in your text.

#### Fenced Code Blocks

```python
def hello_world():
    print("Hello, World!")
    return True
```

```javascript
function helloWorld() {
    console.log("Hello, World!");
    return true;
}
```

```bash
# Shell commands
echo "Hello, World!"
ls -la
```

### Tables

| Header 1 | Header 2 | Header 3 |
|----------|----------|----------|
| Cell 1   | Cell 2   | Cell 3   |
| Cell 4   | Cell 5   | Cell 6   |

| Left Aligned | Center Aligned | Right Aligned |
|:-------------|:--------------:|--------------:|
| Left         | Center         | Right         |
| Text         | Text           | Text          |

### Horizontal Rules

You can create horizontal rules using three or more hyphens, asterisks, or underscores:

---

***

___

### Escaping Characters

Use backslash to escape special characters:

\*Not italic\*

\`Not code\`

### HTML Elements

You can also use HTML elements in markdown:

<div style="color: orange;">
This text is orange.
</div>

<details>
<summary>Click to expand</summary>

Hidden content goes here.

</details>

### Footnotes

Here's a sentence with a footnote[^1].

[^1]: This is the footnote content.

### Definition Lists

Term 1
: Definition 1

Term 2
: Definition 2a
: Definition 2b

### Abbreviations

The HTML specification is maintained by the W3C.

*[HTML]: Hyper Text Markup Language
*[W3C]: World Wide Web Consortium

### Emoji

You can use emoji in your markdown! :smile: :rocket: :heart:


### Admonitions/Callouts

> **Note**
> This is a note callout.

> **Warning**
> This is a warning callout.

> **Tip**
> This is a tip callout.

### Line Breaks

To create a line break, end a line with two or more spaces,  
or use a backslash\
or use `<br>` tag.<br>
Like this.

### Comments

<!-- This is a comment and won't be visible in the rendered output -->

### Automatic Links

<https://example.com>

<email@example.com>

### Reference-Style Links

[Link text][reference]

[Another link][ref2]

[reference]: https://example.com "Optional Title"
[ref2]: https://example.org

### Images with Links

[![Alt text](/img/logo.svg)](https://example.com)
