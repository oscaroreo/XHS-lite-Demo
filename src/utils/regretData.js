// ===== 3 Demo Cases =====
export const decisionCases = [
  {
    id: 'chongqing',
    emoji: '🏙️',
    title: '要不要一个人去重庆旅行？',
    summary: '一个人去重庆，是自由还是受罪？',
    image: 'https://picsum.photos/seed/chongqing/400/280',
  },
  {
    id: 'camera',
    emoji: '📷',
    title: '要不要买第一台相机？',
    summary: '想学摄影，但怕买了吃灰',
    image: 'https://picsum.photos/seed/camera/400/280',
  },
  {
    id: 'kitchen',
    emoji: '🍳',
    title: '要不要做开放式厨房？',
    summary: '开放式厨房好看，但怕油烟后悔',
    image: 'https://picsum.photos/seed/kitchen/400/280',
  },
]

// ===== Parallel Worlds =====
const parallelWorlds = {
  chongqing: [
    {
      id: 'world-a',
      name: '真香宇宙',
      emoji: '😎',
      title: '冲了，一个人去重庆',
      narrative: '你一个人去了重庆。你会被夜景和城市氛围击中，尤其是第一晚走到江边时，会有一种"幸好我来了"的感觉。但这个宇宙成立的前提是：你住在核心区、每天只安排 2-3 个点、接受临时改变计划。',
      scores: { thrill: '高', regretRisk: '中高', fitScore: 75 },
      sources: [
        { username: '独自旅行的猫', avatar: 'https://i.pravatar.cc/80?u=101', text: '前一天晚上紧张到睡不着，但第二天还是出发了。到了重庆发现担心都是多余的，民宿老板超热情', type: 'note' },
        { username: '火锅仙人', avatar: 'https://i.pravatar.cc/80?u=103', text: '重庆火锅一个人吃也很爽！推荐巷子里的老火锅，比网红店好吃十倍', type: 'note' },
        { username: '随心飞用户', avatar: 'https://i.pravatar.cc/80?u=110', text: '一个人旅行最大的魅力就是：随时可以改变计划', type: 'comment' },
      ],
    },
    {
      id: 'world-b',
      name: '累崩宇宙',
      emoji: '😵',
      title: '照网红路线打卡',
      narrative: '你照着热门攻略打卡。第一天洪崖洞、长江索道、解放碑全塞满，第二天开始不想出门。你不是后悔来重庆，而是后悔把旅行做成 KPI。',
      scores: { thrill: '中', regretRisk: '高', fitScore: 48 },
      sources: [
        { username: '爬坡勇士', avatar: 'https://i.pravatar.cc/80?u=107', text: '重庆真的全是坡！第一天走了2万步，穿运动鞋是底线', type: 'note' },
        { username: '重庆通', avatar: 'https://i.pravatar.cc/80?u=108', text: '不要节假日去洪崖洞，挤到怀疑人生', type: 'comment' },
        { username: '辣妹子', avatar: 'https://i.pravatar.cc/80?u=109', text: '不能吃辣一定要说微辣，重庆的微辣=其他省的中辣', type: 'note' },
      ],
    },
    {
      id: 'world-c',
      name: '继续收藏宇宙',
      emoji: '📌',
      title: '没去，继续刷攻略',
      narrative: '你最后还是没订票。短期避免了风险，但之后刷到类似笔记时会反复心动。这个宇宙最大的问题不是后悔，而是"决策一直悬着"。',
      scores: { thrill: '低', regretRisk: '中', fitScore: 55 },
      sources: [
        { username: '山城漫步者', avatar: 'https://i.pravatar.cc/80?u=102', text: '女生一个人建议住解放碑附近，晚上不要住太偏，打车回民宿最安全', type: 'note' },
        { username: '佛系旅行家', avatar: 'https://i.pravatar.cc/80?u=104', text: 'i人其实很适合一个人去重庆，没人认识你，想干嘛干嘛', type: 'comment' },
      ],
    },
    {
      id: 'world-d',
      name: '换玩法宇宙',
      emoji: '🌿',
      title: '低密度重庆独旅',
      narrative: '你还是去了，但选择低密度路线。少打卡，多散步，多留白。这个宇宙对你最友好：既完成了独旅尝试，又不容易被高强度路线劝退。',
      scores: { thrill: '中高', regretRisk: '低', fitScore: 89 },
      sources: [
        { username: '预算猎人', avatar: 'https://i.pravatar.cc/80?u=105', text: '三天两夜含机票只花了2000，重庆物价真的友好', type: 'note' },
        { username: '民宿体验师', avatar: 'https://i.pravatar.cc/80?u=106', text: '预算充足的话一定要住江景房，夜景绝了，贵但值得', type: 'note' },
        { username: '佛系旅行家', avatar: 'https://i.pravatar.cc/80?u=104', text: 'i人其实很适合一个人去重庆，没人认识你，想干嘛干嘛', type: 'comment' },
      ],
    },
  ],
  camera: [
    {
      id: 'world-a',
      name: '真香宇宙',
      emoji: '😎',
      title: '一步到位买全画幅',
      narrative: '你直接买了全画幅微单。画质确实比手机好太多，拍出第一组照片时的成就感难以形容。前提是：你真的愿意为它花时间学后期、出门愿意背设备。',
      scores: { thrill: '高', regretRisk: '中', fitScore: 70 },
      sources: [
        { username: '器材党', avatar: 'https://i.pravatar.cc/80?u=202', text: '一步到位最省钱。买了入门机半年就想换，反而花更多', type: 'note' },
        { username: '摄影老师', avatar: 'https://i.pravatar.cc/80?u=207', text: '买相机不只是买设备，是买一种生活方式。你愿意为它花时间吗？', type: 'comment' },
      ],
    },
    {
      id: 'world-b',
      name: '吃灰宇宙',
      emoji: '💤',
      title: '买了但三个月后吃灰',
      narrative: '新鲜感过了之后，相机开始在柜子里积灰。手机拍照越来越方便，而相机太重了，出门懒得带。你开始想：是不是该出二手？',
      scores: { thrill: '中', regretRisk: '高', fitScore: 42 },
      sources: [
        { username: '吃灰用户', avatar: 'https://i.pravatar.cc/80?u=204', text: '买了两年，用了不到10次。手机真的够用了', type: 'note' },
        { username: '数码控', avatar: 'https://i.pravatar.cc/80?u=206', text: '建议先租一台用一周，再决定买不买', type: 'note' },
      ],
    },
    {
      id: 'world-c',
      name: '继续种草宇宙',
      emoji: '📌',
      title: '没买，继续刷评测',
      narrative: '你一直在看评测、比参数，但始终没下单。每次看到别人的成片还是会心动，但想到"万一吃灰"就犹豫。决策悬着的状态可能比买错更消耗精力。',
      scores: { thrill: '低', regretRisk: '中', fitScore: 50 },
      sources: [
        { username: '快门爱好者', avatar: 'https://i.pravatar.cc/80?u=201', text: '第一台相机建议买二手，先确定自己真的喜欢再说', type: 'note' },
      ],
    },
    {
      id: 'world-d',
      name: '换玩法宇宙',
      emoji: '🌿',
      title: '先租一台试试',
      narrative: '你没有直接买，而是先租了一台用了一周。这让你在低风险下验证了"我是否真的愿意为摄影付出时间和精力"。如果一周后还想要，那就买；如果发现只是三分钟热度，省钱省空间。',
      scores: { thrill: '中高', regretRisk: '低', fitScore: 88 },
      sources: [
        { username: '数码控', avatar: 'https://i.pravatar.cc/80?u=206', text: '建议先租一台用一周，再决定买不买', type: 'note' },
        { username: '旅行摄影师', avatar: 'https://i.pravatar.cc/80?u=205', text: '女生推荐买微单，单反太重了，带出去几次就不想带了', type: 'note' },
        { username: '轻便至上', avatar: 'https://i.pravatar.cc/80?u=208', text: '男生买微单+定焦，轻便画质好，不会有负担', type: 'comment' },
      ],
    },
  ],
  kitchen: [
    {
      id: 'world-a',
      name: '真香宇宙',
      emoji: '😎',
      title: '开放式厨房，美到哭',
      narrative: '你做了开放式厨房，空间感翻倍，朋友来都说好看。拍照出片，做饭时还能和家人聊天。前提是：你做饭油烟不大、勤打扫、油烟机买得够好。',
      scores: { thrill: '高', regretRisk: '中', fitScore: 72 },
      sources: [
        { username: '装修过来人', avatar: 'https://i.pravatar.cc/80?u=301', text: '开放式厨房真的显大！小户型救星，但油烟机一定要买好的', type: 'note' },
        { username: '极简生活家', avatar: 'https://i.pravatar.cc/80?u=303', text: '偶尔煮个面的人做开放式完全没问题，还好看', type: 'note' },
      ],
    },
    {
      id: 'world-b',
      name: '油烟地狱宇宙',
      emoji: '😷',
      title: '做了但油烟到处跑',
      narrative: '你做了开放式厨房，但每次炒菜整个客厅都是味道。沙发、窗帘都沾了油烟味，打扫频率远超预期。开始后悔当初没做隔断。',
      scores: { thrill: '中', regretRisk: '高', fitScore: 38 },
      sources: [
        { username: '川菜爱好者', avatar: 'https://i.pravatar.cc/80?u=302', text: '经常炒辣椒的家庭真的慎做开放式，整个客厅都是味', type: 'note' },
        { username: '油烟受害者', avatar: 'https://i.pravatar.cc/80?u=306', text: '后悔了。用了半年想加隔断，装修公司说回不了头了', type: 'note' },
      ],
    },
    {
      id: 'world-c',
      name: '继续纠结宇宙',
      emoji: '📌',
      title: '没做，继续看案例',
      narrative: '你一直在看开放式厨房的美图，但也看了很多油烟劝退帖。装修方案改了三版还是定不下来。决策悬着让整个装修进度都在等厨房这个决定。',
      scores: { thrill: '低', regretRisk: '中', fitScore: 52 },
      sources: [
        { username: '清洁达人', avatar: 'https://i.pravatar.cc/80?u=305', text: '开放式厨房要勤打扫，两天不擦台面就油腻。懒人慎重', type: 'note' },
        { username: '实用主义者', avatar: 'https://i.pravatar.cc/80?u=308', text: '做开放式前先问自己：你愿意为好看付出多少清洁成本', type: 'comment' },
      ],
    },
    {
      id: 'world-d',
      name: '折中宇宙',
      emoji: '🌿',
      title: '做半开放式 / 玻璃隔断',
      narrative: '你没做完全开放式，而是选了玻璃推拉门隔断。做饭时关上门挡油烟，平时打开显大又好看。既满足了颜值需求，又不被油烟困扰。这是最不容易后悔的方案。',
      scores: { thrill: '中高', regretRisk: '低', fitScore: 90 },
      sources: [
        { username: '设计师', avatar: 'https://i.pravatar.cc/80?u=304', text: '大户型做开放式真的高级，中岛台是灵魂', type: 'note' },
        { username: '颜值党', avatar: 'https://i.pravatar.cc/80?u=307', text: '装了开放式后朋友来家里都说好看，拍照也出片', type: 'note' },
        { username: '装修过来人', avatar: 'https://i.pravatar.cc/80?u=301', text: '开放式厨房真的显大！小户型救星，但油烟机一定要买好的', type: 'comment' },
      ],
    },
  ],
}

