import { TreatmentPreviewResponse, TreatmentPhasePreviewResponse } from "@/api/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface TreatmentInfoProps {
  treatment: TreatmentPreviewResponse;
  phase: TreatmentPhasePreviewResponse;
}

export default function TreatmentInfo({ treatment, phase }: TreatmentInfoProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Thông tin điều trị</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-1/4">Trạng thái</TableHead>
              <TableHead className="w-3/4">Chi tiết</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Trạng thái điều trị</TableCell>
              <TableCell>{treatment.status}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Giai đoạn</TableCell>
              <TableCell>{phase.title}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
