interface MarkdownRendererProps {
  markdown: string;
}

function renderInline(value: string) {
  return value
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/`(.+?)`/g, "<code>$1</code>");
}

export function MarkdownRenderer({ markdown }: MarkdownRendererProps) {
  const lines = markdown.split("\n");
  const output: string[] = [];
  let currentList: string[] = [];

  const flushList = () => {
    if (currentList.length > 0) {
      output.push(`<ul>${currentList.join("")}</ul>`);
      currentList = [];
    }
  };

  for (const line of lines) {
    if (line.startsWith("# ")) {
      flushList();
      output.push(`<h1>${renderInline(line.slice(2))}</h1>`);
      continue;
    }
    if (line.startsWith("## ")) {
      flushList();
      output.push(`<h2>${renderInline(line.slice(3))}</h2>`);
      continue;
    }
    if (line.startsWith("### ")) {
      flushList();
      output.push(`<h3>${renderInline(line.slice(4))}</h3>`);
      continue;
    }
    if (line.startsWith("- ")) {
      currentList.push(`<li>${renderInline(line.slice(2))}</li>`);
      continue;
    }
    if (line.trim() === "") {
      flushList();
      continue;
    }
    flushList();
    output.push(`<p>${renderInline(line)}</p>`);
  }

  flushList();

  return (
    <div
      className="markdown-preview text-sm"
      dangerouslySetInnerHTML={{ __html: output.join("") }}
    />
  );
}
