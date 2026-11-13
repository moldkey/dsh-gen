/**
 * 生成器：随机 MAC — 生成器
 */

export const name = "dsh-gen-mac";
export const inject = ["tools"];

const NL = String.fromCharCode(10);
const SITE = "https://deepseekbase.com/zh/tools/";
const TEXT_OUTPUT = {
  schema: { type: "object", additionalProperties: false, properties: { text: { type: "string" } }, required: ["text"] },
  render: (_args, value) => [{ type: "text", text: (value && value.text) || "" }],
};

function int(min, max) {
  const a = Math.ceil(min), b = Math.floor(max);
  const buf = new Uint32Array(1);
  crypto.getRandomValues(buf);
  return a + (buf[0] % (b - a + 1));
}

function chars(set, n) {
  let s = "";
  for (let i = 0; i < n; i++) s += set[int(0, set.length - 1)];
  return s;
}

const LOWER = "abcdefghijklmnopqrstuvwxyz";
const UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const DIGIT = "0123456789";
const SYM = "!@#$%^&*()-_=+";

const SURNAME = "王李张刘陈杨赵黄周吴徐孙胡朱高林何郭马罗";
const GIVEN = "伟芳娜秀英敏静丽强磊军洋勇艳杰娟涛明超秀霞平刚桂英";
const CITY = ["深圳", "东莞", "广州", "苏州", "宁波", "上海", "杭州", "佛山", "青岛", "厦门"];
const STREET = ["工业大道", "科技路", "创业路", "振兴路", "高新路", "人民路"];
const WORDS = ["制造", "精密", "跨境", "智能", "科创", "宏达", "恒信", "中盛", "华远", "利丰"];

function ean13(base12) {
  let sum = 0;
  for (let i = 0; i < 12; i++) sum += Number(base12[i]) * (i % 2 === 0 ? 1 : 3);
  return base12 + String((10 - (sum % 10)) % 10);
}