// ===== AI Generation Steps =====
const aiGenerationSteps = {
  chongqing: {
    steps: [
      { icon: '🔍', title: '正在检索相关笔记', doneText: '找到 128 篇关于「一个人去重庆」的笔记' },
      { icon: '📊', title: '正在聚类分析用户经验', doneText: '发现 4 种典型选择路径' },
      { icon: '👥', title: '正在匹配相似用户画像', doneText: '找到 47 位与您情况相似的用户' },
      { icon: '🧬', title: '正在合成平行宇宙', doneText: '基于 128 篇笔记生成 4 个平行世界...' },
      { icon: '✨', title: '预演完成', doneText: '即将为你展示平行世界' },
    ],
  },
  camera: {
    steps: [
      { icon: '🔍', title: '正在检索相关笔记', doneText: '找到 76 篇关于「买第一台相机」的笔记' },
      { icon: '📊', title: '正在聚类分析用户经验', doneText: '发现 4 种典型选择路径' },
      { icon: '👥', title: '正在匹配相似用户画像', doneText: '找到 31 位与您情况相似的用户' },
      { icon: '🧬', title: '正在合成平行宇宙', doneText: '基于 76 篇笔记生成 4 个平行世界...' },
      { icon: '✨', title: '预演完成', doneText: '即将为你展示平行世界' },
    ],
  },
  kitchen: {
    steps: [
      { icon: '🔍', title: '正在检索相关笔记', doneText: '找到 94 篇关于「开放式厨房」的笔记' },
      { icon: '📊', title: '正在聚类分析用户经验', doneText: '发现 4 种典型选择路径' },
      { icon: '👥', title: '正在匹配相似用户画像', doneText: '找到 52 位与您情况相似的用户' },
      { icon: '🧬', title: '正在合成平行宇宙', doneText: '基于 94 篇笔记生成 4 个平行世界...' },
      { icon: '✨', title: '预演完成', doneText: '即将为你展示平行世界' },
    ],
  },
}

