import { MouseEventHandler } from "react";

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
} & CommonProps;

export type SubmitProps = {
    name: string;
};

export type ListingProps = {
    total?: number;
    handleClick: MouseEventHandler;
    handleConfirm: (id: number) => void;
    listing: object[];
} & Pick<CommonProps, "loading">;

export type FormProps = Pick<CommonProps, "loading" | "toggle"> & {
    current?: any;
    bool: boolean;
    onSubmit: (values: SubmitProps) => void;
};

export type ModalProps = {
    visible: boolean;
} & Pick<FormProps, "onSubmit" | "toggle" | "current" | "loading">;
