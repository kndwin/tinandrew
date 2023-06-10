import { type AppType } from "next/app";
import localFont from "@next/font/local";

// Font files can be colocated inside of `pages`
// const gitstesy = localFont({ src: "../../public/Gitstesy.tff" });

import { api } from "~/utils/api";
import "~/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default api.withTRPC(MyApp);
