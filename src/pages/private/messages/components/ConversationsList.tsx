import TextInput from "@/components/common/TextInput";
import type { Conversation } from "@/types/message";
import ConversationItem from "./ConversationItem";

export default function ConversationsList({
  conversations,
  activeId,
  query,
  setQuery,
  onSelect,
}: {
  conversations: Conversation[];
  activeId: string;
  query: string;
  setQuery: (val: string) => void;
  onSelect: (id: string) => void;
}) {
  const filtered = conversations.filter((c) =>
    (c.name + c.lastMessage + c.email)
      .toLowerCase()
      .includes(query.toLowerCase())
  );

  return (
    <aside className="w-full md:w-80 bg-white flex flex-col">
      <div className="p-4 border-b border-mid-grey">
        <TextInput
          value={query}
          type="search"
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search"
          className="pl-10"
        />
      </div>

      <div className="overflow-y-auto">
        {filtered.map((c) => (
          <ConversationItem
            key={c.id}
            data={c}
            active={c.id === activeId}
            onSelect={() => onSelect(c.id)}
          />
        ))}
      </div>
    </aside>
  );
}