const OPS = {
  uuid: (t, a) => { const n = Math.min(Math.max(1, Number(a) || 1), 50); const o = []; for (let i = 0; i < n; i++) o.push(crypto.randomUUID()); return o.join(NL); },
  nanoid: (t, a, b) => { const n = Math.min(Math.max(1, Number(a) || 1), 50); const len = Math.min(Math.max(4, Number(b) || 21), 64); const o = []; for (let i = 0; i < n; i++) o.push(chars(LOWER + UPPER + DIGIT + "_-", len)); return o.join(NL); },
  password: (t, a, b) => { const len = Math.min(Math.max(6, Number(a) || 16), 128); const n = Math.min(Math.max(1, Number(b) || 1), 20); const o = []; for (let i = 0; i < n; i++) { let p = chars(LOWER, 1) + chars(UPPER, 1) + chars(DIGIT, 1) + chars(SYM, 1); p += chars(LOWER + UPPER + DIGIT + SYM, len - 4); o.push(p.split("").sort(() => Math.random() - 0.5).join("")); } return o.join(NL); },
  token_hex: (t, a) => { const n = Math.min(Math.max(1, Number(a) || 16), 256); const buf = new Uint8Array(Math.ceil(n / 2)); crypto.getRandomValues(buf); return Array.from(buf).map((x) => x.toString(16).padStart(2, "0")).join("").slice(0, n); },
  token_base64: (t, a) => { const n = Math.min(Math.max(6, Number(a) || 24), 256); const buf = new Uint8Array(n); crypto.getRandomValues(buf); return btoa(String.fromCharCode.apply(null, buf)).replace(/=+$/, ""); },
  random_int: (t, a, b) => { const lo = Number(t) || 1, hi = Number(a) || 100, n = Math.min(Math.max(1, Number(b) || 1), 100); const o = []; for (let i = 0; i < n; i++) o.push(int(Math.min(lo, hi), Math.max(lo, hi))); return o.join(", "); },
  random_string: (t, a, b) => { const len = Math.min(Math.max(1, Number(a) || 12), 200); const n = Math.min(Math.max(1, Number(b) || 1), 20); const o = []; for (let i = 0; i < n; i++) o.push(chars(LOWER + UPPER + DIGIT, len)); return o.join(NL); },
  lorem: (t, a) => { const n = Math.min(Math.max(1, Number(a) || 3), 50); const words = "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua".split(" "); const o = []; for (let i = 0; i < n; i++) o.push(Array.from({ length: 12 }, () => words[int(0, words.length - 1)]).join(" ")); return o.join(". ") + "."; },
  fake_name: (t, a) => { const n = Math.min(Math.max(1, Number(a) || 1), 50); const o = []; for (let i = 0; i < n; i++) o.push(SURNAME[int(0, SURNAME.length - 1)] + GIVEN[int(0, GIVEN.length - 1)] + (Math.random() < 0.5 ? GIVEN[int(0, GIVEN.length - 1)] : "")); return o.join(NL); },
  fake_phone: (t, a) => { const n = Math.min(Math.max(1, Number(a) || 1), 50); const pre = ["138", "139", "150", "151", "158", "186", "188", "199"]; const o = []; for (let i = 0; i < n; i++) o.push(pre[int(0, pre.length - 1)] + chars(DIGIT, 8)); return o.join(NL); },
  fake_email: (t, a) => { const n = Math.min(Math.max(1, Number(a) || 1), 50); const dom = ["example.com", "test.cn", "demo.org", "mail.com"]; const o = []; for (let i = 0; i < n; i++) o.push(chars(LOWER, 6) + chars(DIGIT, 3) + "@" + dom[int(0, dom.length - 1)]); return o.join(NL); },
  fake_company: (t, a) => { const n = Math.min(Math.max(1, Number(a) || 1), 50); const o = []; for (let i = 0; i < n; i++) o.push(CITY[int(0, CITY.length - 1)] + WORDS[int(0, WORDS.length - 1)] + ["有限公司", "科技有限公司", "制造有限公司"][int(0, 2)]); return o.join(NL); },
  ean13: (t, a) => { const n = Math.min(Math.max(1, Number(a) || 1), 20); const o = []; for (let i = 0; i < n; i++) o.push(ean13("69" + chars(DIGIT, 10))); return o.join(NL); },
  isbn13: (t, a) => { const n = Math.min(Math.max(1, Number(a) || 1), 20); const o = []; for (let i = 0; i < n; i++) { const b = "978" + chars(DIGIT, 9); let sum = 0; for (let j = 0; j < 12; j++) sum += Number(b[j]) * (j % 2 === 0 ? 1 : 3); o.push(b + String((10 - (sum % 10)) % 10)); } return o.join(NL); },
  otp6: () => String(int(0, 999999)).padStart(6, "0"),
  color_hex: (t, a) => { const n = Math.min(Math.max(1, Number(a) || 1), 50); const o = []; for (let i = 0; i < n; i++) o.push("#" + chars("0123456789abcdef", 6)); return o.join(NL); },
  color_rgb: (t) => { const r = int(0, 255), g = int(0, 255), b = int(0, 255); return "rgb(" + r + ", " + g + ", " + b + ")  #" + [r, g, b].map((x) => x.toString(16).padStart(2, "0")).join(""); },
  color_palette: (t, a) => {
    const base = String(t || "#3366cc").replace("#", "");
    if (!/^[0-9a-f]{6}$/i.test(base)) throw new Error("请输入 #RRGGBB");
    const r = parseInt(base.slice(0, 2), 16), g = parseInt(base.slice(2, 4), 16), b = parseInt(base.slice(4, 6), 16);
    const out = [];
    for (let i = -2; i <= 2; i++) {
      const mix = (x) => Math.max(0, Math.min(255, Math.round(x + i * 40)));
      out.push("#" + [mix(r), mix(g), mix(b)].map((x) => x.toString(16).padStart(2, "0")).join(""));
    }
    return out.join(NL);
  },
  ipv4: (t, a) => { const n = Math.min(Math.max(1, Number(a) || 1), 20); const o = []; for (let i = 0; i < n; i++) o.push([int(1, 223), int(0, 255), int(0, 255), int(1, 254)].join(".")); return o.join(NL); },
  mac: (t, a) => { const n = Math.min(Math.max(1, Number(a) || 1), 20); const o = []; for (let i = 0; i < n; i++) o.push(Array.from({ length: 6 }, () => chars("0123456789ABCDEF", 2)).join(":")); return o.join(NL); },
};

export function apply(ctx, config) {
  void config;
  ctx.tools.register({
    name: "gen_mac",
    description: "随机 MAC：a=数量",
    parameters: {
      text: { "type": "string", "description": "输入/基值（可选）" },
    },
    output: TEXT_OUTPUT,
    async execute(args) {
      const t = args && args.text != null ? String(args.text) : "";
      const a = args && args.a != null ? String(args.a) : "";
      const b = args && args.b != null ? String(args.b) : "";
      try {
        const fn = OPS["mac"];
        if (!fn) throw new Error("未知操作");
        return { text: ["生成器：随机 MAC", "=".repeat(52), String(fn(t, a, b)), "", "更多工具：" + SITE].join(NL) };
      } catch (e) {
        return { text: "处理失败: " + String((e && e.message) || e) };
      }
    },
  });
}
