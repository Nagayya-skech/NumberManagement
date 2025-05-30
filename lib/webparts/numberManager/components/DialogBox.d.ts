import React from 'react';
interface ConfirmDialogProps {
    hidden: boolean;
    onDismiss: () => void;
    onConfirm: () => void;
    title: string;
    subText: string;
    dialogType: 'confirmation' | 'information';
}
declare const ConfirmDialog: React.FC<ConfirmDialogProps>;
export default ConfirmDialog;
//# sourceMappingURL=DialogBox.d.ts.map