import Github from "@/components/icons/Github";
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

export { LIST, SOCIALS };
