import React, { useEffect, useMemo, useState, useRef } from "react";
import { FaChevronDown, FaChevronRight } from "react-icons/fa6";

export type TocSection = { id: string; label: string };

interface Props {
  sections: TocSection[];
  /** Optional offset (px) to account for sticky headers when scrolling */
  topOffset?: number;
  /** Start collapsed if true */
  defaultCollapsed?: boolean;
}

const StickyTableOfContents: React.FC<Props> = ({
  sections,
  topOffset = 0,
  defaultCollapsed = true,
}) => {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);
  const [activeId, setActiveId] = useState<string | null>(null);
  const sectionIds = useMemo(() => sections.map((s) => s.id), [sections]);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Scroll spy
  useEffect(() => {
    if (!sectionIds.length) return;

    const options: IntersectionObserverInit = {
      root: null,
      rootMargin: "-40% 0px -55% 0px",
      threshold: [0, 0.25, 0.5, 0.75, 1],
    };

    const observer = new IntersectionObserver((entries) => {
      const vis = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
      if (vis[0]) setActiveId(vis[0].target.id);
    }, options);

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sectionIds]);

  // Collapse on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setCollapsed(true);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const y = rect.top + scrollTop - topOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-x-0 bottom-5 z-60 flex flex-col items-center justify-center"
    >
      {!collapsed && (
        <nav
          className={
            `mx-2 w-full max-w-[275px] rounded-3xl border border-charcoal-grey bg-[#000000CC]` +
            ` p-4 text-white shadow-[0_8px_24px_rgba(0,0,0,0.35)]  backdrop-blur`
          }
          aria-label="Table of contents"
        >
          <ul className="space-y-3">
            {sections.map((s) => {
              const active = activeId === s.id;
              return (
                <li key={s.id}>
                  <button
                    type="button"
                    onClick={() => {
                      scrollToId(s.id);
                      setCollapsed(true);
                    }}
                    className="grid w-full grid-cols-[5px_1fr_auto] items-center gap-3 rounded-sm px-2 py-2 text-left transition-colors hover:bg-[#FFFFFF33] cursor-pointer"
                  >
                    <span
                      aria-hidden
                      className={`h-2 w-2 rounded-full ${
                        active
                          ? "bg-white shadow-[0px_0px_4px_2px_#FFFFFF80]"
                          : "bg-transparent"
                      }`}
                    />
                    <span className="text-sm leading-none">{s.label}</span>
                    <span aria-hidden className=" shrink-0">
                      <FaChevronRight size={9} strokeWidth={50} />
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      )}

      {/* Toolbar */}
      <div
        className={
          "pointer-events-auto mx-2 mt-3 flex items-center gap-2 rounded-full bg-[#000000CC] px-4" +
          " py-2 justify-center shadow-[0_8px_24px_rgba(0,0,0,0.35)] h-[25px] min-w-[120.5px]"
        }
      >
        {sections.map((s) => {
          const active = activeId === s.id;
          return (
            <button
              key={s.id}
              type="button"
              title={s.label}
              onClick={() => scrollToId(s.id)}
              className="grid size-[5px] place-items-center rounded-full transition-colors hover:bg-[#FFFFFF33]"
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  active
                    ? "bg-white shadow-[0px_0px_4px_2px_#FFFFFF80]"
                    : "bg-white/60"
                }`}
              />
            </button>
          );
        })}

        <button
          type="button"
          onClick={() => setCollapsed((c) => !c)}
          aria-expanded={!collapsed}
          aria-label={
            collapsed
              ? "Expand table of contents"
              : "Collapse table of contents"
          }
          className="cursor-pointer flex items-center text-white ml-[3px] "
        >
          <FaChevronDown
            strokeWidth={50}
            size={8}
            className={`${collapsed ? "" : "rotate-180"} transition-transform`}
          />
        </button>
      </div>
    </div>
  );
};

export default StickyTableOfContents;
