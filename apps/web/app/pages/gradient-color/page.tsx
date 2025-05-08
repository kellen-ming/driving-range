"use client";
import clsx from "clsx";
import { useState, useEffect, Suspense } from "react";
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
import { useQuery, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";

// 创建 QueryClient 实例
const queryClient = new QueryClient();

export interface GradientColor {
  colorDesc?: string[];
  colors: string[];
}

// 定义颜色组合接口数据结构
interface ColorCombinationItem {
  id: number;
  name: string;
  type: 'double' | 'triple';
  combination: {
    colorId: number;
    name: string;
    hexCode: string;
    order: number;
  }[];
}

const formSchema = z.object({
  colorName: z.string().min(1, "清输入颜色名"),
  colorValue: z
    .string()
    .min(1, "请输入颜色值")
    .regex(/^#[0-9A-Fa-f]{6}$/, "请输入有效的十六进制颜色值"),
});

// API请求函数
const fetchColorCombinations = async (): Promise<ColorCombinationItem[]> => {
  const { data } = await axios.get('/api/color-combinations');
  return data;
};

// 颜色组合显示组件
function ColorCombinationDisplay() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['colorCombinations'],
    queryFn: fetchColorCombinations,
    staleTime: 5 * 60 * 1000, // 5分钟内不重新获取数据
  });

  if (isLoading) return <LoadingSkeleton />;
  if (error) return <ErrorDisplay error={error} />;

  
  const doubleColorCombination = data?.filter((i) => i.type === 'double');
  const tripleColorCombination = data?.filter((i) => i.type === 'triple');

  return (
    <div className='flex'>
      <section className='h-full w-1/2 border-r-2'>
        <h3 className='text-2xl font-bold text-gray-900 mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600'>
          双色
        </h3>
        <div className='flex flex-wrap gap-6 py-8 justify-center'>
          {doubleColorCombination?.map((item, index) => {
            const { combination } = item;
            const sortedCombination = [...combination].sort((a, b) => a.order - b.order);
            const colors = sortedCombination.map((i) => i.hexCode);
            return (
              <Card key={index} path={`/pages/gradient-color/${encodeURIComponent(colors.join(","))}`}>
                  <p className='mb-2 px-4 text-gray-600 font-medium flex w-72'>
                    {sortedCombination.map((colorInfo, descIndex) => (
                      <span 
                        key={descIndex}
                        style={{
                          flex: 1,
                          textAlign: descIndex === 1 ? 'right' : 'left',
                        }}
                      >
                        {colorInfo.name}
                      </span>
                    ))}
                  </p>
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
          {tripleColorCombination?.map((item, index) => {
            const { combination } = item;
            const sortedCombination = [...combination].sort((a, b) => a.order - b.order);
            const colors = sortedCombination.map((i) => i.hexCode);
            return (
              <Card key={index} path={`/pages/gradient-color/${encodeURIComponent(colors.join(","))}`}>
                  <p className='mb-2 px-4 text-gray-600 font-medium flex w-72'>
                    {sortedCombination.map((colorInfo, descIndex) => (
                      <span 
                        key={descIndex}
                        style={{
                          flex: 1,
                          textAlign: descIndex === 0 ? 'left' : ( descIndex === 1 ? 'center' : 'right'),
                        }}
                      >
                        {colorInfo.name}
                      </span>
                    ))}
                  </p>
             
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
  );
}

// 骨架屏组件
function LoadingSkeleton() {
  return (
    <div className='flex'>
      <section className='h-full w-1/2 border-r-2 px-8'>
        <div className="text-center mb-6">
          <Skeleton className="h-8 w-32 mx-auto" />
        </div>
        <div className='flex flex-wrap gap-6 py-4 justify-center'>
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="w-72 mb-6">
              <Skeleton className="h-4 w-40 mb-2" />
              <Skeleton className="h-16 w-full rounded-xl" />
            </div>
          ))}
        </div>
      </section>
      <section className='h-full w-1/2 px-8'>
        <div className="text-center mb-6">
          <Skeleton className="h-8 w-32 mx-auto" />
        </div>
        <div className='flex flex-wrap gap-6 py-4 justify-center'>
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="w-72 mb-6">
              <Skeleton className="h-4 w-56 mb-2" />
              <Skeleton className="h-16 w-full rounded-xl" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// 错误显示组件
function ErrorDisplay({ error }: { error: unknown }) {
  return (
    <div className="flex justify-center items-center h-64 w-full">
      <div className="text-center p-6 bg-red-50 rounded-lg">
        <h3 className="text-xl font-semibold text-red-600 mb-2">加载失败</h3>
        <p className="text-gray-600">
          {axios.isAxiosError(error) 
            ? error.response?.data?.error || error.message 
            : '获取颜色组合数据失败，请稍后重试。'}
        </p>
        <Button 
          variant="outline" 
          className="mt-4"
          onClick={() => queryClient.invalidateQueries({ queryKey: ['colorCombinations'] })}
        >
          重试
        </Button>
      </div>
    </div>
  );
}

export default function GradientColor() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
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
      await axios.post("/api/colors", {
        colorName: values.colorName,
        colorValue: values.colorValue,
      });

      // 提交成功后刷新数据
      queryClient.invalidateQueries({ queryKey: ['colorCombinations'] });
      
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

  return (
    <QueryClientProvider client={queryClient}>
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
          
          <ColorCombinationDisplay />
        </div>
      </PageWrapper>
    </QueryClientProvider>
  );
}