// ===== Experience entries for timeline =====
const experiences = {
  chongqing: [
    { username: '独自旅行的猫', avatar: 'https://i.pravatar.cc/80?u=101', text: '前一天晚上紧张到睡不着，但第二天还是出发了。到了重庆发现担心都是多余的', tagAffinity: { gender: ['female'] } },
    { username: '山城漫步者', avatar: 'https://i.pravatar.cc/80?u=102', text: '女生一个人建议住解放碑附近，晚上不要住太偏，打车回民宿最安全', tagAffinity: { gender: ['female'], experience: ['novice'] } },
    { username: '火锅仙人', avatar: 'https://i.pravatar.cc/80?u=103', text: '重庆火锅一个人吃也很爽！推荐巷子里的老火锅，比网红店好吃十倍', tagAffinity: { personality: ['extrovert'] } },
    { username: '佛系旅行家', avatar: 'https://i.pravatar.cc/80?u=104', text: 'i人其实很适合一个人去重庆，没人认识你，想干嘛干嘛', tagAffinity: { personality: ['introvert'] } },
    { username: '预算猎人', avatar: 'https://i.pravatar.cc/80?u=105', text: '三天两夜含机票只花了2000，重庆物价真的友好', tagAffinity: { budget: ['low'] } },
    { username: '民宿体验师', avatar: 'https://i.pravatar.cc/80?u=106', text: '预算充足的话一定要住江景房，夜景绝了，贵但值得', tagAffinity: { budget: ['high'] } },
    { username: '爬坡勇士', avatar: 'https://i.pravatar.cc/80?u=107', text: '重庆真的全是坡！第一天走了2万步，穿运动鞋是底线', tagAffinity: { experience: ['novice'] } },
    { username: '重庆通', avatar: 'https://i.pravatar.cc/80?u=108', text: '老手告诉你：不要节假日去洪崖洞，挤到怀疑人生', tagAffinity: { experience: ['veteran'] } },
    { username: '辣妹子', avatar: 'https://i.pravatar.cc/80?u=109', text: '不能吃辣一定要说微辣，重庆的微辣=其他省的中辣', tagAffinity: { gender: ['female'], personality: ['introvert'] } },
    { username: '随心飞用户', avatar: 'https://i.pravatar.cc/80?u=110', text: '一个人旅行最大的魅力就是：随时可以改变计划', tagAffinity: { personality: ['extrovert'], experience: ['veteran'] } },
  ],
  camera: [
    { username: '快门爱好者', avatar: 'https://i.pravatar.cc/80?u=201', text: '第一台相机建议买二手，先确定自己真的喜欢再说', tagAffinity: { budget: ['low'] } },
    { username: '器材党', avatar: 'https://i.pravatar.cc/80?u=202', text: '一步到位最省钱。买了入门机半年就想换，反而花更多', tagAffinity: { budget: ['high'] } },
    { username: '街拍达人', avatar: 'https://i.pravatar.cc/80?u=203', text: '相机让我开始主动出门，发现了城市很多被忽略的角落', tagAffinity: { passion: ['enthusiast'] } },
    { username: '吃灰用户', avatar: 'https://i.pravatar.cc/80?u=204', text: '买了两年，用了不到10次。手机真的够用了', tagAffinity: { passion: ['casual'] } },
    { username: '旅行摄影师', avatar: 'https://i.pravatar.cc/80?u=205', text: '女生推荐买微单，单反太重了，带出去几次就不想带了', tagAffinity: { gender: ['female'] } },
    { username: '数码控', avatar: 'https://i.pravatar.cc/80?u=206', text: '建议先租一台用一周，再决定买不买', tagAffinity: { passion: ['casual'], budget: ['low'] } },
    { username: '摄影老师', avatar: 'https://i.pravatar.cc/80?u=207', text: '买相机不只是买设备，是买一种生活方式。你愿意为它花时间吗？', tagAffinity: {} },
    { username: '轻便至上', avatar: 'https://i.pravatar.cc/80?u=208', text: '男生买微单+定焦，轻便画质好，不会有负担', tagAffinity: { gender: ['male'] } },
  ],
  kitchen: [
    { username: '装修过来人', avatar: 'https://i.pravatar.cc/80?u=301', text: '开放式厨房真的显大！小户型救星，但油烟机一定要买好的', tagAffinity: { homeType: ['small'] } },
    { username: '川菜爱好者', avatar: 'https://i.pravatar.cc/80?u=302', text: '经常炒辣椒的家庭真的慎做开放式，整个客厅都是味', tagAffinity: { cooking: ['often'] } },
    { username: '极简生活家', avatar: 'https://i.pravatar.cc/80?u=303', text: '偶尔煮个面的人做开放式完全没问题，还好看', tagAffinity: { cooking: ['sometimes'] } },
    { username: '设计师', avatar: 'https://i.pravatar.cc/80?u=304', text: '大户型做开放式真的高级，中岛台是灵魂', tagAffinity: { homeType: ['large'] } },
    { username: '清洁达人', avatar: 'https://i.pravatar.cc/80?u=305', text: '开放式厨房要勤打扫，两天不擦台面就油腻。懒人慎重', tagAffinity: {} },
    { username: '油烟受害者', avatar: 'https://i.pravatar.cc/80?u=306', text: '后悔了。用了半年想加隔断，装修公司说回不了头了', tagAffinity: { cooking: ['often'], homeType: ['small'] } },
    { username: '颜值党', avatar: 'https://i.pravatar.cc/80?u=307', text: '装了开放式后朋友来家里都说好看，拍照也出片', tagAffinity: { cooking: ['sometimes'] } },
    { username: '实用主义者', avatar: 'https://i.pravatar.cc/80?u=308', text: '做开放式前先问自己：你愿意为好看付出多少清洁成本', tagAffinity: {} },
  ],
}

