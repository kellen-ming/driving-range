import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

// 页面中定义的颜色组合数据
const gradientColors = [
  {
    name: '橙红+深蓝',
    type: 'double',
    combination: [
      {
        name: '橙红',
        hexCode: '#EF6837',
        order: 1,
      },
      {
        name: '深蓝',
        hexCode: '#114468',
        order: 2,
      }
    ]
  },
  {
    name: '米黄+深青蓝+浅草绿',
    type: 'triple',
    combination: [
      {
        name: '米黄',
        hexCode: '#FEE9CB',
        order: 1,
      },
      {
        name: '深青蓝',
        hexCode: '#14485E',
        order: 2,
      },
      {
        name: '浅草绿',
        hexCode: '#C2FCC4',
        order: 3,
      }
    ]
  },
  {
    name: '梧枝绿+密黄',
    type: 'double',
    combination: [
      {
        name: '梧枝绿',
        hexCode: '#67a693',
        order: 1,
      },
      {
        name: '密黄',
        hexCode: '#fab955',
        order: 2,
      }
    ]
  },
  {
    name: '雾霾蓝+松叶绿',
    type: 'double',
    combination: [
      {
        name: '雾霾蓝',
        hexCode: '#2a3342',
        order: 1,
      },
      {
        name: '松叶绿',
        hexCode: '#666b50',
        order: 2,
      }
    ]
  },
  {
    name: '山黎豆红+芦灰',
    type: 'double',
    combination: [
      {
        name: '山黎豆红',
        hexCode: '#c37c8a',
        order: 1,
      },
      {
        name: '芦灰',
        hexCode: '#836c72',
        order: 2,
      }
    ]
  },
  {
    name: '白屈菜绿+冰山蓝',
    type: 'double',
    combination: [
      {
        name: '白屈菜绿',
        hexCode: '#495b4b',
        order: 1,
      },
      {
        name: '冰山蓝',
        hexCode: '#a3aca7',
        order: 2,
      }
    ]
  },
  {
    name: '杏黄+巧克力',
    type: 'double',
    combination: [
      {
        name: '杏黄',
        hexCode: '#f18f14',
        order: 1,
      },
      {
        name: '巧克力',
        hexCode: '#4a2e2a',
        order: 2,
      }
    ]
  },
  {
    name: '瓦罐灰+葡萄酒红',
    type: 'double',
    combination: [
      {
        name: '瓦罐灰',
        hexCode: '#47484c',
        order: 1,
      },
      {
        name: '葡萄酒红',
        hexCode: '#63102e',
        order: 2,
      }
    ]
  },
  {
    name: '晴山蓝+佛手黄',
    type: 'double',
    combination: [
      {
        name: '晴山蓝',
        hexCode: '#8fb1ca',
        order: 1,
      },
      {
        name: '佛手黄',
        hexCode: '#fed81f',
        order: 2,
      }
    ]
  },
  {
    name: '石青+精白',
    type: 'double',
    combination: [
      {
        name: '石青',
        hexCode: '#1785ab',
        order: 1,
      },
      {
        name: '精白',
        hexCode: '#ffffff',
        order: 2,
      }
    ]
  },
  {
    name: '黛绿+浅卡其',
    type: 'double',
    combination: [
      {
        name: '黛绿',
        hexCode: '#416665',
        order: 1,
      },
      {
        name: '浅卡其',
        hexCode: '#dac8b8',
        order: 2,
      }
    ]
  },
  {
    name: '琥珀色+雄黄',
    type: 'double',
    combination: [
      {
        name: '琥珀色',
        hexCode: '#c66723',
        order: 1,
      },
      {
        name: '雄黄',
        hexCode: '#f6b655',
        order: 2,
      }
    ]
  },
  {
    name: '缃色+棕黑',
    type: 'double',
    combination: [
      {
        name: '缃色',
        hexCode: '#f0c239',
        order: 1,
      },
      {
        name: '棕黑',
        hexCode: '#774c21',
        order: 2,
      }
    ]
  },
  {
    name: '合欢+鱼尾灰',
    type: 'double',
    combination: [
      {
        name: '合欢',
        hexCode: '#efa1a7',
        order: 1,
      },
      {
        name: '鱼尾灰',
        hexCode: '#5f616c',
        order: 2,
      }
    ]
  },
  {
    name: '石蕊蓝+姜黄',
    type: 'double',
    combination: [
      {
        name: '石蕊蓝',
        hexCode: '#2096ce',
        order: 1,
      },
      {
        name: '姜黄',
        hexCode: '#dac047',
        order: 2,
      }
    ]
  },
  {
    name: '帝橄榄绿+银牡丹',
    type: 'double',
    combination: [
      {
        name: '帝橄榄绿',
        hexCode: '#676C44',
        order: 1,
      },
      {
        name: '银牡丹',
        hexCode: '#E7CEC7',
        order: 2,
      }
    ]
  },
  {
    name: '陶器绿+茉莉黄',
    type: 'double',
    combination: [
      {
        name: '陶器绿',
        hexCode: '#8BB399',
        order: 1,
      },
      {
        name: '茉莉黄',
        hexCode: '#E1BB74',
        order: 2,
      }
    ]
  },
  {
    name: '蓝莓+木兰淡粉',
    type: 'double',
    combination: [
      {
        name: '蓝莓',
        hexCode: '#313342',
        order: 1,
      },
      {
        name: '木兰淡粉',
        hexCode: '#DEB4B2',
        order: 2,
      }
    ]
  },
  {
    name: '勃良第红+米白',
    type: 'double',
    combination: [
      {
        name: '勃良第红',
        hexCode: '#540D15',
        order: 1,
      },
      {
        name: '米白',
        hexCode: '#E0D4C6',
        order: 2,
      }
    ]
  },
  {
    name: '牛奶咖啡棕+淡绿',
    type: 'double',
    combination: [
      {
        name: '牛奶咖啡棕',
        hexCode: '#97705D',
        order: 1,
      },
      {
        name: '淡绿',
        hexCode: '#CFD99D',
        order: 2,
      }
    ]
  },
  {
    name: '拿波里黄+蒂芙尼蓝+芥末棕',
    type: 'triple',
    combination: [
      {
        name: '拿波里黄',
        hexCode: '#FADA54',
        order: 1,
      },
      {
        name: '蒂芙尼蓝',
        hexCode: '#81CAC3',
        order: 2,
      },
      {
        name: '芥末棕',
        hexCode: '#9D6C4A',
        order: 3,
      }
    ]
  },
  {
    name: '浅柠檬黄+淡杏黄+蜜橙',
    type: 'triple',
    combination: [
      {
        name: '浅柠檬黄',
        hexCode: '#fef7c0',
        order: 1,
      },
      {
        name: '淡杏黄',
        hexCode: '#ffe2a8',
        order: 2,
      },
      {
        name: '蜜橙',
        hexCode: '#f2ae86',
        order: 3,
      }
    ]
  },
  {
    name: '淡紫+浅紫+蓝紫',
    type: 'triple',
    combination: [
      {
        name: '淡紫',
        hexCode: '#dbbfdb',
        order: 1,
      },
      {
        name: '浅紫',
        hexCode: '#bbb5d8',
        order: 2,
      },
      {
        name: '蓝紫',
        hexCode: '#877bae',
        order: 3,
      }
    ]
  },
  {
    name: '嫩芽黄+嫩绿+橄榄绿',
    type: 'triple',
    combination: [
      {
        name: '嫩芽黄',
        hexCode: '#eaef9d',
        order: 1,
      },
      {
        name: '嫩绿',
        hexCode: '#c1d95c',
        order: 2,
      },
      {
        name: '橄榄绿',
        hexCode: '#80b155',
        order: 3,
      }
    ]
  },
  {
    name: '湖蓝+薄荷蓝+孔雀蓝',
    type: 'triple',
    combination: [
      {
        name: '湖蓝',
        hexCode: '#93eee4',
        order: 1,
      },
      {
        name: '薄荷蓝',
        hexCode: '#52e2d9',
        order: 2,
      },
      {
        name: '孔雀蓝',
        hexCode: '#4ebdc2',
        order: 3,
      }
    ]
  },
  {
    name: '淡灰紫+浅灰蓝+深灰蓝',
    type: 'triple',
    combination: [
      {
        name: '淡灰紫',
        hexCode: '#ebe4f2',
        order: 1,
      },
      {
        name: '浅灰蓝',
        hexCode: '#bec9e7',
        order: 2,
      },
      {
        name: '深灰蓝',
        hexCode: '#6373b7',
        order: 3,
      }
    ]
  },
  {
    name: '浅橙+玫瑰粉+豆沙红',
    type: 'triple',
    combination: [
      {
        name: '浅橙',
        hexCode: '#eab595',
        order: 1,
      },
      {
        name: '玫瑰粉',
        hexCode: '#d87f81',
        order: 2,
      },
      {
        name: '豆沙红',
        hexCode: '#ae6378',
        order: 3,
      }
    ]
  },
  {
    name: '浅棕+灰棕+深玫红',
    type: 'triple',
    combination: [
      {
        name: '浅棕',
        hexCode: '#c89494',
        order: 1,
      },
      {
        name: '灰棕',
        hexCode: '#a66a66',
        order: 2,
      },
      {
        name: '深玫红',
        hexCode: '#8c323d',
        order: 3,
      }
    ]
  },
  {
    name: '枯红+杏黄+森绿',
    type: 'triple',
    combination: [
      {
        name: '枯红',
        hexCode: '#a10a19',
        order: 1,
      },
      {
        name: '杏黄',
        hexCode: '#e3a156',
        order: 2,
      },
      {
        name: '森绿',
        hexCode: '#2e6535',
        order: 3,
      }
    ]
  },
  {
    name: '品红+海天霞+软翠',
    type: 'triple',
    combination: [
      {
        name: '品红',
        hexCode: '#ef0056',
        order: 1,
      },
      {
        name: '海天霞',
        hexCode: '#fae1d9',
        order: 2,
      },
      {
        name: '软翠',
        hexCode: '#006a80',
        order: 3,
      }
    ]
  },
  {
    name: '罗斯科红+蛋壳黄+紫檀',
    type: 'triple',
    combination: [
      {
        name: '罗斯科红',
        hexCode: '#ae322a',
        order: 1,
      },
      {
        name: '蛋壳黄',
        hexCode: '#f7c387',
        order: 2,
      },
      {
        name: '紫檀',
        hexCode: '#4c221b',
        order: 3,
      }
    ]
  },
  {
    name: '洛神珠+米色+靛蓝',
    type: 'triple',
    combination: [
      {
        name: '洛神珠',
        hexCode: '#c5381d',
        order: 1,
      },
      {
        name: '米色',
        hexCode: '#f6e4c8',
        order: 2,
      },
      {
        name: '靛蓝',
        hexCode: '#065279',
        order: 3,
      }
    ]
  },
  {
    name: '复古青+时尚黄+石褐绿',
    type: 'triple',
    combination: [
      {
        name: '复古青',
        hexCode: '#65a091',
        order: 1,
      },
      {
        name: '时尚黄',
        hexCode: '#e1cc93',
        order: 2,
      },
      {
        name: '石褐绿',
        hexCode: '#453b18',
        order: 3,
      }
    ]
  },
  {
    name: '深灰绿+奢金+胭脂虫',
    type: 'triple',
    combination: [
      {
        name: '深灰绿',
        hexCode: '#195a56',
        order: 1,
      },
      {
        name: '奢金',
        hexCode: '#fed3a8',
        order: 2,
      },
      {
        name: '胭脂虫',
        hexCode: '#9d1e31',
        order: 3,
      }
    ]
  },
  {
    name: '普鲁士蓝+奢金+圣罗兰红',
    type: 'triple',
    combination: [
      {
        name: '普鲁士蓝',
        hexCode: '#003153',
        order: 1,
      },
      {
        name: '奢金',
        hexCode: '#e3c79f',
        order: 2,
      },
      {
        name: '圣罗兰红',
        hexCode: '#b5120f',
        order: 3,
      }
    ]
  },
  {
    name: '珍珠橙+阳光黄+石绿',
    type: 'triple',
    combination: [
      {
        name: '珍珠橙',
        hexCode: '#ea624d',
        order: 1,
      },
      {
        name: '阳光黄',
        hexCode: '#f1daa4',
        order: 2,
      },
      {
        name: '石绿',
        hexCode: '#167c66',
        order: 3,
      }
    ]
  },
  {
    name: '薄荷绿+卵色+暗宝石',
    type: 'triple',
    combination: [
      {
        name: '薄荷绿',
        hexCode: '#1a6840',
        order: 1,
      },
      {
        name: '卵色',
        hexCode: '#d5e3d2',
        order: 2,
      },
      {
        name: '暗宝石',
        hexCode: '#053154',
        order: 3,
      }
    ]
  }
];


