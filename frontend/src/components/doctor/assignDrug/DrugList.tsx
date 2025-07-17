import { PatientDrugResponse } from "@/api/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface DrugListProps {
  drugs: PatientDrugResponse[];
}

export default function DrugList({ drugs }: DrugListProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Danh sách thuốc</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tên thuốc</TableHead>
              <TableHead>Liều lượng</TableHead>
              <TableHead>Cách dùng</TableHead>
              <TableHead>Thời gian</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {drugs.map((drug) => (
              <TableRow key={drug.id}>
                <TableCell>{drug.drug.name}</TableCell>
                <TableCell>{drug.dosage}</TableCell>
                <TableCell>{drug.usage}</TableCell>
                <TableCell>{drug.time}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
