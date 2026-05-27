// 生成随机ID
const uid = () => Math.random().toString(36).slice(2, 10)

// 图片配置（使用 picsum.photos 确保稳定可访问）
const IMG_BASE = 'https://picsum.photos/seed'
const AVATAR_BASE = 'https://i.pravatar.cc/80'

// 标题/内容模板
const titles = [
  '周末探店｜藏在巷子里的复古咖啡馆',
  '秋日穿搭｜溫柔系針織衫搭配分享',
  '自制甜品｜零失败提拉米苏教程',
  '旅行日记｜大理洱海环游攻略',
  '护肤分享｜敏感肌换季必备好物',
  '书单推荐｜改变我思维方式的5本书',
  '居家好物｜提升幸福感的简约小家电',
  '运动打卡｜七天居家燃脂计划',
  '妆容教程｜日常通勤淡妆三步走',
  '摄影技巧｜手机也能拍出大片感',
  '美食记录｜一人食快手营养午餐',
  '卧室改造｜简约温馨房间布置灵感',
  '包包分享｜通勤百搭款推荐',
  '植物日记｜好养又美观的室内绿植',
  '毕业季｜给学弟学妹的真心建议',
  '周末Vlog｜慢生活的一天',
  '穿搭公式｜一衣多穿的实用搭配',
  '咖啡测评｜城中5家精品咖啡馆',
  '手作体验｜陶艺初学者的第一件作品',
  '影评｜那些治愈心灵的经典电影',
]

const contents = [
  '周末和朋友发现了一家宝藏咖啡馆，藏在老城区的巷子里，复古装修超有氛围感。推荐他家的手冲咖啡和巴斯克蛋糕，坐在窗边能晒到下午的太阳，太惬意了～',
  '最近的天气真的太适合穿针织衫了！分享几套温柔系搭配，不管是通勤还是约会都很合适。我最爱的是杏色开衫配碎花裙，简约又很有气质。',
  '在家尝试做了提拉米苏，没想到一次就成功了！手指饼干蘸咖啡液的时候要注意时间，不能太久不然会太软。马斯卡彭奶酪一定要用室温软化的，这样搅拌才会顺滑。',
  '上周去了大理，洱海真的太美了！推荐大家一定要环湖一圈，沿途的风景每一帧都像画一样。建议租车自驾，看到漂亮的地方随时可以停下来拍照。',
  '换季的时候皮肤特别容易过敏，分享一下我的敏感肌护肤心得。洁面一定要用氨基酸的，精华我选维稳修复类的，面霜要够滋润但又不油腻。',
  '这五本书真的改变了我很多思维方式，每一本都值得反复阅读。特别是《思考，快与慢》，让我对决策有了全新的认识。强烈推荐给想要提升自己的朋友！',
  '新入手的空气炸锅真的太香了！烤鸡翅、薯角、蔬菜，什么都想试试看。操作简单又健康，真的是提升幸福感的好物。',
  '坚持打卡一周啦！每天20分钟的居家燃脂训练，配合合理饮食，真的能感受到身体的变化。分享我的训练计划给大家，一起加油吧！',
  '日常通勤妆最重要的是快速又自然。三步搞定：清透底妆+大地色眼影+豆沙色口红，五分钟就能出门。新手也能轻松掌握哦！',
  '其实手机也能拍出很好看的照片！分享几个小技巧：利用自然光、注意构图、后期调色不要太重。多练习就能找到感觉啦～',
]

const comments = [
  { username: '小确幸', avatar: `${AVATAR_BASE}?u=1`, content: '好棒！收藏了～', time: '2分钟前', likes: 5 },
  { username: '追风少年', avatar: `${AVATAR_BASE}?u=2`, content: '请问这个在哪里可以买到呀？', time: '5分钟前', likes: 3 },
  { username: '阳光正好', avatar: `${AVATAR_BASE}?u=3`, content: '写得真好，感同身受！', time: '10分钟前', likes: 8 },
  { username: '奶茶控', avatar: `${AVATAR_BASE}?u=4`, content: '下次可以试试这样做，看起来很不错', time: '15分钟前', likes: 2 },
  { username: '流浪的猫', avatar: `${AVATAR_BASE}?u=5`, content: '终于找到组织了！我也是这么觉得的', time: '30分钟前', likes: 6 },
]

const tags = ['生活记录', '好物分享', '穿搭日记', '美食打卡', '旅行攻略', '护肤心得', '书影推荐', '居家日常']

// 生成随机宽高比 (0.6 ~ 1.8)
function randomAspect() {
  return +(0.6 + Math.random() * 1.2).toFixed(2)
}

// 生成单条笔记
function createNote(index) {
  const seed = `note${index}`
  const titleIndex = index % titles.length
  const tagIndex = index % tags.length
  const aspect = randomAspect()
  const imgCount = Math.random() > 0.5 ? 1 : Math.ceil(Math.random() * 3)
  const images = Array.from({ length: imgCount }, (_, i) =>
    `${IMG_BASE}/${seed}_${i}/${Math.round(400 * aspect)}/400`
  )
  const c = comments[index % comments.length]

  return {
    id: uid(),
    title: titles[titleIndex],
    content: contents[index % contents.length],
    images,
    image: images[0],
    author: ['小橘子', '春日部', '晚风', '星星', '月亮河', '南山南', '薄荷糖', '柚子皮'][index % 8],
    nickname: ['小橘子', '春日部', '晚风', '星星', '月亮河', '南山南', '薄荷糖', '柚子皮'][index % 8],
    author_account: 1000 + index,
    user_avatar: `${AVATAR_BASE}?u=${index}`,
    avatar: `${AVATAR_BASE}?u=${index}`,
    aspectRatio: aspect,
    likeCount: Math.floor(Math.random() * 500 + 50),
    collectCount: Math.floor(Math.random() * 200 + 20),
    commentCount: Math.floor(Math.random() * 30 + 3),
    liked: false,
    collected: false,
    createTime: `${Math.floor(Math.random() * 24)}小时前`,
    time: `${Math.floor(Math.random() * 24)}小时前`,
    tags: [tags[tagIndex], tags[(tagIndex + 1) % tags.length]],
    location: ['上海', '北京', '杭州', '成都', '大理', '厦门', '广州', '重庆'][index % 8],
    comments: [
      { ...c, id: uid(), replies: [] },
      { ...comments[(index + 3) % comments.length], id: uid(), replies: [] },
    ],
  }
}

// 生成30条笔记
export function generateNotes(count = 30) {
  return Array.from({ length: count }, (_, i) => createNote(i))
}

// 频道配置
export const channels = [
  { id: 'recommend', label: '推荐', path: '/recommend' },
  { id: 'fashion', label: '穿搭', path: '/fashion' },
  { id: 'food', label: '美食', path: '/food' },
  { id: 'travel', label: '旅行', path: '/travel' },
  { id: 'beauty', label: '护肤', path: '/beauty' },
  { id: 'home', label: '家居', path: '/home' },
  { id: 'sport', label: '运动', path: '/sport' },
  { id: 'photo', label: '摄影', path: '/photo' },
  { id: 'study', label: '学习', path: '/study' },
  { id: 'music', label: '音乐', path: '/music' },
]

export const mockNotes = generateNotes(30)