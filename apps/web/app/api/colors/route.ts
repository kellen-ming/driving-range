import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
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