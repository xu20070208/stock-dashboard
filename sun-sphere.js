// ====================== 孙宇晨互动球 · 嵌入组件 ======================
// 用法：在HTML中 <script src="sun-sphere.js"></script> 即可自动创建

(function() {
  // ===== 孙宇晨知识库 =====
  const KNOWLEDGE = {
    style: "直接不拐弯，敢下结论，偶尔自嘲。中文为主夹杂英文。常用句式：'说白了就是...''你看...''别想太复杂...'",
    predictions: [
      { time:"2016年", what:"推荐BTC(当时$500)、英伟达($0.6)、特斯拉($15)、腾讯", result:"10年后：英伟达240倍、BTC200倍、特斯拉27倍", context:"当时人人买房，他叫人别买房买科技资产，被骂骗子" },
      { time:"2025年11月", what:"短期缺芯片、长期缺能源、永远缺存储", result:"闪迪(SNDK)后来涨了50倍，存储板块Q1业绩爆发", context:"当时所有人只盯着GPU，没人关注存储。他在所有人没注意的地方下注" },
      { time:"2026年", what:"AI取代人、链取代银行、Agent取代公司、算力取代国土", result:"AI Agent+区块链方向开始兑现", context:"他说2026是新旧文明分水岭" },
    ],
    rules: [
      { q:"怎么看AI芯片", a:"说白了就是卖铲子的逻辑。英伟达是铲子之王，但铲子不能只有一把——光模块(中际旭创)是铲子的铲子，液冷(英维克)是让铲子不烫手的东西。你买不起英伟达就买它的配套，水涨船高。" },
      { q:"怎么看光模块", a:"1.6T今年是规模化元年，中际旭创Q1净利+262%不是开玩笑的。英伟达网络收入翻3倍，这些GPU都要用光模块连起来。说白了就是——GPU卖越多，光模块订单越多。确定性很高。" },
      { q:"怎么看存储", a:"我去年11月就说永远缺存储，当时没人信。现在DRAM合约价环比涨60%，HBM产能全部订满到2027年。AI每次推理都要读写数据，存储就是AI的数据底座。这波还没完。" },
      { q:"怎么看寒武纪/海光", a:"国产替代的逻辑是真实的——DeepSeek V4发布当天八大国产芯片同步适配，国家认证也下来了。但你要清楚：他们跟英伟达的差距还是很大，赌的是政策+生态，不是纯技术。风险也大，仓位别太重。" },
      { q:"怎么看液冷", a:"单颗GPU功耗奔1000W，风冷根本顶不住。英伟达GB300全面液冷，华为交换机也开始液冷。液冷从'高端选配'变'刚需'，英维克市占率超50%，确定性很强——属于那种不是主角但永远不会缺戏的配角。" },
      { q:"怎么看PCB", a:"AI服务器的PCB价值量涨8-12倍，英伟达Rubin机柜一个柜子的PCB顶过去三个。生益科技是上游材料龙头，高端覆铜板紧缺。但你要注意：这个赛道周期性强，铜价一涨利润就被吃。" },
      { q:"定投还是抄底", a:"别想太复杂。跌得狠的时候多买，涨得猛的时候少买。价格低于60日均线10%以上就加额定投，高于15%就减一半。别想着精准抄底——能抄到底的人要么是运气好，要么是在骗你。" },
      { q:"现在买什么", a:"我还是那句话：短期找瓶颈（谁在缺货）、长期看趋势（AI替代人工）、永远关注容易被忽视的环节（存储、散热、PCB材料）。具体标的你要自己做功课——没人能为你的钱负责。" },
      { q:"入门怎么学", a:"第一，先买ETF别买个股——科创50ETF(588000)或者芯片ETF(512760)。第二，定投，别all in。第三，别天天盯盘，一个月看一次就够了。第四，亏了别慌——定投的逻辑就是你亏的时候买到的份额更多。" },
      { q:"有什么坑", a:"追涨杀跌是最大的坑。看到涨了就追、看到跌了就割——你的对手盘就是这么赚你的钱的。还有，别用杠杆。借款炒股的人是来送钱的。我虽然激进，但我从来不用借来的钱下注。" },
      { q:"怎么看大盘", a:"大盘是所有人情绪的总和。短期看情绪，长期看基本面。现在AI产业链的基本面是确定向上的——英伟达Q1收入+85%、北美四大云厂AI开支7000多亿、字节2000亿。别被短期的涨跌吓到。" },
    ]
  };

  // ===== UI 创建 =====
  const css = `
  .sun-sphere { position:fixed; bottom:20px; right:20px; z-index:99999; font-family:"Microsoft YaHei",sans-serif; }
  .sun-sphere .ball { width:60px; height:60px; border-radius:50%; background:linear-gradient(135deg,#ff6b35,#f7931a,#ffd700); box-shadow:0 4px 20px rgba(255,107,53,.5); cursor:pointer; display:flex; align-items:center; justify-content:center; font-size:28px; transition:.2s; animation:float 3s ease-in-out infinite; }
  .sun-sphere .ball:hover { transform:scale(1.1); box-shadow:0 6px 28px rgba(255,107,53,.7); }
  .sun-sphere .ball:active { transform:scale(.95); }
  .sun-sphere .chat { display:none; position:absolute; bottom:70px; right:0; width:340px; max-height:480px; background:#161b22; border:1px solid #30363d; border-radius:12px; overflow:hidden; box-shadow:0 8px 40px rgba(0,0,0,.6); }
  .sun-sphere .chat.open { display:flex; flex-direction:column; }
  .sun-sphere .chat-header { background:linear-gradient(135deg,#ff6b35,#f7931a); padding:12px 16px; display:flex; justify-content:space-between; align-items:center; }
  .sun-sphere .chat-header h3 { color:#fff; font-size:14px; margin:0; }
  .sun-sphere .chat-header .close { color:#fff; cursor:pointer; font-size:18px; background:none; border:none; }
  .sun-sphere .chat-msgs { flex:1; overflow-y:auto; padding:12px; max-height:300px; display:flex; flex-direction:column; gap:8px; }
  .sun-sphere .msg { max-width:85%; padding:8px 12px; border-radius:10px; font-size:12px; line-height:1.6; animation:msgIn .25s; }
  .sun-sphere .msg.sun { background:#21262d; color:#c9d1d9; align-self:flex-start; border-bottom-left-radius:2px; }
  .sun-sphere .msg.user { background:#1a3d2e; color:#d2f0d2; align-self:flex-end; border-bottom-right-radius:2px; }
  .sun-sphere .msg .time { font-size:9px; color:#8b949e; margin-top:3px; }
  .sun-sphere .quick-btns { display:flex; flex-wrap:wrap; gap:4px; padding:8px 12px; border-top:1px solid #21262d; }
  .sun-sphere .quick-btn { background:#21262d; border:1px solid #30363d; border-radius:12px; padding:4px 10px; font-size:10px; color:#f0b90b; cursor:pointer; white-space:nowrap; }
  .sun-sphere .quick-btn:hover { background:#1c2430; border-color:#f0b90b; }
  .sun-sphere .input-row { display:flex; border-top:1px solid #30363d; }
  .sun-sphere .input-row input { flex:1; background:#0d1117; border:none; color:#c9d1d9; padding:10px 12px; font-size:12px; outline:none; }
  .sun-sphere .input-row button { background:#f7931a; color:#fff; border:none; padding:10px 16px; cursor:pointer; font-weight:600; font-size:12px; }
  @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
  @keyframes msgIn { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
  @media(max-width:768px){.sun-sphere .chat{width:calc(100vw-40px);right:-10px;max-height:60vh}}
  `;

  const styleEl = document.createElement('style');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  const sphere = document.createElement('div');
  sphere.className = 'sun-sphere';
  sphere.innerHTML = `
    <div class="ball" id="sunBall" title="问孙哥">🟠</div>
    <div class="chat" id="sunChat">
      <div class="chat-header">
        <h3>🟠 孙哥聊投资</h3>
        <button class="close" id="sunClose">✕</button>
      </div>
      <div class="chat-msgs" id="sunMsgs">
        <div class="msg sun">👋 来了？我是孙宇晨。有问题直接问——AI产业链、投资策略、赛道判断都行。别绕弯子。<div class="time">现在</div></div>
      </div>
      <div class="quick-btns" id="sunQuick"></div>
      <div class="input-row">
        <input id="sunInput" placeholder="问孙哥..." />
        <button id="sunSend">发</button>
      </div>
    </div>`;
  document.body.appendChild(sphere);

  // ===== 交互逻辑 =====
  const ball = document.getElementById('sunBall');
  const chat = document.getElementById('sunChat');
  const msgs = document.getElementById('sunMsgs');
  const input = document.getElementById('sunInput');
  const quickDiv = document.getElementById('sunQuick');

  // Quick buttons
  const quickQuestions = ['怎么看存储','怎么看光模块','怎么看液冷','怎么看AI芯片','定投还是抄底','有什么坑'];
  quickDiv.innerHTML = quickQuestions.map(q => `<button class="quick-btn">${q}</button>`).join('');

  quickDiv.addEventListener('click', (e) => {
    if (e.target.classList.contains('quick-btn')) sendMsg(e.target.textContent);
  });

  ball.addEventListener('click', () => chat.classList.toggle('open'));
  document.getElementById('sunClose').addEventListener('click', () => chat.classList.remove('open'));
  document.getElementById('sunSend').addEventListener('click', () => { if(input.value.trim()) sendMsg(input.value.trim()); });
  input.addEventListener('keydown', (e) => { if(e.key==='Enter') { if(input.value.trim()) sendMsg(input.value.trim()); } });

  function sendMsg(text) {
    addMsg(text, 'user');
    input.value = '';
    setTimeout(() => {
      const reply = getReply(text);
      addMsg(reply, 'sun');
    }, 600 + Math.random() * 800);
  }

  function addMsg(text, role) {
    const el = document.createElement('div');
    el.className = 'msg ' + role;
    const now = new Date().toLocaleTimeString('zh-CN',{hour:'2-digit',minute:'2-digit'});
    el.innerHTML = text.replace(/\n/g,'<br>') + `<div class="time">${now}</div>`;
    msgs.appendChild(el);
    msgs.scrollTop = msgs.scrollHeight;
  }

  function getReply(text) {
    // Exact match
    for (const r of KNOWLEDGE.rules) {
      if (text.includes(r.q.replace('怎么看','')) || text.includes(r.q)) return r.a;
    }

    // Fuzzy match
    const keywords = {
      '光模块|1.6T|中际旭创|新易盛|天孚|光互联': KNOWLEDGE.rules[1].a,
      '存储|HBM|兆易|闪迪|DRAM|NAND|涨价': KNOWLEDGE.rules[2].a,
      '寒武纪|海光|芯片|GPU|AI芯片|昇腾|国产|摩尔线程': KNOWLEDGE.rules[3].a,
      '液冷|散热|英维克|高澜|降温': KNOWLEDGE.rules[4].a,
      'PCB|生益科技|覆铜板|电路板': KNOWLEDGE.rules[5].a,
      '定投|抄底|买入|怎么买|买什么|策略|仓位': KNOWLEDGE.rules[6].a,
      '入门|新手|小白|怎么学|刚开始|不懂': KNOWLEDGE.rules[8].a,
      '坑|风险|亏损|亏钱|追涨|杀跌': KNOWLEDGE.rules[9].a,
      '大盘|指数|上证|沪深|走势|趋势': KNOWLEDGE.rules[10].a,
      '2016|预测|当年|十年前|历史|英伟达|比特币': `2016年我在《财富自由革命之路》里说：别买房，买BTC、英伟达、特斯拉、腾讯。当时BTC才$500，英伟达才$0.6（拆股调整后）。所有人都骂我疯子。十年后：英伟达240倍、BTC200倍。\n\n我的方法很简单：在99%的人不懂的地方提前下注。不是在所有人确定的时候跟风。`,
      '存储50倍|50倍|闪迪|SNDK': `去年11月我说"永远缺存储"，当时闪迪(SNDK)才$35左右。后来涨到$1400多——50倍。\n\n我当时说这句话的背景是：所有人都在盯着GPU，没人注意存储。但AI每次推理都要读写——存储的需求其实比GPU更持久。我的逻辑就是：在确定性赛道里，找那个还没被炒起来的环节。`,
    };

    for (const [pattern, reply] of Object.entries(keywords)) {
      const regex = new RegExp(pattern, 'i');
      if (regex.test(text)) return reply;
    }

    // Default
    return `这个问题挺有意思。我的风格是：找到确定性的方向，在两端下注。AI产业链现在最确定的就是算力需求在爆发——芯片、光模块、存储、液冷、PCB，每个环节都在涨。关键是找到"现在大多数人还没注意，但未来一定会起来的那个环节"。\n\n你要问我具体哪个——我建议你先从ETF开始，科创50(588000)或者芯片ETF(512760)，定投别all in。赚了钱记得落袋为安。`;
  }

  console.log('🟠 孙宇晨互动球已加载');
})();
