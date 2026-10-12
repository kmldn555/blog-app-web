import { Button } from "@/components/ui/button";
import { Link } from "react-router";

function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6 py-12">
      <div className="max-w-md w-full text-center bg-white p-8 rounded-lg">
        <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-2">
          404 Error
        </p>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight mb-3">
          Page Not Found
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed mb-6">
          The link you followed may be broken or the page may have been removed.
        </p>
        <Button>
          <Link to="/">Back to Home</Link>
        </Button>
      </div>
    </div>
  );
}

export default NotFound;
