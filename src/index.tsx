import ReactDOM from "react-dom/client";

import { Root } from "@/components/Root";

// Uncomment this import in case, you would like to develop the application even outside
// the Telegram application, just in your browser.
import "./mockEnv.ts";

import "@telegram-apps/telegram-ui/dist/styles.css";
import "./index.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-blue/theme.css";

ReactDOM.createRoot(document.getElementById("root")!).render(<Root />);