async function main() {
  console.log('开始导入颜色组合数据...');
  
  // 遍历每个颜色组合
  for (const combination of gradientColors) {
    try {
      // 1. 检查组合中的颜色是否都已经存在于数据库中
      const colorHexCodes = combination.combination.map(item => item.hexCode);
      const existingColors = await Promise.all(
        colorHexCodes.map(hexCode => 
          prisma.color.findUnique({
            where: { hexCode },
            select: { id: true, name: true }
          })
        )
      );
      
      // 检查是否所有颜色都已存在
      const missingColors = existingColors.map((color, index) => 
        color ? null : combination.combination[index]
      ).filter(Boolean);
      
      // 如果有缺失的颜色，先创建它们
      if (missingColors.length > 0) {
        console.log(`创建缺失的颜色: ${missingColors.map(c => c.name).join(', ')}`);
        
        for (const missingColor of missingColors) {
          await prisma.color.create({
            data: {
              name: missingColor.name,
              hexCode: missingColor.hexCode
            }
          });
        }
        
        // 重新获取所有颜色
        const updatedColors = await Promise.all(
          colorHexCodes.map(hexCode => 
            prisma.color.findUnique({
              where: { hexCode },
              select: { id: true }
            })
          )
        );
        
        // 更新颜色ID列表
        existingColors.splice(0, existingColors.length, ...updatedColors);
      }
      
      // 2. 检查组合是否已经存在（通过比较颜色）
      const colorIds = existingColors.map(color => color.id);
      
      // 查找可能存在的组合
      let existingCombination = null;
      
      if (combination.type === 'double' && colorIds.length === 2) {
        // 查找双色组合
        const combinations = await prisma.colorCombination.findMany({
          where: {
            type: 'double',
            colors: {
              every: {
                colorId: { in: colorIds },
              },
            },
          },
          include: {
            colors: {
              select: { colorId: true },
            },
          },
        });
        
        // 检查是否有完全匹配的组合
        for (const comb of combinations) {
          if (comb.colors.length === 2) {
            const combinationColorIds = comb.colors.map(c => c.colorId);
            // 检查两个数组是否包含相同的颜色ID（不考虑顺序）
            if (colorIds.every(id => combinationColorIds.includes(id)) && 
                combinationColorIds.every(id => colorIds.includes(id))) {
              existingCombination = comb;
              break;
            }
          }
        }
      } else if (combination.type === 'triple' && colorIds.length === 3) {
        // 查找三色组合
        const combinations = await prisma.colorCombination.findMany({
          where: {
            type: 'triple',
            colors: {
              every: {
                colorId: { in: colorIds },
              },
            },
          },
          include: {
            colors: {
              select: { colorId: true },
            },
          },
        });
        
        // 检查是否有完全匹配的组合
        for (const comb of combinations) {
          if (comb.colors.length === 3) {
            const combinationColorIds = comb.colors.map(c => c.colorId);
            // 检查两个数组是否包含相同的颜色ID（不考虑顺序）
            if (colorIds.every(id => combinationColorIds.includes(id)) && 
                combinationColorIds.every(id => colorIds.includes(id))) {
              existingCombination = comb;
              break;
            }
          }
        }
      }
      
      // 3. 如果组合不存在，创建新组合
      if (existingCombination) {
        console.log(`组合已存在，跳过: ${combination.name}`);
        continue;
      }
      
      // 创建新的组合
      const newCombination = await prisma.colorCombination.create({
        data: {
          name: combination.name,
          type: combination.type,
        }
      });
      
      // 4. 创建颜色与组合的关联
      for (let i = 0; i < combination.combination.length; i++) {
        const colorInfo = combination.combination[i];
        const colorId = existingColors[i].id;
        
        await prisma.colorCombinationColor.create({
          data: {
            colorId,
            colorCombinationId: newCombination.id,
            order: colorInfo.order,
          }
        });
      }
      
      console.log(`成功导入组合: ${combination.name}`);
      
    } catch (error) {
      console.error(`导入组合失败 ${combination.name}:`, error);
    }
  }
  
  console.log('颜色组合导入完成');
}

main()
  .catch(e => {
    console.error('导入过程中发生错误:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });