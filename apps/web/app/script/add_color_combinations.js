import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

// 页面中定义的颜色组合数据
const gradientColor = [
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
  }
];

  const  exampleData = [
    {
      id: 1,
      type: 'double',
      combination: [
        {
          colorId: 222,
          name: '颜色1',
          hexCode: '#fff',
          order: 1,
        },
        {
          colorId: 66,
          name: '颜色2',
          hexCode: '#dddd',
          order: 2,
        }
      ] 
    },
    {
      id: 2,
      type: 'triple',
      combination: [
        {
          colorId: 32,
          name: '颜色3',
          hexCode: '#ccc',
          order: 1,
        },
        {
          colorId: 222,
          name: '颜色1',
          hexCode: '#fff',
          order: 2,
        },
        {
          colorId: 78,
          name: '颜色4',
          hexCode: '#cacacaca',
          order: 3,
        },
      ] 
    },

  ]