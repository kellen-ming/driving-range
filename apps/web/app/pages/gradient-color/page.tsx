"use client";
import clsx from "clsx";
import { useState } from "react";
import { PageWrapper } from "../../components/ui/page-wrapper";
import { Card } from "../../components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";

export interface GradientColor {
  colorDesc?: string[];
  colors: string[];
}

const formSchema = z.object({
  colorName: z.string().min(1, "清输入颜色名"),
  colorValue: z
    .string()
    .min(1, "请输入颜色值")
    .regex(/^#[0-9A-Fa-f]{6}$/, "请输入有效的十六进制颜色值"),
});

export default function GradientColor() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [gradientColor, setGradientColor] = useState<GradientColor[]>([
    {
      colorDesc: ['橙红','深蓝'],
      colors: ["#EF6837", "#114468"],
    },
    {
      colorDesc: [],
      colors: ["#FEE9CB", "#14485E", "#C2FCC4"],
    },
    {
      colorDesc: ["梧枝绿", "密黄"],
      colors: ["#67a693", "#fab955"],
    },
    {
      colorDesc: ["雾霾蓝", "松叶绿"],
      colors: ["#2a3342", "#666b50"],
    },
    {
      colorDesc: ["山黎豆红", "芦灰"],
      colors: ["#c37c8a", "#836c72"],
    },
    {
      colorDesc: ["白屈菜绿", "冰山蓝"],
      colors: ["#495b4b", "#a3aca7"],
    },
    {
      colorDesc: ["杏黄", "巧克力"],
      colors: ["#f18f14", "#4a2e2a"],
    },
    {
      colorDesc: ["瓦罐灰", "葡萄酒红"],
      colors: ["#47484c", "#63102e"],
    },
    {
      colorDesc: ["晴山蓝", "佛手黄"],
      colors: ["#8fb1ca", "#fed81f"],
    },
    {
      colorDesc: ["石青", "精白"],
      colors: ["#1785ab", "#ffffff"],
    },
    {
      colorDesc: ["黛绿", "浅卡其"],
      colors: ["#416665", "#dac8b8"],
    },
    {
      colorDesc: ["琥珀色", "雄黄"],
      colors: ["#c66723", "#f6b655"],
    },
    {
      colorDesc: ["缃色", "棕黑"],
      colors: ["#f0c239", "#774c21"],
    },
    {
      colorDesc: ["合欢", "鱼尾灰"],
      colors: ["#efa1a7", "#5f616c"],
    },
    {
      colorDesc: ["石蕊蓝", "姜黄"],
      colors: ["#2096ce", "#dac047"],
    },
    {
      colorDesc: ["帝橄榄绿", "银牡丹"],
      colors: ["#676C44", "#E7CEC7"],
    },
    {
      colorDesc: ["陶器绿", "茉莉黄"],
      colors: ["#8BB399", "#E1BB74"],
    },
    {
      colorDesc: ["蓝莓", "木兰淡粉"],
      colors: ["#313342", "#DEB4B2"],
    },
    {
      colorDesc: ["勃良第红", "米白"],
      colors: ["#540D15", "#E0D4C6"],
    },
    {
      colorDesc: ["牛奶咖啡棕", "淡绿"],
      colors: ["#97705D", "#CFD99D"],
    },
    {
      colorDesc: ["拿波里黄", "蒂芙尼蓝", "芥末棕"],
      colors: ["#FADA54", "#81CAC3", "#9D6C4A"],
    },
    {
      colors: ["#fef7c0", "#ffe2a8", "#f2ae86"],
    },
    {
      colors: ["#dbbfdb", "#bbb5d8", "#877bae"],
    },
    {
      colors: ["#eaef9d", "#c1d95c", "#80b155"],
    },
    {
      colors: ["#93eee4", "#52e2d9", "#4ebdc2"],
    },
    {
      colors: ["#ebe4f2", "#bec9e7", "#6373b7"],
    },
    {
      colors: ["#eab595", "#d87f81", "#ae6378"],
    },
    {
      colors: ["#c89494", "#a66a66", "#8c323d"],
    },
    {
      colorDesc: ["枯红", "杏黄", "森绿"],
      colors: ["#a10a19", "#e3a156", "#2e6535"],
    },
    {
      colorDesc: ["品红", "海天霞", "软翠"],
      colors: ["#ef0056", "#fae1d9", "#006a80"],
    },
    {
      colorDesc: ["罗斯科红", "蛋壳黄", "紫檀"],
      colors: ["#ae322a", "#f7c387", "#4c221b"],
    },
    {
      colorDesc: ["洛神珠", "米色", "靛蓝"],
      colors: ["#c5381d", "#f6e4c8", "#065279"],
    },
    {
      colorDesc: ["复古青", "时尚黄", "石褐绿"],
      colors: ["#65a091", "#e1cc93", "#453b18"],
    },
    {
      colorDesc: ["深灰绿", "奢金", "胭脂虫"],
      colors: ["#195a56", "#fed3a8", "#9d1e31"],
    },
    {
      colorDesc: ["普鲁士蓝", "奢金", "圣罗兰红"],
      colors: ["#003153", "#e3c79f", "#b5120f"],
    },
    {
      colorDesc: ["珍珠橙", "阳光黄", "石绿"],
      colors: ["#ea624d", "#f1daa4", "#167c66"],
    },
    {
      colorDesc: ["薄荷绿", "卵色", "暗宝石"],
      colors: ["#1a6840", "#d5e3d2", "#053154"],
    },
  ]);

  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      colorName: "",
      colorValue: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const { data: newColor } = await axios.post("/api/colors", {
        colorName: values.colorName,
        colorValue: values.colorValue,
      });

      // 更新本地状态
      const newGradientColor = {
        colorDesc: [values.colorName],
        colors: [values.colorValue],
      };

      setGradientColor([...gradientColor, newGradientColor]);
      setOpen(false);
      form.reset();

      toast({
        title: "添加成功",
        description: `颜色 ${values.colorName} 已添加`,
        className: "bg-green-500 text-white",
      });
    } catch (error: unknown) {
      const errorMessage = axios.isAxiosError(error) ? error.response?.data?.error || error.message : "添加颜色失败";

      toast({
        title: "添加失败",
        description: errorMessage,
        className: "bg-red-500 text-white",
      });
    } finally {
      setIsLoading(false);
    }
  }

  const double = gradientColor.filter((i) => i.colors.length === 2);
  const triple = gradientColor.filter((i) => i.colors.length === 3);

  return (
    <PageWrapper>
      <div className='relative py-16 h-full'>
        {/* 右上角新建按钮 */}
        <div className='absolute right-8 top-8 z-10'>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant='outline'>新建颜色</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>新建颜色</DialogTitle>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                  <FormField
                    control={form.control}
                    name='colorName'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>颜色名称</FormLabel>
                        <FormControl>
                          <Input placeholder='请输入颜色名称' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='colorValue'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>颜色值</FormLabel>
                        <FormControl>
                          <div className='flex gap-2'>
                            <Input placeholder='#FF0000' {...field} />
                            <input
                              type='color'
                              value={field.value}
                              onChange={(e) => field.onChange(e.target.value)}
                              className='h-10 w-10 rounded-md border p-1'
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant='outline'>取消</Button>
                    </DialogClose>
                    <Button type='submit' disabled={isLoading}>
                      {isLoading ? "添加中..." : "确定"}
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>

        <h1 className='text-5xl font-bold text-gray-900 mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600'>
          听说这些是比较好看的配色
        </h1>
        <div className='flex'>
          <section className='h-full w-1/2  border-r-2 '>
            <h3 className='text-2xl font-bold text-gray-900 mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600'>
              双色
            </h3>
            <div className='flex flex-wrap gap-6 py-8 justify-center'>
              {double?.map((item, index) => {
                const { colors, colorDesc } = item;
                const colorDescLen = colorDesc?.length;
                return (
                  <Card key={index} path={`/pages/gradient-color/${encodeURIComponent(colors.join(","))}`}>
                    {colorDescLen && colorDescLen > 0 ? (
                      <p className='mb-2 px-4 text-gray-600 font-medium flex  w-72'>
                        {colorDesc.map((desc, descIndex) => (
                          <span 
                            key={descIndex}
                            style={{
                              flex: 1,
                              textAlign: descIndex === 1 ? 'right' : 'left',
                            }}
                          >
                            {desc}
                          </span>
                        ))}
                      </p>
                    ) : null}
                    <div
                      className={clsx("flex rounded-2xl overflow-hidden shadow-xl w-72 border border-[#cbcbcbb5]")}>
                      {colors.map((color, i) => {
                        return (
                          <div
                            key={i}
                            className='text-[#1d1d1d] font-medium text-balance flex-1 p-3'
                            style={{
                              backgroundColor: color,
                              textAlign: i === 1 ? 'right' : 'left',
                            }}>
                            {color}
                          </div>
                        );
                      })}
                    </div>
                  </Card>
                );
              })}
            </div>
          </section>
          <section className='h-full w-1/2'>
            <h3 className='text-2xl font-bold text-gray-900 mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600'>
              三重色
            </h3>
            <div className='flex flex-wrap gap-6 py-8 justify-center'>
              {triple?.map((item, index) => {
                const { colors, colorDesc } = item;
                const colorDescLen = colorDesc?.length;
                return (
                  <Card key={index} path={`/pages/gradient-color/${encodeURIComponent(colors.join(","))}`}>
                    {colorDescLen && colorDescLen > 0 ? (
                      <p className='mb-2 px-4 text-gray-600 font-medium flex  w-72'>
                        {colorDesc.map((desc, descIndex) => (
                          <span 
                            key={descIndex}
                            style={{
                              flex: 1,
                              textAlign: descIndex === 0 ? 'left' : ( descIndex === 1 ? 'center' : 'right'),
                            }}
                          >
                            {desc}
                          </span>
                        ))}
                      </p>
                    ) : null}
                    <div
                      className={clsx("flex rounded-2xl overflow-hidden shadow-xl w-72 border border-[#cbcbcbb5]")}>
                      {colors.map((color, i) => (
                        <div 
                          key={i} 
                          className='text-[#1d1d1d] font-medium flex-1 p-3'
                          style={{
                            backgroundColor: color,
                            textAlign: i === 0 ? 'left' : ( i === 1 ? 'center' : 'right'),
                          }}
                        >
                          {color}
                        </div>
                      ))}
                    </div>
                  </Card>
                );
              })}
            </div>
          </section>
        </div>
      </div>
    </PageWrapper>
  );
}
