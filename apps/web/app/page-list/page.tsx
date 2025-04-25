import Link from "next/link";
import { PageWrapper } from "../components/ui/page-wrapper";

const projects = [
  {
    title: "Headless Demo",
    description: "一个无头CMS的演示项目",
    path: "/page-list/headless-demo",
    tags: ["Next.js", "Headless CMS"]
  },
  {
    title: "Gradient Color",
    description: "不一样的渐变色",
    path: "/page-list/gradient-color",
    tags: ["UI"]
  },
  // ... 这里可以添加更多项目
];

export default function PageList() {
  return (
    <PageWrapper>
      <div className="relative py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl font-bold text-gray-900 mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
            我的作品集
          </h1>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            探索我的创意项目集合，每一个作品都代表着独特的解决方案和创新思维
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Link 
                key={index}
                href={project.path}
                className="group relative"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-300" />
                <div className="relative bg-white rounded-lg p-6 shadow-lg hover:shadow-2xl transition duration-300">
                  <h2 className="text-xl font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors duration-200">
                    {project.title}
                  </h2>
                  <p className="mt-2 text-gray-600">
                    {project.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tags.map((tag, tagIndex) => (
                      <span 
                        key={tagIndex}
                        className="px-3 py-1 text-sm bg-gradient-to-r from-purple-50 to-indigo-50 text-indigo-700 rounded-full border border-indigo-100"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}