// ===== Timeline builder =====
const defaultTimeline = {
  chongqing: [
    { day: 0, title: '出发前夜', narrative: '收拾行李的时候还在犹豫要不要退票。一个人去陌生的城市，既兴奋又紧张。' },
    { day: 1, title: '第一天：抵达', narrative: '落地重庆的第一感受是热浪和满街的火锅味。民宿比想象中好，放下行李就冲出去觅食了。' },
    { day: 2, title: '第二天：探索', narrative: '去了洪崖洞和解放碑，爬坡爬到怀疑人生。但也发现了很多巷子里的小惊喜。' },
    { day: 3, title: '第三天：回程', narrative: '回程的路上已经在想下次什么时候再来了。一个人旅行，真的会上瘾。' },
  ],
  camera: [
    { day: 0, title: '种草时刻', narrative: '刷到别人的摄影作品，心里痒痒的。开始研究参数、看评测、比价格。' },
    { day: 1, title: '到手开箱', narrative: '拆开快递的那一刻，质感比想象中好。装上镜头出门试拍，第一张照片虽然一般但超开心。' },
    { day: 2, title: '新鲜感消退', narrative: '发现相机比手机重多了，出门得专门背个包。开始怀疑自己能不能坚持。' },
    { day: 3, title: '答案揭晓', narrative: '翻看这几天拍的照片，有几张真的很有感觉。但也在想：我会不会三个月后就让它吃灰？' },
  ],
  kitchen: [
    { day: 0, title: '被种草', narrative: '刷到开放式厨房的美图，宽敞明亮，朋友聚会超有氛围。开始查装修案例。' },
    { day: 1, title: '拆墙第一天', narrative: '敲掉隔墙后客厅真的显大了一倍！通铺过去视觉上太爽了。' },
    { day: 2, title: '第一次开火', narrative: '炒了个辣椒炒肉，整个客厅都是味道。才知道油烟机买得不够好。' },
    { day: 3, title: '冷静期', narrative: '好看是真的好看，但要勤打扫也是真的。开始思考：当初是不是该做个半开放式？' },
  ],
}

