import { useEffect, useState } from "react";
import { CheckCircle2, XCircle, Search, Copy, FileText } from "lucide-react";
import { Input } from "./ui/input";
import { Footer } from "./Footer";

interface HistoryPageProps {
  onNavigate: (page: string) => void;
}

interface FileRecord {
  filename: string;
  filehash: string;
  timestamp: string;
  status: string;
}

export function HistoryPage({ onNavigate }: HistoryPageProps) {
  const [data, setData] = useState<FileRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("http://127.0.0.1:5000/history", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((result) => {
        setData(result);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const filteredData = data.filter((record) =>
    record.filename.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalFiles = data.length;
  const verifiedCount = data.filter((d) => d.status === "verified").length;
  const tamperedCount = data.filter((d) => d.status === "tampered").length;

  const copyHash = (hash: string) => {
    navigator.clipboard.writeText(hash);
    alert("Hash copied!");
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <div className="flex-1 py-10">
        <div className="max-w-7xl mx-auto px-4">

          {/* Header */}
          <div className="rounded-2xl p-8 mb-8 shadow-lg bg-blue-100 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800">
            <h1 className="text-3xl font-bold mb-2">File History</h1>
            <p className="text-[#2B6CB0] dark:text-[#0BC5EA]">
              Overview of your file verification history
            </p>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

            {/* Total */}
            <div className="rounded-2xl p-6 mb-8 shadow transition bg-yellow-100 dark:bg-yellow-950/50 border border-yellow-300 dark:border-yellow-600">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-600 dark:text-yellow-400">Total Files</p>
                  <h2 className="text-3xl font-bold text-yellow-500">{totalFiles}</h2>
                </div>
                <FileText className="w-10 h-10 text-yellow-500 dark:text-yellow-400" />
              </div>
            </div>

            {/* Verified */}
            <div className="rounded-2xl p-6 mb-8 shadow transition bg-green-100 dark:bg-green-950/50 border border-green-200 dark:border-green-800">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-700 dark:text-green-300">Verified</p>
                  <h2 className="text-3xl font-bold text-white-500">{verifiedCount}</h2>
                </div>
                <CheckCircle2 className="w-10 h-10 text-green-500" />
              </div>
            </div>

            {/* Tampered */}
            <div className="rounded-2xl p-6 mb-8 shadow transition bg-red-100 dark:bg-red-950/50 border border-red-200 dark:border-red-800">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-red-700 dark:text-red-300">Tampered</p>
                  <h2 className="text-3xl font-bold text-white-500">{tamperedCount}</h2>
                </div>
                <XCircle className="w-10 h-10 text-red-500" />
              </div>
            </div>
          </div>

          {/* Search */}
          <div className="bg-card p-4 rounded-xl mb-6 flex items-center gap-3 shadow border border-border">
            <Search className="text-muted-foreground" />
            <Input
              placeholder="Search by file name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Loading */}
          {loading && (
            <p className="text-muted-foreground">Loading history...</p>
          )}

          {/* Empty */}
          {!loading && filteredData.length === 0 && (
            <p className="text-muted-foreground">No history found.</p>
          )}

          {/* Table */}
          {!loading && filteredData.length > 0 && (
            <div className="bg-card rounded-xl overflow-hidden shadow border border-border">
              <table className="w-full">
                <thead className="bg-muted">
                  <tr>
                    <th className="p-4 text-left">File</th>
                    <th className="p-4 text-left">Hash</th>
                    <th className="p-4 text-left">Status</th>
                    <th className="p-4 text-left">Timestamp</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((item, idx) => (
                    <tr
                      key={idx}
                      className="border-t border-border hover:bg-muted/40 transition"
                    >
                      <td className="p-4">{item.filename}</td>

                      <td className="p-4 font-mono text-sm flex items-center gap-2">
                        {item.filehash.slice(0, 18)}...
                        <Copy
                          className="w-4 h-4 cursor-pointer text-muted-foreground hover:text-foreground"
                          onClick={() => copyHash(item.filehash)}
                        />
                      </td>

                      <td className="p-4">
                        {item.status === "verified" ? (
                          <div className="flex items-center gap-2 text-green-500">
                            <CheckCircle2 className="w-5 h-5" />
                            Verified
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 text-red-500">
                            <XCircle className="w-5 h-5" />
                            Tampered
                          </div>
                        )}
                      </td>

                      <td className="p-4">{item.timestamp}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

        </div>
      </div>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
