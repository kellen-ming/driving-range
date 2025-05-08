import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // 获取所有颜色组合
    const colorCombinations = await prisma.colorCombination.findMany({
      include: {
        colors: {
          include: {
            color: true
          },
          orderBy: {
            order: 'asc'
          }
        }
      }
    });

    // 格式化为您需要的结构
    const formattedData = colorCombinations.map(combination => ({
      id: combination.id,
      type: combination.type,
      combination: combination.colors.map(item => ({
        colorId: item.colorId,
        name: item.color.name,
        hexCode: item.color.hexCode,
        order: item.order
      }))
    }));

    return NextResponse.json(formattedData);
  } catch (error) {
    console.error("获取颜色组合失败:", error);
    return NextResponse.json(
      { error: "获取颜色组合失败" },
      { status: 500 }
    );
  }
}