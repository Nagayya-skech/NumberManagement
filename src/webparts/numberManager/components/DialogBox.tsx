import React, { useEffect, useState } from 'react';
import { Dialog, DialogType, DialogFooter } from '@fluentui/react/lib/Dialog';
import { PrimaryButton, DefaultButton } from '@fluentui/react/lib/Button';

interface ConfirmDialogProps {
  hidden: boolean;
  onDismiss: () => void;
  onConfirm: () => void;
  title: string;
  subText: string;
  dialogType: 'confirmation' | 'information';
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({ hidden, onDismiss, onConfirm, title, subText, dialogType }) => {
  const [isHidden, setIsHidden] = useState(hidden);

  useEffect(() => {
    setIsHidden(hidden);
  }, [hidden]);

  const handleDismiss = () => {
    setIsHidden(true);
    onDismiss();
  };

  const handleConfirm = () => {
    setIsHidden(true);
    onConfirm();
  };

  return (
    <Dialog
      hidden={isHidden}
      onDismiss={handleDismiss}
      dialogContentProps={{
        type: DialogType.normal,
        title: title,
        subText: subText,
      }}
      modalProps={{
        isBlocking: true,
      }}
    >
      <DialogFooter>
      {dialogType === 'confirmation' ? (
          <>
            <PrimaryButton onClick={handleConfirm} text="Yes, Confirm" style={{ marginRight: '10px' }} />
            <DefaultButton onClick={handleDismiss} text="No, Cancel" />
          </>
        ) : (
          <PrimaryButton onClick={handleDismiss} text="OK" />
        )}
      </DialogFooter>
    </Dialog>
  );
};

export default ConfirmDialog;
