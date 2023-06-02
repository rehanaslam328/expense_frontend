import { MouseEventHandler } from "react";

// Types for Preferences

export type CommonProps = {
    loading: boolean;
    toggle: () => void;
    refetch: () => void;
    setTrue: () => void;
    setFalse: () => void;
};

export type CreateProps = Omit<CommonProps, "toggle">;

export type EditProps = {
    current: any;
    bool: boolean;
    boolean: boolean;
} & CommonProps;

export type ListingProps = {
    handleClick: MouseEventHandler;
    handleConfirm: (id: number) => void;
    listing: object[];
} & Pick<CommonProps, "loading">;

export type SubmitProps = {
    name: string;
};

export type FormProps = Pick<CommonProps, "loading" | "toggle"> & {
    current?: any;
    bool: boolean;
    boolean: boolean;
    onSubmit: (values: SubmitProps) => void;
};
export type ModalProps = {
    isOpen: boolean;
} & Pick<FormProps, "onSubmit" | "toggle" | "current" | "loading" | "boolean">;

// End Types for Preferences
