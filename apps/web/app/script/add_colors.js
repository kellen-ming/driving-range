import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

const colors = [
  { name: '橙红', hexCode: '#EF6837' },
  { name: '深蓝', hexCode: '#114468' },
  { name: '米黄', hexCode: '#FEE9CB' },
  { name: '深青蓝', hexCode: '#14485E' },
  { name: '浅草绿', hexCode: '#C2FCC4' },
  { name: '梧枝绿', hexCode: '#67a693' },
  { name: '密黄', hexCode: '#fab955' },
  { name: '雾霾蓝', hexCode: '#2a3342' },
  { name: '松叶绿', hexCode: '#666b50' },
  { name: '山黎豆红', hexCode: '#c37c8a' },
  { name: '芦灰', hexCode: '#836c72' },
  { name: '白屈菜绿', hexCode: '#495b4b' },
  { name: '冰山蓝', hexCode: '#a3aca7' },
  { name: '杏黄', hexCode: '#f18f14' },
  { name: '巧克力', hexCode: '#4a2e2a' },
  { name: '瓦罐灰', hexCode: '#47484c' },
  { name: '葡萄酒红', hexCode: '#63102e' },
  { name: '晴山蓝', hexCode: '#8fb1ca' },
  { name: '佛手黄', hexCode: '#fed81f' },
  { name: '石青', hexCode: '#1785ab' },
  { name: '精白', hexCode: '#ffffff' },
  { name: '黛绿', hexCode: '#416665' },
  { name: '浅卡其', hexCode: '#dac8b8' },
  { name: '琥珀色', hexCode: '#c66723' },
  { name: '雄黄', hexCode: '#f6b655' },
  { name: '缃色', hexCode: '#f0c239' },
  { name: '棕黑', hexCode: '#774c21' },
  { name: '合欢', hexCode: '#efa1a7' },
  { name: '鱼尾灰', hexCode: '#5f616c' },
  { name: '石蕊蓝', hexCode: '#2096ce' },
  { name: '姜黄', hexCode: '#dac047' },
  { name: '帝橄榄绿', hexCode: '#676C44' },
  { name: '银牡丹', hexCode: '#E7CEC7' },
  { name: '陶器绿', hexCode: '#8BB399' },
  { name: '茉莉黄', hexCode: '#E1BB74' },
  { name: '蓝莓', hexCode: '#313342' },
  { name: '木兰淡粉', hexCode: '#DEB4B2' },
  { name: '勃良第红', hexCode: '#540D15' },
  { name: '米白', hexCode: '#E0D4C6' },
  { name: '牛奶咖啡棕', hexCode: '#97705D' },
  { name: '淡绿', hexCode: '#CFD99D' },
  { name: '拿波里黄', hexCode: '#FADA54' },
  { name: '蒂芙尼蓝', hexCode: '#81CAC3' },
  { name: '芥末棕', hexCode: '#9D6C4A' },
  { name: '浅柠檬黄', hexCode: '#fef7c0' },
  { name: '淡杏黄', hexCode: '#ffe2a8' },
  { name: '蜜橙', hexCode: '#f2ae86' },
  { name: '淡紫', hexCode: '#dbbfdb' },
  { name: '浅紫', hexCode: '#bbb5d8' },
  { name: '蓝紫', hexCode: '#877bae' },
  { name: '嫩芽黄', hexCode: '#eaef9d' },
  { name: '嫩绿', hexCode: '#c1d95c' },
  { name: '橄榄绿', hexCode: '#80b155' },
  { name: '湖蓝', hexCode: '#93eee4' },
  { name: '薄荷蓝', hexCode: '#52e2d9' },
  { name: '孔雀蓝', hexCode: '#4ebdc2' },
  { name: '淡灰紫', hexCode: '#ebe4f2' },
  { name: '浅灰蓝', hexCode: '#bec9e7' },
  { name: '深灰蓝', hexCode: '#6373b7' },
  { name: '浅橙', hexCode: '#eab595' },
  { name: '玫瑰粉', hexCode: '#d87f81' },
  { name: '豆沙红', hexCode: '#ae6378' },
  { name: '浅棕', hexCode: '#c89494' },
  { name: '灰棕', hexCode: '#a66a66' },
  { name: '深玫红', hexCode: '#8c323d' },
  { name: '枯红', hexCode: '#a10a19' },
  { name: '杏黄', hexCode: '#e3a156' },
  { name: '森绿', hexCode: '#2e6535' },
  { name: '品红', hexCode: '#ef0056' },
  { name: '海天霞', hexCode: '#fae1d9' },
  { name: '软翠', hexCode: '#006a80' },
  { name: '罗斯科红', hexCode: '#ae322a' },
  { name: '蛋壳黄', hexCode: '#f7c387' },
  { name: '紫檀', hexCode: '#4c221b' },
  { name: '琥珀', hexCode: '#c96924' },
  { name: '优雅金', hexCode: '#dob08a' },
  { name: '鹤灰', hexCode: '#4a4035' },
  { name: '洛神珠', hexCode: '#c5381d' },
  { name: '米色', hexCode: '#f6e4c8' },
  { name: '靛蓝', hexCode: '#065279' },
  { name: '复古青', hexCode: '#65a091' },
  { name: '时尚黄', hexCode: '#e1cc93' },
  { name: '石褐绿', hexCode: '#453b18' },
  { name: '深灰绿', hexCode: '#195a56' },
  { name: '奢金', hexCode: '#fed3a8' },
  { name: '胭脂虫', hexCode: '#9d1e31' },
  { name: '普鲁士蓝', hexCode: '#003153' },
  { name: '奢金', hexCode: '#e3c79f' },
  { name: '圣罗兰红', hexCode: '#b5120f' },
  { name: '珍珠橙', hexCode: '#ea624d' },
  { name: '阳光黄', hexCode: '#f1daa4' },
  { name: '石绿', hexCode: '#167c66' },
  { name: '薄荷绿', hexCode: '#1a6840' },
  { name: '卵色', hexCode: '#d5e3d2' },
  { name: '暗宝石', hexCode: '#053154' },
];

async function main() {
  for (const color of colors) {
    // 检查数据库中是否已存在该 hexCode
    const exists = await prisma.color.findUnique({
      where: { hexCode: color.hexCode }
    });
    if (exists) {
      console.log(`已存在，跳过: ${color.name} (${color.hexCode})`);
      continue;
    }
    await prisma.color.create({
      data: color
    });
    console.log(`已导入: ${color.name} (${color.hexCode})`);
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });