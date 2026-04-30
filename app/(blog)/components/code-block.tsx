import { codeToHtml } from "shiki";
import { CopyButton } from "./copy-button";

export async function CodeBlock({
  code,
  language,
  filename,
}: {
  code: string;
  language?: string;
  filename?: string;
}) {
  const lang = language || "text";
  const html = await codeToHtml(code, {
    lang,
    theme: "github-dark",
  });

  return (
    <div className="my-8">
      <div
        className="flex items-center justify-between text-xs text-white/40 bg-[#24292e] px-4 py-2"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        <div className="flex items-center gap-2">
          {filename ? (
            <>
              <span>{filename}</span>
              <span className="text-white/20">·</span>
              <span>{lang}</span>
            </>
          ) : (
            <span>{lang}</span>
          )}
        </div>
        <CopyButton text={code} />
      </div>
      <div
        className="[&_pre]:!p-4 [&_pre]:!m-0 [&_pre]:overflow-x-auto [&_pre]:text-sm [&_pre]:leading-relaxed [&_code]:!font-[var(--font-mono)]"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
