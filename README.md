# Docling Website
This is the official website for [Docling](https://github.com/docling-project/docling).


## Getting Started

Install the required dependencies:

```bash
uv sync
```


## Running Locally

Start the development server on http://0.0.0.0:5001

```bash
uv run website/main.py
```

When you make changes to your project, the server will automatically reload.


## Contributing
This website is part of the [Docling project](https://github.com/docling-project/docling). Your feedback and contributions are welcome!

<details>
<summary><b>Writing a Blog Post</b></summary>

### Blog Post Structure

Blog posts follow a structured format with timestamped folders and organized assets:

```
blog/
└── YYYYMMDD_HH_post-title/
    ├── post.md
    └── images/
        ├── thumbnail.jpg
        └── other-images.jpg
```

### Creating a New Blog Post

1. **Create the folder** using the naming convention `YYYYMMDD_HH_<title-with-dashes>`:
   ```bash
   mkdir -p blog/20260306_14_my-awesome-post/images
   ```

2. **Create `post.md`** with metadata and content:
   ```markdown
   ---
   title: My Awesome Post
   date: 06-03-2026
   summary: A brief description that appears in the blog listing
   thumbnail: images/thumbnail.jpg
   ---

   Your blog content starts here...

   ## Section Heading

   You can use all standard Markdown features, code blocks, images, etc.

   ![Image description](images/my-image.jpg)
   ```

3. **Add images** to the `images/` folder:
   - Thumbnail: `images/thumbnail.jpg` (recommended size: 1200x630px)
   - Other images: Reference them in your post as `images/your-image.jpg`

4. **Restart the server** to see your changes (due to caching):
   ```bash
   uv run website/main.py
   ```

### Metadata Fields

- `title`: The post title (displayed as H1)
- `date`: Publication date in `DD-MM-YYYY` format
- `summary`: Brief description shown in blog listing
- `thumbnail`: Path to thumbnail image (optional, relative to post folder)
- `category`: Post category for filtering (default: `technical`)
  - `technical` - Technical guides, tutorials, and deep dives
  - `event` - Announcements about events, conferences, or community gatherings
  - `new-feature-alert` - Announcements of new features or releases

### Markdown Support

The blog supports extended Markdown features including:
- Code syntax highlighting
- Tables
- Footnotes
- Emoji
- Admonitions/callouts
- And more (see `blog/template/post.md` for examples)

### Tips

- Use the template at `blog/template/post.md` as a reference
- Posts are sorted by date (newest first)
- The folder name's timestamp helps with organization but doesn't affect display
- Images are served from `/blog/<folder-name>/images/`

</details>


## License
This project is part of the Docling ecosystem. See the main [Docling repository](https://github.com/docling-project/docling) for license information.
