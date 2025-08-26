# Docling Website

This is the official website for [Docling](https://github.com/docling-project/docling), a powerful document processing tool that prepares your files for GenAI, RAG, and beyond.

## About Docling

Docling transforms messy PDFs, DOCX, and slides into clean, structured data—ready for RAG, GenAI apps, or anything downstream. It handles complex layouts, tables, and formulas so you don't have to.

### Key Features

- **🗂️ Multi-format Support**: Parse PDF, DOCX, PPTX, XLSX, HTML, audio, and images
- **📑 Deep PDF Understanding**: Layout, tables, reading order, code, and formulas
- **🧬 Unified Format**: Consistent DoclingDocument structure for all outputs
- **↪ Multiple Export Formats**: Markdown, HTML, DocTags, or lossless JSON
- **🔒 Local Processing**: Run locally for sensitive or air-gapped environments
- **🤖 AI Framework Integration**: Works with LangChain, LlamaIndex, Haystack, and more
- **🔍 OCR Support**: Handle scanned PDFs and images
- **👓 Visual Language Models**: Compatible with SmolDocling
- **🎙️ Audio Support**: Automatic speech recognition (ASR)
- **💻 Developer Friendly**: Fast CLI and easy integration

## Tech Stack

This website is built with:

- [Next.js 14](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Sass](https://sass-lang.com/) - CSS preprocessing
- [Bootstrap 5](https://getbootstrap.com/) - UI components

## Getting Started

First, install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
src/
├── app/                    # Next.js app router
├── components/            # React components
│   ├── pages/            # Page-specific components
│   ├── ui/               # Reusable UI components
│   ├── icons/            # SVG icons
│   ├── header/           # Header components
│   └── footer/           # Footer components
├── styles/               # Global styles and fonts
├── lib/                  # Utilities and types
└── utils/                # Constants and helpers
```

## Learn More

- **Concepts**: [Learn Docling fundamentals](https://docling-project.github.io/docling/concepts/)
- **Examples**: [Try out recipes for various use cases](https://docling-project.github.io/docling/examples/)
- **Integrations**: [Popular frameworks and tools](https://docling-project.github.io/docling/integrations/)
- **Reference**: [See more API details](https://docling-project.github.io/docling/reference/document_converter/)

## Contributing

This website is part of the [Docling project](https://github.com/docling-project/docling). Your feedback and contributions are welcome!

## License

This project is part of the Docling ecosystem. See the main [Docling repository](https://github.com/docling-project/docling) for license information.
