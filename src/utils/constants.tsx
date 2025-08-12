import Document from "@/components/icons/Document";
import GenAi from "@/components/icons/GenAi";
import Github from "@/components/icons/Github";
import Output from "@/components/icons/Output";
import Twitter from "@/components/icons/twitter";

export const CARD_DATA = [
  {
    imageSrc: "/images/concept.webp",
    imageAlt: "concept",
    title: "Concepts →",
    details: "Learn Docling fundamentals",
  },
  {
    imageSrc: "/images/example.webp",
    imageAlt: "example",
    title: "Examples →",
    details: "Try out recipes for various use cases",
  },
  {
    imageSrc: "/images/integration.webp",
    imageAlt: "integration",
    title: "Integrations →",
    details: "Integrations with popular frameworks and tools",
  },
  {
    imageSrc: "/images/reference.webp",
    imageAlt: "reference",
    title: "Reference →",
    details: "See more API details",
  },
];
export const DOCLING_CARD_DATA = [
  {
    imageSrc: "/images/parsing.webp",
    imageAlt: "parse",
    title: "Advanced Document Parsing",
    details: "Extracts clean structure from messy PDFs, DOCs, HTML, and more.",
  },
  {
    imageSrc: "/images/genAI.webp",
    imageAlt: "genAI",
    title: "GenAI-Ready Integration",
    details:
      "Plugs into LangChain, LlamaIndex, and other popular AI frameworks.",
  },
  {
    imageSrc: "/images/structure.webp",
    imageAlt: "structure",
    title: "Structured Output",
    details: "Delivers chunked, labeled data optimized for LLM pipelines.",
  },
  {
    imageSrc: "/images/fast.webp",
    imageAlt: "fast",
    title: "Dev-Friendly, Fast, and Flexible",
    details: "Use via CLI, API, or as a drop-in module in your stack.",
  },
];

export const HERO_TEXT = "Docling Preps Your Files for GenAI, RAG, and Beyond";

export const TRANSFORM = {
  title: "Transform Your Documents",
  description:
    "Docling turns messy PDFs, DOCX, and slides into clean, structured data—ready for RAG, GenAI apps, or anything downstream. Complex layouts? Tables? Formulas? It handles them, so you don’t have to.",
};

const LIST = [
  {
    title: "Concepts",
    link: "http://docs.langflow.org/",
  },
  {
    title: "Examples",
    link: "",
  },
  {
    title: "Integrations",
    link: "",
  },
  {
    title: "Reference",
    link: "",
  },
];

const SOCIALS = [
  {
    icon: <Github />,
    count: "24k",
    url: "https://github.com/langflow-ai/langflow",
  },

  { icon: <Twitter />, count: "4k", url: "https://x.com/langflow_ai" },
];

const DARK_SOCIALS = [
  {
    icon: <Github color="#E9DBBDE5" />,
    count: "24k",
    url: "https://github.com/langflow-ai/langflow",
  },

  {
    icon: <Twitter color="#E9DBBDE5" />,
    count: "4k",
    url: "https://x.com/langflow_ai",
  },
];

export const STARTED_CARD = [
  {
    title: "Concepts",
    text: "Learn Docling fundamentals",
    backgroundUrl: "/images/concepts_bg.webp",
  },
  {
    title: "Examples",
    text: "Recipes for various use cases",
    backgroundUrl: "/images/examples_bg.webp",
  },
  {
    title: "Integrations",
    text: "Popular frameworks and tools",
    backgroundUrl: "/images/integrations_bg.webp",
  },
  {
    title: "Reference",
    text: "See more API details",
    backgroundUrl: "/images/reference_bg.webp",
  },
];
export const TRANSFORM_CARD = [
  {
    title: "Advanced Document Parsing",
    text: "Extracts clean structure from messy PDFs, DOCs, HTML, and more.",
    icon: <Document />,
  },
  {
    title: "GenAI-Ready Integration",
    text: "Plugs into LangChain, LlamaIndex, and other popular AI frameworks.",
    icon: <GenAi />,
  },
  {
    title: "Structured Output",
    text: "Delivers chunked, labeled data optimized for LLM pipelines.",
    icon: <Output />,
  },
];
export const FEATURES = [
  {
    title: "🗂️",
    text: "Parse multiple document types: PDF, DOCX, PPTX, XLSX, HTML, audio, and images.",
  },
  {
    title: "📑",
    text: "Understand PDFs deeply: layout, tables, reading order, code, and formulas.",
  },
  {
    title: "🧬",
    text: "Unified DoclingDocument format for structured output.",
  },
  { title: "↪", text: "Export to Markdown, HTML, DocTags, or lossless JSON." },
  {
    title: "🔒",
    text: "Run locally for sensitive or air-gapped environments.",
  },
  {
    title: "🤖",
    text: "Integrates easily with LangChain, LlamaIndex, Haystack, and more.",
  },
  { title: "🔍", text: "OCR support for scanned PDFs and images." },
  { title: "👓", text: "Works with visual language models (SmolDocling)." },
  {
    title: "🎙",
    text: "Supports audio via automatic speech recognition (ASR).",
  },
  { title: "💻", text: "Fast and easy to use with a simple CLI." },
];

export { LIST, SOCIALS, DARK_SOCIALS };
