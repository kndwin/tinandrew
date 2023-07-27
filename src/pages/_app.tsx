import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import { TooltipProvider } from "~/ui/tooltip";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <TooltipProvider>
      <Component {...pageProps} />
    </TooltipProvider>
  );
};

export default api.withTRPC(MyApp);
