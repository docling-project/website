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


## Building the Static Site

The site is fully static — every page is pre-rendered to HTML — so it can be
published on GitHub Pages (or any static host). Build it with:

```bash
uv run website/build.py
```

This renders all pages and copies the assets into `dist/`. Useful options:

- `--out <dir>`: output directory (default `dist`).
- `--base-path <prefix>`: URL prefix for root-relative links, needed when the
  site is served from a sub-path. For the GitHub project page at
  `docling-project.github.io/website`, build with `--base-path /website`
  (the repository name). Leave empty for a root/custom-domain deploy.
- `--cname <domain>`: write a `CNAME` file for a custom domain (e.g. `docling.ai`).

To preview a sub-path build locally:

```bash
uv run website/build.py --base-path /website
mkdir -p /tmp/site/website && cp -r dist/. /tmp/site/website/
python3 -m http.server 5055 --directory /tmp/site
# open http://localhost:5055/website/
```

## Deployment

Pushes to `main` are built and deployed to GitHub Pages automatically by
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) and served at
[docling.ai](https://docling.ai). The workflow builds at the root (`BASE_PATH=/`)
and writes a `CNAME` for the custom domain.

Requires, once: **Settings → Pages → Build and deployment → Source: GitHub Actions**,
and the custom domain configured under **Settings → Pages → Custom domain**.

### Serving from the GitHub project sub-path instead

To serve from `docling-project.github.io/website` rather than the custom domain,
override the defaults via repository variables under
**Settings → Secrets and variables → Actions → Variables**:

- `BASE_PATH` = `/website`
- `CNAME` = *(empty)*


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
