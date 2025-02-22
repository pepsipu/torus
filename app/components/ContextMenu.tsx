
import * as ContextMenuOG from "zeego/context-menu";

const defaultDropdownStyle = {
  Content: "bg-white/80 backdrop-blur-xl rounded-xl shadow-lg border border-gray-200/20 py-1 min-w-[200px]",
  Item: "px-3 py-2 hover:bg-gray-100/50 active:bg-gray-200/50 flex items-center cursor-pointer select-none outline-none",
  ItemTitle: "text-[15px] text-gray-900",
  ItemTitleDestructive: "text-[15px] text-red-500",
  ItemIcon: "mr-2 w-5 h-5 flex items-center justify-center",
  ItemIndicator: "mr-2 w-5 h-5 flex items-center justify-center",
  Separator: "h-px my-1 bg-gray-200/20",
  Label: "px-3 py-2 text-sm text-gray-500",
  Group: "py-1",
  SubTrigger: "px-3 py-2 hover:bg-gray-100/50 active:bg-gray-200/50 flex items-center  cursor-pointer select-none outline-none",
  SubContent: "bg-white/80 backdrop-blur-xl rounded-xl shadow-lg border border-gray-200/20 py-1 min-w-[200px]",
  Arrow: "fill-white/80",
  Sub: "px-3 py-2 hover:bg-gray-100/50 active:bg-gray-200/50 flex items-center justify-between cursor-pointer select-none outline-none",
  Auxiliary: "bg-white/80 backdrop-blur-xl rounded-xl shadow-lg border border-gray-200/20 py-1 min-w-[200px]"
};

const Root = ContextMenuOG.Root;

const Trigger = ContextMenuOG.create((props: any) => {
  return <ContextMenuOG.Trigger {...props} />;
}, "Trigger");

const Content = ContextMenuOG.create((props: any) => {
  return (
    <ContextMenuOG.Content
      className={defaultDropdownStyle.Content}
      {...props}
    />
  );
}, "Content");

const Item = ContextMenuOG.create((props: any) => {
  return (
    <ContextMenuOG.Item className={defaultDropdownStyle.Item} {...props} />
  );
}, "Item");

const SubTrigger = ContextMenuOG.create((props: any) => {
  return (
    <ContextMenuOG.SubTrigger
      className={defaultDropdownStyle.SubTrigger}
      {...props}
    />
  );
}, "SubTrigger");

const SubContent = ContextMenuOG.create((props: any) => {
  return (
    <ContextMenuOG.SubContent
      className={defaultDropdownStyle.SubContent}
      {...props}
    />
  );
}, "SubContent");

const ItemTitle = ContextMenuOG.create((props: any) => {
  return (
    <ContextMenuOG.ItemTitle
      className={defaultDropdownStyle.ItemTitle}
      {...props}
    />
  );
}, "ItemTitle");

const ItemIcon = ContextMenuOG.create((props: any) => {
  return (
    <ContextMenuOG.ItemIcon
      className={defaultDropdownStyle.ItemIcon}
      {...props}
    />
  );
}, "ItemIcon");

const ItemImage = ContextMenuOG.create((props: any) => {
  return <ContextMenuOG.ItemImage {...props} />;
}, "ItemImage");

const ItemSubtitle = ContextMenuOG.create((props: any) => {
  return <ContextMenuOG.ItemSubtitle {...props} />;
}, "ItemSubtitle");

const Separator = ContextMenuOG.create((props: any) => {
  return (
    <ContextMenuOG.Separator
      className={defaultDropdownStyle.Separator}
      {...props}
    />
  );
}, "Separator");

const Sub = ContextMenuOG.create((props: any) => {
  return <ContextMenuOG.Sub {...props} />;
}, "Sub");

const Group = ContextMenuOG.create((props: any) => {
  return (
    <ContextMenuOG.Group className={defaultDropdownStyle.Group} {...props} />
  );
}, "Group");

const Label = ContextMenuOG.create((props: any) => {
  return (
    <ContextMenuOG.Label className={defaultDropdownStyle.Label} {...props} />
  );
}, "Label");

const Arrow = ContextMenuOG.create((props: any) => {
  return <ContextMenuOG.Arrow {...props} />;
}, "Arrow");

const Preview = ContextMenuOG.create((props: any) => {
  return <ContextMenuOG.Preview {...props} />;
}, "Preview");

const CheckboxItem = ContextMenuOG.create((props: any) => {
  return (
    <ContextMenuOG.CheckboxItem
      className={defaultDropdownStyle.Item}
      {...props}
    />
  );
}, "CheckboxItem");

const ItemIndicator = ContextMenuOG.create((props: any) => {
  return (
    <ContextMenuOG.ItemIndicator
      className={defaultDropdownStyle.ItemIndicator}
      {...props}
    />
  );
}, "ItemIndicator");

const Auxiliary = ContextMenuOG.create((props: any) => {
  return (
    <ContextMenuOG.Auxiliary
      className={defaultDropdownStyle.Auxiliary}
      {...props}
    />
  );
}, "Auxiliary");

export const ContextMenu = {
  Root,
  Trigger,
  Content,
  Item,
  SubTrigger,
  SubContent,
  ItemTitle,
  ItemIcon,
  ItemImage,
  ItemSubtitle,
  Separator,
  Sub,
  Group,
  Label,
  Arrow,
  Preview,
  CheckboxItem,
  ItemIndicator,
  Auxiliary,
};