// ===== Public API =====

// Get AI generation steps for a case
export function getAISteps(caseId) {
  return aiGenerationSteps[caseId]?.steps || aiGenerationSteps.chongqing.steps
}

// Filter experiences by tag affinity
function filterExperiences(caseId, tags) {
  const pool = experiences[caseId] || []
  return pool.filter(exp => {
    const aff = exp.tagAffinity
    if (Object.keys(aff).length === 0) return true
    return Object.entries(aff).some(([key, vals]) => {
      return vals.includes(tags[key])
    })
  })
}

// Compute timeline + parallel worlds for a given case
export function computeTimeline(caseId, tags) {
  const baseDays = defaultTimeline[caseId]
  if (!baseDays) return null

  const filteredExps = filterExperiences(caseId, tags)

  const days = baseDays.map((day, idx) => {
    const dayExps = filteredExps.slice(idx * 2, idx * 2 + 2)
    return { ...day, experiences: dayExps }
  })

  const worlds = parallelWorlds[caseId] || parallelWorlds.chongqing
  const matchedUserCount = filteredExps.length

  // Find the best-fit world (highest fitScore)
  const recommended = worlds.reduce((best, w) => w.scores.fitScore > best.scores.fitScore ? w : best, worlds[0])

  return { days, worlds, recommended, matchedUserCount }
}

// Match search text to a case
export function matchCase(query = '') {
  const keywords = {
    chongqing: ['重庆', '旅行', '旅游', '一个人', '独旅', '去重庆'],
    camera: ['相机', '摄影', '拍照', '微单', '单反'],
    kitchen: ['厨房', '开放式', '装修', '油烟', '橱柜'],
  }
  for (const [id, kws] of Object.entries(keywords)) {
    if (kws.some(k => query.includes(k))) return decisionCases.find(d => d.id === id)
  }
  return null
}

export function isDecisionQuestion(query) {
  return /(要不要|该不该|值得.*吗|应不应该|能.*吗|好不好)/.test(query)
}
