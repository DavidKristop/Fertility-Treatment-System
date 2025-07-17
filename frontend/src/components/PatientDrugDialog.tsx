import type { PatientDrugResponse } from "@/api/types";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';
import { Box } from '@mui/system';

interface PatientDrugDialogProps {
    open: boolean;
    onClose: (open: boolean) => void;
    drug?: PatientDrugResponse;
}

export default function PatientDrugDialog({
    open,
    onClose,
    drug
}: PatientDrugDialogProps) {
    return (
        <Dialog open={open} onClose={() => onClose(false)} maxWidth="sm" fullWidth>
            <DialogTitle>{drug?.drug.name}</DialogTitle>
            <DialogContent>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <Typography variant="subtitle2" gutterBottom>
                            Mô tả:
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {drug?.drug.description}
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, width: '50%' }}>
                            <Typography variant="subtitle2" gutterBottom>
                                Giá:
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {drug?.drug.price.toLocaleString("vi-VN")} đ
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, width: '50%' }}>
                            <Typography variant="subtitle2" gutterBottom>
                                Đơn vị:
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {drug?.drug.unit}
                            </Typography>
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, width: '50%' }}>
                            <Typography variant="subtitle2" gutterBottom>
                                Liều dùng:
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {drug?.dosage}
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, width: '50%' }}>
                            <Typography variant="subtitle2" gutterBottom>
                                Số lượng:
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {drug?.amount}
                            </Typography>
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <Typography variant="subtitle2" gutterBottom>
                            Hướng dẫn:
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {drug?.usageInstructions}
                        </Typography>
                    </Box>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => onClose(false)}>Đóng</Button>
            </DialogActions>
        </Dialog>
    );
}