import React, { useEffect, useState } from 'react';
import { Dialog, DialogType, DialogFooter } from '@fluentui/react/lib/Dialog';
import { PrimaryButton, DefaultButton } from '@fluentui/react/lib/Button';
var ConfirmDialog = function (_a) {
    var hidden = _a.hidden, onDismiss = _a.onDismiss, onConfirm = _a.onConfirm, title = _a.title, subText = _a.subText, dialogType = _a.dialogType;
    var _b = useState(hidden), isHidden = _b[0], setIsHidden = _b[1];
    useEffect(function () {
        setIsHidden(hidden);
    }, [hidden]);
    var handleDismiss = function () {
        setIsHidden(true);
        onDismiss();
    };
    var handleConfirm = function () {
        setIsHidden(true);
        onConfirm();
    };
    return (React.createElement(Dialog, { hidden: isHidden, onDismiss: handleDismiss, dialogContentProps: {
            type: DialogType.normal,
            title: title,
            subText: subText,
        }, modalProps: {
            isBlocking: true,
        } },
        React.createElement(DialogFooter, null, dialogType === 'confirmation' ? (React.createElement(React.Fragment, null,
            React.createElement(PrimaryButton, { onClick: handleConfirm, text: "Yes, Confirm", style: { marginRight: '10px' } }),
            React.createElement(DefaultButton, { onClick: handleDismiss, text: "No, Cancel" }))) : (React.createElement(PrimaryButton, { onClick: handleDismiss, text: "OK" })))));
};
export default ConfirmDialog;
//# sourceMappingURL=DialogBox.js.map