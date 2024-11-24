import { BrowserRouter, Route, Routes } from "react-router-dom";
import Registration from "./frontend/pages/Registration";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <BrowserRouter>
        <Routes>
          <Route path="/registration" element={<Registration />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
