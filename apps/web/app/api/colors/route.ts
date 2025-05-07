import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function createColor(request: Request) {
  try {
    const body = await request.json();
    const { colorName, colorValue } = body;

    // 检查颜色是否已存在
    const existingColor = await prisma.color.findUnique({
      where: {
        hexCode: colorValue,
      },
    });

    if (existingColor) {
      return NextResponse.json(
        { error: "该颜色已存在" },
        { status: 400 }
      );
    }

    // 创建新颜色
    const newColor = await prisma.color.create({
      data: {
        hexCode: colorValue,
        name: colorName,
      },
    });

    return NextResponse.json(newColor);
  } catch (error) {
    console.error("创建颜色失败:", error);
    return NextResponse.json(
      { error: "创建颜色失败" },
      { status: 500 }
    );
  }
} 

export async function getColorCombination() {
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