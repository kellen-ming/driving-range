import clsx from "clsx";
import { PageWrapper } from "../../components/ui/page-wrapper";
import { Card } from "../../components/ui/card"; 

export interface GradientColor {
  colorDesc?:string[];
  colors: string[];
}

export default function GradientColor() {
  const gradientColor: GradientColor[] = [
    {
      colorDesc: [],
      colors: ['#EF6837', '#114468']
    },
    {
      colorDesc: [],
      colors: ['#FEE9CB', '#14485E', '#C2FCC4']
    },
    {
      colorDesc: ['梧枝绿', '密黄'],
      colors: ['#67a693', '#fab955'],
    },
    {
      colorDesc: ['雾霾蓝', '松叶绿'],
      colors: ['#2a3342', '#666b50'],
    },
    {
      colorDesc: ['山黎豆红', '芦灰'],
      colors: ['#c37c8a', '#836c72'],
    },
    {
      colorDesc: ['白屈菜绿', '冰山蓝'],
      colors: ['#495b4b', '#a3aca7'],
    },
    {
      colorDesc: ['杏黄', '巧克力'],
      colors: ['#f18f14', '#4a2e2a'],
    },
    {
      colorDesc: ['瓦罐灰', '葡萄酒红'],
      colors: ['#47484c', '#63102e'],
    },
    {
      colorDesc: ['晴山蓝', '佛手黄'],
      colors: ['#8fb1ca', '#fed81f'],
    },
    {
      colorDesc: ['石青', '精白'],
      colors: ['#1785ab', '#ffffff'],
    },
    {
      colorDesc: ['黛绿', '浅卡其'],
      colors: ['#416665', '#dac8b8'],
    },
    {
      colorDesc: ['琥珀色', '雄黄'],
      colors: ['#c66723', '#f6b655'],
    },
    {
      colorDesc: ['缃色', '棕黑'],
      colors: ['#f0c239', '#774c21'],
    },
    {
      colorDesc: ['合欢', '鱼尾灰'],
      colors: ['#efa1a7', '#5f616c'],
    },
    {
      colorDesc: ['石蕊蓝', '姜黄'],
      colors: ['#2096ce', '#dac047'],
    },
    {
      colorDesc: ['帝橄榄绿', '银牡丹'],
      colors: ['#676C44', '#E7CEC7'],
    },
    {
      colorDesc: ['陶器绿', '茉莉黄'],
      colors: ['#8BB399', '#E1BB74'],
    },
    {
      colorDesc: ['蓝莓', '木兰淡粉'],
      colors: ['#313342', '#DEB4B2'],
    },
    {
      colorDesc: ['勃良第红', '米白'],
      colors: ['#540D15', '#E0D4C6'],
    },
    {
      colorDesc: ['牛奶咖啡棕', '淡绿'],
      colors: ['#97705D', '#CFD99D'],
    },
    {
      colorDesc: ['拿波里黄', '蒂芙尼蓝', '芥末棕'],
      colors: ['#FADA54', '#81CAC3', '#9D6C4A'],
    },
  ]

  
  const double = gradientColor.filter(i => i.colors.length === 2);
  const triple = gradientColor.filter(i => i.colors.length === 3);

  return (
    <PageWrapper>
        <div className="py-16 h-full">
          <h1 className="text-5xl font-bold text-gray-900 mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
            听说这些是比较好看的配色
          </h1>
          <div className="flex">
            <section className="h-full w-1/2  border-r-2 ">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
                双色
              </h3>
              <div className="flex flex-wrap gap-6 py-12  justify-center">
                {
                  double?.map((item, index) => {
                    const { colors, colorDesc } = item;
                    const colorDescLen = colorDesc?.length
                    const background = `linear-gradient(to right, ${colors[0]}, ${colors[1]})`;
                    return (
                      <Card key={index} path={`/page-list/gradient-color/${encodeURIComponent(colors.join(','))}`}>
                        {
                          colorDescLen && colorDescLen > 0 ? (
                            <p className="mb-2 px-4 text-gray-600 font-medium flex justify-between w-72">
                              {
                                colorDesc.map((desc, descIndex) => (
                                  <span key={descIndex}>{desc}</span>
                                ))
                              }
                            </p>
                          ) : null
                        }
                        <div
                          style={{
                            background
                          }} 
                          className={clsx("flex p-3 text-white justify-between rounded-2xl shadow-xl w-72")}
                        >
                          {
                            colors.map((color, i) => (
                              <span key={i}>{color}</span>
                            ))
                          }
                        </div>
                      </Card>
                    )  
                  })
                }
              </div>
            </section>
            <section className="h-full w-1/2">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
                三重色
              </h3>
              <div className="flex flex-wrap gap-6 py-12  justify-center">
                {
                  triple?.map((item, index) => {
                    const { colors, colorDesc } = item;
                    const colorDescLen = colorDesc?.length
                    const background = `linear-gradient(to right, ${colors[0]}, ${colors[1]}, ${colors[2]})`;
                    return (
                      <Card key={index} path={`/page-list/gradient-color/${encodeURIComponent(colors.join(','))}`}>
                        {
                          colorDescLen && colorDescLen > 0 ? (
                            <p className="mb-2 px-4 text-gray-600 font-medium flex justify-between w-72">
                              {
                                colorDesc.map((desc, descIndex) => (
                                  <span key={descIndex}>{desc}</span>
                                ))
                              }
                            </p>
                          ) : null
                        }
                        <div
                          style={{
                            background
                          }} 
                          className={clsx("flex p-3 text-white justify-between rounded-2xl shadow-xl w-72")}
                        >
                          {
                            colors.map((color, i) => (
                              <span key={i}>{color}</span>
                            ))
                          }
                        </div>
                      </Card>
                    )  
                  })
                }
              </div>
            </section>
          </div>
          {/* <div className="py-16 px-4 flex flex-wrap gap-6">
            {gradientColor.map((item, index) => {
              const { colors, colorDesc } = item
              const colorsLen = colors.length
              const colorDescLen = colorDesc?.length
              
              const background = colorsLen > 2 ? `linear-gradient(to right, ${colors[0]}, ${colors[1]}, ${colors[2]})` : `linear-gradient(to right, ${colors[0]}, ${colors[1]})`
              return (
                <Card key={index} path={`/page-list/gradient-color/${encodeURIComponent(colors.join(','))}`}>
                  {
                    colorDescLen && colorDescLen > 0 ? (
                      <p className="mb-2 px-4 text-gray-600 font-medium flex justify-between w-72">
                        {
                          colorDesc.map((desc, descIndex) => (
                            <span key={descIndex}>{desc}</span>
                          ))
                        }
                      </p>
                    ) : null
                  }
                
                  <div
                    style={{
                      background
                    }} 
                    className={clsx("flex p-3 text-white justify-between rounded-2xl shadow-xl w-72")}
                  >
                    {
                      colors.map((color, i) => (
                        <span key={i}>{color}</span>
                      ))
                    }
                  </div>
                </Card>
              )  
            })}
          </div> */}
        </div>
    </PageWrapper> 
  )
}