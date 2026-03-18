import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export function TransactionHistory({ transactions }: { transactions: any[] }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-black/20 backdrop-blur-md overflow-hidden">
      <Table>
        <TableHeader className="bg-white/5">
          <TableRow className="border-white/10 hover:bg-transparent">
            <TableHead className="text-gray-400">Traveler</TableHead>
            <TableHead className="text-gray-400">Destination</TableHead>
            <TableHead className="text-gray-400 text-right">Bounty</TableHead>
            <TableHead className="text-gray-400 text-center">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((tx) => (
            <TableRow key={tx.id} className="border-white/10 hover:bg-white/5">
              <TableCell className="font-medium text-white">
                {tx.traveler_name}
              </TableCell>
              <TableCell className="text-gray-400">{tx.tour_destination}</TableCell>
              <TableCell className="text-right font-bold text-green-500">
                +GH₵ {tx.amount.toFixed(2)}
              </TableCell>
              <TableCell className="text-center">
                <Badge className="bg-green-600/20 text-green-400 border-green-600/30">
                  {tx.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

