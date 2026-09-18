// Illustrative product data, not prices for the training course or a real service.
export const quoteServices = [
  { name: "品牌设计", description: "标志与基础视觉", unit: "套", price: 2400 },
  {
    name: "落地页开发",
    description: "页面设计与实现",
    unit: "页",
    price: 3600,
  },
  { name: "演示文稿", description: "内容排版与美化", unit: "页", price: 120 },
];
export const quoteMoney = (value: number) =>
  new Intl.NumberFormat("zh-CN", { maximumFractionDigits: 0 }).format(value);
export function calculateQuote(
  selected: boolean[],
  quantities: number[],
  rush: boolean,
) {
  const items = quoteServices.flatMap((service, index) => {
    if (!selected[index]) return [];
    const value = quantities[index];
    const quantity = Number.isFinite(value)
      ? Math.max(1, Math.min(12, Math.trunc(value)))
      : 1;
    return [{ ...service, quantity, amount: service.price * quantity }];
  });
  const subtotal = items.reduce((sum, item) => sum + item.amount, 0);
  const rushFee = rush ? Math.round(subtotal * 0.2) : 0;
  return { items, subtotal, rushFee, total: subtotal + rushFee };
}
export function quoteText(
  quote: ReturnType<typeof calculateQuote>,
  rush: boolean,
) {
  return [
    "项目报价单 / 产品演示",
    "",
    ...quote.items.map(
      (item) =>
        `${item.name} × ${item.quantity}${item.unit}  ¥${quoteMoney(item.amount)}`,
    ),
    "",
    `服务小计：¥${quoteMoney(quote.subtotal)}`,
    `交付方式：${rush ? "加急 · 3 个工作日" : "标准 · 7 个工作日"}`,
    `加急费用：¥${quoteMoney(quote.rushFee)}`,
    `预估总价：¥${quoteMoney(quote.total)}`,
    "",
    "以上为计算器示例价格，非实际服务报价。",
  ].join("\n");
}
