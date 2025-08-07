import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // 데이터 패칭을 로그로 출력
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

export default nextConfig;
