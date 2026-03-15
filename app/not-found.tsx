import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <div className="mb-4 text-6xl">🦞</div>
      <h1 className="mb-2 text-2xl font-bold">页面未找到</h1>
      <p className="mb-6 text-stone-500">
        这只虾迷路了...找不到你要的页面
      </p>
      <Link
        href="/"
        className="rounded-full bg-red-600 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-red-700"
      >
        返回首页
      </Link>
    </div>
  );
}
