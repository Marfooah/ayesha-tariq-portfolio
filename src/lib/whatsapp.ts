const PREFILLED_MESSAGE = `Hi UGG,

I came across your website and would like to discuss improving customer support for my ecommerce business.

Website: 
Current support challenge: 

Thank you.`;

export function getWhatsAppUrl(): string {
  const number = import.meta.env.VITE_WHATSAPP ?? "";
  const encoded = encodeURIComponent(PREFILLED_MESSAGE);
  return `https://wa.me/${number}?text=${encoded}`;
}
